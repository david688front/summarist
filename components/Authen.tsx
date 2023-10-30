import useAuth from "@/hooks/useAuth";
import { modalClose, modalOpen } from "@/redux/modalSlice";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";

interface Inputs {
  email: string;
  password: string;
}

function Authentication() {
  const [loginModal, setLoginModal] = useState(true);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const { signIn, signUp, guestSignIn, loading, error } = useAuth();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (loginModal) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  const guestSignInHandler = async () => {
    await guestSignIn();
  };

  const handleAuthClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent the click event from propagating to auth__wrapper
    e.stopPropagation();
  };

  return (
    <div className="auth__wrapper" onClick={() => dispatch(modalClose())}>
      <div className="auth" onClick={handleAuthClick}>
        {forgotPasswordModal ? (
          <>
            <div className="auth__content">
              <div className="auth__title">Reset your password</div>

              <form
                action=""
                className="auth__main--form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  className="auth__main--input"
                  placeholder="Email Address"
                  {...register("email", { required: true })}
                />
                <button className="btn">
                  <span>Send reset password link</span>
                </button>
              </form>
            </div>

            <button
              className="auth__switch--btn"
              onClick={() => {
                setForgotPasswordModal(false);
                setLoginModal(true);
              }}
            >
              Go to login
            </button>
          </>
        ) : loginModal ? (
          <>
            <div className="auth__content">
              <div className="auth__title">Log in to Summarist</div>
              <div className="auth__error">{error}</div>
              <button
                className="btn guest__btn--wrapper"
                onClick={() => {
                  guestSignInHandler();
                }}
              >
                <div className="google__icon--mask guest__icon--mask">
                  <BsFillPersonFill className="guest__icon" />
                </div>
                Login as a Guest
              </button>
              <div className="auth__separator">
                <span className="auth__separator--text">or</span>
              </div>
              <button className="btn google__btn--wrapper">
                <div className="google__icon--mask">
                  <FcGoogle className="google__icon" />
                </div>
                Login with Google
              </button>

              <div className="auth__separator">
                <span className="auth__separator--text">or</span>
              </div>

              {/* Registration */}
              <form
                action=""
                className="auth__main--form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  className="auth__main--input"
                  placeholder="Email Address"
                  {...register("email", { required: true })}
                />

                <input
                  type="password"
                  className="auth__main--input"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="p-1 text-[13px] font-light  text-orange-500">
                    Your password must contain between 4 and 60 characters.
                  </p>
                )}

                <button className="btn">
                  {loading ? (
                    <span>
                      <AiOutlineLoading3Quarters className="loading__icon" />
                    </span>
                  ) : (
                    <span>Login</span>
                  )}
                </button>
              </form>
            </div>
            <div
              className="auth__forgot--password"
              onClick={() => setForgotPasswordModal(true)}
            >
              Forgot your password?
            </div>
            <button
              className="auth__switch--btn"
              onClick={() => {
                setLoginModal(false);
              }}
            >
              {" Don't have an account?"}
            </button>
          </>
        ) : (
          <>
            <div className="auth__content">
              <div className="auth__header">Sign up to Summarist</div>
              <div className="auth__error">{error}</div>
              <button className="btn google__btn--wrapper">
                <div className="guest__icon--wrapper">
                  <FcGoogle className="google__icon" />
                </div>
                Sign up with Google
              </button>

              <div className="auth__separator">
                <span className="auth__separator--text">or</span>
              </div>

              <form
                action=""
                className="auth__form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  className="auth__input"
                  placeholder="Email Address"
                  {...register("email", { required: true })}
                />

                <input
                  type="password"
                  className="auth__input"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="p-1 text-[13px] font-light  text-orange-500">
                    Your password must contain between 4 and 60 characters.
                  </p>
                )}

                <button
                  className="btn"
                  onClick={() => {
                    setLoginModal(false);
                  }}
                >
                  {loading ? (
                    <span>
                      <AiOutlineLoading3Quarters className="loading__icon" />
                    </span>
                  ) : (
                    <span>Sign Up</span>
                  )}
                </button>
              </form>
            </div>

            <button
              className="no__account--btn"
              onClick={() => setLoginModal(true)}
            >
              Already have an account?
            </button>
          </>
        )}

        <div
          className="auth__close--btn"
          onClick={() => {
            dispatch(modalClose());
          }}
        >
          <AiOutlineClose className="auth__close--icon" />
        </div>
      </div>
    </div>
  );
}
export default Authentication;
