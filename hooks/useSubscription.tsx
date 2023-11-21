import { useEffect, useState } from "react";
import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStripeCusId, hasSubscription } from "@/stripe/libstripe";

export const useSubscription = (app: FirebaseApp) => {
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
  const userEmail = auth.currentUser?.email;
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
        const cus_id = await getStripeCusId(String(userEmail));
        const hasSub = await hasSubscription(String(cus_id));
        if(hasSub === "yearly"){
          setSubscriptionData({ isActive: true, subscriptionName: "premium-plus" });
        }else if(hasSub === "monthly"){
          setSubscriptionData({ isActive: true, subscriptionName: "premium" });
        }else{
          setSubscriptionData({ isActive: false, subscriptionName: "" });
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching subscription data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
}, [userId,userEmail]);
  return { ...subscriptionData, isLoading };
};
