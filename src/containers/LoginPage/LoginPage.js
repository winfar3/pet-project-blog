import "./LoginPage.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage(props) {

    let navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginChange = (e) => {
        setLogin(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (login === "admin" && password === "123qwe") {
            props.setIsAdmin(true);
            localStorage.setItem("isAdmin", true);
        }
        
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userName", login);
        props.setUserName(login);
        props.setIsLoggedIn(true);
        navigate("/")
    }

    return (
        <form
            action=""
            className="login-page__form login-form"
            onSubmit={handleLogin}
            required
        >
            <div className="login-form__item">
                <input
                    type="text"
                    onChange={handleLoginChange}
                    className="login-form__input"
                    placeholder="Login"
                    required
                />
            </div>
            <div className="login-form__item">
                <input
                    type="password"
                    onChange={handlePasswordChange}
                    className="login-form__input"
                    placeholder="Password"
                    required
                />
            </div>
            <div className="login-form__button button">
                <button type="submit">Log in</button>
            </div>
        </form>
    );
}