import Recipe from "./Recipe";
import styled from "styled-components";

const RecipeListingContainer = styled.div`
  display: flex;
  gap: 4vw 1vw;
  padding: 2vw 1vw;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-evenly;
  background-color: white;
`;

function RecipeListing(props) {
  const recipes = props.recipes.map((recipe) => (
    <Recipe key={recipe.id} id={recipe.id} recipe={recipe} />
  ));

  console.log(props);
  return <RecipeListingContainer>{recipes}</RecipeListingContainer>;
}

export default RecipeListing;
