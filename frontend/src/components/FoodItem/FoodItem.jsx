import React, { useContext, useEffect, useMemo, useState } from "react";
import "./FoodItem.css";
import { assets, menu_list } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image, category }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const fallbackImage = useMemo(() => {
    const found = menu_list.find((item) => item.category_key === category);
    return found ? found.menu_image : menu_list[0].menu_image;
  }, [category]);

  const resolvedImage = useMemo(() => {
    if (!image) return fallbackImage;
    if (String(image).startsWith("http")) return image;
    return `${url}/images/${image}`;
  }, [image, fallbackImage, url]);

  const [imageSrc, setImageSrc] = useState(resolvedImage);

  useEffect(() => {
    setImageSrc(resolvedImage);
  }, [resolvedImage]);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          src={imageSrc}
          alt={name}
          className="food-item-image"
          onError={() => setImageSrc(fallbackImage)}
        />
        {!cartItems[id] ? (
          <button
            type="button"
            className="add add-btn"
            onClick={() => addToCart(id)}
          >
            <img src={assets.add_icon_white} alt="Add item" />
          </button>
        ) : (
          <div className="food-item-counter">
            <button type="button" onClick={() => removeFromCart(id)}>
              <img src={assets.remove_icon_red} alt="Remove item" />
            </button>
            <p>{cartItems[id]}</p>
            <button type="button" onClick={() => addToCart(id)}>
              <img src={assets.add_icon_green} alt="Add item" />
            </button>
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
