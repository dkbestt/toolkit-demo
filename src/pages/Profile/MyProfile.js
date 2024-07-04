import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { useFormik } from 'formik'

// Custom Imports
import { Button } from '../../components/Button'
import '../../assets/css/myprofile.css'
import apiService from '../../services/apiService'
import {
    emptyState,
    increaseFollowing,
    increaseFollower,
    increaseFollowerReq,
    increaseProfileView,
    increaseMyPost,
    increaseSavePost,
    increaseTagPost,
} from '../../store/reducers/profileSlice'

const MyProfile = () => {
    const [file, setFile] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [photoURL, setPhotoURL] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)
    const [validationMsg, setValidationMsg] = useState(null)

    const [profile, setProfile] = useState([])
    const dispatch = useDispatch();
    const { following, follower, profile_view, follower_req, total_my_post, total_save_post } = useSelector((state) => ({ ...state.profile }));
    useEffect(() => {
        dispatch(emptyState())
        const data = {
            id: 0
        }
        apiService.ViewProfile(data.id).then((res) => {
            if (res.success === 1) {
                setProfile(res.data)
                setPhotoURL(res.data.profile_image)
                dispatch(increaseFollowing(Number(res.data.following)))
                dispatch(increaseFollower(Number(res.data.followers)))
                dispatch(increaseProfileView(Number(res.data.profile_views)))
                dispatch(increaseFollowerReq(Number(res.data.follow_request)))
                dispatch(increaseMyPost(res.data.count_posts))
                dispatch(increaseTagPost(res.data.count_tag_posts))
                dispatch(increaseSavePost(res.data.count_save_posts))
            } else {
                console.log(res.message);
            }
        })
    }, [])

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    const handleChange = (e) => {
        const file = e[0];
        if (file) {
            setFile(file)
            const ul = URL.createObjectURL(file)
            setPhotoURL(ul)
            // setOpenCrop(true)
        }
    };
    const handleProfileEdit = () => {
        let input = document.createElement('input')
        input.type = 'file'
        input.accept = "image/*"
        input.id = "profilePhoto"
        input.onchange = _ => {
            let files = Array.from(input.files)
            handleChange(files)
        };
        input.click()
    }

    return (
        <div className="home">
            <div className="menu">
                <div className="profile_sidebar">
                    <div className="media text-center ">
                        <div className="profile_pic online">
                            <img src={photoURL} alt="Admin" className="rounded-circle" style={{ borderRadius: "50%", height: "450px" }} />
                            {/* <img className="bg-img" src={profile.profile_image} alt="Avatar" /> */}
                            <div className='my_profile_edit' onClick={() => { setIsOpen(true) }}>
                                <i className="fa fa-pencil"></i>
                            </div>
                        </div>
                        <div className="m-3">
                            <h4>{profile.u_name}</h4>
                            <p className="text-secondary mb-1">{profile.account_id}</p>
                            <p className="text-muted font-size-sm">{profile.about}</p>
                            <div className="card-body">
                                <div className='edit_mydetail'>
                                    <span className='edit'> <h4>{following}</h4> <Link to={"/profile/following"} className='network'>Following</Link> </span>
                                    <span className='edit'> <h4>{follower}</h4> <Link to={"/profile/followers"} className='network'>Follower</Link> </span>
                                    <span className='edit'> <h4>{profile_view}</h4> <Link to={"/profile/profile-views"} className='network'>Profile view</Link> </span>
                                </div>
                            </div>
                            <Link to={"/profile/follow-req"} className='follow_request mr-1' style={{ position: "relative" }}> <i className="fa fa-user-plus mr-2"></i>
                                Follow Request
                                {
                                    follower_req !== 0 && (
                                        <span className="inline-flex items-center justify-center px-2 py-1 ml-2 text-xs font-bold leading-none bg-white-600 rounded-full border">{follower_req}</span>
                                    )
                                }
                            </Link>
                        </div>
                    </div>

                    <div className="card mt-3">
                        <ul className="">
                            <li className="p-5 border flex relative">
                                <h6 className="mb-0"> <a href="" className='network'>Visibility</a> </h6>
                                <span className="ios-toggle mb-10" ><input type="checkbox" name="include-forks1" id="include-forks1" /><label
                                    htmlFor="include-forks1"></label></span>
                            </li>
                        </ul>
                    </div>
                    <div className="card mt-3">
                        <ul>
                            <li className="p-5 border relative">
                                <h6 className="mb-0"> <Link to="/profile/post" className='network'>My Posts</Link>  <span className='post_count'><strong>{total_my_post}</strong></span></h6>
                            </li>
                            <li className="p-5 border relative">
                                <h6 className="mb-0"> <Link to="/profile/tag-post" className='network'>Tagged Post</Link>  <span className='post_count'><strong>{profile.count_tag_posts === 0 ? " " : profile.count_tag_posts}</strong></span></h6>
                            </li>
                            <li className="p-5 border relative">
                                <h6 className="mb-0"> <Link to="/profile/save-post" className='network'>Saved Post</Link>  <span className='post_count'><strong>{total_save_post === 0 ? " " : total_save_post}</strong></span> </h6>
                            </li>
                        </ul>
                    </div>
                    <div className="card mt-3">
                        <ul className="">
                            <li className="p-5 border">
                                <h6 className="mb-0"> <a href="" className='network'>Active Group</a></h6>
                            </li>
                            <li className="p-5 border">
                                <h6 className="mb-0"><a href="" className='network'>Stared Messaged</a></h6>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="main">
                <div className="sidebar-right">
                    <div className="bottom-side">
                        <div className="post-center ">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MyProfile