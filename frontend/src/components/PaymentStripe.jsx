import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./components/PaymentForm";

const stripe = loadStripe(
  "pk_test_51P9KCWEaWLzdw0TrQF6uKqES8tSnNNoMxHzQrae6XHshyI0cmFPN86oW7lbavKRobgfMDVOuXn7lvZWUSzyeRplS00tTnzF4ao"
);
export default function Payment() {
  return (
    <Elements stripe={stripe}>
      <PaymentForm />
    </Elements>
  );
}
