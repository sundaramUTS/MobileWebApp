import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut } from '../../services/api';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOutUser = async () => {
        dispatch({ type: 'LOGOUT_USER' });
        LogOut()
        localStorage.clear()
        navigate("/login")
    }


    return (
        <button onClick={() => logOutUser()}>
            Logout
        </button>
    );
};

export default Logout;