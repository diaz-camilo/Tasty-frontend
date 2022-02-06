import { useState, useEffect } from "react";
import axios from "axios";
import RecipeListing from "./RecipeListing";
import styled from "styled-components";
import { HEADERS, BASE_URL } from "../globals";
import { useSelector } from "react-redux";
import * as rax from "retry-axios";

const Main = styled.main`
  display: block;
  height: 90vh;
`;

export default function Faves(props) {
  const faves = useSelector((state) => state.faves);
  const [error, setError] = useState(null);
  const [faveRecipes, setFaveRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    rax.attach();
    const config = {
      headers: HEADERS,
      method: "GET",
      url: `${BASE_URL}recipes/detail`,
      timeout: 100000,
    };
    const requests = [];
    faves.forEach((id) => {
      const recipeOptions = {
        ...config,
        params: { id },
        raxConfig: {
          retry: 4, // number of retry when facing 4xx or 5xx
          noResponseRetries: 5, // number of retry when facing connection error
          retryDelay: Math.ceil(Math.random() * 10000),
          onRetryAttempt: (err) => {
            const cfg = rax.getConfig(err);
            console.log(
              `Retry attempt #${cfg.currentRetryAttempt} for ID=${id}` // track current trial
            );
          },
        },
      };
      requests.push(axios.request(recipeOptions));
    });

    async function fetchAllFavourites() {
      const allFaves = await Promise.allSettled(requests);
      const loadedRecipes = allFaves.map((result) => {
        if (result.status === "fulfilled") {
          return result.value.data;
        } else {
          setError(true);
          return false;
        }
      });
      console.log(loadedRecipes);
      setFaveRecipes(loadedRecipes.filter((x) => x));
      setIsLoading(false);
    }
    fetchAllFavourites();
  }, [faves]);

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (!faveRecipes.length) {
    return <p>You dont have any favourite recipes yet</p>;
  } else {
    return (
      <Main>
        <h1>Favourites</h1>
        {error && <p>Some recipes could not load :( </p>}
        <RecipeListing recipes={faveRecipes} />
      </Main>
    );
  }
}
