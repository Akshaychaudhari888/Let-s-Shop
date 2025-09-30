import { createContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItem] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const url = "http://localhost:5000/";

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "api/list");
      console.log("Fetched food items:", response.data);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  const addToCart = async (itemId) => {
    console.log("add to cart called for itemId:", itemId);
    if (cartItems[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    }

    if (token) {
      await axios.post(
        url + "api/cart/add",
        { itemId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
  };

  const removeFromCart = async(itemId) => {
  
    await axios.post(url + "api/cart/remove", { itemId }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    loadCartData(token);
  };

const loadCartData = async (token) => {
  try {
    const response = await axios.get(url + "api/cart/get", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCartItem(response.data.cartData);
  } catch (error) {
    console.error("Error loading cart data:", error);
  }
};



  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((totalAmount, itemId) => {
      const item = food_list.find((product) => product._id === itemId);
      if (item && cartItems[itemId] > 0) {
        return totalAmount + item.price * cartItems[itemId];
      }
      return totalAmount;
    }, 0);
  };

  useEffect(() => {
    console.log("StoreContextProvider mounted");
    // eslint-disable-next-line no-unused-vars
    async function loadData() {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
      }
      await fetchFoodList();
      await loadCartData(localStorage.getItem("token"))
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoreContextProvider;
