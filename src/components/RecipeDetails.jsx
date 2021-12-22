import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { HEADERS, BASE_URL } from "../globals";
import styled from "styled-components";
import RelatedRecipeListing from "./RelatedRecipeListing";

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "header header ."
    "content video related";
  gap: 1vw;
  ${"" /* background-color: tomato; */}
  padding: 0 1vw 1vw 1vw;
  grid-template-rows: auto 1fr;
  max-width: 1200px;
  margin: 0 auto;
  height: 88vh;
  background: white;

  & * {
    background: white;
    overflow-y: auto;
  }
`;

const Header = styled.div`
  grid-area: header;
  position: relative;

  & table {
    position: absolute;
    top: 1vw;
    right: 1vw;
  }
`;
const Video = styled.div`
  grid-area: video;
  border: 1px solid black;
`;
const Content = styled.div`
  grid-area: content;
  text-align: left;
  border: 1px solid black;
`;

const Related = styled.div`
  grid-area: related;
  border: 1px solid black;
`;

export default function RecipeDetails(props) {
  const params = useParams();
  const location = useLocation();
  const [recipe, setRecipe] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const {
    name,
    description,
    num_servings,
    credits,
    cook_time_minutes,
    instructions,
    nutrition,
    thumbnail_url,
    thumbnail_alt_text,
    id,
    original_video_url,
    user_ratings,
  } = recipe;

  // in case instrucions do not come in order
  let sortedInstructions = [];
  if (isLoaded) {
    sortedInstructions = instructions.slice();
    sortedInstructions.sort((a, b) => a.position - b.position);
  }

  const [related, setRelated] = useState(null);
  useEffect(() => {
    const recipeOptions = {
      method: "GET",
      url: `${BASE_URL}recipes/detail`,
      params: { id: params.id },
      headers: HEADERS,
    };
    axios
      .request(recipeOptions)
      .then((response) => {
        setRecipe(response.data);
        setIsLoaded(true);
        console.log(response.data);
      })
      .catch(function (error) {
        setError(error);
      });

    var relatedOptions = {
      method: "GET",
      url: `${BASE_URL}recipes/list-similarities`,
      params: { recipe_id: params.id },
      headers: HEADERS,
    };
    axios
      .request(relatedOptions)
      .then((response) => {
        console.log("related: ", response.data);
        setRelated(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>{error}</p>;
  } else {
    return (
      <Container>
        <Header>
          <h1>{name}</h1>
          <h2>By: {credits.map((auth) => auth.name + ", ")}</h2>
          <h3>
            Servings: {num_servings} | {cook_time_minutes} minutes
          </h3>
          <h3>
            Up votes: {user_ratings.count_positive} | Down votes:{" "}
            {user_ratings.count_negative} | Rating:{" "}
            {Math.round(user_ratings.score * 100)}%
          </h3>
          {nutrition.calories && (
            <table>
              <thead>
                <tr>
                  <th>Calories</th>
                  <th>{nutrition.calories}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>carbohydrates</td>
                  <td>{nutrition.carbohydrates}</td>
                </tr>
                <tr>
                  <td>sugar</td>
                  <td>{nutrition.sugar}</td>
                </tr>
                <tr>
                  <td>fat</td>
                  <td>{nutrition.fat}</td>
                </tr>
                <tr>
                  <td>protein</td>
                  <td>{nutrition.protein}</td>
                </tr>
                <tr>
                  <td>fiber</td>
                  <td>{nutrition.fiber}</td>
                </tr>
              </tbody>
            </table>
          )}
        </Header>
        <Video>
          <video controls width="480" src={original_video_url}></video>
          {description && <p>{description}</p>}
        </Video>
        <Content>
          <div className="instructions">
            <h3>Instructions</h3>
            {instructions.map((ins) => (
              <>
                <p key={ins.id}>
                  <strong>Step {ins.position}</strong>
                  <br />
                  {ins.display_text}
                </p>
                <br />
              </>
            ))}
          </div>
        </Content>
        <Related>
          {related && (
            <>
              <h3>Related</h3>
              <RelatedRecipeListing recipes={related} />
            </>
          )}
        </Related>
      </Container>
    );
  }
}
