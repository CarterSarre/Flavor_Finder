import React from "react";

const RecipeCard = ({ uri, title, calories, image, ingredients }) => {
  return (
    <div className="recipe" key={uri}>
      <h1>{title}</h1>
      <ul>
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
      </ul>
      <p>Calories: {calories}</p>
      <img className="image" src={image} alt={title} />
    </div>
  );
};

export default RecipeCard;
