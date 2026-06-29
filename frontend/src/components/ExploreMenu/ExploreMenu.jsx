import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Choose your favorite meat category</h1>
      <p className="explore-menu-text">
        From sizzling grills to premium cuts, explore our curated selection of 
        the finest non-vegetarian dishes in town.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.category_key ? "All" : item.category_key
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.category_key ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
