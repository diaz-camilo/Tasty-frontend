import { useState, useEffect } from "react";
import axios from "axios";
import RecipeListing from "./RecipeListing";
import styled from "styled-components";
import { HEADERS, BASE_URL } from "../globals";
import { useSelector } from "react-redux";

const Main = styled.main`
  ${
    "" /* background: tomato;
  padding: 0 1vw 1vw 1vw; */
  }
  display: block;
  height: 90vh;
`;

export default function Faves(props) {
  const faves = useSelector((state) => state.faves);
  const [error, setError] = useState(null);
  const [faveRecipes, setFaveRecipes] = useState([]);

  useEffect(() => {
    async function fetchAllRecipes() {
      let outcome = await Promise.all(
        faves.map(async (id) => {
          const recipeOptions = {
            method: "GET",
            url: `${BASE_URL}recipes/detail`,
            params: { id: id },
            headers: HEADERS,
          };
          const response = await axios.request(recipeOptions);
          return response.data;
        })
      );
      setFaveRecipes(outcome);
    }

    fetchAllRecipes();
  }, [faves]);

  if (error) {
    return <p>{error.toString()}</p>;
  }

  if (!faveRecipes.length) {
    return <p>You dont have any favourite recipes yet</p>;
  } else {
    return (
      <Main>
        <h1>Favourites</h1>
        <RecipeListing recipes={faveRecipes} />
      </Main>
    );
  }
}
