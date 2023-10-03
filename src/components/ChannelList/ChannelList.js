
import "./ChannelList.css";
import upchatIcon from "../../assets/images/svg/upchatIcon.svg"
import upchatSearchIcon from "../../assets/images/svg/upchatSearchIcon.svg"
import PinChannelList from "../PinChannel/PinChannelList";
import AllChannelList from "../AllChannel/AllChannelList";
import Footer from "../Footer/Footer";
import { useRef, useState } from "react";
import Setting from "../Setting/Setting";
const ChannelList = () => {
    const [activeTab, setActiveTab] = useState("active-hr");
    const arrawScroll = useRef(null);
    const [scrolling, setScrolling] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pinChannel, setpinChannel] = useState(false);
    const [unpinChannel, setunpinChannel] = useState(false);
    const [search, setSearch] = useState("");
    const [pinData, setpinData] = useState([]);
    const [unpinData, setUnpinData] = useState([]);

    const handleScroll = () => {

        const element = arrawScroll.current;
        if (element) {
            if (
                Math.round(element.scrollTop + element.clientHeight) ===
                element.scrollHeight
            ) {
                if (currentPage < totalPages) {
                    setCurrentPage((prevPage) => prevPage + 1);
                }
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        }
    };
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
                                    <input className="FormContorl" type="search" placeholder="Search.." onChange={(e) => setSearch(e.target.value)} />
                                    <img className="iconImg" src={upchatSearchIcon} alt="upchatIcon" />
                                </div>
                            </div>
                        </div>

                        <div className="chatWrapperMain" ref={arrawScroll}
                            onScroll={handleScroll}>
                            <PinChannelList setpinChannel={setpinChannel} pinChannel={pinChannel} setpinData={setpinData} pinData={pinData} />
                            <AllChannelList currentPage={currentPage} setTotalPages={setTotalPages} setunpinChannel={setunpinChannel} unpinChannel={unpinChannel} setUnpinData={setUnpinData} unpinData={unpinData} />

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