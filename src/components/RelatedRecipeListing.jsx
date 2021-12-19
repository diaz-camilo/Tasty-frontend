import Recipe from "./Recipe";
import "./RecipeListing.css";
import styled from "styled-components";
import { Link } from "react-router-dom";

const RelatedRecipes = styled.div`
  width: 12vw;
  & img {
    width: 10vw;
  }
`;

function RelatedRecipeListing(props) {
  return props.recipes.map((recipe) => (
    <Link to={`/details/${recipe.id}`} key={recipe.id}>
      <RelatedRecipes>
        <img src={recipe.thumbnail_url} alt={""} />
        <p>{recipe.name}</p>
      </RelatedRecipes>
    </Link>
  ));
}

export default RelatedRecipeListing;
