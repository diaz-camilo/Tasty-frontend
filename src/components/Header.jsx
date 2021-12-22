import { useHistory, Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

const AppHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0 2vw;
  background-color: #282c34;
  color: hsl(0, 0%, 100%);

  & a {
    color: hsl(0, 0%, 100%);
    font-size: calc(10px + 1.5vmin);
    text-decoration: none;
  }

  & input {
    font-size: calc(10px + 1.5vmin);
  }

  & a:hover {
    color: lightcoral;
  }

  & div {
    display: flex;
    align-items: center;
  }

  & li {
    display: inline;
    margin: 1vw;
  }

  & form {
    display: flex;
    gap: 1vw;
  }
`;

export default function Header(props) {
  const history = useHistory();
  const [querryText, setQuerryText] = useState("");
  const dispatch = useDispatch();

  const handleQuerryTextChange = (ev) => setQuerryText(ev.target.value);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch({ type: "set-page-num", payload: 0 });
    history.push(`/search/${querryText}`);
  };

  return (
    <AppHeader>
      <div>
        <Link to={"/"}>
          <h1>Tasty recipes</h1>
        </Link>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/search/"}>Search</Link>
          </li>
          <li>
            <Link to={"/faves/"}>Faves</Link>
          </li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleQuerryTextChange} />
        <input type="button" value="search" onClick={handleSubmit} />
      </form>
    </AppHeader>
  );
}
