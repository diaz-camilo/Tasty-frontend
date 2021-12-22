import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFavourites } from "../hooks/api";
import { useSelector } from "react-redux";

const Tags = styled.div`
  color: hsla(0, 0%, 100%);
  position: absolute;
  display: none;
  flex-wrap: wrap;
  gap: 0.25vw;
  padding: 1.5vw 0.25vw 0.25vw 0.25vw;
  bottom: 0;
  background-image: linear-gradient(
    hsla(0, 0%, 100%, 0),
    hsla(0, 0%, 100%, 0.9)
  );
`;

const FeaturedContainer = styled.div`
  width: 50vw;
  padding: 1vw;
  position: relative;
  box-shadow: 10px 10px 30px hsl(0, 0%, 25%);

  &:hover {
    box-shadow: 10px 10px 30px hsl(90, 100%, 24%);
  }

  &:hover ${Tags} {
    display: flex;
  }

  & .fav {
    position: absolute;
    top: 2px;
    right: 2px;
    color: red;
    cursor: pointer;
  }

  & img {
    width: 100%;
  }
`;

const Header = styled.div`
  background-image: linear-gradient(hsl(0, 0%, 0%, 0.9), hsl(0, 0%, 0%, 0));
  color: hsl(0, 100%, 100%);
  margin: 0;
  padding-top: 1vw;
  padding-bottom: 2vw;
`;

const Tag = styled.span`
  background-color: lightcoral;
  border-radius: 00.25vw;
  padding: 00.25vw;
`;

export default function Featured(props) {
  const { thumbnail_url, thumbnail_alt_text, credits, name, tags, id } =
    props.recipe;
  const faves = useSelector((state) => state.faves);

  const { toggleFavById } = useFavourites();
  return (
    <FeaturedContainer bgImg={thumbnail_url}>
      <div className="fav material-icons red" onClick={() => toggleFavById(id)}>
        {faves.includes(id) ? "favorite" : "favorite_border"}
      </div>
      <Link to={`/details/${id}`}>
        <img src={thumbnail_url} alt={thumbnail_alt_text} />
        <h2>{name}</h2>
        <h4>by: {credits[0].name}</h4>
      </Link>
    </FeaturedContainer>
  );
}
