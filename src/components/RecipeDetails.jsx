import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const HEADERS = {
  "x-rapidapi-host": "tasty.p.rapidapi.com",
  "x-rapidapi-key": process.env.REACT_APP_TASTY_API_KEY,
};
const BASE_URL = "https://tasty.p.rapidapi.com/";

export default function RecipeDetails(props) {
  const params = useParams();

  const [recipe, setRecipe] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const {
    name,
    description,
    num_servings,
    credits,
    coock_time_minutes,
    instructions,
    nutrition,
    thumbnail_url,
    thumbnail_alt_text,
    id,
  } = recipe;

  const options = {
    method: "GET",
    url: `${BASE_URL}recipes/detail`,
    params: { id: params.id },
    headers: HEADERS,
  };

  useEffect(() => {
    axios
      .request(options)
      .then((response) => {
        setIsLoaded(true);
        setRecipe(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        setError(error);
      });
  }, []);

  if (!isLoaded) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>{error}</p>;
  } else return <h1>details for {id}</h1>;
}
