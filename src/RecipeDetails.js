import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import formatText from "./formatText";

export default function RecipeDetails() {
  const { idMeal } = useParams();
  const [recipe, setRecipe] = useState();
  const [ingredientList, setIngredientList] = useState([]);
  const [mesure, setMesure] = useState([]);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      .then(res => res.json())
      .then(data => {
        setRecipe(data.meals[0]);
        createIngList(data);
      });
  }, []);
  function createIngList(data) {
    let i = 1;
    while (i <= 20) {
      setIngredientList(prevIngredient =>
        [...prevIngredient, data.meals[0][`strIngredient${i}`]].filter(x => x)
      );
      setMesure(prevMesure =>
        [...prevMesure, data.meals[0][`strMeasure${i}`]].filter(x => x)
      );

      i++;
    }
  }

  return (
    <div className="details">
      {recipe ? (
        <>
          <div className="intro">
            <h1>{recipe.strMeal}</h1>
            <img src={recipe.strMealThumb} width="400px" alt={recipe.strMeal} />
          </div>
          <div className="ingr">
            <h3>Ingredients:</h3>
            <ul>
              {ingredientList.map((ingredient, i) => (
                <li key={i}>
                  {ingredient} - {mesure[i]}
                </li>
              ))}
            </ul>
          </div>
          <div className="instr">
            <h3>Instructions:</h3>
            {formatText(recipe.strInstructions)}
          </div>
          <div className="video">
            <h4>Instruction Video:</h4>
            <iframe
              width="420"
              height="315"
              src={recipe.strYoutube.replace("watch?v=", "embed/")}
            ></iframe>
          </div>
        </>
      ) : (
        "Loading"
      )}
    </div>
  );
}
