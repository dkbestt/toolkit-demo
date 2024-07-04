import React, { useEffect, useState } from 'react'
import Loader from "react-js-loader"
import { useDispatch, useSelector } from 'react-redux'

// Custom Imports
import apiService from '../../../services/apiService'
import FollowUnfollowButton from './FollowUnfollowButton'
import UserProfileImgName from '../../../components/UserProfileImgName/UserProfileImgName'
import { addFollowingUsers, removeFollowingUsers } from '../../../store/reducers/followerFollowingSlice'

const Following = () => {
    const { following_users } = useSelector((state) => ({ ...state.followerFollowing }))
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const data = {
        type: "following",
        other_user_id: "0"
    }
    useEffect(() => {
        setLoading(true)
        dispatch(removeFollowingUsers());
        apiService.UserFollowerFollowing(data).then((res) => {
            if (res.success === 1) {
                dispatch(addFollowingUsers(res.data));
                setLoading(false)
                console.log(res);
            } else {
                setLoading(false)
            }
        })
    }, [])

    if (loading) {
        return <div> <Loader type="bubble-ping" bgColor={"#619cb0"} color={'transparant'} size={100} /></div>
    }
    return (
        <div>
            <h1>Following Users</h1>
            {following_users?.length === 0 && <p>No Following yet...!!</p>}
            <ul>
                {
                    following_users && following_users?.map((f, index) => (
                        <li className='mt-5' key={index}>
                            <div className="post-top">
                                <UserProfileImgName
                                    PROFILE_IMG={f.profile_image}
                                    PROFILE_COLOR={f.profile_color}
                                    FIRST_NAME={f.first_name}
                                    LAST_NAME={f.last_name}
                                    USER_ID={f.follow_id}
                                />
                                {/* {
                                    f.profile_image !== "" ? (
                                        <div className="post_profile"><img src={f.profile_image} alt="img" /></div>
                                    ) : (
                                        <div
                                            className="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-red-500 text-xl text-white uppercase"
                                            style={{ backgroundColor: `${f.profile_color}` }}
                                        >
                                            {f.first_name.charAt(0)}{f.last_name.charAt(0)}
                                        </div>
                                    )
                                } */}

                                <div className="follow_name">
                                    <h6>{f.first_name} {f.last_name}</h6>
                                </div>
                                <div>
                                    <FollowUnfollowButton isFollow={f.is_follow} from="following" followID={f.id} />
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Following
