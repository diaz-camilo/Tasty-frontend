# A Frontend for the Tasty API using React
## [Link to live deployed site](https://diaz-camilo.github.io/Tasty-frontend/)

## Main Features

### `Search With Filters`
Search the Tasty.co recipe database by keyword and apply tag filtering to refine your search.

### `Add To Favourites`
add and remove recipes to your favourites list stored in your device's local storage.

### `Recipe Details`
Look at the recipe instructions, video, nitritional facts (if available) and related recipes.

## Tech Used

The project mainly uses React along with other JS libraries like:
* [Axios](https://axios-http.com/) for API requests.
* [Styled Components](https://styled-components.com/) for styling (CSS in JS).
* [Redux](https://redux.js.org/) for global state management.
* [React-router-dom](https://github.com/remix-run/react-router#readme)for routing.

## Wish List

* User login.
* Favourite Categories.

## Known Bugs
 * Some recipes can fail to return details as they might be comilations. if these compilations are added to favourites, the favourites list might not load.
 * The maximum number of simultaneous requests by the API is 5 on the free tier. for that reason, having more than 5 favourite recipes will cause the API request to fail and no recipes will be rendered. 