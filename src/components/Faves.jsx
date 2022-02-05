import { useState, useEffect } from "react";
import axios from "axios";
import RecipeListing from "./RecipeListing";
import styled from "styled-components";
import { HEADERS, BASE_URL } from "../globals";
import { useSelector } from "react-redux";

const Main = styled.main`
  display: block;
  height: 90vh;
`;

export default function Faves(props) {
  const faves = useSelector((state) => state.faves);
  const [error, setError] = useState(null);
  const [faveRecipes, setFaveRecipes] = useState([]);

  useEffect(() => {
    const requests = [];
    faves.forEach((id) => {
      const recipeOptions = {
        method: "GET",
        url: `${BASE_URL}recipes/detail`,
        params: { id: id },
        headers: HEADERS,
      };
      requests.push(axios.request(recipeOptions));

      axios.all(requests).then(
        axios.spread((...responses) => {
          const transformedResponses = responses.map((res) => res.data);
          console.log("responses", transformedResponses);
          setFaveRecipes(transformedResponses);
        })
      );
    });    
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
