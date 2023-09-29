import { Navigate, Route } from "react-router-dom"


export function PublicRoute({ component: Component, restricted, ...rest }) {
    let isAuthenticated = true;

    return(
        <Route
            {...rest}
            render={(props) =>
            isAuthenticated && restricted ? (
            <Navigate to="/" />
            ) : (
            <Component {...props} />
            )
            }
        />
    )
}

