import "./App.css";
import { Route, HashRouter as Router } from "react-router-dom";
import RecipeDetails from "./components/RecipeDetails";
import Header from "./components/Header";
import Feed from "./components/Feed";
import SearchResult from "./components/SearchResult";
import Faves from "./components/Faves";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route exact path="/" component={Feed} />
        <Route path="/search/:queryText" component={SearchResult} />
        <Route exact path="/search/" component={SearchResult} />
        <Route path="/details/:id" component={RecipeDetails} />
        <Route path="/faves/" component={Faves} />
      </Router>
    </div>
  );
}

export default App;
       