import { Navigate, Route } from "react-router-dom";

export const PublicRoute = (props) => {
    return(
        !props.isLoggedIn ? props.children : <Navigate to="/" />
    );
}