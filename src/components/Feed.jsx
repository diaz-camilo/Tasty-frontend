import { useState, useEffect } from "react";
import axios from "axios";
import RecipeListing from "./RecipeListing";
import styled from "styled-components";
import { HEADERS, BASE_URL } from "../globals";
import { useDispatch, useSelector } from "react-redux";

const Main = styled.main`
  background: tomato;
  padding: 0 1vw 1vw 1vw;
  display: block;
`;

export default function Feed(props) {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!feed) {
      var options = {
        method: "GET",
        url: `${BASE_URL}feeds/list`,
        params: {
          size: "20",
          timezone: "+1100",
          vegetarian: false,
          from: "0",
        },
        headers: HEADERS,
      };

      axios
        .request(options)
        .then((response) => {
          dispatch({
            type: "set-feed",
            payload: response.data,
          });
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!feed) {
    return <p>Loading Feed...</p>;
  }

  if (feed) {
    return (
      <Main>
        <RecipeListing recipes={feed.results[2].items} />
      </Main>
    );
  }
}
