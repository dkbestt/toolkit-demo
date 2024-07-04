import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Custom Imports
import AnchorLabel from '../../components/Label/AnchorLabel'
import Switch from '../../components/Switch/Switch'
import SwitchList from '../../components/Switch/SwitchList'
import UpDownSliderLabel from '../../components/UpDownSlider/UpDownSliderLabel'
import UpDownSlider from '../../components/UpDownSlider/UpDownSlider'
import apiService from '../../services/apiService'
import {
    acceptFollowReqNotiOnOff,
    followReqNotiOnOff,
    mentionPostNotiOnOff,
    pauseAllNotiOnOff,
    postCommentNotiOnOff,
    postLikeNotiOnOff,
    profileViewNotiOnOff,
    tagPostLikeCommentNotiOnOff,
    tagPostNotiOnOff
} from '../../store/reducers/loginSlice'

const NotificationSetting = () => {
    const dispatch = useDispatch();
    const { user_setting } = JSON.parse(localStorage.getItem("user"))
    const { user } = useSelector((state) => ({ ...state.login }))

    const [pauseAllNotiShow, setPauseAllNotiShow] = useState(user.user_setting.is_pause_notification === 1 ? true : false)

    const [profileViewNoti, setProfileViewNoti] = useState(user.user_setting.is_profile_view_notify === 1 ? true : false)
    const [followReqNoti, setFollowReqNoti] = useState(user.user_setting.is_follow_request_notify === 1 ? true : false)
    const [acceptFollowReqNoti, setAcceptFollowReqNoti] = useState(user.user_setting.is_accept_follow_request_notify === 1 ? true : false)

    const [likeNoti, setLikeNoti] = useState(user.user_setting.is_post_like_notify === 1 ? true : false)
    const [commentNoti, setCommentNoti] = useState(user.user_setting.is_post_comment_notify === 1 ? true : false)
    const [tagLikeCommentNoti, setTagLikeCommentNoti] = useState(user.user_setting.is_tagged_post_like_comment_notify === 1 ? true : false)
    const [tagNoti, setTagNoti] = useState(user.user_setting.is_tagged_post_notify === 1 ? true : false)
    const [mentionNoti, setMentionNoti] = useState(user.user_setting.is_mention_post_notify === 1 ? true : false)

    const handlePauseAllNoti = (e) => {
        setPauseAllNotiShow(e.target.checked)
        dispatch(pauseAllNotiOnOff(e.target.checked ? 1 : 0))
        const payload = {
            is_pause_notification: e.target.checked ? 1 : 0
        }
        apiService.UserSetting(payload).then((res) => {
            if (res.success === 1) {
                console.log(res.message)
            } else {
                console.log(res.message)
            }
        })
    }

    const handleProfileViewNoti = (e) => {
        setProfileViewNoti(e.target.checked)
        dispatch(profileViewNotiOnOff(e.target.checked ? 1 : 0))
        const payload = {
            is_profile_view_notify: e.target.checked ? 1 : 0
        }
        apiService.UserSetting(payload).then((res) => {
            if (res.success === 1) {
                console.log(res.message)
            } else {
                console.log(res.message)
            }
        })
    }

    const handleFollowReqNoti = (e) => {
        setFollowReqNoti(e.target.checked)
        dispatch(followReqNotiOnOff(e.target.checked ? 1 : 0))
        const payload = {
            is_follow_request_notify: e.target.checked ? 1 : 0
        }
        apiService.UserSetting(payload).then((res) => {
            if (res.success === 1) {
                console.log(res.message)
            } else {
                console.log(res.message)
            }
        })
    }

    const handleAcceptFollowReqNoti = (e) => {
        setAcceptFollowReqNoti(e.target.checked)
        dispatch(acceptFollowReqNotiOnOff(e.target.checked ? 1 : 0))
        const payload = {
            is_accept_follow_request_notify: e.target.checked ? 1 : 0
        }
        apiService.UserSetting(payload).then((res) => {
            if (res.success === 1) {
                console.log(res.message)
            } else {
                console.log(res.message)
            }
        })
    }

    const handleLikeNoti = (e) => {
        setLikeNoti(e.target.checked)
        dispatch(postLikeNotiOnOff(e.target.checked ? 1 : 0))
        const payload = {
            is_post_like_notify: e.target.checked ? 1 : 0
        }
        apiService.UserSetting(payload).then((res) => {
            if (res.success === 1) {
                console.log(res.message)
            } else {
                console.log(res.message)
            }
        })
    }

    const handleCommentNoti = (e) => {
        setCommentNoti(e.target.checked)
        dispatch(postCommentNotiOnOff(e.target.checked ? 1 : 0))
        const payload = {
            is_post_comment_notify: e.target.checked ? 1 : 0
        }
        apiService.UserSetting(payload).then((res) => {
            if (res.success === 1) {
                console.log(res.message)
            } else {
                console.log(res.message)
            }
        })
    }

    const handleTagLikeCommentNoti = (e) => {
        setTagLikeCommentNoti(e.target.checked)
        dispatch(tagPostLikeCommentNotiOnOff(e.target.checked ? 1 : 0))
        const payload = {
            is_tagged_post_like_comment_notify: e.target.checked ? 1 : 0
        }
        apiService.UserSetting(payload).then((res) => {
            if (res.success === 1) {
                console.log(res.message)
            } else {
                console.log(res.message)
            }
        })
    }

    const handleTagNoti = (e) => {
        setTagNoti(e.target.checked)
        dispatch(tagPostNotiOnOff(e.target.checked ? 1 : 0))
        const payload = {
            is_tagged_post_notify: e.target.checked ? 1 : 0
        }
        apiService.UserSetting(payload).then((res) => {
            if (res.success === 1) {
                console.log(res.message)
            } else {
                console.log(res.message)
            }
        })
    }

    const handleMentionNoti = (e) => {
        setMentionNoti(e.target.checked)
        dispatch(mentionPostNotiOnOff(e.target.checked ? 1 : 0))
        const payload = {
            is_mention_post_notify: e.target.checked ? 1 : 0
        }
        apiService.UserSetting(payload).then((res) => {
            if (res.success === 1) {
                console.log(res.message)
            } else {
                console.log(res.message)
            }
        })
    }

    const handleResetAllNoti = () => {
        const payload = {
            reset_notification: 1
        }
        apiService.UserSetting(payload).then((res) => {
            if (res.success === 1) {
                console.log(res.message)
            } else {
                console.log(res.message)
            }
        })
    }

    return (
        <>
            {/* <Switch pauseNotification={user.user_setting.is_pause_notification}>Pause ALL Notification</Switch> */}
            <div className="panel-group setting_ul" id="accordion" role="tablist" aria-multiselectable="true">
                <div className="panel panel-default">
                    <h4 className="panel-title">
                        <a className="collapsed" role="button" href="#">
                            Pause ALL Notification
                            <span className="ios-toggle">
                                <input type="checkbox" name="sharing" id="sharing" onChange={handlePauseAllNoti} checked={pauseAllNotiShow} />
                                {/* <input type="checkbox" name="sharing" id="sharing" /> */}
                                <label htmlFor="sharing"></label>
                            </span>
                        </a>
                    </h4>
                </div>
            </div>
            {
                !pauseAllNotiShow && (
                    <div className="panel-group setting_ul" id="accordion" role="tablist" aria-multiselectable="true">
                        <UpDownSlider setting="Profile" icon={<i className="fa fa-user" ></i>}>
                            <div className='border'>
                                {/* <SwitchList>Profile view</SwitchList>
                                    <SwitchList>Follow request</SwitchList>
                                    <SwitchList>Accept follow request</SwitchList> */}
                                <div className="panel panel-default">
                                    <h4 className="panel-title">
                                        <a className="collapsed" role="button" href="#">
                                            Profile view
                                            <span className="ios-toggle">
                                                <input type="checkbox" name="profile_view" id="profile_view" onChange={handleProfileViewNoti} checked={profileViewNoti} />
                                                <label htmlFor="profile_view"></label>
                                            </span>
                                        </a>
                                    </h4>
                                </div>
                                <div className="panel panel-default">
                                    <h4 className="panel-title">
                                        <a className="collapsed" role="button" href="#">
                                            Follow request
                                            <span className="ios-toggle">
                                                <input type="checkbox" name="follow_request" id="follow_request" onChange={handleFollowReqNoti} checked={followReqNoti} />
                                                <label htmlFor="follow_request"></label>
                                            </span>
                                        </a>
                                    </h4>
                                </div>
                                <div className="panel panel-default">
                                    <h4 className="panel-title">
                                        <a className="collapsed" role="button" href="#">
                                            Accept follow-request
                                            <span className="ios-toggle">
                                                <input type="checkbox" name="accept_follow_req" id="accept_follow_req" onChange={handleAcceptFollowReqNoti} checked={acceptFollowReqNoti} />
                                                <label htmlFor="accept_follow_req"></label>
                                            </span>
                                        </a>
                                    </h4>
                                </div>
                            </div>
                        </UpDownSlider>
                        {/* 
                            <UpDownSlider setting="Chat" icon={<i className="fa fa-comment" ></i>}>
                                <div className='border'>Message Notification
                                    <SwitchList>Show notification</SwitchList>
                                    <SwitchList>Message Preview</SwitchList>
                                    <UpDownSliderLabel setting="Sound" label="default"></UpDownSliderLabel>
                                    <SwitchList>vibrate</SwitchList>
                                </div>
                                <div className='border'>Group Notification
                                    <SwitchList>Show notification</SwitchList>
                                    <SwitchList>Message Preview</SwitchList>
                                    <UpDownSliderLabel setting="Sound" label="default"></UpDownSliderLabel>
                                    <SwitchList>vibrate</SwitchList>
                                </div>
                            </UpDownSlider>
                        */}
                        <UpDownSlider setting="TimeLine" icon={<i className="fa fa-picture-o" ></i>} >
                            <div className='border'>
                                {/* <SwitchList>Likes</SwitchList>
                                    <SwitchList>Comments</SwitchList>
                                    <SwitchList>Likes and Comments on photo of you</SwitchList>
                                    <SwitchList>Photo of you</SwitchList>
                                    <SwitchList>Mention you</SwitchList> */}
                                <div className="panel panel-default">
                                    <h4 className="panel-title">
                                        <a className="collapsed" role="button" href="#">
                                            Likes
                                            <span className="ios-toggle">
                                                <input type="checkbox" name="like_noti" id="like_noti" onChange={handleLikeNoti} checked={likeNoti} />
                                                <label htmlFor="like_noti"></label>
                                            </span>
                                        </a>
                                    </h4>
                                    <span>xyz likes your photo.</span>
                                </div>
                                <div className="panel panel-default">
                                    <h4 className="panel-title">
                                        <a className="collapsed" role="button" href="#">
                                            Comments
                                            <span className="ios-toggle">
                                                <input type="checkbox" name="comment_noti" id="comment_noti" onChange={handleCommentNoti} checked={commentNoti} />
                                                <label htmlFor="comment_noti"></label>
                                            </span>
                                        </a>
                                    </h4>
                                    <span>xyz commented "Nice pic..!"</span>
                                </div>
                                <div className="panel panel-default">
                                    <h4 className="panel-title">
                                        <a className="collapsed" role="button" href="#">
                                            Likes and Comments on photo of you
                                            <span className="ios-toggle">
                                                <input type="checkbox" name="like_comment_tag_noti" id="like_comment_tag_noti" onChange={handleTagLikeCommentNoti} checked={tagLikeCommentNoti} />
                                                <label htmlFor="like_comment_tag_noti"></label>
                                            </span>
                                        </a>
                                    </h4>
                                    <span>xyz commented on a post you're tagged in.</span>
                                </div>
                                <div className="panel panel-default">
                                    <h4 className="panel-title">
                                        <a className="collapsed" role="button" href="#">
                                            Photo of you
                                            <span className="ios-toggle">
                                                <input type="checkbox" name="tag_noti" id="tag_noti" onChange={handleTagNoti} checked={tagNoti} />
                                                <label htmlFor="tag_noti"></label>
                                            </span>
                                        </a>
                                    </h4>
                                    <span>xyz tagged you in photo.</span>
                                </div>
                                <div className="panel panel-default">
                                    <h4 className="panel-title">
                                        <a className="collapsed" role="button" href="#">
                                            Mention you
                                            <span className="ios-toggle">
                                                <input type="checkbox" name="mention_noti" id="mention_noti" onChange={handleMentionNoti} checked={mentionNoti} />
                                                <label htmlFor="mention_noti"></label>
                                            </span>
                                        </a>
                                    </h4>
                                    <span>xyz mentioned you in photo.</span>
                                </div>
                            </div>
                        </UpDownSlider>
                    </div>
                )
            }
            <div className="text-red panel-group setting_ul" id="accordion" role="tablist" aria-multiselectable="true">
                <div className="panel panel-default">
                    <a className="p-3" role="button" href="#">
                        <p className='text-red-500' onClick={() => handleResetAllNoti()}>Reset all notification</p>
                    </a>
                </div>
            </div>
            {/* <AnchorLabel>Reset all notification</AnchorLabel> */}
        </>
    )
}

export default NotificationSetting