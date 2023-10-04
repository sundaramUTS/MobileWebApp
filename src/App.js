import { Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SignIn from './components/SignIn/SignIn';
import ChatListing from './components/ChannelList/ChannelList';
import "./assets/css/common.css";
import "./assets/css/style.css";
const isAuthenticated = () => {
  let _token = localStorage.getItem("Token");
  return _token ? true : false;
};

const PublicRoute = ({ Component }) => {
  return isAuthenticated() ? (
    <Navigate to="/channel-listing" />
  ) : (
    <Component />
  );
};

const PrivateRoute = ({ Component }) => {
  return isAuthenticated() ? <Component /> : <Navigate to="/" />;
};

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<PublicRoute Component={SignIn} />} />
      <Route path='/channel-listing' element={<PrivateRoute Component={ChatListing} />} />
      <Route path='*' element={<PrivateRoute Component={SignIn} />} />
    </Routes>
  );
}

export default App;
