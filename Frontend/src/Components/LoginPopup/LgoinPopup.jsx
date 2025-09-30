import PropTypes from "prop-types";
import { useContext, useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import "./LgoinPopup.css";
import { StoreContext } from "../../Context/StoreContext";

const LgoinPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    console.log("onLogin called");
    event.preventDefault();
    let newUrl = url;
    if (currState == "Login") {
      newUrl += "api/user/login";
    } else {
    // eslint-disable-next-line no-unused-vars
      newUrl += "api/user/register";
    }
    console.log(newUrl);
    console.log("data===>", data);
    const response = await axios.post(newUrl, data);
    console.log("response===>", response);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };
  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-pop-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        <div className="login-pop-input">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            ></input>
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          ></input>
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          ></input>
        </div>
        <div className="login-popup-condition">
          <input type="checkbox" required></input>
          <p>By coutinuing,i agree to the terms of use & privarcy policy.</p>
        </div>
        <button type="submit" style={{ cursor: "pointer" }}>
          {currState === "sign Up" ? "create account" : "Login"}
        </button>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

LgoinPopup.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default LgoinPopup;
