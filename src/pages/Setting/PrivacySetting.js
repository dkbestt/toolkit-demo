import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactDialogBox } from 'react-js-dialog-box'

// Custom Imports
import Switch from '../../components/Switch/Switch'
import SwitchList from '../../components/Switch/SwitchList'
import AnchorLabel from '../../components/Label/AnchorLabel'
import UpDownSlider from '../../components/UpDownSlider/UpDownSlider'
import UpDownSliderLabel from '../../components/UpDownSlider/UpDownSliderLabel'
import UserProfileImgName from '../../components/UserProfileImgName/UserProfileImgName'
import {
    aboutPrivacy,
    lastSeenPrivacy,
    mentionPrivacy,
    profilePhotoPrivacy,
    storyDownloadPrivacy,
    storyViewPrivacy,
    tagPrivacy,
    blockUserRemove,
} from '../../store/reducers/loginSlice'
import apiService from '../../services/apiService'

const PrivacySetting = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => ({ ...state.login }))
    const [profilePhoto, setProfilePhoto] = useState(user.user_setting.who_see_profile_photo)
    const [about, setAbout] = useState(user.user_setting.who_see_about)
    const [lastSeen, setLastSeen] = useState(user.user_setting.who_see_last_seen)

    const [tag, setTag] = useState(user.user_setting.who_can_tag)
    const [mention, setMention] = useState(user.user_setting.who_can_mention)

    const [storyView, setStoryView] = useState(user.user_setting.story_view)
    const [storyDownload, setStoryDownload] = useState(user.user_setting.story_download)

    const [blockUser, setBlockUser] = useState(false)

    const handleUnblockUser = (id) => {
        dispatch(blockUserRemove(id))
        const payload = {
            id, type: 'unblock'
        }
        apiService.BlockUnblock(payload).then((res) => {
            if (res.success === 1) {
                console.log(res.message);
            } else {
                console.log(res.message);
            }
        })
    }

    const handleChangeProfilePhoto = (e) => {
        setProfilePhoto(e.target.value)
        dispatch(profilePhotoPrivacy(e.target.value))
        apiService.UserSetting({ who_see_profile_photo: e.target.value }).then((res) => {
            if (res.success === 1) {
                console.log(res.message);
            } else {
                console.log(res.message);
            }
        })
    }

    const handleChangeAbout = (e) => {
        setAbout(e.target.value)
        dispatch(aboutPrivacy(e.target.value))
        apiService.UserSetting({ who_see_about: e.target.value }).then((res) => {
            if (res.success === 1) {
                console.log(res.message);
            } else {
                console.log(res.message);
            }
        })
    }

    const handleChangeLastSeen = (e) => {
        setLastSeen(e.target.value)
        dispatch(lastSeenPrivacy(e.target.value))
        apiService.UserSetting({ who_see_last_seen: e.target.value }).then((res) => {
            if (res.success === 1) {
                console.log(res.message);
            } else {
                console.log(res.message);
            }
        })
    }

    const handleChangeTag = (e) => {
        setTag(e.target.value)
        dispatch(tagPrivacy(e.target.value))
        apiService.UserSetting({ who_can_tag: e.target.value }).then((res) => {
            if (res.success === 1) {
                console.log(res.message);
            } else {
                console.log(res.message);
            }
        })
    }

    const handleChangeMention = (e) => {
        setMention(e.target.value)
        dispatch(mentionPrivacy(e.target.value))
        apiService.UserSetting({ who_can_mention: e.target.value }).then((res) => {
            if (res.success === 1) {
                console.log(res.message)
            } else {
                console.log(res.message)
            }
        })
    }

    const handleChangeStoryView = (e) => {
        setStoryView(e.target.value)
        dispatch(storyViewPrivacy(e.target.value))
        apiService.UserSetting({ story_view: e.target.value }).then((res) => {
            if (res.success === 1) {
                console.log(res.message)
            } else {
                console.log(res.message)
            }
        })
    }

    const handleChangeStoryDownload = (e) => {
        setStoryDownload(e.target.value)
        dispatch(storyDownloadPrivacy(e.target.value))
        apiService.UserSetting({ story_download: e.target.value }).then((res) => {
            if (res.success === 1) {
                console.log(res.message)
            } else {
                console.log(res.message)
            }
        })
    }

    return (
        <>
            <div className="panel-group setting_ul" id="accordion" role="tablist" aria-multiselectable="true">
                <UpDownSlider setting="Profile" icon={<i className="fa fa-user" ></i>}>
                    <UpDownSliderLabel setting="Porfile photo" label={profilePhoto}>
                        <div className='border'>
                            {/* <SwitchList radio={true} name="profile_photo" value="everybody"  {...{ profilePhoto, setProfilePhoto }}>Everybody</SwitchList>
                                <SwitchList radio={true} name="profile_photo" value="nobody" {...{ profilePhoto, setProfilePhoto }}>Nobody</SwitchList>
                                <SwitchList radio={true} name="profile_photo" value="mycontact" {...{ profilePhoto, setProfilePhoto }}>My contact only</SwitchList> */}
                            <div className="panel panel-default">
                                <h4 className="panel-title">
                                    <a className="collapsed" role="button" href="#">
                                        Everyone
                                        <span className="ios-toggle">
                                            <input
                                                type="radio"
                                                name="profile_photo"
                                                value="everyone"
                                                onChange={handleChangeProfilePhoto}
                                                checked={profilePhoto === "everyone"}
                                            />
                                            <label htmlFor="sharing"></label>
                                        </span>
                                    </a>
                                </h4>
                                <h4 className="panel-title">
                                    <a className="collapsed" role="button" href="#">
                                        Nobody
                                        <span className="ios-toggle">
                                            <input
                                                type="radio"
                                                name="profile_photo"
                                                value="nobody"
                                                onChange={handleChangeProfilePhoto}
                                                checked={profilePhoto === "nobody"}
                                            />
                                            <label htmlFor="sharing"></label>
                                        </span>
                                    </a>
                                </h4>
                                <h4 className="panel-title">
                                    <a className="collapsed" role="button" href="#">
                                        My contact only
                                        <span className="ios-toggle">
                                            <input
                                                type="radio"
                                                name="profile_photo"
                                                value="mycontact"
                                                onChange={handleChangeProfilePhoto}
                                                checked={profilePhoto === "mycontact"}
                                            />
                                            <label htmlFor="sharing"></label>
                                        </span>
                                    </a>
                                </h4>
                            </div>
                        </div>
                    </UpDownSliderLabel>
                    <UpDownSliderLabel setting="About" label={about}>
                        <div className='border'>
                            {/* <SwitchList radio={true} name="about">everybody</SwitchList>
                                <SwitchList radio={true} name="about">nobody</SwitchList>
                                <SwitchList radio={true} name="about">mycontact</SwitchList> */}
                            <div className="panel panel-default">
                                <h4 className="panel-title">
                                    <a className="collapsed" role="button" href="#">
                                        Everyone
                                        <span className="ios-toggle">
                                            <input
                                                type="radio"
                                                name="about"
                                                value="everyone"
                                                onChange={handleChangeAbout}
                                                checked={about === "everyone"}
                                            />
                                            <label htmlFor="sharing"></label>
                                        </span>
                                    </a>
                                </h4>
                                <h4 className="panel-title">
                                    <a className="collapsed" role="button" href="#">
                                        Nobody
                                        <span className="ios-toggle">
                                            <input
                                                type="radio"
                                                name="about"
                                                value="nobody"
                                                onChange={handleChangeAbout}
                                                checked={about === "nobody"}
                                            />
                                            <label htmlFor="sharing"></label>
                                        </span>
                                    </a>
                                </h4>
                                <h4 className="panel-title">
                                    <a className="collapsed" role="button" href="#">
                                        My contact only
                                        <span className="ios-toggle">
                                            <input
                                                type="radio"
                                                name="about"
                                                value="mycontact"
                                                onChange={handleChangeAbout}
                                                checked={about === "mycontact"}
                                            />
                                            <label htmlFor="sharing"></label>
                                        </span>
                                    </a>
                                </h4>
                            </div>
                        </div>
                    </UpDownSliderLabel>
                    <UpDownSliderLabel setting="Last seen" label={lastSeen}>
                        <div className='border'>
                            <div className="panel panel-default">
                                <h4 className="panel-title">
                                    <a className="collapsed" role="button" href="#">
                                        Everyone
                                        <span className="ios-toggle">
                                            <input
                                                type="radio"
                                                name="last_seen"
                                                value="everyone"
                                                onChange={handleChangeLastSeen}
                                                checked={lastSeen === "everyone"}
                                            />
                                            <label htmlFor="sharing"></label>
                                        </span>
                                    </a>
                                </h4>
                                <h4 className="panel-title">
                                    <a className="collapsed" role="button" href="#">
                                        Nobody
                                        <span className="ios-toggle">
                                            <input
                                                type="radio"
                                                name="last_seen"
                                                value="nobody"
                                                onChange={handleChangeLastSeen}
                                                checked={lastSeen === "nobody"}
                                            />
                                            <label htmlFor="sharing"></label>
                                        </span>
                                    </a>
                                </h4>
                                <h4 className="panel-title">
                                    <a className="collapsed" role="button" href="#">
                                        My contact only
                                        <span className="ios-toggle">
                                            <input
                                                type="radio"
                                                name="last_seen"
                                                value="mycontact"
                                                onChange={handleChangeLastSeen}
                                                checked={lastSeen === "mycontact"}
                                            />
                                            <label htmlFor="sharing"></label>
                                        </span>
                                    </a>
                                </h4>
                            </div>
                        </div>
                    </UpDownSliderLabel>
                    {/* <div className='border'>
                            <h5 className=''>Send Message</h5>
                            <SwitchList radio={true}>Connection</SwitchList>
                            <SwitchList radio={true}>everybody</SwitchList>
                        </div> */}
                </UpDownSlider>

                <UpDownSlider setting="TimeLine" icon={<i className="fa fa-picture-o" ></i>} >
                    <UpDownSliderLabel setting="Tag" label={tag}>
                        <div className='border'>
                            <div className="panel panel-default">
                                <h4 className="panel-title">
                                    <a className="collapsed" role="button" href="#">
                                        Everyone
                                        <span className="ios-toggle">
                                            <input
                                                type="radio"
                                                name="tag"
                                                value="everyone"
                                                onChange={handleChangeTag}
                                                checked={tag === "everyone"}
                                            />
                                            <label htmlFor="sharing"></label>
                                        </span>
                                    </a>
                                </h4>
                                <h4 className="panel-title">
                                    <a className="collapsed" role="button" href="#">
                                        Nobody
                                        <span className="ios-toggle">
                                            <input
                                                type="radio"
                                                name="tag"
                                                value="nobody"
                                                onChange={handleChangeTag}
                                                checked={tag === "nobody"}
                                            />
                                            <label htmlFor="sharing"></label>
                                        </span>
                                    </a>
                                </h4>
                                <h4 className="panel-title">
                                    <a className="collapsed" role="button" href="#">
                                        My contact only
                                        <span className="ios-toggle">
                                            <input
                                                type="radio"
                                                name="tag"
                                                value="mycontact"
                                                onChange={handleChangeTag}
                                                checked={tag === "mycontact"}
                                            />
                                            <label htmlFor="sharing"></label>
                                        </span>
                                    </a>
                                </h4>
                            </div>
                        </div>
                    </UpDownSliderLabel>
                    <UpDownSliderLabel setting="Mention" label={mention}>
                        <div className='border'>
                            <div className="panel panel-default">
                                <h4 className="panel-title">
                                    <a className="collapsed" role="button" href="#">
                                        Everyone
                                        <span className="ios-toggle">
                                            <input
                                                type="radio"
                                                name="mention"
                                                value="everyone"
                                                onChange={handleChangeMention}
                                                checked={mention === "everyone"}
                                            />
                                            <label htmlFor="sharing"></label>
                                        </span>
                                    </a>
                                </h4>
                                <h4 className="panel-title">
                                    <a className="collapsed" role="button" href="#">
                                        Nobody
                                        <span className="ios-toggle">
                                            <input
                                                type="radio"
                                                name="mention"
                                                value="nobody"
                                                onChange={handleChangeMention}
                                                checked={mention === "nobody"}
                                            />
                                            <label htmlFor="sharing"></label>
                                        </span>
                                    </a>
                                </h4>
                                <h4 className="panel-title">
                                    <a className="collapsed" role="button" href="#">
                                        My contact only
                                        <span className="ios-toggle">
                                            <input
                                                type="radio"
                                                name="mention"
                                                value="mycontact"
                                                onChange={handleChangeMention}
                                                checked={mention === "mycontact"}
                                            />
                                            <label htmlFor="sharing"></label>
                                        </span>
                                    </a>
                                </h4>
                            </div>
                        </div>
                    </UpDownSliderLabel>
                </UpDownSlider>

                <UpDownSlider setting="Story" icon={<i className="fa fa-clock-o"></i>}>
                    <UpDownSliderLabel setting="Story views" label={storyView}>
                        <div className='border'>
                            <div className="panel panel-default">
                                <h4 className="panel-title">
                                    <a className="collapsed" role="button" href="#">
                                        Everyone
                                        <span className="ios-toggle">
                                            <input
                                                type="radio"
                                                name="story_view"
                                                value="everyone"
                                                onChange={handleChangeStoryView}
                                                checked={storyView === "everyone"}
                                            />
                                            <label htmlFor="sharing"></label>
                                        </span>
                                    </a>
                                </h4>
                                <h4 className="panel-title">
                                    <a className="collapsed" role="button" href="#">
                                        Nobody
                                        <span className="ios-toggle">
                                            <input
                                                type="radio"
                                                name="story_view"
                                                value="nobody"
                                                onChange={handleChangeStoryView}
                                                checked={storyView === "nobody"}
                                            />
                                            <label htmlFor="sharing"></label>
                                        </span>
                                    </a>
                                </h4>
                                <h4 className="panel-title">
                                    <a className="collapsed" role="button" href="#">
                                        My contact only
                                        <span className="ios-toggle">
                                            <input
                                                type="radio"
                                                name="story_view"
                                                value="mycontact"
                                                onChange={handleChangeStoryView}
                                                checked={storyView === "mycontact"}
                                            />
                                            <label htmlFor="sharing"></label>
                                        </span>
                                    </a>
                                </h4>
                            </div>
                        </div>
                    </UpDownSliderLabel>
                    <UpDownSliderLabel setting="Download story" label={storyDownload}>
                        <div className='border'>
                            <div className='border'>
                                <div className="panel panel-default">
                                    <h4 className="panel-title">
                                        <a className="collapsed" role="button" href="#">
                                            Everyone
                                            <span className="ios-toggle">
                                                <input
                                                    type="radio"
                                                    name="story_download"
                                                    value="everyone"
                                                    onChange={handleChangeStoryDownload}
                                                    checked={storyDownload === "everyone"}
                                                />
                                                <label htmlFor="sharing"></label>
                                            </span>
                                        </a>
                                    </h4>
                                    <h4 className="panel-title">
                                        <a className="collapsed" role="button" href="#">
                                            Nobody
                                            <span className="ios-toggle">
                                                <input
                                                    type="radio"
                                                    name="story_download"
                                                    value="nobody"
                                                    onChange={handleChangeStoryDownload}
                                                    checked={storyDownload === "nobody"}
                                                />
                                                <label htmlFor="sharing"></label>
                                            </span>
                                        </a>
                                    </h4>
                                    <h4 className="panel-title">
                                        <a className="collapsed" role="button" href="#">
                                            My contact only
                                            <span className="ios-toggle">
                                                <input
                                                    type="radio"
                                                    name="story_download"
                                                    value="mycontact"
                                                    onChange={handleChangeStoryDownload}
                                                    checked={storyDownload === "mycontact"}
                                                />
                                                <label htmlFor="sharing"></label>
                                            </span>
                                        </a>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </UpDownSliderLabel>
                    {/* <UpDownSliderLabel setting="Message replies" label="everyone">
                            <div className='border'>
                                <SwitchList radio={true}>everybody</SwitchList>
                                <SwitchList radio={true}>nobody</SwitchList>
                                <SwitchList radio={true}>mycontact</SwitchList>
                            </div>
                        </UpDownSliderLabel> */}
                    {/* <SwitchList>Allow sharing as message</SwitchList> */}
                </UpDownSlider>
            </div>
            <div className="text-red panel-group setting_ul" id="accordion" role="tablist" aria-multiselectable="true">
                <div className="panel panel-default">
                    <a className="p-3" role="button" href="#">
                        <p className='text-red-500' onClick={() => user.block_user.length !== 0 ? setBlockUser(true) : setBlockUser(false)}>Blocked</p>
                        {
                            blockUser &&
                            <ReactDialogBox
                                closeBox={() => setBlockUser(false)}
                                bodyBackgroundColor='white'
                                BorderRadius='10px'
                                bodyWidth='50%'
                            >
                                <ul>
                                    {
                                        user.block_user && user.block_user?.map((user, index) => (
                                            <li className='mt-5' key={index}>
                                                <div className="post-top">
                                                    <UserProfileImgName
                                                        PROFILE_IMG={user.profile_image}
                                                        PROFILE_COLOR={user.profile_color}
                                                        FIRST_NAME={user.first_name}
                                                        LAST_NAME={user.last_name}
                                                        USER_ID={user.id}
                                                    />
                                                    <div className="follow_name">
                                                        <h6>{user.first_name} {user.last_name}</h6>
                                                    </div>
                                                    <div>
                                                        <button className="follow ml-2" onClick={() => handleUnblockUser(user.id)}>
                                                            <span className="mr-2 ml-2 w-20">unblock</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </ReactDialogBox>
                        }
                        <span className='post_count'>{user.block_user.length === 0 ? "" : user.block_user.length}</span>
                    </a>
                </div>
            </div>
        </>
    )
}

export default PrivacySetting