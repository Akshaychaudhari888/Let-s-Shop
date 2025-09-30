import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import axios from "axios";
import { StoreContext } from "../../../Context/StoreContext";
import "./verify.css";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.post(
          url + "api/order/verify-order",
          { success, orderId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("verifyOrder response==>", response);

        if (response.data.success) {
          navigate("/myorders");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Verification failed:", error);
        navigate("/");
      }
    };

    verifyPayment();
  }, [navigate, orderId, success, token, url]);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
