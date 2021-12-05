import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import RecipeListing from "./components/RecipeListing";

const HEADERS = {
  "x-rapidapi-host": "tasty.p.rapidapi.com",
  "x-rapidapi-key": process.env.REACT_APP_TASTY_API_KEY,
};
const BASE_URL = "https://tasty.p.rapidapi.com/";

function App() {
  const [pageNum, setPageNum] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(20);
  const [querryText, setQuerryText] = useState("");
  const [recipes, setRecipes] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    var options = {
      method: "GET",
      url: BASE_URL + "recipes/list",
      params: {
        from: pageNum * resultsPerPage,
        size: resultsPerPage,
        tags: "under_30_minutes",
        q: querryText,
      },
      headers: HEADERS,
    };

    axios
      .request(options)
      .then((response) => {
        setRecipes(response.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        setIsLoaded(false);
        setError(err);
      });
  }, [pageNum, resultsPerPage, querryText]);

  const handleQuerryTextChange = (ev) => setQuerryText(ev.target.value);

  return (
    <div className="App">
      <h1>Recipes</h1>
      <label>
        Enter querry: <input type="text" onChange={handleQuerryTextChange} />
      </label>
      <hr />
      {isLoaded ? (
        <RecipeListing recipes={recipes.results} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
