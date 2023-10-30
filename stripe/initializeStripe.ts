import app from "@/firebase";
import { getStripePayments } from "@invertase/firestore-stripe-payments";
import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Stripe | null;

const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
    );
  }
  return stripePromise;
};
export default initializeStripe;

export { payments };
