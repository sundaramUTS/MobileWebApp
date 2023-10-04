import React from 'react'
import backArrowIcon from "../../assets/images/svg/backArrowIcon.svg"
import settingUser from "../../assets/images/settingUser.png"
import logoutIcon from "../../assets/images/svg/logoutIcon.svg"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../../services/api';
const Setting = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOutUser = async () => {
        dispatch({ type: 'LOGOUT_USER' });
        Logout()
        localStorage.clear()
        navigate("/")
    }
    return (
        <div class="UpchatMsgWrapper">
            <div class="UpchatMsgWindowMain">

                <div class="profileScreenWindow settingscreenWindow">
                    <div class="channelWindowHeader">
                        <div class="channelHeaderLeft">
                            <div class="channelHeaderbackArrow">
                                <img class="profilBack" src={backArrowIcon} alt="arrow" width="8" height="16" />
                            </div>
                            <div class="channelName">
                                <div class="hrStatusText">Settings</div>
                            </div>
                        </div>
                    </div>

                    <div class="profileInfo">
                        <div class="seetingUserImg">
                            <img src={settingUser} alt="user" width="108" height="108" />
                        </div>
                        <a href="#" class="profileEdit">Edit</a>
                    </div>

                    <div class="chatWrapperMain">
                        <div class="SettingProfileInfo">
                            <div class="SettingProfileInfoName">
                                <input class="FormContorl" type="text" placeholder="name" value={localStorage.getItem("FullName")} />
                            </div>
                            <div class="SettingProfileLogout">
                                <button class="Btnlogout" onClick={() => logOutUser()}><img src={logoutIcon} alt="logout" width="18" height="18" />Logout</button>
                            </div>
                        </div>
                    </div>



                </div>

            </div>
        </div>
    )
}

export default Setting