import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Components/Navbar/navbar";
import Home from "./Components/Pages/Home/Home.jsx";
import Cart from "./Components/Pages/Cart/Cart.jsx";
import PlaceOrder from "./Components/Pages/placeOrder/PlaceOrder.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import LgoinPopup from "./Components/LoginPopup/LgoinPopup.jsx";
import Verify from '../src/Components/Pages/Verify/verify.jsx'
import MyOrders from "./Components/Pages/MyOrders/MyOrders.jsx";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LgoinPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/verify" element={<Verify/>}></Route>
            <Route path="myorders" element={<MyOrders/>}></Route>
          </Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
