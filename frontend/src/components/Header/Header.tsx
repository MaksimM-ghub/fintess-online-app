import './Header.scss'
import Account from "../Account/Account";
import HeaderLogo from "../HeaderLogo/HeaderLogo";

const Header = () => {
    return (
        <header className="header">
            <div className="container header__container">
                <HeaderLogo/>
                <Account/>
            </div>
        </header>
    )
}

export default Header