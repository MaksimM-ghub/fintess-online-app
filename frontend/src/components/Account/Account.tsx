import "./Account.scss"
import { Link } from "react-router-dom";
import { api } from "../../services/api/api";
import LoaderBtn from "../LoaderBtn/LoaderBtn";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch} from "react-redux";
import { setIsAuthOpen } from "../../store/isVisibleSlice/isVisibleSlice";
import AuthForm from "../AuthForm/AuthForm";

const Account = () => {

  const { isAuthOpen } = useSelector((state: any) => (state.isVisible))
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(setIsAuthOpen(true))
  }


  const { status } = useQuery({
    queryFn: () => api.fetchMe(),
    queryKey: ["fetchMe"],
    retry: 0
  });

  switch (status) {
    case "error":
      return (
        <div className="header__account">
          <button onClick={handleClick} className="btn-reset header__btn btn-primary">Войти</button>
          {isAuthOpen && <AuthForm/>}
        </div>
      );
    case "success":
      return (
        <div className="header__account">
          <Link to="/">Имя</Link>
        </div>
      );
    case "pending":
      return (
        <div className="header__account">
          <LoaderBtn />
        </div>
      );
  }
};

export default Account;
