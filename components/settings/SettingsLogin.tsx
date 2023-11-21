import { useDispatch } from "react-redux";
import { modalOpen } from "@/store/modalSlice";

function SettingsLogin() {
  const dispatch = useDispatch();

  return (
    <div className="settings__login--wrapper">
      <img
        src="https://summarist.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogin.e313e580.png&w=3840&q=75"
        alt="Login"
        style={{ color: "transparent" }}
      />
      <div className="settings__login--text">
        Log in to your account to see your details.
      </div>
      <button
        className="btn settings__login--btn"
        onClick={() => {
          dispatch(modalOpen());
        }}
      >
        Login
      </button>
    </div>
  );
}
export default SettingsLogin;
