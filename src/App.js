import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import RecipeList from "./RecipeList";
import RecipeDetails from "./RecipeDetails";
import logo from "./burgerimg.png";

function App() {
  const [input, setInput] = useState("");
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then(res => res.json())
      .then(data => setRecipe(data.meals));
  }, []);

  function search(e) {
    e.preventDefault();
    setInput("");
    Promise.all([
      fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + input
      ).then(res => res.json()),
      fetch(
        "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + input
      ).then(res => res.json())
    ]).then(allResponses => {
      const response1 = allResponses[0];
      const response2 = allResponses[1];
      const bothRes = [...(response1.meals || []), ...(response2.meals || [])];
      setRecipe(
        bothRes.filter(function(item1, index) {
          return (
            bothRes.findIndex(item2 => item2.idMeal == item1.idMeal) >= index
          );
        })
      );
    });
  }

  return (
    <Router>
      <div className="App">
        <div className="app-container">
          <nav>
            <h1>Recipe App</h1>
            <img src={logo} alt="hamburger logo" className="logo" />
            <Switch>
              <Route exact path="/recipe">
                <form onSubmit={search} className="input-container">
                  <h3>Search Any Recipe</h3>
                  <input
                    className="search"
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type here..."
                    required
                  />
                  <button>Search</button>
                </form>
              </Route>
              <Route path="/recipe/meal/:idMeal">
                <button className="return">
                  <Link to="/recipe">Return</Link>
                </button>
              </Route>
            </Switch>
          </nav>
          <Switch>
            <Route exact path="/recipe">
              <RecipeList recipe={recipe} />
            </Route>
            <Route path="/recipe/meal/:idMeal">
              <Link to="/recipe">Return</Link>
              <RecipeDetails />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
