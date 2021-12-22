import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFavourites } from "../hooks/api";
import { useSelector } from "react-redux";

const Footer = styled.div`
  background-image: linear-gradient(hsl(0, 0%, 0%, 0), hsl(0, 0%, 0%, 0.9));
  color: hsl(0, 100%, 100%);
  margin: 0;
  display: none;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const RecipeCard = styled.div`
  width: 180px;
  height: 180px;
  background-image: url(${(props) => props.bgImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  box-shadow: 10px 10px 30px hsl(0, 0%, 25%);

  &:hover {
    box-shadow: 10px 10px 30px hsl(90, 100%, 24%);
  }

  &:hover ${Footer} {
    display: block;
  }

  & .fav {
    position: absolute;
    top: 2px;
    right: 2px;
    color: red;
    cursor: pointer;
  }
`;

export default function FeedItem(props) {
  const { thumbnail_url, credits, name, tags, id } = props.recipe;
  const faves = useSelector((state) => state.faves);

  const { toggleFavById } = useFavourites();
  return (
    <RecipeCard bgImg={thumbnail_url}>
      <div className="fav material-icons" onClick={() => toggleFavById(id)}>
        {faves.includes(id) ? "favorite" : "favorite_border"}
      </div>
      <Link to={`/details/${id}`}>
        <Footer>
          <h4>{name}</h4>
        </Footer>
      </Link>
    </RecipeCard>
  );
}
