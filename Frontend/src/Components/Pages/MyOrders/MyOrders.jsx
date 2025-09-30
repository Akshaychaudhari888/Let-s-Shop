import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../../Context/StoreContext";
import "./MyOrders.css";
import axios from "axios";
import { assets } from "../../../assets/assets";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loading state
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url + "api/order/get-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false); // ✅ stop loader
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      {loading ? ( // ✅ show loader until data is ready
        <div className="loading">Loading your orders...</div>
      ) : data.length === 0 ? (
        <div className="no-orders">No orders found</div>
      ) : (
        <div className="container">
          {data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <p>
                {order.items.map((item, idx) =>
                  idx === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
              <p>₹{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button>Track Order</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
