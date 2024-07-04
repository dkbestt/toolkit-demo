import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux'
import Loader from "react-js-loader"

// Custom Imports
import { convertTimeToFormatText } from '../../utils/Helper';
import apiService from '../../services/apiService'
import { getMyPost, removeMyPostData } from '../../store/reducers/postSlice'
import PostTopSection from './PostTopSection'
import PostBodySection from './PostBodySection'
import PostBottomSection from './PostBottomSection'
import ListEnded from '../../components/ListEnded/ListEnded';

const MyPost = () => {
    const [myPost, setMyPost] = useState([])
    const [offset, setOffset] = useState(0);
    const [hasmore, setHasmore] = useState(true)
    const [isPost, setIsPost] = useState("")
    const dispatch = useDispatch()
    const { mypost } = useSelector((state) => ({ ...state.post }))

    useEffect(() => {
        dispatch(removeMyPostData())
        const postData = {
            type: "post",
            limit: "5",
            offset: offset
        }

        dispatch(getMyPost(postData)).unwrap().then((res) => {
            if (res.length !== 0) {
                let lastID = res[res.length - 1]
                setOffset(lastID.id)
            } else {
                setHasmore(false)
                setIsPost("No post Found");
            }
        })

        // apiService.GetPost(postData).then((res) => {
        //     if (res.success === 1) {
        //         setMyPost(res.data)
        //         const lastID = res.data[res.data.length - 1]
        //         setOffset(lastID.id);
        //     } else {
        //         setHasmore(false)
        //         setIsPost(res.message);
        //     }
        // })
    }, [])

    const fetchData = () => {
        console.log('/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/');
        const morePostData = {
            type: "post",
            limit: "5",
            offset: offset
        }
        dispatch(getMyPost(morePostData)).unwrap().then((res) => {
            if (res.length === 0 && res.length < 5) {
                setHasmore(false)
            } else {
                let lastID = res[res.length - 1]
                setOffset(lastID.id)
            }
        })

        // await apiService.GetPost(morePostData).then((res) => {
        //     if (res.success === 1) {
        //         setMyPost([...myPost, ...res.data])
        //         if (res.data.length === 0 && res.data.length < 10) {
        //             setHasmore(false)
        //         }
        //         let lastID = res.data[res.data.length - 1]
        //         setOffset(lastID.id);
        //     } else {
        //         setHasmore(false)
        //     }
        // })
    }

    return (
        <div>
            {isPost && mypost.length === 0 && <h3>{isPost}</h3>}

            <InfiniteScroll
                dataLength={mypost.length} //This is important field to render the next data
                next={fetchData}
                hasMore={hasmore}
                loader={<Loader type="bubble-ping" bgColor={"#619cb0"} color={'transparant'} size={100} />}
                endMessage={<ListEnded />}
            >
                <div className="all-post">
                    <ul>
                        {
                            mypost?.map((p, index) => (
                                <li key={index}>
                                    <PostTopSection
                                        from="mypost"
                                        postID={p.id}
                                        userID={p.user_id}
                                        tagUser={p.tagged}
                                        pofileImg={p.user.profile_image}
                                        profileColor={p.user.profile_color}
                                        firstName={p.user.first_name}
                                        lastName={p.user.last_name}
                                        time={p.created_at}
                                        onOff={p.turn_off_comment}
                                        postNoti={p.turn_on_post_notification}
                                        isFollow={p.is_follow}
                                        isPublic={p.is_public}
                                    />
                                    <PostBodySection
                                        lat={p.latitude}
                                        long={p.longitude}
                                        location={p.location}
                                        type={p.type}
                                        title={p?.title}
                                        mentionUser={p.mention}
                                        postImg={p?.contents}
                                    />
                                    <PostBottomSection
                                        from="mypost"
                                        userID={p.user_id}
                                        postID={p.id}
                                        likes={p.likes_count}
                                        comments={p.comments_count}
                                        onOff={p.turn_off_comment}
                                        latestComment={p.latest_comment}
                                        saved={p.is_save}
                                        liked={p.is_like}
                                    />
                                </li>

                            ))
                        }
                    </ul>
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default MyPost
