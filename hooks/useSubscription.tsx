import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useSubscription = (app: FirebaseApp) => {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;

  const [isLoading, setIsLoading] = useState(true);

  const [subscriptionData, setSubscriptionData] = useState({
    isActive: false,
    subscriptionName: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) {
          setIsLoading(false);
          return;
        }

        const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
        const q = query(subscriptionsRef, where("status", "in", ["trialing", "active"]));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const subscriptionDataResponse = querySnapshot.docs[0].data();
          const subscriptionName = subscriptionDataResponse.items[0]?.price?.product?.name || "";
          setSubscriptionData({ isActive: true, subscriptionName });
        } else {
          setSubscriptionData({ isActive: false, subscriptionName: "" });
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching subscription data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, db]);

  return { ...subscriptionData, isLoading };
};
