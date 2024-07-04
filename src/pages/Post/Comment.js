import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Custom Imports
import '../../assets/css/comment.css'
import apiService from '../../services/apiService'
import { addComment, addCommentReply, deleteComment, deleteCommentReply, getComment, removeCommentData } from '../../store/reducers/commentSlice'
import { decreaseCountComment, increaseCountComment } from '../../store/reducers/postSlice'
import { convertTimeToFormatText } from '../../utils/Helper'

const Comment = ({ postID, userID, from }) => {
    const { data } = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch();
    const { comment } = useSelector((state) => ({ ...state.comment }))
    const [loading, setLoading] = useState(false)
    const [postComm, setPostComm] = useState("")
    const [postCommReply, setPostCommReply] = useState("")
    const [disabled, setDisabled] = useState(true)

    // get all comments from API
    useEffect(() => {
        setLoading(true)
        dispatch(removeCommentData())
        const commentData = {
            post_id: postID,
            limit: 10
        }
        dispatch(getComment(commentData)).unwrap().then((res) => {
            setLoading(false)
        })
    }, [])

    // comment reply form hide-show
    const handleCommentReply = (element) => {
        document.getElementById(element).style.display = ""
    }
    const handleCancel = (element) => {
        document.getElementById(element).style.display = "none"
    }

    // delete comments from post
    const handleDeleteComment = (id) => {
        const d = {
            post_id: postID,
            from
        }
        apiService.DeleteComment(id).then((res) => {
            if (res.success === 1) {
                dispatch(deleteComment(id))
                dispatch(decreaseCountComment(d)) // drecrese comment count when delete-comment from commentSlice
                // console.log(res.message);
            } else {
                console.log("error=>", res.message);
            }
        })
    }

    const handleDeleteCommentReply = (data) => {
        const d = {
            post_id: postID,
            from
        }
        apiService.DeleteComment({ id: data.id }).then((res) => {
            if (res.success === 1) {
                dispatch(deleteCommentReply(data))
                dispatch(decreaseCountComment(d)) // drecrese comment count when delete-comment-reply from commentSlice
                // console.log(res.message);
            } else {
                console.log("error=>", res.message);
            }
        })
    }

    const submitComment = (e) => {
        e.preventDefault()
        const commData = {
            post_id: postID,
            comment_text: postComm
        }
        const d = {
            post_id: postID,
            from
        }
        apiService.AddComment(commData).then((res) => {
            if (res.success === 1) {
                var POST_COMMENT = {
                    id: res.data.id,
                    post_id: res.data.post_id,
                    user_id: res.data.user_id,
                    comment_text: res.data.comment_text,
                    created_at: res.data.created_at,
                    updated_at: res.data.updated_at,
                    comment_reply: [],
                    mention: null,
                    user: {
                        id: data.user.id,
                        first_name: data.user.first_name,
                        last_name: data.user.last_name,
                        profile_image: data.user.profile_image,
                        profile_color: data.user.profile_color,
                    }
                }
                dispatch(addComment(POST_COMMENT))
                dispatch(increaseCountComment(d)) // increase comment count when delete-comment-reply from commentSlice
                setPostComm("")
                setDisabled(true)
            } else {
                console.log('error ===>', res.message);
                setDisabled(true)
            }
        })
    }

    const submitCommentReply = (id) => (e) => {
        e.preventDefault()
        handleCancel(id) // after send comment - comment bar field close 
        const commReplyData = {
            post_id: postID,
            is_comment_reply: 1,
            comment_id: id,
            main_comment_id: id,
            comment_text: postCommReply,
            mention: null
        }
        const d = {
            post_id: postID,
            from
        }
        apiService.AddComment(commReplyData).then((res) => {
            if (res.success === 1) {
                var POST_COMMENT_REPLY = {
                    id: res.data.id,
                    post_id: res.data.post_id,
                    user_id: res.data.user_id,
                    comment_text: res.data.comment_text,
                    is_comment_reply: res.data.is_comment_reply,
                    comment_id: res.data.comment_id,
                    main_comment_id: res.data.main_comment_id,
                    created_at: res.data.created_at,
                    updated_at: res.data.updated_at,
                    is_deleted: 0,
                    mention: null,
                    user: {
                        id: data.user.id,
                        first_name: data.user.first_name,
                        last_name: data.user.last_name,
                        profile_image: data.user.profile_image,
                        profile_color: data.user.profile_color,
                    }
                }
                dispatch(addCommentReply(POST_COMMENT_REPLY))
                dispatch(increaseCountComment(d)) // increase comment count when delete-comment-reply from commentSlice
                setPostCommReply("")
                setDisabled(true)
            } else {
                console.log('error ===>', res.message);
                setDisabled(true)
            }
        })
    }

    return (
        <>
            <ul className='chat-main left-chat-main custom-scroll'>
                {loading && <h3>Loading......</h3>}
                <li>
                    {
                        comment && comment.map((comm, index) => (
                            <div className="comment_ui custom_scroll" key={index}>
                                <div className="comment_img">
                                    <a href={data?.user.id === comm.user.id ? `/profile/post` : `/other-profile/post/${comm.user.id}`}>
                                        <img src={comm.user.profile_image} alt="img" />
                                    </a>
                                </div>
                                <div className="comm_right">
                                    <div className="comm_name">{comm.user.first_name} {comm.user.last_name}<span className="comm_time">{convertTimeToFormatText(comm.created_at)}</span></div>
                                    <div className="comm_txt">{comm.comment_text}</div>
                                    <div className="comm-bottom">
                                        <div className="comm_reply"><a onClick={() => handleCommentReply(comm.id)}>Reply</a></div>
                                        {
                                            data?.user.id === userID ? (
                                                <div className="comm_reply" onClick={() => handleDeleteComment({ id: comm.id })}><a>Delete</a></div>
                                            ) : (
                                                <>
                                                    {
                                                        data?.user.id === comm.user_id && (
                                                            <div className="comm_reply" onClick={() => handleDeleteComment({ id: comm.id })}><a>Delete</a></div>
                                                        )
                                                    }
                                                </>
                                            )
                                        }
                                    </div>
                                    <div className="post_form pt-5 pb-2" id={comm.id} style={{ display: "none" }}>
                                        <form onSubmit={submitCommentReply(comm.id)}>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id={comm.id}
                                                    placeholder="Write Comment here..."
                                                    value={postCommReply}
                                                    onChange={(e) => {
                                                        setPostCommReply(e.target.value)
                                                        setDisabled(false)
                                                    }}
                                                />
                                            </div>
                                            <button type="submit" className="sent btn btn-default" disabled={disabled}>Sent</button>
                                            <a className="sent btn btn-default cross_button" onClick={() => handleCancel(comm.id)}>
                                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" > <path fillRule="evenodd" clipRule="evenodd" d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" /> </svg>
                                            </a>
                                        </form>
                                    </div>
                                    {
                                        comm?.comment_reply && comm?.comment_reply.map((comm_reply, index2) => (
                                            <div className="comment_ui" key={index2}>
                                                <div className="comment_img">
                                                    <a href={data?.user.id === comm_reply.user.id ? `/profile/post` : `/other-profile/post/${comm_reply.user.id}`}>
                                                        <img src={comm_reply.user.profile_image} alt="img" />
                                                    </a>
                                                </div>
                                                <div className="comm_right">
                                                    <div className="comm_name">{comm_reply.user.first_name} {comm_reply.user.last_name}<span className="comm_time">{convertTimeToFormatText(comm_reply.created_at)}</span></div>
                                                    <div className="comm_txt">{comm_reply.comment_text}</div>
                                                    <div className="comm-bottom">
                                                        {
                                                            data?.user.id === userID ? (
                                                                <div className="comm_reply" onClick={() => handleDeleteCommentReply({ id: comm_reply.id, comment_id: comm_reply.comment_id })}><a>Delete</a></div>
                                                            ) : (
                                                                <>
                                                                    {
                                                                        data?.user.id === comm_reply.user_id && (
                                                                            <div className="comm_reply" onClick={() => handleDeleteCommentReply({ id: comm_reply.id, comment_id: comm_reply.comment_id })}><a>Delete</a></div>
                                                                        )
                                                                    }
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </li>
            </ul>
            <div className="post_form">
                <form onSubmit={submitComment}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="comment1"
                            placeholder="Write Comment here..."
                            onChange={(e) => {
                                setPostComm(e.target.value)
                                setDisabled(false)
                            }}
                            value={postComm}
                        />
                    </div>
                    <button type="submit" className="btn btn-default" disabled={disabled}>Post</button>
                </form>
            </div>
        </>
    )
}

export default Comment