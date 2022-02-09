import { Navigate, Route } from "react-router-dom";
import { Blog } from "../../containers/Blog/Blog";

export const PrivateRoute = (props) => {
    return(
        props.isLoggedIn ? props.children : <Navigate to="/login" />
    );
}