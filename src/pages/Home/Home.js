import React, { useState } from 'react'

// Custom Imports
import '../../assets/css/responsive.css'
import SettingSection from '../../pages/Setting/SettingSection'
import ProfileSidebar from '../Profile/ProfileSidebar/ProfileSidebar'
import Story from '../Story/Story'
import TopSection from './TopSection'
import PostList from '../Post/PostList'

const Home = () => {
    const [isOpenSetting, setIsOpenSetting] = useState(false)
    return (
        <div className="home">
            <div className="menu">
                <ProfileSidebar />
            </div>
            <div className="main">
                <div className='top-section'>
                    {/* Header */}
                    <TopSection {...{ isOpenSetting, setIsOpenSetting }} />
                    {/* Content */}
                </div>
                <div className="chat-div">
                    <div className="sidebar-right">
                        {!isOpenSetting &&
                            <Story />
                        }
                        <div className="bottom-side">
                            <div className="post-center">
                                {isOpenSetting ?
                                    <SettingSection />
                                    :
                                    <PostList />
                                }
                                {/* // story */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home