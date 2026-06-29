import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [service, setService] = useState("delivery");

  return (
    <div className="header">
      <div className="header-contents">
        <div className="service-toggle">
          <button 
            className={service === "delivery" ? "active" : ""} 
            onClick={() => setService("delivery")}
          >
            Delivery
          </button>
          <button 
            className={service === "pickup" ? "active" : ""} 
            onClick={() => setService("pickup")}
          >
            Pickup
          </button>
        </div>
        
        <h2>The Ultimate Non-Veg Dining Experience.</h2>
        <p>
          Discover the city's finest meat delicacies, curated by top pitmasters. 
          Prime cuts, exceptionally grilled, delivered fresh.
        </p>

        <div className="hero-search">
          <div className="search-input-wrapper">
             <i className="search-icon">🔍</i>
             <input placeholder="Search for your favorite vibe..." />
          </div>
          <button className="search-btn">Find Food</button>
        </div>

        <div className="hero-quick-types">
          <div className="type-chip">🍗 Chicken</div>
          <div className="type-chip">🥩 Mutton</div>
          <div className="type-chip">🍱 Sushi</div>
          <div className="type-chip">🥓 Bacon</div>
          <div className="type-chip">🥘 Biryani</div>
          <div className="type-chip">🍜 Ramen</div>
          <div className="type-chip">🍤 Prawns</div>
          <div className="type-chip">🌭 Hotdog</div>
          <div className="type-chip">🍖 Ribs</div>
          <div className="type-chip">🥟 Dumplings</div>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <strong>15k+</strong>
            <span>Active Chefs</span>
          </div>
          <div className="stat">
            <strong>20 min</strong>
            <span>Avg. Delivery</span>
          </div>
          <div className="stat">
            <strong>4.8</strong>
            <span>User Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

export default Header;
