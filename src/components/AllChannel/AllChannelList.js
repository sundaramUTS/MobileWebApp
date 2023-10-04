import React, { useState, useRef, useEffect, useCallback } from 'react'
import upchatAllChannels from "../../assets/images/svg/upchatAllChannels.svg"
import { getUnPinChannelData, pinChannel } from "../FirebaseFunction/FirebaseFunction"
import { Dropdown, Space } from "antd";
import { ChannelMenu } from "../../constants/application";
import { ReactComponent as PinSVG } from "../../assets/images/svg/pin.svg";
import { ReactComponent as ViewHRDetailsSVG } from "../../assets/images/svg/viewHrDetails.svg";
import { ReactComponent as LeaveSVG } from "../../assets/images/svg/leave.svg";
import { NetworkInfo } from "../../constants/network"
const AllChannelList = ({ currentPage, setTotalPages, setUnpinData, unpinData, setUnTempData }) => {
    const loginUserId = localStorage.getItem("EmployeeID");
    const [showBody, setShowBody] = useState(true);
    const [collapseClass, setCollapseClass] = useState(false);

    const menuItems = [
        {
            label: ChannelMenu.PIN_CHANNEL,
            key: ChannelMenu.PIN_CHANNEL,
            icon: <PinSVG />,
        },
        {
            label: ChannelMenu.VIEW_HR_DETAILS,
            key: ChannelMenu.VIEW_HR_DETAILS,
            icon: <ViewHRDetailsSVG />,
        },

        {
            label: ChannelMenu.LEAVE,
            key: ChannelMenu.LEAVE,
            icon: <LeaveSVG />,
        },
    ];

    const toggleAccordion = () => {
        setShowBody(!showBody);
        setCollapseClass(!collapseClass);
    };
    let isCollapsible = true
    const channelDropdown = useCallback(async (value, item) => {
        if (value?.key === "PIN Channel") {
            pinChannel(item, loginUserId)
        }
        else if (value?.key === "View HR Detail Page") {
            window.open(
                `${NetworkInfo.NETWORK}/allhiringrequest/${item?.hrID}`,
                "_blank"
            );
        }
    }, []);
    useEffect(() => {
        getUnPinChannelData(setUnpinData, currentPage, setTotalPages, unpinData, setUnTempData, loginUserId)
    }, [currentPage])

    return (
        <div className="chatWrapper AllChannelsDetail">
            <div className="MsgChannelsMiddleTopStatus">
                <div className="MsgChannelsStatusLeft">
                    <img src={upchatAllChannels} alt="AllChannels" />
                    <h4>All Channels</h4>
                </div>
                <div className="MsgChannelsStatusRight" onClick={isCollapsible ? toggleAccordion : null}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" fill="none" className=""><path fill="#232323" d="m6.67 8 6.666-6.784L12.142 0 6.669 5.597 1.197.028.003 1.244 6.669 8Z"></path></svg>
                </div>
            </div>
            {showBody && (
                <>
                    {unpinData.length > 0 && unpinData.map((items, index) => {
                        return (<div className="chatItem unreadMsg" key={index}>
                            <div className="dFlex">
                                <div className="chatInitialThumb" style={{ background: items.backGroudColor, color: items.fontColor }}>
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

                                <Dropdown
                                    className="dotMenuMain dotMenuhz"
                                    placement="bottomRight"
                                    menu={{
                                        items: menuItems,
                                        onClick: (value) => {
                                            channelDropdown(value, items);
                                        },
                                    }}
                                    trigger={["click"]}
                                >
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <span className="dotMenu"></span>
                                        </Space>
                                    </a>
                                </Dropdown>
                            </div>
                        </div>)
                    })}
                    {unpinData.length === 0 && (
                        <span className="noDataFound">No data found</span>
                    )}

                </>
            )}

        </div>
    )
}

export default AllChannelList