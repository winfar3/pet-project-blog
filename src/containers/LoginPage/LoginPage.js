import "./LoginPage.scss";

export function LoginPage() {
    return (
        <form action="" className="login-page__form login-form">
            <div className="login-form__item">
                <input type="text" className="login-form__input" placeholder="Login" />
            </div>
            <div className="login-form__item">
                <input type="password" className="login-form__input" placeholder="Password"/>
            </div>
            <div className="login-form__button button">
                <button type="submit">Log in</button>
            </div>
        </form>
    );
}