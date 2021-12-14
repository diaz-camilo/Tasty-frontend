import { useParams, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Tags from "./Tags";
import RecipeListing from "./RecipeListing";

const HEADERS = {
  "x-rapidapi-host": "tasty.p.rapidapi.com",
  "x-rapidapi-key": process.env.REACT_APP_TASTY_API_KEY,
};
const BASE_URL = "https://tasty.p.rapidapi.com/";

export default function SearchResult(props) {
  // search
  const [recipes, setRecipes] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState({});
  const location = useLocation();

  const params = useParams();

  const performTextSearch = () => {
    var options = {
      method: "GET",
      url: BASE_URL + "recipes/list",
      params: {
        from: pageNum * resultsPerPage,
        size: resultsPerPage,
        tags: selectedTags.toString(),
        q: params.queryText,
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
  };

  // Tags handling
  const [tags, setTags] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  // Load all tags from API
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

  function handleTagClick(tagName) {
    if (selectedTags.includes(tagName)) {
      const updatedSelectedTags = [...selectedTags];
      const tagIndex = updatedSelectedTags.findIndex((x) => x === tagName);
      updatedSelectedTags.splice(tagIndex, 1);
      setSelectedTags(updatedSelectedTags);
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
  }
  // END of tag handling

  // Pagination handling
  const [resultsPerPage, setResultsPerPage] = useState(20);
  const [pageNum, setPageNum] = useState(0);
  const maxPages = Math.ceil(recipes.count / resultsPerPage);

  function handleResultsPerPageChange(ev) {
    setResultsPerPage(ev.target.value);
  }

  function handlePageChange(increment) {
    const newPage = pageNum + increment;
    if (!(newPage < 0 || newPage > maxPages)) {
      setIsLoaded(false);
      setPageNum(newPage);
    }
  }
  // END of paggination handling

  // Component did update?
  useEffect(() => {
    setIsLoaded(false);
    performTextSearch();
  }, [
    pageNum,
    resultsPerPage,
    selectedTags,
    params.querryText,
    location.pathname,
  ]);

  return (
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
  );
}
