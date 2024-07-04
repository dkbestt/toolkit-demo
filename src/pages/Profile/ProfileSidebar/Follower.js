import React, { useEffect, useState } from 'react'
import Loader from "react-js-loader";
import { useDispatch, useSelector } from 'react-redux';

// Custom Imports
import apiService from '../../../services/apiService';
import FollowUnfollowButton from './FollowUnfollowButton';
import UserProfileImgName from '../../../components/UserProfileImgName/UserProfileImgName';
import { addFollowerUsers, removeFollowerUsers } from '../../../store/reducers/followerFollowingSlice';

const Follower = () => {
    const { follower_users } = useSelector((state) => ({ ...state.followerFollowing }))
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const data = {
        type: "follower",
        other_user_id: "0"
    }
    useEffect(() => {
        setLoading(true)
        dispatch(removeFollowerUsers())
        apiService.UserFollowerFollowing(data).then((res) => {
            if (res.success === 1) {
                dispatch(addFollowerUsers(res.data))
                setLoading(false)
                console.log(res);
            } else {
                setLoading(false)
            }
        })
    }, [])

    if (loading) {
        return <div><Loader type="bubble-ping" bgColor={"#619cb0"} color={'transparant'} size={100} /></div>
    }
    return (
        <div>
            <h1>Followers Users</h1>
            {follower_users?.length === 0 && <p>No Followers yet...!!</p>}
            <ul>
                {
                    follower_users && follower_users?.map((f, index) => (
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
                                <div>
                                    <FollowUnfollowButton isFollow={f.is_follow} from="follower" followID={f.id} />
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Follower
