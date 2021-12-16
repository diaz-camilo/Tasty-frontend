import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const HEADERS = {
  "x-rapidapi-host": "tasty.p.rapidapi.com",
  "x-rapidapi-key": process.env.REACT_APP_TASTY_API_KEY,
};
const BASE_URL = "https://tasty.p.rapidapi.com/";

export default function RecipeDetails(props) {
  debugger;
  const params = useParams();
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

  // console.log("sorted instrucions", instructions);

  const options = {
    method: "GET",
    url: `${BASE_URL}recipes/detail`,
    params: { id: params.id },
    headers: HEADERS,
  };

  useEffect(() => {
    axios
      .request(options)
      .then((response) => {
        setRecipe(response.data);
        setIsLoaded(true);
        console.log(response.data);
      })
      .catch(function (error) {
        setError(error);
      });
  }, []);

  if (!isLoaded) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>{error}</p>;
  } else {
    return (
      <div>
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
        <video controls width="480" src={original_video_url}></video>
        <p>Description: {description}</p>
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
      </div>
    );
  }
}
