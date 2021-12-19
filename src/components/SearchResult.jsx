import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { HEADERS, BASE_URL } from "../globals";

import Tags from "./Tags";
import RecipeListing from "./RecipeListing";

export default function SearchResult(props) {
  const location = useLocation();
  const params = useParams();

  const [fetching, setFetching] = useState(true);

  //redux
  const dispatch = useDispatch();

  const searchResult = useSelector((state) => state.searchResult);
  const queryText = useSelector((state) => state.queryText);
  const allTags = useSelector((state) => state.allTags);
  const queryTags = useSelector((state) => state.queryTags);
  const isLoaded = useSelector((state) => state.isLoaded);
  const pageNum = useSelector((state) => state.pageNum);
  const resultsPerPage = useSelector((state) => state.resultsPerPage);

  // search

  function performTextSearch(
    _queryText,
    _pageNum,
    _resultsPerPage,
    _queryTags
  ) {
    if (
      !isLoaded ||
      params.queryText !== queryText ||
      pageNum !== _pageNum ||
      resultsPerPage !== _resultsPerPage ||
      queryTags.toString() !== _queryTags.toString()
    ) {
      setFetching(true);
      dispatch({ type: "set-query-text", payload: params.queryText });
      dispatch({ type: "set-query-tags", payload: _queryTags });
      dispatch({ type: "set-results-per-page", payload: _resultsPerPage });
      dispatch({ type: "set-page-num", payload: _pageNum });
      var options = {
        method: "GET",
        url: BASE_URL + "recipes/list",
        params: {
          from: _pageNum * _resultsPerPage,
          size: _resultsPerPage,
          tags: _queryTags.toString(),
          q: params.queryText,
        },
        headers: HEADERS,
      };
      axios
        .request(options)
        .then((response) => {
          dispatch({ type: "set-search-results", payload: response.data });
          dispatch({ type: "set-is-loaded", payload: true });
          setFetching(false);
        })
        .catch((err) => {
          dispatch({ type: "set-is-loaded", payload: false });
          console.log(err);
        });
    }
  }

  // Tags handling

  // retrieve tags from store or load from API
  function loadTags() {
    if (allTags === null) {
      var options = {
        method: "GET",
        url: `${BASE_URL}tags/list`,
        headers: HEADERS,
      };
      axios
        .request(options)
        .then((res) => {
          dispatch({ type: "set-all-tags", payload: res.data.results });
        })
        .catch((err) => {});
    }
  }

  function handleTagClick(tagName) {
    let updatedSelectedTags = [...queryTags];
    if (queryTags.includes(tagName)) {
      const tagIndex = updatedSelectedTags.findIndex((x) => x === tagName);
      updatedSelectedTags.splice(tagIndex, 1);
    } else {
      updatedSelectedTags.push(tagName);
    }
    performTextSearch(queryText, 0, resultsPerPage, updatedSelectedTags);
  }
  // END of tags handling

  // Pagination handling
  const maxPages = () => {
    if (searchResult) {
      return Math.floor(searchResult.count / resultsPerPage);
    } else {
      return 0;
    }
  };

  function handleResultsPerPageChange(ev) {
    performTextSearch(queryText, pageNum, ev.target.value, queryTags);
  }

  function handlePageChange(increment) {
    const newPage = pageNum + increment;
    if (!(newPage < 0 || newPage > maxPages())) {
      performTextSearch(queryText, newPage, resultsPerPage, queryTags);
    }
  }
  // END of paggination handling

  // Component did update?
  useEffect(() => {
    loadTags();
    performTextSearch(queryText, pageNum, resultsPerPage, queryTags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <main>
      <aside>
        {fetching && <p>Fetching...</p>}
        <input
          type="range"
          min="10"
          max="40"
          step="5"
          defaultValue={resultsPerPage}
          onChange={handleResultsPerPageChange}
        />
        <label>{resultsPerPage}</label>
        <br />
        <button onClick={() => handlePageChange(-1)}>previous</button>
        <button onClick={() => handlePageChange(1)}>next</button>
        <br />
        <label>
          page: {pageNum + 1}/{maxPages() + 1}
        </label>
        <Tags tags={allTags} handleTagClick={handleTagClick} />
      </aside>

      {isLoaded ? (
        <RecipeListing recipes={searchResult.results} />
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
