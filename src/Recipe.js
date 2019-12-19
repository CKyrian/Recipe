import React from "react";
import { Link } from "react-router-dom";

export default function Recipe({ meal }) {
  return (
    <div className="recipe-container">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <div className="recipe-info">
        <div>
          <h1>{meal.strMeal}</h1>
          <p>{meal.strArea} Cuisine</p>
        </div>
        <button>
          <Link to={`/meal/${meal.idMeal}`}>details</Link>
        </button>
      </div>
    </div>
  );
}
