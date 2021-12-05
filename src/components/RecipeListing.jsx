import Recipe from "./Recipe";
import "./RecipeListing.css";

function RecipeListing(props) {
  const recipes = props.recipes.map((recipe) => (
    <Recipe key={recipe.id} id={recipe.id} recipe={recipe} />
  ));

  console.log(props);
  return <div className="recipe-listing">{recipes}</div>;
}

export default RecipeListing;
