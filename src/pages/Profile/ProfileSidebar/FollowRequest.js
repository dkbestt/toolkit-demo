import React, { useEffect, useState } from 'react'
import Loader from "react-js-loader"
import { useDispatch, useSelector } from 'react-redux'

// Custom Imports
import apiService from '../../../services/apiService'
import UserProfileImgName from '../../../components/UserProfileImgName/UserProfileImgName'
import { decreaseFollowerReq } from '../../../store/reducers/profileSlice'
import { addFollowerRequestUsers, removeFollowerRequestUsers, removeSingleFollowReq } from '../../../store/reducers/followerFollowingSlice'


const FollowRequest = () => {
    const { follower_req_users } = useSelector((state) => ({ ...state.followerFollowing }))
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const data = {
        type: "follow_request",
        other_user_id: "0"
    }
    useEffect(() => {
        setLoading(true)
        dispatch(removeFollowerRequestUsers())
        apiService.UserFollowerFollowing(data).then((res) => {
            if (res.success === 1) {
                dispatch(addFollowerRequestUsers(res.data))
                // setFollowers(res.data)
                setLoading(false)
                // console.log(res);
            } else {
                setLoading(false)
            }
        })
    }, [])

    const handleAcceptRejectReq = (data) => {
        console.log(data);
        // dispatch(removeSingleFollowReq(data))
        // dispatch(decreaseFollowerReq(1))
        apiService.AcceptRejectReq(data).then((res) => {
            if (res.success === 1) {
                dispatch(removeSingleFollowReq(data))
                dispatch(decreaseFollowerReq(1))
                console.log(res.message);
            } else {
                console.log(res.message);
            }
        })

    }

    if (loading) {
        return <div><Loader type="bubble-ping" bgColor={"#619cb0"} color={'transparant'} size={100} /></div>
    }
    return (
        <div>
            <h1>Follow Request List</h1>
            {follower_req_users?.length === 0 && <p>No Request yet...!!</p>}
            <ul>
                {
                    follower_req_users && follower_req_users?.map((f, index) => (
                        <li className='mt-5' key={index}>
                            <div className="post-top">
                                <UserProfileImgName
                                    PROFILE_IMG={f.profile_image}
                                    PROFILE_COLOR={f.profile_color}
                                    FIRST_NAME={f.first_name}
                                    LAST_NAME={f.last_name}
                                    USER_ID={f.user_id}
                                />

                                <div className="follow_name">
                                    <h6>{f.first_name} {f.last_name}</h6>
                                </div>
                                <button className="follow  ml-2" onClick={() => handleAcceptRejectReq({ type: "accept", friend_id: f.user_id })}>
                                    <span className="mr-2 ml-2 w-20">
                                        Accept
                                    </span>
                                </button>
                                <button className="follow  ml-2" onClick={() => handleAcceptRejectReq({ type: "reject", friend_id: f.user_id })}>
                                    <span className="mr-2 ml-2 w-20">
                                        Reject
                                    </span>
                                </button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default FollowRequest
