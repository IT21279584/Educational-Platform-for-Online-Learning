import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  //   const generateStripeToken = async () => {
  //     if (!stripe || !elements) {
  //       console.log("stripe / element is not set");
  //       return;
  //     }
  //     const CardNumberElement = elements.getElement(CardNumberElement);

  //     const { token, error } = await stripe.createToken(CardNumberElement, {
  //       name: name,
  //     });

  //     if (!token || error) {
  //       console.log(error || "Token is not set");
  //       throw error;
  //     }

  //     return token;
  //   };

  const generateStripeToken = async () => {
    if (!stripe || !elements) {
      console.log("stripe / element is not set");
      return;
    }

    const { token, error } = await stripe.createToken(
      elements.getElement(CardNumberElement),
      {
        name: name,
      }
    );

    if (error) {
      console.log("Error generating token:", error);
      throw error;
    }

    if (!token) {
      console.log("Token is not set");
      throw new Error("Token is not set");
    }

    return token;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const token = await generateStripeToken();
      const response = await axios.post("http://localhost:8081/charge", {
        tokenId: token.id, // Pass the generated token ID here
        amount: amount * 100, // Convert amount to cents
      });
      alert("Payment successful");
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment failed. Please try again.");
    }
  };
  return (
    <div>
      {/*Card background */}
      <div className="relative px-4 max-w-lg mx-auto">
        <div className="bg-white px-8 py-6 round-lg shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="pay-amount"
                className="block text-sm font-medium md-1"
              >
                Amount
              </label>
              <input
                type="text"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                id="pay-amount"
                className="text-sm text-gray-700 bg-white border rounded px-3 py-2 border-gray-300 w-full "
                required
              />
            </div>

            {/*card number */}
            <div>
              <label
                htmlFor="card-nr"
                className="block text-sm font-medium md-1"
              >
                Card Number
              </label>
              <CardNumberElement
                id="card-nr"
                className="text-sm text-gray-700 bg-white border rounded px-3 py-2 border-gray-300"
              />
            </div>
            <div>
              <label
                htmlFor="card-exp"
                className="block text-sm font-medium md-1"
              >
                Card Exp
              </label>
              <CardExpiryElement
                id="card-exp"
                className="text-sm text-gray-700 bg-white border rounded px-3 py-2 border-gray-300"
              />
            </div>

            <div>
              <label
                htmlFor="card-cvc"
                className="block text-sm font-medium md-1"
              >
                Card CVC
              </label>
              <CardCvcElement
                id="card-cvc"
                className="text-sm text-gray-700 bg-white border rounded px-3 py-2 border-gray-300"
                required
              />
            </div>

            <div>
              <label
                htmlFor="customer-name"
                className="block text-sm font-medium md-1"
              >
                Name
              </label>
              <input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="customer-name"
                className="text-sm text-gray-700 bg-white border rounded px-3 py-2 border-gray-300 w-full "
                required
              />
            </div>

            <button className="flex items-center justify-center bg-indigo-600 px-3 py-2 text-white rounded text-center">
              Pay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
