import FeedItem from "./FeedItem";
import "./RecipeListing.css";
import Featured from "./Featured";
import styled from "styled-components";

const FeedListingContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  background-color: white;
  gap: 3vw;
  padding: 3vw;

  & h1 {
    font-size: calc(10px + 4vmin);
  }
`;

const Trending = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3vw;
`;

export default function FeedListing(props) {
  const feed = props.feed.results[2].items.map((recipe) => (
    <FeedItem key={recipe.id} id={recipe.id} recipe={recipe} />
  ));

  console.log(props);
  return (
    <FeedListingContainer>
      <div>
        <Featured recipe={props.feed.results[0].item} />
      </div>
      <div>
        <h1>{props.feed.results[2].name}</h1>
        <Trending>{feed}</Trending>
      </div>
    </FeedListingContainer>
  );
}
