import React, { useEffect, useState } from 'react'
import Loader from "react-js-loader"
import InfiniteScroll from 'react-infinite-scroll-component';

// Custom Imports
import apiService from '../../../services/apiService';
import UserProfileImgName from '../../../components/UserProfileImgName/UserProfileImgName';
import { convertTimeToFormatText } from '../../../utils/Helper';
import ListEnded from '../../../components/ListEnded/ListEnded';


const ProfileView = () => {
    const [profileViewList, setProfileViewList] = useState([]);
    // const [loading, setLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [hasmore, setHasmore] = useState(true)
    useEffect(() => {
        // setLoading(true)
        const payload = {
            limit: 20,
            offset: offset
        }
        apiService.GetProfileViewList(payload).then((res) => {
            if (res.success === 1) {
                // setLoading(false)
                setProfileViewList(res.data)
                console.log(res.data, "list 1");
                setOffset(offset + 20)
            } else {
                // setLoading(false)
                console.log("error ====>", res.message, res.success);
            }
        })
    }, [])

    const fetchData = () => {
        console.log('/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/');
        const payload = {
            limit: 20,
            offset: offset
        }
        apiService.GetProfileViewList(payload).then((res) => {
            if (res.success === 1) {
                // console.log(res.data, "list 2");
                setProfileViewList([...profileViewList, ...res.data]);
            }
            if (res.data.length === 0 || res.data.length < 20) {
                setHasmore(false)
            } else {
                setOffset(offset + 20)
            }
        })
    }
    // if (loading) {
    //     return <div><Loader type="bubble-ping" bgColor={"#619cb0"} color={'transparant'} size={100} /></div>
    // }
    return (
        <div>
            <h1>Profile Views Users</h1>
            <ul>
                <InfiniteScroll
                    dataLength={profileViewList.length} //This is important field to render the next data
                    next={fetchData}
                    hasMore={hasmore}
                    loader={<Loader type="bubble-ping" bgColor={"#619cb0"} color={'transparant'} size={100} />}
                    endMessage={<ListEnded />}
                >
                    {
                        profileViewList.map((f, index) => (
                            <li className='mt-5' key={index}>
                                <div className="post-top">
                                    <UserProfileImgName
                                        PROFILE_IMG={f.profile_image}
                                        PROFILE_COLOR={f.profile_color}
                                        FIRST_NAME={f.first_name}
                                        LAST_NAME={f.last_name}
                                        USER_ID={f.id}
                                    />
                                    <div className="post_name">
                                        <h3>{f.first_name} {f.last_name}</h3>
                                        <div className="post-time">{convertTimeToFormatText(f.view_date)}</div>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </InfiniteScroll>
            </ul>
        </div>
    )
}

export default ProfileView
