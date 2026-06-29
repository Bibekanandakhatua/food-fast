import React, { useContext } from "react";
import "./Navbar.css";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import {useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate=useNavigate();
  const {token, admin, setAdmin, setToken } = useContext(StoreContext);
  const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setToken("");
    setAdmin(false);
    toast.success("Logout Successfully")
    navigate("/");
  }
  return (
    <div className="navbar">
      <div className="brand-logo admin-brand">
        <span className="brand-badge">FF</span>
        <span className="brand-text">FoodFast Admin</span>
      </div>
      {token && admin ? (
        <p className="login-conditon" onClick={logout}>Logout</p>
      ) : (
        <p className="login-conditon" onClick={()=>navigate("/")}>Login</p>
      )}
      <div className="admin-pill">Control Center</div>
    </div>
  );
};

export default Navbar;
