import Authen from "@/components/Authen";
import SettingsComponent from "@/components/settings/SettingsComponent";
import SearchBar from "@/components/library/SearchBar";
import Sidebar from "@/components/library/Sidebar";
import { RootState } from "@/store/modalStore";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createCheckoutLink,hasSubscription,getStripeCusId} from "@/stripe/libstripe";
import useAuth from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import app from "@/firebase";
import SettingsSkel from "@/components/skeleton/SettingsSkel";

function Settings() {
  const modal = useSelector((state: RootState) => state.modal.value);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  async function fetchSubscription() {

    setLoading(true);

    try {
      
      const cus_id = await getStripeCusId(String(user?.email));
      // has subscription
      const hasSub = await hasSubscription(String(cus_id));

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
          <SettingsComponent />
        )}
      </div>
  );
}
export default Settings;
