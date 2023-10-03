import React, { useState, useEffect, useCallback } from 'react'
import upchatPinnedIcon from "../../assets/images/svg/upchatPinnedIcon.svg"
import { getPinChannelData, unpinChannel } from "../FirebaseFunction/FirebaseFunction"
import { Dropdown, Space } from "antd";
import { ChannelMenu } from "../../constants/application";
import { ReactComponent as PinSVG } from "../../assets/images/svg/pin.svg";
import { ReactComponent as ViewHRDetailsSVG } from "../../assets/images/svg/viewHrDetails.svg";
import { ReactComponent as LeaveSVG } from "../../assets/images/svg/leave.svg";

const PinChannelList = ({ setpinChannel, pinChannel, setpinData, pinData }) => {
    const [showBody, setShowBody] = useState(true);
    const [collapseClass, setCollapseClass] = useState(false);


    const menuItems = [
        {
            label: ChannelMenu.UNPIN_CHANNEL,
            key: ChannelMenu.UNPIN_CHANNEL,
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
    useEffect(() => {
        getPinChannelData(setpinData)
    }, [pinChannel]);
    const channelDropdown = useCallback(async (value, item) => {
        if (value?.key === "Unpin Channel") {
            unpinChannel(item, setpinChannel)
        } else if (value?.key === "View HR Detail Page") {
            window.open(
                `http://3.218.6.134:9093/allhiringrequest/${item?.hrID}`,
                "_blank"
            );
        }
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
                    {pinData.length > 0 && pinData.map((items, index) => {
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

                </>
            )}
        </div>
    )
}

export default PinChannelList