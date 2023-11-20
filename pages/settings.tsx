import Authen from "@/components/Authen";
import SettingsComponent from "@/components/book/SettingsComponent";
import SearchBar from "@/components/library/SearchBar";
import Sidebar from "@/components/library/Sidebar";
import { RootState } from "@/redux/modalStore";
import { useSelector } from "react-redux";

function Settings() {
  const modal = useSelector((state: RootState) => state.modal.value);
  return (
    <div className="wrapper">
        {modal && <Authen />}
        <SearchBar />
        <Sidebar />
        <SettingsComponent />
      </div>
  );
}
export default Settings;
