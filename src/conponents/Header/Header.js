import "./Header.scss";
import { HeaderNav } from "../HeaderNav/HeaderNav.js";
import { Link } from "react-router-dom";

export function Header(props) {

    return(
        <header className="header">
          <div className="header__wrapper">
              <Link to="/" className="header__logo uppercase">fashion</Link>
              <h3>{props.userName && `Hello ${props.userName}`}</h3>
              <HeaderNav {...props} />
          </div>
      </header>
    );
}