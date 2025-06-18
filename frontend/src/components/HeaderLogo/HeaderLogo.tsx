import { FC } from "react"

interface HeaderLogoProp {
    className?: string
}

const HeaderLogo:FC <HeaderLogoProp> = ({className}) => {
    return (
        <a href="/" className={`link-reset app-logo ${className}`}>
            FITNES <span className="app-logo--pos">ONliNE</span>
        </a>
    )
}

export default HeaderLogo