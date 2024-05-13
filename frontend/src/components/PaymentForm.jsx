import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "../Pages/Footer";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
 
export default function PaymentForm() {
  const navigate = useNavigate()
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [course, setCourse] = useState("");
 
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
      const response = await axios.post("http://localhost:8087/charge", {
        tokenId: token.id, // Pass the generated token ID here
        amount: amount * 100, // Convert amount to cents
        course : course,
      });
      Swal.fire({
        icon: "success",
        title: "Payment Successfully",
        text: "Payment Successfully.",
      });
      navigate("/api/user")
    } catch (error) {
      console.error("Error processing payment:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Payment failed. Please try again.",
      });
    }
  };
  return (
    <div>
      <Navbar />
      {/*Card background */}
      <div className="relative max-w-lg px-4 mx-auto">
        <h2 className="m-5 text-3xl font-bold">Payment Form</h2>
        <div className="px-8 py-6 bg-white shadow-xl round-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="pay-amount"
                className="block mb-2 text-sm font-medium text-left md-1"
              >
                Amount
              </label>
              <input
                type="text"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                id="pay-amount"
                className="w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded "
                required
              />
            </div>

            {/*card number */}
            <div>
              <label
                htmlFor="card-nr"
                className="block mb-2 text-sm font-medium text-left md-1"
              >
                Card Number
              </label>
              <CardNumberElement
                id="card-nr"
                className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded"
              />
            </div>
            <div>
              <label
                htmlFor="card-exp"
                className="block mb-2 text-sm font-medium text-left md-1"
              >
                Card Exp
              </label>
              <CardExpiryElement
                id="card-exp"
                className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded"
              />
            </div>

            <div>
              <label
                htmlFor="card-cvc"
                className="block mb-2 text-sm font-medium text-left md-1"
              >
                Card CVC
              </label>
              <CardCvcElement
                id="card-cvc"
                className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label
                htmlFor="customer-name"
                className="block mb-2 text-sm font-medium text-left md-1"
              >
                Name
              </label>
              <input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="customer-name"
                className="w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded "
                required
              />
            </div>

            <div>
              <label
                htmlFor="course-name"
                className="block mb-2 text-sm font-medium text-left md-1"
              >
                Course Name
              </label>
              <input
                placeholder="Enter Course Name"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                id="course-name"
                className="w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded "
                required
              />
            </div>

            <button className="flex items-center justify-center px-3 py-2 text-center text-white rounded bg-slate-800">
              Pay
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
 