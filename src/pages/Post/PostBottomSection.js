import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactDialogBox } from 'react-js-dialog-box'
import Modal from "react-modal"

// Custom Imports
import '../../assets/css/dialogbox.css'
import '../../assets/css/comment.css'
import Comment from './Comment'
import AllUserLikes from './AllUserLikes'
import apiService from '../../services/apiService'
import { convertTimeToFormatText } from '../../utils/Helper'
import { decreaseSavePost, increaseSavePost } from '../../store/reducers/profileSlice'
import { addLatestComment, postLikeUnlike, postSaveUnsave } from '../../store/reducers/postSlice'

const PostBottomSection = ({ likes, onOff, comments, userID, postID, latestComment, from, saved, liked }) => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenAllUserLike, setIsOpenAllUserLike] = useState(false)
    const [postComm, setPostComm] = useState("")
    const [disabled, setDisabled] = useState(true)
    const { data } = JSON.parse(localStorage.getItem("user"))

    const handleChange = (event) => {
        if (!setPostComm(event.target.value)) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    // comment on post from outside of post
    const submitComment = (e) => {
        e.preventDefault()
        const commData = {
            post_id: postID,
            comment_text: postComm
        }
        apiService.AddComment(commData).then((res) => {
            if (res.success === 1) {
                var POST_COMMENT = {
                    countComment: +1, //user add comment - comment count increse
                    from: from,
                    id: res.data.id,
                    post_id: res.data.post_id,
                    user_id: res.data.user_id,
                    comment_text: res.data.comment_text,
                    created_at: res.data.created_at,
                    updated_at: res.data.updated_at,
                }
                dispatch(addLatestComment(POST_COMMENT))
                setPostComm("")
                setDisabled(true)
            } else {
                console.log('error ===>', res.message);
                setDisabled(true)
            }
        })
    }

    // save post 
    const handlePostSave = (data) => {
        const saveData = {
            post_id: data.post_id,
            type: data.type === 1 ? "save" : "unsave"
        }
        apiService.PostSave(saveData).then((res) => {
            if (res.success === 1) {
                dispatch(postSaveUnsave(data))
                if (res.message === "Saved") {
                    dispatch(increaseSavePost(1))
                } else {
                    dispatch(decreaseSavePost(1))
                }
                console.log(res.message);
            } else {
                console.log("error===>", res.message);
            }
        })
    }

    //.. handle POST Like Unlike
    const handlePostLikeUnlike = (data) => {
        dispatch(postLikeUnlike(data)) // post like & is_like - add/remove
        const requestData = {
            post_id: data.post_id,
            type: data.type === 1 ? 'like' : 'unlike'
        }
        apiService.PostLikeUnlike(requestData).then((res) => {
            if (res.success === 1) {
                console.log(res.message);
            } else {
                console.log("error===>", res.message);
            }
        })
    }

    return (
        <>
            <div className="post-visual-content">
                <div className="post-like">
                    <i
                        style={{ color: '#619cb0' }}
                        className={liked === 1 ? "fas fa-heart-o" : "fa fa-heart-o"}
                        onClick={() => {
                            handlePostLikeUnlike({
                                from: from,
                                post_id: postID,
                                type: liked === 1 ? 0 : 1,
                                countLike: liked === 1 ? -1 : +1
                            })
                        }}
                        aria-hidden="true"
                    ></i>
                    <span onClick={() => likes !== 0 ? setIsOpenAllUserLike(true) : setIsOpenAllUserLike(false)} style={{ cursor: "pointer", marginLeft: "7px" }}>{likes}</span>
                    {isOpenAllUserLike &&
                        <ReactDialogBox
                            closeBox={() => setIsOpenAllUserLike(false)}
                            bodyBackgroundColor='white'
                            BorderRadius='10px'
                            bodyWidth='50%'
                        >
                            <AllUserLikes {...{ postID, from }} />
                        </ReactDialogBox>
                        // <Modal
                        //     isOpen={isOpenAllUserLike}
                        //     onRequestClose={() => setIsOpenAllUserLike(false)}
                        //     contentLabel="Modal"
                        //     className={{
                        //         base: 'modal-base',
                        //         afterOpen: 'modal-base_after-open',
                        //         beforeClose: 'modal-base_before-close'
                        //     }}
                        //     overlayClassName={{
                        //         base: 'overlay-base',
                        //         afterOpen: 'overlay-base_after-open',
                        //         beforeClose: 'overlay-base_before-close'
                        //     }}
                        //     shouldCloseOnOverlayClick={true}
                        //     closeTimeoutMS={2000}
                        // >
                        //     <AllUserLikes {...{ postID, from }} />
                        //     <button onClick={() => setIsOpenAllUserLike(false)}>Close</button>
                        // </Modal>
                    }
                </div>
                <div className="post-comment">
                    {isOpen &&
                        <>
                            {
                                onOff === 0 ? (
                                    <ReactDialogBox
                                        closeBox={() => setIsOpen(false)}
                                        bodyBackgroundColor='white'
                                        BorderRadius='10px'
                                        bodyWidth='50%'
                                    >
                                        <Comment {...{ postID, userID, from }} />
                                    </ReactDialogBox>
                                ) : (
                                    <ReactDialogBox
                                        closeBox={() => setIsOpen(false)}
                                        bodyBackgroundColor='white'
                                        BorderRadius='30px'
                                        bodyWidth='50%'
                                        bodyTextColor='#619cb0'
                                    >
                                        <p>You have turned off comment for this post.</p>
                                        <button
                                            className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Ok, I got it.
                                        </button>
                                    </ReactDialogBox>
                                )
                            }
                        </>
                    }
                    <i className="fa fa-commenting-o" onClick={() => setIsOpen(true)}></i> <span>{comments}</span>
                </div>
                <div className="post-bookmark">
                    <i className="fa fa-paper-plane-o"></i>
                    <i
                        className={saved === 1 ? "fas fa-bookmark-o" : "fa fa-bookmark-o"}
                        onClick={() => {
                            handlePostSave({
                                post_id: postID,
                                type: saved === 1 ? 0 : 1,
                                from: from,
                            })
                        }}
                    >
                    </i>
                    {/* {saved === 0 ? "save" : "unsave"} */}
                </div>
            </div>
            {
                onOff === 0 && (
                    <div className="post_form">
                        {
                            latestComment && (
                                <div className="comment_ui">
                                    <div className="comment_img">
                                        <a href={data?.user.id === latestComment.user_id ? `/profile/post` : `/other-profile/post/${latestComment.user_id}`}>
                                            <img src={data?.user.profile_image} alt="img" />
                                        </a>
                                    </div>
                                    <div className="comm_right">
                                        <div className="comm_name">{data?.user.first_name} {data?.user.last_name}<span className="comm_time">{convertTimeToFormatText(latestComment.created_at)}</span></div>
                                        <div className="comm_txt">{latestComment.comment_text}</div>
                                        {/* <div className="comm-bottom">
                                            <div className="comm_reply"><a href="#">Reply</a></div>
                                            <div className="comm_reply"><a href="#">Delete</a></div>
                                        </div> */}
                                    </div>
                                </div>
                            )
                        }
                        <form onSubmit={submitComment}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="comment1"
                                    placeholder="Write Comment here..."
                                    onChange={handleChange}
                                    value={postComm}
                                />
                            </div>
                            <button type="submit" className="btn btn-default" disabled={disabled}>Post</button>
                        </form>
                    </div>
                )
            }
        </>
    )
}

export default PostBottomSection