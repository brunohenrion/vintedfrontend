import "./stylesheet.css";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header/Header.js";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  return (
    <div className="App">
      <Router>
        <Header handleToken={handleToken} userToken={userToken} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={<Signup handleToken={handleToken} />}
          />
          <Route path="/login" element={<Login handleToken={handleToken} />} />
          <Route path="/publish" element={<Publish userToken={userToken} />} />
          <Route
            path="/payment"
            element={
              <Elements stripe={stripePromise}>
                <CheckoutForm userToken={userToken} />
              </Elements>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
