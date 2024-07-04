import React from 'react'
import { useDispatch } from 'react-redux';

//Custom Imports
import { followUnfollowUser } from '../../../store/reducers/followerFollowingSlice';

const FollowUnfollowButton = ({ followID, isFollow, from }) => {
    const dispatch = useDispatch();

    const handleFollowUnfollow = (data) => {
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
            follow_id: data.id
        }
        dispatch(followUnfollowUser(data))
        // apiService.FollowUnfollow(payload).then((res) => {
        //     if (res.success === 1) {
        //         console.log(res.message);
        //     } else {
        //         console.log('error====>', res.message);
        //     }
        // })
    }

    return (
        <>
            <button className="follow  ml-2" onClick={() => {
                handleFollowUnfollow({
                    id: followID,
                    is_follow: isFollow !== 0 ? 0 : 2,
                    from: from
                })
            }}>
                <span className="mr-2 ml-2 w-20">
                    {isFollow === 1 ? ("Following") : isFollow === 0 ? ("Follow") : ("Requested")}
                </span>
            </button>
        </>
    )
}

export default FollowUnfollowButton
