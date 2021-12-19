import { createStore } from "redux";

const initialState = {
  searchResult: null,
  queryText: null,
  allTags: null,
  queryTags: [],
  favourites: [],
  isLoaded: false,
  pageNum: 0,
  resultsPerPage: 20,
  feed: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "add-to-faves":
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
      };
    case "remove-from-faves":
      const index = state.favourites.indexOf(action.payload);
      const favourites = [...state.favourites];
      favourites.splice(index, 1);
      return {
        ...state,
        favourites,
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

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
);
