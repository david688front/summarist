import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import SettingsLogin from "./SettingsLogin";
import { useSubscription } from "@/hooks/useSubscription";
import app from "@/firebase";

interface Props {
  IsPremium: boolean;
  PremiumPlanName: string;
}

function SettingsComponent({
  IsPremium,
  PremiumPlanName
}: Props) {

  const { user } = useAuth();
  const subscription = useSubscription(app);

  return (
    <div className="container">
      <div className="row">
        <div className="section__title page__title">Settings</div>
        {user ? (
          <>
            <div className="setting__content">
              <div className="settings__sub--title">Your Subscription Plan</div>
              <div className="settings__text">
                { IsPremium ? (
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
