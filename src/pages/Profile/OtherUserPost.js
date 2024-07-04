import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import CryptoJS from "crypto-js"
import Loader from "react-js-loader"
import InfiniteScroll from 'react-infinite-scroll-component';


// Custom Imports
import { CRYPTO_JS_KEY } from '../../constants/Contants';
import { getOtherUserPost, removeOtherPostData } from '../../store/reducers/postSlice';
import PostTopSection from '../Post/PostTopSection';
import PostBodySection from '../Post/PostBodySection';
import PostBottomSection from '../Post/PostBottomSection';
import ListEnded from '../../components/ListEnded/ListEnded';
import { decryptID } from '../../utils/Helper';


const OtherUserPost = () => {
    const { otherUser } = useSelector((state) => ({ ...state.otherUser }))
    // get other user id from URL----------------------------------------------------------
    let { id } = useParams();
    // const ids = window.atob(id);
    // let u_id = id.toString().replace('TriFtEl', '/')
    // var decry_oth_user_id = CryptoJS.AES.decrypt(`${u_id}`, CRYPTO_JS_KEY).toString(CryptoJS.enc.Utf8);
    // console.log(decry_oth_user_id, 'id');
    // ------------------------------------------------------------------------------------
    const [offset, setOffset] = useState(0);
    const [hasmore, setHasmore] = useState(true)
    const [isPost, setIsPost] = useState("")
    const dispatch = useDispatch()
    const { otherpost } = useSelector((state) => ({ ...state.post }))
    useEffect(() => {
        dispatch(removeOtherPostData())
        const postData = {
            type: "post",
            // id: decryptID(id),
            id: id,
            limit: "5",
            offset: offset
        }
        dispatch(getOtherUserPost(postData)).unwrap().then((res) => {
            if (res.length !== 0) {
                let lastID = res[res.length - 1]
                setOffset(lastID.id)
            } else {
                setHasmore(false)
                setIsPost("No post Found");
            }
        })
    }, [])

    const fetchData = () => {
        console.log('/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/');
        const morePostData = {
            type: "post",
            id: id,
            // id: decryptID(id),
            limit: "5",
            offset: offset
        }
        dispatch(getOtherUserPost(morePostData)).unwrap().then((res) => {
            if (res.length === 0 && res.length < 5) {
                setHasmore(false)
            } else {
                let lastID = res[res.length - 1]
                setOffset(lastID.id)
            }
        })
    }

    return (
        <div>
            {otherUser?.is_follow !== "active" ? (
                <h2>You Are not Follow this User...</h2>
            ) : (
                <>
                    {/* <h2>Post List</h2> */}
                    {isPost && otherpost.length === 0 && <h3>{isPost}</h3>}
                    <InfiniteScroll
                        dataLength={otherpost.length} //This is important field to render the next data
                        next={fetchData}
                        hasMore={hasmore}
                        loader={<Loader type="bubble-ping" bgColor={"#619cb0"} color={'transparant'} size={100} />}
                        endMessage={<ListEnded />}
                    >
                        <div className="all-post">
                            <ul>
                                {
                                    otherpost?.map((p, index) => (
                                        <li key={index}>
                                            <PostTopSection
                                                from="otherpost"
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
                                                from="otherpost"
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
                </>
            )}
        </div>
    )
}

export default OtherUserPost
