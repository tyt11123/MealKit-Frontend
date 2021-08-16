import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./StripeForm.css";
import stripeAPI from "../StripeAPI";
import { useSelector } from 'react-redux';

export default function StripeForm(props) {
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("");
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    // Step 1: Fetch product details such as amount and currency from
    // API to make sure it can't be tampered with in the client.
    // stripeAPI.getProductDetails().then((productDetails) => {
    //   setAmount(productDetails.amount / 100);
    //   setCurrency(productDetails.currency);
    // });
    if (props.amount) setAmount(props.amount);
    setCurrency(props.currency || "HKD");

    // Step 2: Create PaymentIntent over Stripe API
    stripeAPI
      .createPaymentIntent({ amount: props.amount, 
        currency: props.currency || "HKD",
        description: userInfo ? `${userInfo.name}, ${userInfo.email}, ${userInfo.phone}` :
        props.user ? `${props.user.name}, ${props.user.email}, ${props.user.phone}`: undefined,
       })
      .then((clientSecret) => {
        setClientSecret(clientSecret);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    // Step 3: Use clientSecret from PaymentIntent and the CardElement
    // to confirm payment with stripe.confirmCardPayment()
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: userInfo ? userInfo.name : props.user ? props.user.name : undefined,
          email: userInfo ? userInfo.email : props.user ? props.user.email : undefined,
          phone: userInfo ? userInfo.phone : props.user ? props.user.phone : undefined,
        },
      },
      receipt_email: userInfo ? userInfo.email : props.user ? props.user.email : undefined,
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
      // console.log("[error]", payload.error);
    } else {
      setError(null);
      setSucceeded(true);
      setProcessing(false);
      setMetadata(payload.paymentIntent);
      // console.log("[PaymentIntent]", payload.paymentIntent);
      props.onSuccess(payload.paymentIntent, payload.paymentIntent);
    }
  };

  const renderSuccess = () => {
    return (
      <div className="sr-field-success message">
        <h1>Your test payment succeeded</h1>
        <p>View PaymentIntent response:</p>
        <pre className="sr-callout">
          <code>{JSON.stringify(metadata, null, 2)}</code>
        </pre>
      </div>
    );
  };

  const renderForm = () => {
    const options = {
      style: {
        base: {
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      },
    };

    return (
      <form onSubmit={handleSubmit}>
        {/* <h1>
          {currency.toLocaleUpperCase()}{" "}
          {amount.toLocaleString(navigator.language, {
            minimumFractionDigits: 2,
          })}{" "}
        </h1>
        <h4>Pre-order the Pasha package</h4> */}

        <div className="sr-combo-inputs">
          {/* <div className="sr-combo-inputs-row">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              autoComplete="cardholder"
              className="sr-input"
            />
          </div> */}

          <div className="sr-combo-inputs-row">
            <CardElement
              className="sr-input sr-card-element"
              options={options}
            />
          </div>
        </div>

        {error && <div className="message sr-field-error">{error}</div>}

        <button
          className="btn-stripe"
          disabled={processing || !clientSecret || !stripe}
        >
          {processing ? "Processing…" : `Pay $${amount}`}
        </button>

        <div className="sr-text">
          <p>Powered by <a target="_blank" href="https://stripe.com">Stripe</a></p>
        </div>
      </form>
    );
  };

  return (
    <div className="checkout-form">
      <div className="sr-payment-form">
        <div className="sr-form-row" />
        {succeeded ? renderSuccess() : renderForm()}
      </div>
    </div>
  );
}
