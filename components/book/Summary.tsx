import useAuth from "@/hooks/useAuth";
import { RootState } from "@/store/modalStore";
import { BookObject } from "@/BookObject";
import { useSelector } from "react-redux";
import SettingsLogin from "../settings/SettingsLogin";
import Authentication from "../Authen";

interface Props {
  bookSummary: BookObject | null;
}

function Summary({ bookSummary }: Props) {
  const { user } = useAuth();

  const modal = useSelector((state: RootState) => state.modal.value);
  const fontSize = useSelector((state: RootState) => state.fontSize.value);

  if (modal) {
    return <Authentication />;
  }

  return (
    <div className="summary">    
      <div className="audio__book--summary" style={{ fontSize: '16px'}}>
        <div className="audio__book--summary-title">
          <b>{bookSummary?.title}</b>
        </div>

        {user ? (
          <div
            className="audio__book--summary-text"
            style={{ fontSize: `${fontSize}` }}
          >
            {bookSummary?.summary}
          </div>
        ) : (
          <SettingsLogin />
        )}
      </div>
    </div>
  );
}
export default Summary;
