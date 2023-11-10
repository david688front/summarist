import app, { db } from "@/firebase";
import { getStripePayments } from "@invertase/firestore-stripe-payments";
import {
  DocumentData,
  addDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import getStripe from "./initializeStripe";

const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});

export const createCheckoutSession = async (
  customerId: string,
  priceId: string
) => {
  const checkoutSessionRef = await addDoc(
    collection(db, "customers", customerId, "checkout_sessions"),
    {
      price: priceId,
      success_url: `${window.location.origin}/for-you`,
      cancel_url: window.location.href,
    }
  );
  onSnapshot(checkoutSessionRef, async (snapshot) => {
    const data = snapshot.data() as DocumentData;
    const sessionId = data?.sessionId;
    if (sessionId) {
      const stripe = await getStripe();
      if (stripe) {
        stripe.redirectToCheckout({ sessionId });
      } else {
        console.error("Stripe not init");
      }
    } else {
      console.error("sessionId error");
    }
  });
};

export default payments;
