import React, { useEffect, useState } from 'react'
import { ReactDialogBox } from 'react-js-dialog-box'
import apiService from '../../services/apiService'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "react-js-loader";
import Modal from '@material-ui/core/Modal';
import Map from '../../components/Map/Map'
import { makeStyles } from '@material-ui/core/styles';

import { addSerachData, addTagData, removeSerachData, removeTagData } from '../../store/reducers/serchSlice'
import { resetIsCommentTurnOff, resetIsPublicPost, setIsCommentTurnOff, setIsPublicPost } from '../../store/reducers/settingSlice';
import Mention from './Mention';

const PostSetting = () => {
    let list = []
    useEffect(() => {
        setCheckList([])
    }, [])
    const [isOpenTag, setIsOpenTag] = useState(false)
    const [loading, setIsLoaded] = useState(0)
    const [checkList, setCheckList] = useState([])
    const dispatch = useDispatch();
    const { data } = JSON.parse(localStorage.getItem("user"))
    const latitude = parseFloat(data.user.latitude);
    const longitude = parseFloat(data.user.longitude)
    const [lat, setLat] = useState(latitude)
    const [lng, setLng] = useState(longitude)
    const [address, setAddress] = useState("")
    const [open, setOpen] = React.useState(false);
    const { search_users } = useSelector((state) => ({ ...state.search }))

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            top: '40%',
            left: '30%',
            width: 800,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));
    const classes = useStyles();
    const handlePublicPost = (id) => {
        var is_checked = document.getElementById(id).checked;
        { is_checked ? dispatch(setIsPublicPost()) : dispatch(resetIsPublicPost()) }
    }
    const handleCommentNotification = (id) => {
        var is_checked = document.getElementById(id).checked;
        { is_checked ? dispatch(setIsCommentTurnOff()) : dispatch(resetIsCommentTurnOff()) }
    }
    const handleTagPeople = () => {
        setIsLoaded(true)
        setIsOpenTag(true)
        const data = {
            flag: "tag_post"
        }
        dispatch(removeSerachData())
        apiService.SearchContact(data).then((res) => {
            if (res.success === 1) {
                dispatch(addSerachData(res.data))
                setIsLoaded(false)
            } else {
                setIsLoaded(false)
            }
        })
    }
    const handleChangeSearch = (e) => {
        setIsLoaded(true)
        setIsOpenTag(true)

        const data = {
            flag: 'tag_post',
            term: e.target.value
        }
        dispatch(removeSerachData())
        apiService.SearchContact(data).then((res) => {
            if (res.success === 1) {
                dispatch(addSerachData(res.data))
                setIsLoaded(false)
            } else {
                setIsLoaded(false)
            }
        })
    }
    const handlecheckClick = (check_item, index) => {
        var is_checked = document.getElementById(check_item).checked;
        if (is_checked) {
            list.push(search_users[index])
            setCheckList([search_users[index], ...checkList]);
        } else {
            setCheckList(checkList.filter(({ id }) => id !== check_item));
        }
    }
    const setTagData = () => {
        dispatch(removeTagData())
        dispatch(addTagData(checkList))

        setIsOpenTag(false)
        setCheckList([])
    }

    return (
        <>
            <Mention />
            <ul className="modal-option">
                <li><a href="#"><i className="fa fa-users" ></i> Public Post</a>
                    <span className="ios-toggle"><input type="checkbox" name="include-forks" id="is-public" onClick={() => { handlePublicPost("is-public") }} /><label
                        htmlFor="include-forks"></label></span>
                </li>
            </ul>
            <ul className="modal-option">
                <li><a href="#" data-toggle="modal" data-target="#exampleModalfriend" onClick={handleTagPeople}><i
                    className="fa fa-tag"></i> Tag People <span><i className="fa fa-angle-right"></i></span></a></li>
                <li><a href="#" data-toggle="modal" data-target="#exampleModalLocation" onClick={() => { setOpen(true) }}><i
                    className="fa fas fa-map-marker-alt"></i> Add Location <span><i className="fa fa-angle-right"></i></span></a></li>
                <li><a href="#"><i className="fa fa-commenting"></i> Turn off Commenting</a>
                    <span className="ios-toggle"><input type="checkbox" name="include-forks" id="turn-on-noti" onClick={() => { handleCommentNotification("turn-on-noti") }} /><label
                        htmlFor="include-forks"></label></span>
                </li>
            </ul>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
            >
                <div className={classes.paper}>
                    <Map
                        // google={this.props.google}
                        {...{ lat, setLat, lng, setLng }}
                    />
                    <div className="modal-footer mt-10">
                        <button type="button" className="btn btn-primary button-effect btn-sm" data-dismiss="modal" onClick={() => { setOpen(false) }}>Done</button>
                    </div>
                </div>
            </Modal>

            {isOpenTag &&
                <ReactDialogBox
                    closeBox={() => { setIsOpenTag(false) }}
                    modalWidth='60%'
                    bodyBackgroundColor='white'
                    BorderRadius='10px'
                >
                    {loading &&
                        <Loader type="bubble-top" bgColor={"#619cb0"} color={'transparant'} size={30} />
                    }
                    <h1>Search People  </h1>
                    <div className="chat-msg-search relative mb-5">
                        <div className="input-group relative flex items-stretch ">
                            <input type="search" onChange={handleChangeSearch} className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-[#619cb0] bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-[#619cb0] focus:bg-white focus:border-[#619cb0] focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                            <i className="fa fa-search search-icon" ></i>
                        </div>
                        <div className="date-status  hover:text-[#619cb0] z-10 absolute right-0">
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary button-effect btn-sm" data-dismiss="modal" onClick={setTagData} >done</button>
                            </div>
                        </div>
                    </div>
                    <ul className='overflow-x-auto left-chat-main  flex mt-10 mb-0' >
                        {checkList?.map((f, index) => (
                            <li key={index}>
                                <div className="chat-box search_list">
                                    {
                                        f.profile_image !== "" ? (
                                            <div className="profile online"><img className="bg-img" src={f.profile_image} alt="Avatar" /></div>
                                        ) : (
                                            <div
                                                className='profile offline bg-img'
                                                style={{ backgroundColor: `${f.profile_color}`, color: 'white', textAlign: 'center', verticalAlign: 'center' }}
                                            >
                                                {f.first_name.charAt(0)}{f.last_name.charAt(0)}
                                            </div>
                                        )
                                    }
                                    {/* <div className="profile offline"><img className="bg-img" src={Image1} alt="Avatar" /></div> */}
                                </div>

                            </li>
                        ))}
                    </ul>
                    {search_users?.length === 0 && <p>No Search found yet...!!</p>}
                    {
                        <>
                            <ul className='chat-main left-chat-main custom-scroll relative'>
                                {search_users?.map((f, index) => (
                                    <li key={index}>
                                        <div className="chat-box search_list">
                                            {
                                                f.profile_image !== "" ? (
                                                    <div className="profile online"><img className="bg-img" src={f.profile_image} alt="Avatar" /></div>
                                                ) : (
                                                    <div
                                                        className='profile offline bg-img'
                                                        style={{ backgroundColor: `${f.profile_color}`, color: 'white', textAlign: 'center', verticalAlign: 'center' }}
                                                    >
                                                        {f.first_name.charAt(0)}{f.last_name.charAt(0)}
                                                    </div>
                                                )
                                            }
                                            <div className="details">
                                                <h6>{f.first_name} {f.last_name}</h6>
                                            </div>
                                            <div className="date-status">
                                                <input type="checkbox" id={f.id} name="vehicle1" onClick={() => { handlecheckClick(f.id, index) }}></input>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    }
                </ReactDialogBox>
            }
        </>
    )
}

export default PostSetting