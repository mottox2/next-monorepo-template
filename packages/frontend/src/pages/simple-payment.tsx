import React from "react";
import { getStripe } from "../libs/stripe";

const SimplePayment = () => {
  const handleClick = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        cancelPath: '/simple-payment'
      }),
    });
    const checkoutSession = await res.json();
    console.log(checkoutSession);

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
    console.warn(error.message);
  };
  return (
    <div>
      <p>Payment Page</p>
      <button onClick={handleClick}>Checkout</button>
    </div>
  );
};

export default SimplePayment;
