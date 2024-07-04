import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactDialogBox } from 'react-js-dialog-box'

import { convertTimeToFormatText } from '../../utils/Helper'
import {
    changePostPrivacy,
    commentONOFF,
    deleteMyPost,
    followUnfollowUserFromPost,
    postNotiONOFF
} from '../../store/reducers/postSlice'
import apiService from '../../services/apiService'
import { decreaseMyPost } from '../../store/reducers/profileSlice'
import UserProfileImgName from '../../components/UserProfileImgName/UserProfileImgName'

const PostTopSection = ({ postID, userID, pofileImg, profileColor, firstName, lastName, time, tagUser, from, onOff, postNoti, isPublic, isFollow }) => {
    const { data } = JSON.parse(localStorage.getItem("user"))
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenTagUserList, setIsOpenTagUserList] = useState(false)
    const dispatch = useDispatch();
    const style = {
        btnStyle: {
            textAlign: "center"
        }
    };
    if (tagUser.length !== 0) {
        if (tagUser.length === 1) {
            var firstTagUser = " is with " + tagUser[0]?.first_name + " " + tagUser[0]?.last_name
        } else {
            var firstTagUser = " is with " + tagUser[0]?.first_name + " " + tagUser[0]?.last_name + " and " + `${tagUser?.length - 1}` + " others";
        }
    }

    const handleDeletePost = (data) => {
        apiService.DeletePost(data.id).then((res) => {
            if (res.success === 1) {
                dispatch(deleteMyPost(data));
                dispatch(decreaseMyPost(1));
                console.log(res.message, 'done');
            } else {
                console.log(res.message);
            }
        })
        setIsOpen(false)
    }

    const handleOnOffComment = (data) => {
        const commentData = {
            post_id: data.post_id,
            turn_off_comment: data.turn_off_comment
        }
        apiService.TurnOnOffComment(commentData).then((res) => {
            if (res.success === 1) {
                dispatch(commentONOFF(data))
                console.log(res.message);
            } else {
                console.log(res.message);
            }
        })
        setIsOpen(false)
    }

    const handleOnOffPostNoti = (data) => {
        const postNotiData = {
            post_id: data.post_id,
            turn_on_notification: data.turn_on_notification
        }
        apiService.TurnOnOffPostNoti(postNotiData).then((res) => {
            if (res.success === 1) {
                dispatch(postNotiONOFF(data))
                console.log(res.message);
            } else {
                console.log(res.message);
            }
        })
        setIsOpen(false)
    }

    const handleChangePostPrivacy = (data) => {
        const publicData = {
            post_id: data.post_id,
            is_public: data.is_public
        }
        apiService.ChangePostPrivacy(publicData).then((res) => {
            if (res.success === 1) {
                dispatch(changePostPrivacy(data))
                console.log(res.message);
            } else {
                console.log(res.message);
            }
        })
        setIsOpen(false)
    }

    const handlePostMoreOptions = () => {
        if (isOpen)
            setIsOpen(false)
        else
            setIsOpen(true)
    }

    const handleFollowUnfollowUserFromPost = (data) => {
        var type = ""
        if (isFollow === 0) {
            type = "follow"
        } else if (isFollow === 1) {
            type = "unfollow"
        } else {
            type = "cancel_request"
        }
        const payload = {
            type: type,
            follow_id: data.user_id
        }
        apiService.FollowUnfollow(payload).then((res) => {
            if (res.success === 1) {
                dispatch(followUnfollowUserFromPost(data));
                console.log(res.message);
            } else {
                console.log('error====>', res.message);
            }
        })
    }

    return (
        <div className="post-top">
            <UserProfileImgName
                PROFILE_IMG={pofileImg}
                PROFILE_COLOR={profileColor}
                FIRST_NAME={firstName}
                LAST_NAME={lastName}
                USER_ID={userID}
            />
            {/* {
                pofileImg !== "" ? (
                    <div className="post_profile"><img src={pofileImg} alt="Image1" /></div>
                ) : (
                    <div
                        className="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-red-500 text-xl text-white uppercase"
                        style={{ backgroundColor: `${profileColor}` }}
                    >
                        {firstName.charAt(0)}{lastName.charAt(0)}
                    </div>
                )
            } */}
            <div className="post_name">
                <h3>{firstName} {lastName}{" "}
                    {
                        tagUser && (
                            <span style={{ cursor: "pointer" }} onClick={() => setIsOpenTagUserList(true)}>
                                {firstTagUser}
                            </span>
                        )
                    }
                </h3>
                {isOpenTagUserList &&
                    <ReactDialogBox
                        closeBox={() => setIsOpenTagUserList(false)}
                        bodyBackgroundColor='white'
                        BorderRadius='10px'
                        bodyWidth='50%'
                    >
                        {
                            tagUser?.map((t, i) => (
                                <li className='mt-5' key={i} style={{ margin: '5px 0px' }}>
                                    <div className="post-top" style={{ margin: "-12px" }}>
                                        <UserProfileImgName
                                            PROFILE_IMG={t.profile_image}
                                            PROFILE_COLOR={t.profile_color}
                                            FIRST_NAME={t.first_name}
                                            LAST_NAME={t.last_name}
                                            USER_ID={t.id}
                                        />
                                        {/* {
                                            t.profile_image !== "" ? (
                                                <div className="post_profile"><img src={t.profile_image} alt="img" /></div>
                                            ) : (
                                                <div
                                                    className="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-red-500 text-xl text-white uppercase"
                                                    style={{ backgroundColor: `${t.profile_color}` }}
                                                >
                                                    {t.first_name.charAt(0)}{t.last_name.charAt(0)}
                                                </div>
                                            )
                                        } */}
                                        <div className="follow_name">
                                            <h6>{t.first_name} {t.last_name}</h6>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ReactDialogBox>
                }
                <div className="post-time">{convertTimeToFormatText(time)}</div>
            </div>
            <div className="post_menu_time">
                <div className="post-menu">
                    <i className="fa fa-ellipsis-h" onClick={handlePostMoreOptions}></i>
                    {isOpen &&
                        <div className="chat-frind-content post-pop">
                            {
                                data?.user.id === userID ? (
                                    <ul>
                                        <li style={style.btnStyle}><button onClick={() => handleDeletePost({ id: postID, from: from })}><a>Delete</a></button></li>
                                        <li style={style.btnStyle}><button><a>Copy Link</a></button></li>
                                        <li style={style.btnStyle}>
                                            <button onClick={() =>
                                                handleChangePostPrivacy({
                                                    post_id: postID,
                                                    is_public: isPublic === 0 ? 1 : 0,
                                                    from: from
                                                })
                                            }>
                                                <a>Make it {isPublic === 0 ? ("Private") : ("Public")} </a>
                                            </button>
                                        </li>
                                        <li style={style.btnStyle}>
                                            <button onClick={() =>
                                                handleOnOffComment({
                                                    post_id: postID,
                                                    turn_off_comment: onOff === 0 ? 1 : 0,
                                                    from: from
                                                })
                                            }>
                                                <a>Turn {onOff === 0 ? ("off") : ("on")} Commenting</a>
                                            </button>
                                        </li>
                                    </ul>
                                ) : (
                                    <ul>
                                        <li style={style.btnStyle}><button><a>Report</a></button></li>
                                        <li style={style.btnStyle}><button><a>Copy Link</a></button></li>
                                        <li style={style.btnStyle}>
                                            <button onClick={() =>
                                                handleOnOffPostNoti({
                                                    post_id: postID,
                                                    turn_on_notification: postNoti === 0 ? 1 : 0,
                                                    from: from
                                                })
                                            }>
                                                <a>Turn {postNoti === 0 ? ("off") : ("on")} Post Notification</a>
                                            </button>
                                        </li>
                                        <li style={style.btnStyle}>
                                            <button onClick={() =>
                                                handleFollowUnfollowUserFromPost({
                                                    post_id: postID,
                                                    user_id: userID,
                                                    is_follow: isFollow !== 0 ? 0 : 2,
                                                    from
                                                })
                                            }>
                                                <a>
                                                    {isFollow === 1 ? ("UnFollow") : isFollow === 0 ? ("Follow") : ("Requested")}
                                                </a>
                                            </button>
                                        </li>
                                    </ul>
                                )
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default PostTopSection