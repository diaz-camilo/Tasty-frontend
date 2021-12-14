import { useState, useEffect } from "react";
import axios from "axios";
import RecipeListing from "./RecipeListing";

export default function Feed(props) {
  const HEADERS = {
    "x-rapidapi-host": "tasty.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_TASTY_API_KEY,
  };
  const BASE_URL = "https://tasty.p.rapidapi.com/";

  const [recipes, setRecipes] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    var options = {
      method: "GET",
      url: `${BASE_URL}feeds/list`,
      params: {
        size: "20",
        timezone: "+1100",
        vegetarian: false,
        from: "0",
      },
      headers: HEADERS,
    };

    axios
      .request(options)
      .then((response) => {
        setRecipes(response.data.results[2].items);

        setIsLoaded(true);
      })
      .catch((err) => {
        setIsLoaded(false);
        setError(err);
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!isLoaded) {
    return <p>Loading Feed...</p>;
  }

  if (isLoaded) {
    return <RecipeListing recipes={recipes} />;
  }
}
