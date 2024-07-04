import React, { useEffect, useState } from 'react'
import Loader from "react-js-loader"
import UserProfileImgName from '../../components/UserProfileImgName/UserProfileImgName'

//custom imports
import apiService from '../../services/apiService'

const AllUserLikes = ({ postID, from }) => {
    const [allLikeUser, setAllLikeUser] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const payload = {
            post_id: postID,
            limit: 50,
            offset: 0
        }
        apiService.AllUsersPostLikes(payload).then((res) => {
            if (res.success === 1) {
                setLoading(false)
                setAllLikeUser(res.data)
                console.log(res.data);
            } else {
                setLoading(false)
                console.log(res.message);
            }
        })
    }, [])
    return (
        <div>
            {
                loading && <Loader type="bubble-ping" bgColor={"#619cb0"} color={'transparant'} size={100} />
            }
            <h2>User Likes</h2>
            <ul className="custom-scroll">
                {
                    allLikeUser && allLikeUser?.map(({ user }, index) => (
                        <li className='mt-2' key={index} style={{margin:'5px 0px'}}>
                            <div className="post-top" style={{margin:"-12px"}}>
                                <UserProfileImgName
                                    PROFILE_IMG={user.profile_image}
                                    PROFILE_COLOR={user.profile_color}
                                    FIRST_NAME={user.first_name}
                                    LAST_NAME={user.last_name}
                                    USER_ID={user.id}
                                />
                                {/* {
                                    users.user.profile_image !== "" ? (
                                        <div className="post_profile"><img src={users.user.profile_image} alt="img" /></div>
                                    ) : (
                                        <div
                                            className="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-red-500 text-xl text-white uppercase"
                                            style={{ backgroundColor: `${users.user.profile_color}` }}
                                        >
                                            {users.user.first_name.charAt(0)}{users.user.last_name.charAt(0)}
                                        </div>
                                    )
                                } */}
                                <div className="follow_name">
                                    <h6>{user.first_name} {user.last_name}</h6>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default AllUserLikes
