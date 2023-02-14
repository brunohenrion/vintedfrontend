import "./CheckoutForm.css";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const CheckoutForm = ({ userToken }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const location = useLocation();
  const { title, price, id } = location.state;

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      const cardElement = elements.getElement(CardElement);

      console.log(cardElement);
      if (userToken) {
        const stripeResponse = await stripe.createToken(cardElement, {
          name: id,
        });
        console.log(stripeResponse);
        const stripeToken = stripeResponse.token.id;
        console.log(stripeToken);

        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/payment",
          {
            token: stripeToken,
            title: title,
            amount: price,
          }
        );
        console.log(response.data);

        if (response.data.status === "succeeded") {
          setIsLoading(false);
          setCompleted(true);
        }
      } else {
        alert("Vous devez vous connecter");
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const total = (price + 0.4 * price + 0.8 * price).toFixed(2);
  return (
    <main>
      <form style={{ width: "400px" }} onSubmit={handleSubmit}>
        <h1>Résumé de la commande</h1>
        <h2>commande {price.toFixed(2)} €</h2>
        <h2>frais protection acheteurs {(0.4).toFixed(2)} €</h2>
        <h2>Frais de port {(0.8).toFixed(2)} €</h2>
        <h3 style={{ color: "black" }}>Total {total} €</h3>
        <br />
        <br />
        <CardElement />
        <p>
          Il ne vous reste plus qu'une étape pour vous offir {title}. vous allez
          payer {total} € frais de protection et frais de port inclus
        </p>
        {completed ? (
          <p>Paiement effectué</p>
        ) : (
          <button disabled={isLoading} type="submit">
            Payer
          </button>
        )}
      </form>
    </main>
  );
};

export default CheckoutForm;
