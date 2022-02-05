import "./Header.scss";
import { HeaderNav } from "../HeaderNav/HeaderNav.js";

export function Header(props) {

    return(
        <header className="header">
          <div className="header__wrapper">
              <a className="header__logo uppercase" href="#">fashion</a>
              <h3>{props.userName && `Hello ${props.userName}`}</h3>
              <HeaderNav {...props} />
          </div>
      </header>
    );
}