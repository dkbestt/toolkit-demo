import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from "react-js-loader";

// Custom Imports
import PostTopSection from '../../pages/Post/PostTopSection'
import PostBodySection from '../../pages/Post/PostBodySection'
import PostBottomSection from '../../pages/Post/PostBottomSection'
import { getAllPost, removePostData } from '../../store/reducers/postSlice'
import ListEnded from '../../components/ListEnded/ListEnded';

const PostList = () => {

    const dispatch = useDispatch();
    const { post } = useSelector((state) => ({ ...state.post }))
    const [myPost, setMyPost] = useState([])
    const [offset, setOffset] = useState(0);
    const [hasmore, setHasmore] = useState(true)
    useEffect(() => {
        dispatch(removePostData())
        dispatch(getAllPost(offset)).unwrap().then((res) => {
            if (res.length !== 0) {
                let lastID = res[res.length - 1]
                setOffset(lastID.id)
            } else {
                setHasmore(false)
            }
        })
        // apiService.GetAllPost(offset).then((res) => {
        //     console.log(res.data, 'data');
        //     if (res.success === 1) {
        //         setMyPost(res.data)
        //         let lastID = res.data[res.data.length - 1]
        //         console.log(lastID.id, 'last 1');
        //         setOffset(lastID.id)
        //     }
        // })
    }, [])


    const fetchData = async () => {
        // console.log('/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/');
        dispatch(getAllPost(offset)).unwrap().then((res) => {
            if (res.length === 0 && res.length < 10) {
                setHasmore(false)
            } else {
                let lastID = res[res.length - 1]
                setOffset(lastID.id)
            }
        })

        // apiService.GetAllPost(offset).then((res) => {
        //     console.log(res.data, 'more data');
        //     if (res.success === 1) {
        //         setMyPost([...myPost, ...res.data])
        //         if (res.data.length === 0 && res.data.length < 5) {
        //             console.log('in', res.data.length);
        //             setHasmore(false)
        //         }
        //         let lastID = res.data[res.data.length - 1]
        //         console.log(lastID.id, 'last 2');
        //         setOffset(lastID.id);
        //     }
        // })
    }

    return (
        // <div className="all-post">
        //     <ul className="custom-scroll">
        //         <li>
        //             <PostTopSection />
        //             <PostBodySection />
        //             <PostBottomSection />
        //         </li>
        //     </ul>
        // </div>

        <InfiniteScroll
            dataLength={post.length} //This is important field to render the next data
            next={fetchData}
            hasMore={hasmore}
            loader={<Loader type="bubble-ping" bgColor={"#619cb0"} color={'transparant'} size={100} />}
            endMessage={<ListEnded />}
        >
            <div className="all-post">
                <ul className="">
                    {post?.map((p, index) => (
                        <li key={index}>
                            <PostTopSection
                                from="post"
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
                                from="post"
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
    )
}

export default PostList


