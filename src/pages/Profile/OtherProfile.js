import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import CryptoJS from "crypto-js"
import { Link, Outlet } from 'react-router-dom'
import { ReactDialogBox } from 'react-js-dialog-box'

// Custom Imports
import '../../assets/css/myprofile.css'
import USER1 from '../../assets/images/1.jpg'
import USER2 from '../../assets/images/2.jpg'
import USER3 from '../../assets/images/3.jpg'
import apiService from '../../services/apiService'
import { useDispatch, useSelector } from 'react-redux'
import { addOtherUserData, blockUnblockUser, emptyOtherUserData, followUnfollowUserFromOtherUserProfile } from '../../store/reducers/otherUserProfileSlice'
import { CRYPTO_JS_KEY } from '../../constants/Contants'
import { convertTimeToFormatText, decryptID } from '../../utils/Helper'


const OtherProfile = () => {
    const [openReportCart, setCloseReportCart] = useState(false)
    const [reportReason, setReportReason] = useState("")
    const [disabled, setDisabled] = useState(true)
    const dispatch = useDispatch()
    const { otherUser } = useSelector((state) => ({ ...state.otherUser }))

    // get other user id from URL----------------------------------------------------------
    let { id } = useParams();
    // const ids = window.atob(id);
    // let u_id = id.toString().replace('TriFtEl', '/')
    // var decry_oth_user_id = CryptoJS.AES.decrypt(`${u_id}`, CRYPTO_JS_KEY).toString(CryptoJS.enc.Utf8);
    // console.log(decry_oth_user_id, 'id');
    // ------------------------------------------------------------------------------------

    useEffect(() => {
        // console.log(decryptID(id), 'o pro');
        dispatch(emptyOtherUserData());
        const data = {
            id: id
            // id: decryptID(id)
        }
        apiService.ViewProfile(data.id).then((res) => {
            if (res.success === 1) {
                dispatch(addOtherUserData(res.data))
                // console.log(res, 'res from done');
            } else {
                console.log(res.message);
            }
        })
    }, [])

    const handleFollowUnfollowFromOtherUserProfile = (data) => {
        var type = ""
        if (otherUser?.is_follow === 'follow') {
            type = "follow"
        } else if (otherUser?.is_follow === 'active') {
            type = "unfollow"
        } else {
            type = "cancel_request"
        }
        const payload = {
            follow_id: data.id,
            type: type
        }
        dispatch(followUnfollowUserFromOtherUserProfile(data))
        // apiService.FollowUnfollow(payload).then((res) => {
        //     if (res.success === 1) {
        //         console.log(res.message);
        //     } else {
        //         console.log('error====>', res.message);
        //     }
        // })
    }

    const handleBlockUnblock = (data) => {
        const payload = {
            id: data.id,
            type: otherUser?.is_block === 0 ? "block" : "unblock"
        }
        console.log(payload);
        dispatch(blockUnblockUser(data))
        // apiService.BlockUnblock(payload).then((res) => {
        //     if (res.success === 1) {
        //         console.log(res.message);
        //     } else {
        //         console.log('error====>', res.message);
        //     }
        // })
    }

    const handleReport = (e) => {
        e.preventDefault()
        const payload = {
            id: otherUser?.id,
            type: "report",
            report_reason: reportReason
        }
        apiService.BlockUnblock(payload).then((res) => {
            if (res.success === 1) {
                setReportReason("")
                setCloseReportCart(false)
                setDisabled(true)
                console.log(res.message);
            } else {
                console.log('error====>', res.message);
            }
        })
    }

    return (
        <div className="home">
            <div className="menu">
                <div className="profile_sidebar">
                    <div className="media text-center ">
                        <div className="profile_pic online">
                            {/* <img src={otherUser.profile_image} alt="Admin" className="rounded-circle" style={{ borderRadius: "50%", height: "450px" }} /> */}
                            <img src={otherUser?.profile_image} alt="Admin" className="rounded-circle" style={{ borderRadius: "50%", height: "450px" }} />
                        </div>
                        <div className="m-3">
                            <h4>{otherUser?.u_name}</h4>
                            <p className="text-secondary mb-1">{otherUser?.account_id}</p>
                            <p className="text-muted font-size-sm">{otherUser?.about}</p>
                            <p className="text-muted font-size-sm">
                                <strong><i className="fa fa-clock-o mr-2" aria-hidden="true"></i></strong>
                                {convertTimeToFormatText(otherUser?.last_seen_time)}
                            </p>
                            <div className="card-body">
                                <div className='edit_mydetail'>
                                    <span className='edit'><h4>{otherUser?.count_post}</h4><Link to={`/other-profile/post/${id}`} className='network'>Post</Link></span>
                                    <span className='edit'><h4>{otherUser?.following}</h4><Link to={`/other-profile/following/${id}`} className='network'>Following</Link></span>
                                    <span className='edit'><h4>{otherUser?.followers}</h4><Link to={`/other-profile/followers/${id}`} className='network'>Followers</Link></span>
                                </div>
                            </div>
                            <a className='follow_request mr-1' style={{ position: "relative" }} onClick={() => {
                                handleFollowUnfollowFromOtherUserProfile({
                                    id: otherUser?.id,
                                    is_follow: otherUser?.is_follow !== 'follow' ? "follow" : "pending"
                                })
                            }}>
                                <i className="fa fa-user-plus mr-2"></i>
                                {otherUser?.is_follow === "active" ? ("Friend") : otherUser?.is_follow === "pending" ? ("Requested") : ("Follow")}
                            </a>
                        </div>
                    </div>
                    <div className="card mt-3">
                        <ul>
                            <li className="p-5 border relative">
                                <h6 className="mb-0">
                                    <i className="fa fa-user-circle mr-3" aria-hidden="true"></i>
                                    <a className='network'>Contact Details</a>
                                    <span className='post_count'></span>
                                </h6>
                            </li>
                            <li className="p-5 border relative">
                                <h6 className="mb-0">
                                    <i className="fa fa-bell mr-3" aria-hidden="true"></i>
                                    <a className='network'>Custom Notification</a>
                                    <span className='post_count'><strong>Off</strong></span>
                                </h6>
                            </li>
                        </ul>
                    </div>
                    <div className="card mt-3">
                        <ul>
                            <li className="p-5 border relative">
                                <h6 className="mb-0">
                                    <Link to={`/other-profile/post/${id}`} className='network'>Post</Link>
                                    <span className='post_count'><strong>{otherUser?.count_post === 0 ? " " : otherUser?.count_post}</strong></span>
                                </h6>
                            </li>
                            <li className="p-5 border relative">
                                <h6 className="mb-0"> <a className='network'>Photo, Video, Links, Docs</a>  <span className='post_count'><strong>0</strong></span></h6>
                            </li>
                        </ul>
                    </div>
                    <div className="card mt-3">
                        <ul>
                            <li className="p-5 border relative">
                                <h6 className="mb-0"> <a href="" className='network'>Groups in Common</a><span className='post_count'><strong>0</strong></span></h6>
                            </li>
                        </ul>
                    </div>
                    <div className="card mt-3">
                        <ul>
                            <li className="p-5 border">
                                <h6 className="mb-0" style={{ color: "red" }}>
                                    <i className="fa fa-ban mr-3" aria-hidden="true"></i>
                                    <a className='network' style={{ color: "red", cursor: "pointer" }} onClick={() => {
                                        handleBlockUnblock({
                                            id: otherUser?.id,
                                            type: otherUser?.is_block === 0 ? 1 : 0
                                        })
                                    }}>
                                        {otherUser?.is_block === 0 ? "Block" : "Unblock"}
                                    </a>
                                </h6>
                            </li>
                            <li className="p-5 border">
                                <h6 className="mb-0" style={{ color: "red" }}>
                                    <i className="fa fa-exclamation-triangle mr-3" aria-hidden="true"></i>
                                    <a className='network' style={{ color: "red", cursor: "pointer" }} onClick={() => setCloseReportCart(true)}>Report</a>
                                </h6>
                            </li>
                        </ul>
                    </div>
                    {openReportCart &&
                        <ReactDialogBox
                            closeBox={() => setCloseReportCart(false)}
                            bodyBackgroundColor='white'
                            BorderRadius='10px'
                            bodyWidth='50%'
                        >
                            <h3>Do you want to report this user?</h3>
                            <form onSubmit={handleReport}>
                                <textarea
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out mt-2 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="report"
                                    rows="3"
                                    placeholder="Enter Reason..."
                                    onChange={(e) => {
                                        setReportReason(e.target.value)
                                        setDisabled(false)
                                        if (reportReason.length === 1) {
                                            setDisabled(true)
                                        }
                                    }}
                                    value={reportReason}
                                ></textarea>
                                <button
                                    disabled={disabled}
                                    type="submit"
                                    className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={() => setCloseReportCart(false)}
                                    type="button"
                                    className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 my-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                >
                                    No
                                </button>
                            </form>
                        </ReactDialogBox>
                    }
                </div>
            </div>
            <div className="main">
                <div className="sidebar-right">
                    <div className="bottom-side">
                        <div className="post-center ">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtherProfile