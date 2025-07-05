import "./AuthForm.scss";
import { useState } from "react";
import HeaderLogo from "../HeaderLogo/HeaderLogo";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RigesterForm/RegisterForm";
import { useDispatch } from "react-redux";
import { setIsAuthOpen } from "../../store/isVisibleSlice/isVisibleSlice";

const AuthForm = () => {
  const [authType, setAuthType] = useState<string>("auth");

  const switchType = () => {
    setAuthType((prev) => (prev === "auth" ? "register" : "auth"));
  };

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(setIsAuthOpen(false))
  }

  return (
    <div className="auth-form__dark">
      <div className="auth-form__modal">
        <HeaderLogo className="auth-form__logo" />
        {authType === "auth" ? <LoginForm /> : <RegisterForm />}
        <button
          onClick={switchType}
          className="btn-reset auth-form__btn-switch"
        >
          {authType === "auth"
            ? "Зарегестрироваться"
            : "У меня уже есть аккаунт"}
        </button>
        <button onClick={handleClose} className="btn-reset auth-form__btn-close">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m18 18l-6-6m0 0L6 6m6 6l6-6m-6 6l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
