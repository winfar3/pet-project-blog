import "./HeaderNav.scss";

import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

export function HeaderNav(props) {
    const [menuActive, setMenuActive] = useState(false);

    return (
        <>
            <div 
                className={menuActive ? "header-nav__burger header-nav__burger_active" : "header-nav__burger"}
                onClick={() => setMenuActive(!menuActive)}
            >
                <span></span>
            </div>
            <Menu 
                active={menuActive} 
                setActive={setMenuActive} 
                isLoggedIn={props.isLoggedIn} 
                setIsLoggedIn={props.setIsLoggedIn} 
                userName={props.userName}
                setIsAdmin={props.setIsAdmin}
            />
        </>
    );
}

function Menu({active, setActive, isLoggedIn, setIsLoggedIn, userName, setIsAdmin}) {
    const navData = [
        {
            title: "Home",
            url: "/",
        }, 
        {
            title: "About",
            url: "asd",
        },
        {
            title: isLoggedIn ? "Log out" : "Log in",
            url: "/login",
        },
    ]
    
    if (active ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto");

    /** TODO: remove page reload on exit */
    const handleLogOut = () => {
        localStorage.setItem("isLoggedIn", false);
        localStorage.setItem("isAdmin", false);
        localStorage.setItem("userName", "");
        setIsLoggedIn(false);
        setIsAdmin(false);
        userName("");
    }
    
    return(
        <nav className="header__nav header-nav">
            <ul className={active ? "header-nav__list header-nav__list_active" : "header-nav__list"} >
                {navData.map(item => 
                    <li 
                        key={item.title}
                        className="header-nav__item"
                    >
                        <NavLink 
                            to={item.url}
                            className="header-nav__link" 
                            onClick={() => item.title === "Log out" && handleLogOut()}
                        >
                            {item.title}
                        </NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
}