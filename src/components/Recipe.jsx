import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Recipe(props) {
  const { thumbnail_url, credits, name, tags, id } = props.recipe;

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

  const RecipeCard = styled.div`
    width: 400px;
    height: 400px;
    background-image: ${`url(${thumbnail_url})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    box-shadow: 10px 10px 30px hsl(0, 0%, 25%);

    &:hover {
      box-shadow: 10px 10px 30px hsl(90, 100%, 24%);
    }

    &:hover ${Tags} {
      display: flex;
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

  return (
    <Link to={`/details/${id}`}>
      <RecipeCard>
        <Header>
          <h2>{name}</h2>
          <h4>by: {credits[0].name}</h4>
        </Header>
        <Tags>
          {tags.map((tag) => (
            <Tag key={tag.id}>{tag.display_name}</Tag>
          ))}
        </Tags>
      </RecipeCard>
    </Link>
  );
}
