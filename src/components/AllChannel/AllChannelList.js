import React from 'react'
import upchatAllChannels from "../../assets/images/svg/upchatAllChannels.svg"

const AllChannelList = () => {
    return (
        <div className="chatWrapper AllChannelsDetail">
            <div className="MsgChannelsMiddleTopStatus">
                <div className="MsgChannelsStatusLeft">
                    <img src={upchatAllChannels} alt="AllChannels" />
                    <h4>All Channels</h4>
                </div>
                <div className="MsgChannelsStatusRight">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" fill="none" className=""><path fill="#232323" d="m6.67 8 6.666-6.784L12.142 0 6.669 5.597 1.197.028.003 1.244 6.669 8Z"></path></svg>
                </div>
            </div>

            <div className="chatItem unreadMsg">
                <div className="dFlex">
                    <div className="chatInitialThumb blueThumb">
                        AN
                    </div>
                    <div className="chatGroupDetails">
                        <div className="channelName">
                            Senior Backend Engineer | Andela
                        </div>
                        <span className="hrStatus">HR170523201242 | HR Status : In Process</span>
                    </div>
                </div>
                <div className="dFlexTime">
                    <div className="timeStamp">12:30 PM</div>
                    <div className="unreadNum">5</div>
                    <a href="#" className="dotMenuMain">
                        <span className="dotMenu"></span>
                    </a>
                </div>
            </div>

            <div className="chatItem unreadMsg">
                <div className="dFlex">
                    <div className="chatInitialThumb darkRedThumb">
                        AN
                    </div>
                    <div className="chatGroupDetails">
                        <div className="channelName">
                            Senior Backend Engineer | Andela
                        </div>
                        <span className="hrStatus">HR170523201242 | HR Status : In Process</span>
                    </div>
                </div>
                <div className="dFlexTime">
                    <div className="timeStamp">12:30 PM</div>
                    <div className="unreadNum">5</div>
                    <a href="#" className="dotMenuMain">
                        <span className="dotMenu"></span>
                    </a>
                </div>
            </div>

            <div className="chatItem">
                <div className="dFlex">
                    <div className="chatInitialThumb greenThumb">
                        AN
                    </div>
                    <div className="chatGroupDetails">
                        <div className="channelName">
                            Senior Backend Engineer | Andela
                        </div>
                        <span className="hrStatus">HR170523201242 | HR Status : In Process</span>
                    </div>
                </div>
                <div className="dFlexTime">
                    <div className="timeStamp">12:30 PM</div>

                    <a href="#" className="dotMenuMain">
                        <span className="dotMenu"></span>
                    </a>
                </div>
            </div>

            <div className="chatItem">
                <div className="dFlex">
                    <div className="chatInitialThumb yellowThumb">
                        AN
                    </div>
                    <div className="chatGroupDetails">
                        <div className="channelName">
                            Senior Backend Engineer | Andela
                        </div>
                        <span className="hrStatus">HR170523201242 | HR Status : In Process</span>
                    </div>
                </div>
                <div className="dFlexTime">
                    <div className="timeStamp">12:30 PM</div>
                    <a href="#" className="dotMenuMain">
                        <span className="dotMenu"></span>
                    </a>
                </div>
            </div>

            <div className="chatItem">
                <div className="dFlex">
                    <div className="chatInitialThumb skyBlueThumb">
                        AN
                    </div>
                    <div className="chatGroupDetails">
                        <div className="channelName">
                            Senior Backend Engineer | Andela
                        </div>
                        <span className="hrStatus">HR170523201242 | HR Status : In Process</span>
                    </div>
                </div>
                <div className="dFlexTime">
                    <div className="timeStamp">12:30 PM</div>
                    <a href="#" className="dotMenuMain">
                        <span className="dotMenu"></span>
                    </a>
                </div>
            </div>

            <div className="chatItem">
                <div className="dFlex">
                    <div className="chatInitialThumb orangeThumb">
                        AN
                    </div>
                    <div className="chatGroupDetails">
                        <div className="channelName">
                            Senior Backend Engineer | Andela
                        </div>
                        <span className="hrStatus">HR170523201242 | HR Status : In Process</span>
                    </div>
                </div>
                <div className="dFlexTime">
                    <div className="timeStamp">12:30 PM</div>
                    <a href="#" className="dotMenuMain">
                        <span className="dotMenu"></span>
                    </a>
                </div>
            </div>

            <div className="chatItem">
                <div className="dFlex">
                    <div className="chatInitialThumb orangeThumb">
                        AN
                    </div>
                    <div className="chatGroupDetails">
                        <div className="channelName">
                            Senior Backend Engineer | Andela
                        </div>
                        <span className="hrStatus">HR170523201242 | HR Status : In Process</span>
                    </div>
                </div>
                <div className="dFlexTime">
                    <div className="timeStamp">12:30 PM</div>

                    <a href="#" className="dotMenuMain">
                        <span className="dotMenu"></span>
                    </a>
                </div>
            </div>

        </div>
    )
}

export default AllChannelList