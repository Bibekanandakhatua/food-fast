import React from "react";
import "./AppDownload.css";
import { food_list } from "../../assets/frontend_assets/assets";

const AppDownload = () => {
  const favoriteFoods = food_list.slice(0, 6);

  return (
    <div className="app-download" id="favorite-food">
      <p>
        Favorite Food <br />
        Fresh and delicious picks for you
      </p>
      <div className="favorite-food-grid">
        {favoriteFoods.map((food) => (
          <div key={food._id} className="favorite-food-card">
            <img src={food.image} alt={food.name} />
            <div>
              <h4>{food.name}</h4>
              <span>${food.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppDownload;
