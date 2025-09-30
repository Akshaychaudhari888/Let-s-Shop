import { useState, useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import PropTypes from "prop-types";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";

import "./navbar.css";

const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("home");
  const { token, setToken, cartItems } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // calculate total items in cart
  const cartCount = Object.values(cartItems).reduce((a, b) => a + b, 0);

  return (
    <div className="navbar">
      {/* Logo or heading */}
      <Link to="/" className="navbar-logo">
        <h1>Learn</h1>
      </Link>

      {/* Navigation menu */}
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>

      {/* Right side: search, cart, profile/login */}
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Cart" />
            {cartCount > 0 && <div className="dot">{cartCount}</div>}
          </Link>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="Orders" />
                <span>Orders</span>
              </li>
              <hr />
              <li>
                <img src={assets.logout_icon} alt="Logout" />
                <span onClick={logout}>Logout</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default Navbar;
