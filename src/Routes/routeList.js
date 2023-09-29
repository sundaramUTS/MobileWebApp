import { Route } from 'react-router-dom';
import SigninPage from "../components/Signin/SignIn";
import HomePage from "../components/Home/home";

import { PrivateRoute } from './privateRoute';

function Routlist() {

    return (
        <>
            {/* Public routes */}
            <Route restricted={false} component={SigninPage} path="/login" exact />

            {/* Private route */}
            <PrivateRoute component={HomePage} path="/home" />

            {/* 404 route */}
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </>
    )
}

export default Routlist;