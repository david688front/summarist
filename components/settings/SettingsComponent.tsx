import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import SettingsLogin from "./SettingsLogin";
import { useEffect, useState } from "react";
import { getStripeCusId, hasSubscription } from "@/stripe/libstripe";

function SettingsComponent() {
  const { user } = useAuth();

  const [IsPremium, setIsPremium] = useState(false);
  const [PremiumPlanName, setPremiumPlanName] = useState("");

  async function fetchSubscription() {
   // setLoading(true);
    try {
      const cus_id = await getStripeCusId(String(user?.email));
      // has subscription
      const hasSub = await hasSubscription(String(cus_id));

      if(hasSub === "no"){
        setIsPremium(false);
        setPremiumPlanName("basic")
      }else if(hasSub === "yearly"){
        setIsPremium(true);
        setPremiumPlanName("premium-plus")
      }else if(hasSub === "monthly"){
        setIsPremium(true);
        setPremiumPlanName("premium")
      }

    } catch (error) {
      console.log(error);
    } finally {
      //setLoading(false);
    }
  }
  useEffect(() => {
    fetchSubscription();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="section__title page__title">Settings</div>
        {user ? (
          <>
            <div className="setting__content">
              <div className="settings__sub--title">Your Subscription Plan</div>
              <div className="settings__text">
                {IsPremium === true ? (
                  PremiumPlanName
                ) : (
                  <>
                    Basic
                    <Link
                      href="/choose-plan"
                      className="btn settings__upgrade--btn" style={{marginTop:"10px"}}
                    >
                      Upgrade to Premium
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="setting__content">
              <div className="settings__sub--title">Email</div>
              {user?.email && user?.email !== "guest@gmail.com" ? (
                <div className="settings__text">{user?.email}</div>
              ) : user?.email && user?.email === "guest@gmail.com" ? (
                <div className="settings__text">{user?.email} (guest login)</div>
              ) : (
                <div className="settings__text"></div>
              )}
            </div>
          </>
        ) : (
          <SettingsLogin />
        )}
      </div>
    </div>
  );
}
export default SettingsComponent;
