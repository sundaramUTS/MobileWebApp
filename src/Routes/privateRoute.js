import { Navigate, Route } from "react-router-dom"

export const PrivateRoute = ({ component: Component, ...rest }) => {
    let isAuthenticated = true;

    return <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
}