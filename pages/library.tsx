import app from "@/firebase";
import Authen from "@/components/Authen";
import Sidebar from "@/components/library/Sidebar";
import MyLibrary from "@/components/library/MyLibrary";
import SearchBar from "@/components/library/SearchBar";
import useList from "@/hooks/useList";
import useAuth from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import ChoosePlan from "./choose-plan";
import { useSubscription } from "@/hooks/useSubscription";
import { RootState } from "@/store/modalStore";

function Library() {
  const modal = useSelector((state: RootState) => state.modal.value);
  const { user } = useAuth();
  const list = useList(user?.uid);
  const subscription = useSubscription(app);
  if (!subscription) return <ChoosePlan />;
  return (
      <div className="wrapper">
        {modal && <Authen />}
        <SearchBar />
        <Sidebar />
        <MyLibrary {...{list}}/>
      </div>
  );
}
export default Library;
