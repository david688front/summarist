import Authen from "@/components/Authen";
import SettingsComponent from "@/components/settings/SettingsComponent";
import SearchBar from "@/components/library/SearchBar";
import Sidebar from "@/components/library/Sidebar";
import { RootState } from "@/store/modalStore";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { hasSubscription,getStripeCusId} from "@/stripe/libstripe";
import useAuth from "@/hooks/useAuth";
import SettingsSkel from "@/components/skeleton/SettingsSkel";
import { useSubscription } from "@/hooks/useSubscription";
import app from "@/firebase";

function Settings() {

  const modal = useSelector((state: RootState) => state.modal.value);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const [IsPremium, setIsPremium] = useState(false);
  const [PremiumPlanName, setPremiumPlanName] = useState("");


  async function fetchSubscription() {

    setLoading(true);

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
      
      //const subscription = useSubscription(app);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchSubscription();
  }, []);

  

  return (
    <div className="wrapper">
        {modal && <Authen />}
        <SearchBar />
        <Sidebar />
        {loading ? (
          <SettingsSkel/>
        ) : (
          <SettingsComponent {...{ IsPremium, PremiumPlanName }} />
        )}

      </div>
  );
}
export default Settings;
