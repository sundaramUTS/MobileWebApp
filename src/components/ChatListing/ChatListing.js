
import "./ChatListing.css";
import upchatIcon from "../../assets/images/svg/upchatIcon.svg"
import upchatSearchIcon from "../../assets/images/svg/upchatSearchIcon.svg"
import PinChannelList from "../PinChannel/PinChannelList";
import AllChannelList from "../AllChannel/AllChannelList";
import Footer from "../Footer/Footer";
import { useState } from "react";
import Setting from "../Setting/Setting";
const ChannelList = () => {
    const [activeTab, setActiveTab] = useState("active-hr");
    return (
        <>

            <div className="UpchatMsgWrapper">
                <div className="UpchatMsgWindowMain">
                    {activeTab === "active-hr" && <div className="UpchatMsgFirstScreen">
                        <div className="UpchatMsgTopSearchWrap">
                            <div className="UpChatMsgTopWrap">
                                <img src={upchatIcon} alt="upchatIcon" />
                                <h3>Upchat</h3>
                            </div>
                            <div className="UpchatSearchTop">
                                <div className="FormGroup iconSearch">
                                    <input className="FormContorl" type="search" placeholder="Search.." />
                                    <img className="iconImg" src={upchatSearchIcon} alt="upchatIcon" />
                                </div>
                            </div>
                        </div>

                        <div className="chatWrapperMain">
                            <PinChannelList />
                            <AllChannelList />

                        </div>

                    </div>
                    }
                    {activeTab === "setting" && <Setting setActiveTab={setActiveTab} activeTab={activeTab} />}
                    <Footer setActiveTab={setActiveTab} activeTab={activeTab} />

                </div>
            </div>


        </>
    )
}
export default ChannelList;