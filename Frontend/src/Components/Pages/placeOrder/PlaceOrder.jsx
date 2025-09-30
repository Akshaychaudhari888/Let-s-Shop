import { useContext, useState,useEffect } from "react";
import axios from "axios";
import "./PlaceOrder.css";
import { StoreContext } from "../../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id]) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    const response = await axios.post(
      url + "api/order/place-order",
      orderData,
      { headers: { Authorization: `Bearer ${token}`}}
    );

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    }else{
      alert("Error");
    }
  };

  const navigate= useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }else if(getTotalCartAmount()===0){
      navigate("/cart")
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Billing Information</p>
        <div className="multi-fields">
          <input
            required
            type="text"
            name="firstName"
            value={data.firstName}
            placeholder="First Name"
            onChange={onChangeHandler}
          />
          <input
            required
            type="text"
            name="lastName"
            value={data.lastName}
            placeholder="Last Name"
            onChange={onChangeHandler}
          />
        </div>
        <input
          required
          type="text"
          name="email"
          value={data.email}
          placeholder="Email address"
          onChange={onChangeHandler}
        />
        <input
          required
          type="text"
          name="street"
          value={data.street}
          placeholder="Street"
          onChange={onChangeHandler}
        />
        <div className="multi-fields">
          <input
            required
            type="text"
            name="city"
            value={data.city}
            placeholder="City"
            onChange={onChangeHandler}
          />
          <input
            required
            type="text"
            name="state"
            value={data.state}
            placeholder="State"
            onChange={onChangeHandler}
          />
        </div>
        <div className="multi-fields">
          <input
            required
            type="text"
            name="zipcode"
            value={data.zipcode}
            placeholder="Zip code"
            onChange={onChangeHandler}
          />
          <input
            required
            type="text"
            name="country"
            value={data.country}
            placeholder="Country"
            onChange={onChangeHandler}
          />
        </div>
        <input
          required
          type="text"
          name="phone"
          value={data.phone}
          placeholder="Phone"
          onChange={onChangeHandler}
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>SubTotal</p>
            <p>${(getTotalCartAmount() || 0).toFixed(2)}</p>
          </div>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${2}</p>
          </div>
          <div className="cart-total-details">
            <b>Total</b>
            <b>${(getTotalCartAmount() + 2).toFixed(2)}</b>
          </div>
        </div>
        <button type="submit">PROCEED TO PAYMENT</button>
      </div>
    </form>
  );
};

export default PlaceOrder;
