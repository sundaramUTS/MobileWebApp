import { Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SignIn from './components/Signin/SignIn';
import ChatListing from './components/ChatListing/ChatListing';
import "./assets/css/common.css";
import "./assets/css/style.css";



const isAuthenticated = () => {
  let _token = localStorage.getItem("Token");
  return _token ? true : false;
};

const PublicRoute = ({ Component }) => {
  return isAuthenticated() ? (
    <Navigate to="/chat-listing" />
  ) : (
    <Component />
  );
};

const PrivateRoute = ({ Component }) => {
  return isAuthenticated() ? <Component /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute Component={SignIn} />} />
      <Route path="/login" element={<PublicRoute Component={SignIn} />} />
      <Route path='/chat-listing' element={<PrivateRoute Component={ChatListing} />} />
    </Routes>
  );
}

export default App;
