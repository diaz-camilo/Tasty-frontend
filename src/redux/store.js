import { createStore } from "redux";

const initialState = {
  searchResult: null,
  queryText: null,
  allTags: null,
  queryTags: [],
  faves: [],
  isLoaded: false,
  pageNum: 0,
  resultsPerPage: 20,
  feed: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "set-faves":
      return {
        ...state,
        faves: action.payload,
      };
    case "set-search-results":
      return {
        ...state,
        searchResult: action.payload,
      };
    case "set-query-text":
      return {
        ...state,
        queryText: action.payload,
      };
    case "set-query-tags":
      return {
        ...state,
        queryTags: action.payload,
      };
    case "set-page-num":
      return {
        ...state,
        pageNum: action.payload,
      };
    case "set-results-per-page":
      return {
        ...state,
        resultsPerPage: action.payload,
      };
    case "set-all-tags":
      return {
        ...state,
        allTags: action.payload,
      };
    case "set-is-loaded":
      return {
        ...state,
        isLoaded: action.payload,
      };
    case "set-feed":
      return {
        ...state,
        feed: action.payload,
      };
    default:
      return state;
  }
}

function init() {
  const data = localStorage.getItem("faves");
  return data ? JSON.parse(data) : [];
}

export const store = createStore(
  reducer,
  { ...initialState, faves: init() }, // Initialise favourites from local storage
  // suscribe
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
);
