import app from "@/firebase";
import useAuth from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import Link from "next/link";
import SettingsLogin from "./SettingsLogin";

function SettingsComponent() {
  const { user } = useAuth();
  const subscription = useSubscription(app);

  const isUserPremium = subscription.isActive;
  const premiumStatusName = subscription.subscriptionName;

  if (subscription.isLoading) return;

  return (
    <div className="container">
      <div className="row">
        <div className="section__title page__title">Settings</div>
        {user ? (
          <>
            <div className="setting__content">
              <div className="settings__sub--title">Your Subscription Plan</div>
              <div className="settings__text">
                {isUserPremium ? (
                  premiumStatusName
                ) : (
                  <>
                    Basic
                    <Link
                      href="/choose-plan"
                      className="btn settings__upgrade--btn"
                    >
                      Upgrade to Premium
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="setting__content">
              <div className="settings__sub--title">Email</div>
              {user?.email ? (
                <div className="settings__text">{user?.email}</div>
              ) : (
                <div className="settings__text">tony@gmail.com</div>
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
