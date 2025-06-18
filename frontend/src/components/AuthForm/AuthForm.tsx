import "./AuthForm.scss"
import { useState } from "react";
import HeaderLogo from "../HeaderLogo/HeaderLogo";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RigesterForm/RegisterForm";

const AuthForm = () => {
  const [authType, setAuthType] = useState<string>("auth");

  const switchType = () => {
    setAuthType((prev) => (prev === "auth" ? "register" : "auth"));
  };

  return (
    <div className="auth-form__dark">
      <div className="auth-form__modal">
        <HeaderLogo className='auth-form__logo'/>
        <div className="auth-form__wrapper">
          {authType === "auth" ? <LoginForm /> : <RegisterForm />}
        </div>
        <button
          onClick={switchType}
          className="btn-reset auth-form__btn-switch"
        >
          {authType === "auth" ? "Зарегестрироваться" : "У меня уже есть аккаунт"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
