import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category, foodList, loading }) => {
  const { food_list } = useContext(StoreContext);
  const listToRender = Array.isArray(foodList) ? foodList : food_list;

  return (
    <div className="food-display" id="food-display">
      <h2>Trending near you</h2>
      {loading ? (
        <p className="food-display-state">Loading dishes...</p>
      ) : listToRender.length === 0 ? (
        <p className="food-display-state">
          {category === "All"
            ? "No dishes found."
            : "No dishes found for selected shop."}
        </p>
      ) : (
        <div className="food-display-list">
          {listToRender.map((item) => {
            if (category === "All" || category === item.category)
              return (
                <FoodItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  category={item.category}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
          })}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
