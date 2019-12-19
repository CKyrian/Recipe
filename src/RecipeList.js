import React from "react";
import Recipe from "./Recipe";

export default function RecipeList({ recipe }) {
  return (
    <div className="recipe-list-container">
      {recipe
        ? recipe.map(meal => {
            return <Recipe key={meal.idMeal} meal={meal} />;
          })
        : "result here..."}
    </div>
  );
}
