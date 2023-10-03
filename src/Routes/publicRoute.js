import { Navigate, Route } from "react-router-dom"


export const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    let isAuthenticated = true;

    return (
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
