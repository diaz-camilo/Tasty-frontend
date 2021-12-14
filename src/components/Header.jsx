import { useHistory, Link } from "react-router-dom";
import { useState } from "react";

export default function Header(props) {
  const history = useHistory();
  const [querryText, setQuerryText] = useState("");

  const handleQuerryTextChange = (ev) => setQuerryText(ev.target.value);

  const handleSubmit = (ev) => {
    ev.preventDefault();

    history.push(`/search/${querryText}`);
  };

  return (
    <header>
      <h1>Recipes</h1>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/search/"}>Search</Link>
        </li>
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Enter querry: <input type="text" onChange={handleQuerryTextChange} />
        </label>
        <button>search</button>
      </form>
    </header>
  );
}
