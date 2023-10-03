import { Route } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';

import ChannelList from '../components/ChatListing/ChatListing';
import { PrivateRoute } from './privateRoute';

const Routlist = () => {

    return (
        <>
            {/* Public routes */}
            <Route restricted={false} component={SignIn} path="/" exact />

            {/* Private route */}
            <PrivateRoute component={ChannelList} path="/" />

            {/* 404 route */}
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </>
    )
}

export default Routlist;