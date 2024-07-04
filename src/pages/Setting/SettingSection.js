import React, { useEffect, useState } from 'react'

// Custom Imports
import About from './About';
import ChatSetting from './ChatSetting'
import DataSetting from './DataSetting'
import DeviceList from './DeviceList';
import Help from './Help'
import NotificationSetting from './NotificationSetting'
import PostSetting from './PostSetting'
import PrivacySetting from './PrivacySetting'
import StorySetting from './StorySetting'
import Theme from './Theme';

const SettingSection = () => {
    const [element, setElement] = useState("nav-story")
    var Setting = null
    switch (element) {
        // case "nav-story":
        //     Setting = StorySetting
        //     break
        // case "nav-chat":
        //     Setting = ChatSetting
        //     break
        // case "nav-Post":
        //     Setting = PostSetting
        //     break
        case "nav-privacy":
            Setting = PrivacySetting
            break
        // case "nav-data":
        //     Setting = DataSetting
        //     break
        case "nav-about":
            Setting = About
            break
        case "nav-help":
            Setting = Help
            break
        case "nav-notification":
            Setting = NotificationSetting
            break
        case "nav-device-list":
            Setting = DeviceList
            break
        // case "nav-theme":
        //     Setting = Theme
        //     break
        default:
            Setting = NotificationSetting
            break
    }
    return (
        <div className="setting_div">
            <div className="setting_title">
                <h2>Setting</h2>
            </div>
            <div className='flex'>
                <div>
                    <nav className='relative'>
                        <div className="" id="nav-tab" role="tablist">
                            <ul>
                                <h5>PERSONALIZATION</h5><hr />
                                {/* <li><a href='#' onClick={() => { setElement("nav-chat") }}><i className="fa fa-comments"></i> <span>Chat Appearance</span> </a></li> */}
                                <li ><a href='#' onClick={() => { setElement("nav-notification") }}><i className="fa fa-bell"></i> <span>Notification</span> </a></li>
                                {/* <li ><a href='#' onClick={() => { setElement("nav-theme") }}><i className="fa fa-file-image-o" ></i> <span>Theme</span></a></li> */}
                            </ul>
                            <ul>
                                <h5>ACCOUNT</h5><hr />
                                <li ><a href='#' onClick={() => { setElement("nav-privacy") }}> <i className="fa fa-shield"></i> <span>Privacy</span> </a></li>
                                {/* <li ><a href='#' onClick={() => { setElement("nav-data") }}><i className="fa fa-table"></i> <span>Data &amp; Storage</span> </a></li> */}
                                <li ><a href='#' onClick={() => { setElement("nav-device-list") }}><i className="fa fa-tablet"></i> <span>Device List</span> </a></li>
                            </ul>
                            <ul>
                                <h5>SERVICES</h5><hr />
                                {/* <li ><a href='#' onClick={() => { setElement("nav-Post") }}><i className="fa fa-database"></i> <span>Back Up</span> </a></li> */}
                                <li ><a href='#' onClick={() => { setElement("nav-help") }}><i className="fa fa-question-circle"></i> <span>Help</span> </a></li>
                                <li ><a href='#' onClick={() => { setElement("nav-about") }}><i className="fa fa-info-circle"></i> <span>About</span> </a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className="tab-content" id="nav-tabContent" >
                    {element &&
                        <Setting />
                    }
                </div>
            </div>
        </div>
    )
}

export default SettingSection