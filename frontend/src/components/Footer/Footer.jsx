import React from "react";
import "./Footer.css";
import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <div className="brand-logo footer-brand">
            <span className="brand-badge">FF</span>
            <span className="brand-text">FoodFast</span>
          </div>
          <p>
            City-loved meals delivered in minutes. From light salads to comfort
            bowls, FoodFast keeps your table full and your schedule on track.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>+1 (555) 014-9090</li>
            <li>hello@foodfast.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2026 @ FoodFast - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
