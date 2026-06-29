import { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const canceled = searchParams.get("canceled");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    if (canceled === "true") {
      toast.error("Payment was canceled");
      navigate("/cart");
      return;
    }

    const response = await axios.post(url + "/api/order/verify", {
      orderId,
      sessionId,
    });
    if (response.data.success) {
      navigate("/myorders");
      toast.success("Order placed successfully");
    } else {
      toast.error(response.data.message || "Payment verification failed");
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
