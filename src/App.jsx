import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import RecipeListing from "./components/RecipeListing";
import Tags from "./components/Tags";

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

  // Tags handling
  const [tags, setTags] = useState(null);
  useEffect(() => {
    var options = {
      method: "GET",
      url: `${BASE_URL}tags/list`,
      headers: HEADERS,
    };
    axios
      .request(options)
      .then((res) => {
        setTags(res.data.results);
      })
      .catch((err) => {});
  }, []);

  const [selectedTags, setSelectedTags] = useState([]);
  const handleTagClick = (tagName) => {
    if (selectedTags.includes(tagName)) {
      const updatedSelectedTags = [...selectedTags];
      const tagIndex = updatedSelectedTags.findIndex((x) => x === tagName);
      updatedSelectedTags.splice(tagIndex, 1);
      setSelectedTags(updatedSelectedTags);
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  const performTextSearch = () => {
    var options = {
      method: "GET",
      url: BASE_URL + "recipes/list",
      params: {
        from: pageNum * resultsPerPage,
        size: resultsPerPage,
        tags: selectedTags.toString(),
        q: querryText,
      },
      headers: HEADERS,
    };

    console.log(selectedTags.toString());
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
  };

  useEffect(() => {
    performTextSearch();
  }, [pageNum, resultsPerPage, selectedTags]);

  const handleQuerryTextChange = (ev) => setQuerryText(ev.target.value);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setIsLoaded(false);
    performTextSearch();
  };

  const handleResultsPerPageChange = (ev) => {
    setResultsPerPage(ev.target.value);
  };

  const maxPages = Math.ceil(recipes.count / resultsPerPage);

  const handlePageChange = (increment) => {
    const newPage = pageNum + increment;
    if (!(newPage < 0 || newPage > maxPages)) {
      setIsLoaded(false);
      setPageNum(newPage);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Recipes</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Enter querry:{" "}
            <input type="text" onChange={handleQuerryTextChange} />
          </label>
          <button>search</button>
        </form>
      </header>

      <main>
        <aside>
          <input
            type="range"
            min="10"
            max="40"
            step="5"
            defaultValue="20"
            onChange={handleResultsPerPageChange}
          />
          <label>{resultsPerPage}</label>
          <br />
          <button onClick={() => handlePageChange(-1)}>previous</button>
          <button onClick={() => handlePageChange(1)}>next</button>
          <br />
          <label>
            page: {pageNum}/{maxPages}
          </label>
          <Tags tags={tags} handleTagClick={handleTagClick} />
        </aside>

        {isLoaded ? (
          <RecipeListing recipes={recipes.results} />
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  );
}

export default App;
