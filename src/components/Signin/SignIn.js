import React, { useState, useEffect } from 'react'
import "./signin.css";
import logo from "../../assets/images/svg/logo.svg"
import loginEmailWrong from "../../assets/images/svg/loginEmailWrong.svg"
import loginBg from "../../assets/images/loginBg.png"
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../redux/action/signInAction';
import { useNavigate } from 'react-router-dom';
import { message, Space, Spin } from 'antd';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./FullPageLoader.css";

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const getUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    const [userDetails, setUserDetails] = useState({ username: getUserDetails?.username ? getUserDetails?.username : "", password: getUserDetails?.password ? getUserDetails?.password : "" });
    const [errors, setErrors] = useState({ username: "", password: "", other: "" });
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [rememberMe, setRememberMe] = useState(getUserDetails?.username ? true : false);
    const [messageApi, contextHolder] = message.useMessage()
    const [isLoading, setIsLoading] = useState(true);

    const state = useSelector((state) => state.signIn);
    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "", ['other']: "" });
    }
    const isValidate = () => {
        let isValid = true;
        let _errors = { ...errors };
        if (!userDetails.username) {
            _errors.username = "Please enter email";
            isValid = false
        }
        if (!userDetails.password) {
            _errors.password = "Please enter password";
            isValid = false
        }
        _errors.other = "";
        setErrors(_errors);
        return isValid;
    }

    useEffect(() => {
        setIsLoading(false);
        if (state?.data?.responseBody?.statusCode === 200) {

            messageApi.open({
                type: 'success',
                content: 'You are successfully logged in',
            });
            if (state?.data?.responseBody?.details?.EmployeeID) {
                setErrors({ ...errors, ['other']: "" });
                localStorage.setItem("EmployeeID", state.data.responseBody.details.EmployeeID)
                localStorage.setItem("Token", state.data.responseBody.details.Token);
                setTimeout(() => {
                    navigate("/chat-listing");
                }, 2000);
            } else {
                navigate("/");
            }

        } else if (state.data.statusCode === 400) {

            setErrors({ ...errors, ['other']: state?.data?.responseBody });
        }
    }, [state?.data])
    const handleCheckboxChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleLogin = () => {
        if (isValidate()) {
            if (rememberMe) {
                localStorage.setItem("userDetails", JSON.stringify(userDetails))
            } else {
                localStorage.removeItem("userDetails")

            }
            dispatch(signIn(userDetails));
            setIsLoading(true)
        }
    }
    return (
        <>
            {isLoading && <Space size="middle">
                <Spin size="large" />
            </Space>
            }

            <div className="loginWrapper">
                {contextHolder}

                <div className="loginImgWrap">
                    <img className="bgImg" src={loginBg} alt="loginBg" />
                </div>

                <div className="loginWrapperInner">
                    <a href="#" className="logoImg"><img className="iconImg" src={logo} alt="logo" /></a>
                    <div className="loginBox">
                        <h4>Log in to your UTS account</h4>

                        <form className="customFormFields">
                            <div className={`FormGroup ${errors.username ? "error" : ""}`}>
                                <label className="labelText">Email</label>
                                <div className="iconWrap">
                                    <input className="FormContorl" type="Email" name="username" autoComplete="off" value={userDetails.username} onChange={handleChange} />
                                    {userDetails.username.length > 0 && <img className="iconImg" src={loginEmailWrong} alt="email" onClick={() => setUserDetails({ ...userDetails, "username": "" })} />}
                                    <span className='error'>{errors.username}</span>
                                </div>
                            </div>
                            <div className={`FormGroup ${errors.password ? "error" : "success"}`}>
                                <label className="labelText">Password</label>
                                <div className="iconWrap">
                                    <input className="FormContorl" type={isPasswordShow ? "text" : "password"} autoComplete="off" name="password" value={userDetails.password} onChange={handleChange} />
                                    {!isPasswordShow ? <AiOutlineEye className="iconImg" size={20} onClick={() => setIsPasswordShow((prev) => !prev)} /> :
                                        <AiOutlineEyeInvisible className="iconImg" size={20} onClick={() => setIsPasswordShow((prev) => !prev)} />}
                                    <span className='error'>{errors.password}</span>
                                    <span className='error'>{errors?.other}</span>
                                </div>
                            </div>

                            <div className="forgotpassRememberWrap">
                                <a href="#">Forgot password?</a>
                                <label><input type="checkbox" name="Remember" onChange={handleCheckboxChange} checked={rememberMe} /> Remember me</label>
                            </div>

                            <button type="button" className="BtnPrimary" onClick={handleLogin}>LOGIN</button>

                        </form>
                    </div>

                </div>
            </div>

        </>
    )
}

export default SignIn