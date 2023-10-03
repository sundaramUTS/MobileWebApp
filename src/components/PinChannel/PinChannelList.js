import React, { useState, useEffect } from 'react'
import upchatPinnedIcon from "../../assets/images/svg/upchatPinnedIcon.svg"
import { getPinChannel } from "../FirebaseFunction/FirebaseFunction"


const PinChannelList = () => {
    const [showBody, setShowBody] = useState(true);
    const [collapseClass, setCollapseClass] = useState(false);
    const [pinData, setpinData] = useState([]);


    const toggleAccordion = () => {
        setShowBody(!showBody);
        setCollapseClass(!collapseClass);
    };
    let isCollapsible = true
    console.log("pinDatapinDatapinData", pinData)
    useEffect(() => {
        getPinChannel(setpinData)
    }, []);
    return (
        <div className="chatWrapper allPinned">
            <div className="MsgChannelsMiddleTopStatus">
                <div className="MsgChannelsStatusLeft">
                    <img src={upchatPinnedIcon} alt="Pinned" />
                    <h4>Pinned Channels</h4>
                </div>
                <div className="MsgChannelsStatusRight" onClick={isCollapsible ? toggleAccordion : null}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" fill="none" className="" ><path fill="#232323" d="m6.67 8 6.666-6.784L12.142 0 6.669 5.597 1.197.028.003 1.244 6.669 8Z"></path></svg>
                </div>
            </div>

            {showBody && (
                <>
                    {pinData.length > 0 && pinData.map((items) => {
                        return (<div className="chatItem unreadMsg">
                            <div className="dFlex">
                                <div className="chatInitialThumb blueThumb">
                                    {items.companyInitial}
                                </div>
                                <div className="chatGroupDetails">
                                    <div className="channelName">
                                        {items?.companyName} |{" "}
                                        {items.role.length > 27
                                            ? `${items.role.substring(0, 27)}...`
                                            : items.role}
                                    </div>
                                    <span className="hrStatus">    {items?.hrNumber} | {items?.hrStatus}</span>
                                </div>
                            </div>
                            <div className="dFlexTime">
                                <div className="timeStamp">{new Date(items?.lastMessageTime * 1000)
                                    .toLocaleTimeString()
                                    .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}</div>
                                {/* <div className="unreadNum">5</div> */}
                                <a href="#" className="dotMenuMain">
                                    <span className="dotMenu"></span>
                                </a>
                            </div>
                        </div>)
                    })}

                </>
            )}
        </div>
    )
}

export default PinChannelList