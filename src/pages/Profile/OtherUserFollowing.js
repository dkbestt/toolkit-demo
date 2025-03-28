import React, { useEffect, useState } from 'react'
import Loader from "react-js-loader";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import InfiniteScroll from 'react-infinite-scroll-component';

// Custom Imports
import UserProfileImgName from '../../components/UserProfileImgName/UserProfileImgName';
import FollowUnfollowButton from './ProfileSidebar/FollowUnfollowButton';
import apiService from '../../services/apiService';
import { decryptID } from '../../utils/Helper';
import { addOtherFollowingUsers, removeOtherFollowingUsers } from '../../store/reducers/followerFollowingSlice';
import ListEnded from '../../components/ListEnded/ListEnded';


const OtherUserFollowing = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data } = JSON.parse(localStorage.getItem("user"))
    const { otherUser } = useSelector((state) => ({ ...state.otherUser }))
    const { other_user_following_users } = useSelector((state) => ({ ...state.followerFollowing }))
    // const [loading, setLoading] = useState(false)
    const [offset, setOffset] = useState(0);
    const [hasmore, setHasmore] = useState(true)
    const payload = {
        type: "following",
        // other_user_id: decryptID(id)
        other_user_id: id,
        offset: offset
    }
    useEffect(() => {
        dispatch(removeOtherFollowingUsers());
        apiService.UserFollowerFollowing(payload).then((res) => {
            if (res.success === 1) {
                dispatch(addOtherFollowingUsers(res.data));
                console.log(res);
                setOffset(offset + 20)
            } else {
                console.log(res.message);
            }
        })
    }, [])

    const fetchData = () => {
        console.log('/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/');
        const payload = {
            type: "following",
            // other_user_id: decryptID(id)
            other_user_id: id,
            offset: offset
        }
        apiService.UserFollowerFollowing(payload).then((res) => {
            if (res.success === 1) {
                dispatch(addOtherFollowingUsers(res.data))
            }
            if (res.data.length === 0 || res.data.length < 20) {
                setHasmore(false)
            } else {
                setOffset(offset + 20)
            }
        })
    }

    // if (loading) {
    //     return <div> <Loader type="bubble-ping" bgColor={"#619cb0"} color={'transparant'} size={100} /></div>
    // }

    return (
        <div>
            {otherUser?.is_follow !== "active" ? (
                <h2>You Are not Follow this User...</h2>
            ) : (
                <>
                    <h1>Following Users</h1>
                    {other_user_following_users?.length === 0 && <p>No Following yet...!!</p>}
                    <ul>
                        <InfiniteScroll
                            dataLength={other_user_following_users.length} //This is important field to render the next data
                            next={fetchData}
                            hasMore={hasmore}
                            loader={<Loader type="bubble-ping" bgColor={"#619cb0"} color={'transparant'} size={100} />}
                            endMessage={<ListEnded />}
                        >
                            {
                                other_user_following_users && other_user_following_users?.map((f, index) => (
                                    <li className='mt-5' key={index}>
                                        <div className="post-top">
                                            <UserProfileImgName
                                                PROFILE_IMG={f.profile_image}
                                                PROFILE_COLOR={f.profile_color}
                                                FIRST_NAME={f.first_name}
                                                LAST_NAME={f.last_name}
                                                USER_ID={f.follow_id}
                                            />
                                            <div className="follow_name">
                                                <h6>{f.first_name} {f.last_name}</h6>
                                            </div>
                                            <div>
                                                {
                                                    data?.user.id !== f.id ? (
                                                        <FollowUnfollowButton isFollow={f.is_follow} from="otherFollowing" followID={f.id} />
                                                    ) : ("")
                                                }
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </InfiniteScroll>
                    </ul>
                </>
            )}
        </div>
    )
}

export default OtherUserFollowing
