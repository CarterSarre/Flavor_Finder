import React, { useEffect, useState } from "react";
import RecipeCard from "./components/RecipeCard";
import logo from "./assets/pgstd1039.png";
import "./App.css";

const App = () => {
  const APP_ID = "f5926533";
  const APP_KEY = "21e6fdcb92c543c953387e28e701b7b6	";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  const fetchRecipes = async (recipe) => {
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${recipe}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecipes("Hamburger");
  }, []);

  return (
    <div className="App">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="search-form">
        <input
          type="text"
          placeholder="Type in your recipe..."
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              fetchRecipes(search);
              setSearch("");
            }
          }}
        />
        <button
          type="submit"
          className="search-button"
          onClick={() => {
            fetchRecipes(search);
            setSearch("");
          }}
        >
          Search
        </button>
      </div>
      {recipes?.length > 0 ? (
        <div className="recipes">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.recipe.uri}
              uri={recipe.recipe.uri}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h1>No Recipes Found!</h1>
        </div>
      )}
    </div>
  );
};

export default App;
