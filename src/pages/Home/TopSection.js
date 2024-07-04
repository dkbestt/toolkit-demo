import React, { useEffect, useState } from 'react'
import { ReactDialogBox } from 'react-js-dialog-box'
import Modal from '@material-ui/core/Modal';

// Custom Imports
import Image1 from '../../assets/images/1.jpg'
import '../../assets/css/dropdown.css'
import PostCreate from '../Post/PostCreate'

const TopSection = ({ isOpenSetting, setIsOpenSetting }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenProfile, setIsOpenProfile] = useState(false)
    const [isOpenPostCreate, setIsOpenPostCreate] = useState(false)
    const { data } = JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
        setIsOpenPostCreate(false)
        setIsOpenProfile(false)
    }, [])
    const handleSetting = () => {
        { isOpenSetting ? setIsOpenSetting(false) : setIsOpenSetting(true) }
    }

    const handleProfile = () => {
        { isOpenProfile ? setIsOpenProfile(false) : setIsOpenProfile(true) }
    }

    const handlePostCreate = () => {
        { isOpenPostCreate ? setIsOpenPostCreate(false) : setIsOpenPostCreate(true) }
    }

    const handleLogout = () => {

    }

    const FancyButton = React.forwardRef((props, ref) => (
        <Modal ref={ref}
            open={isOpenPostCreate}
            onClose={() => { handlePostCreate() }}
            children={<PostCreate {...{ setIsOpenPostCreate }} />}
        >
            <PostCreate {...{ setIsOpenPostCreate }} />
        </Modal>
    ));
    const ref = React.createRef();
    return (
        <>
            <div className="top-side">
                <ul className="top_menu">
                    <li onClick={handlePostCreate}>
                        <a href="#" className="top-icon"><i className="fa fa-plus-circle"></i></a>
                    </li>
                    <FancyButton ref={ref}>
                        <li onClick={handlePostCreate}>
                            <a href="#" className="top-icon">
                                <i className="fa fa-plus-circle"></i>
                            </a>
                        </li>
                    </FancyButton>
                    <li onClick={() => setIsOpen(true)}>
                        <a href="#" className="noti-bell top-icon hover:bg-[#619cb0]"><i className="fa fa-bell"></i></a>
                    </li>
                    <li>
                        <a href="#" className='top-icon hover:bg-[#619cb0]' ><i className="fa fa-moon-o"></i></a>
                    </li>
                    <li onClick={handleSetting}>
                        <a
                            href="#"
                            className='top-icon hover:bg-[#619cb0]'
                            style={{ backgroundColor: isOpenSetting ? "#619cb0" : "", color: isOpenSetting ? "white" : "" }}
                            id="setting_btn"
                        >
                            <i className="fa fa-cog"></i>
                        </a>
                    </li>
                    <li onClick={handleProfile}>
                        <a href="#" className='top-icon hover:bg-[#619cb0]'>
                            <img className="bg-img" src={data?.user.profile_image} alt="Avatar" />
                        </a>
                        {isOpenProfile &&
                            <div className="dropdown-content">
                                <a href="/profile/post" onClick={handleProfile}>My Profile</a>
                                <a href="#" onClick={handleLogout}>Logout</a>
                            </div>
                        }
                    </li>

                </ul>

                {/* <div className="notifi-div">
                    <ul className="notifi_pop">
                        <li>It's john birthday today <span className="notifi_sub_title">Wish Him Here</span></li>
                    </ul>
                </div> */}
            </div>
            {isOpen &&
                <ReactDialogBox
                    closeBox={() => setIsOpen(false)}
                    bodyBackgroundColor='white'
                    BorderRadius='10px'
                >
                    <div className="container shadow rounded-lg bg-white mx-auto m-8 " id='chat'>
                        <div className="chat-msg-search ">
                            <div className="input-group relative flex items-stretch ">
                                <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-[#619cb0] bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-[#619cb0] focus:bg-white focus:border-[#619cb0] focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                                <button className="btn inline-block px-6 py-2.5 bg-[#619cb0] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#336576] hover:shadow-lg focus:bg-[#336576]  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2" >
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" viewBox="0 0 512 512">
                                        <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <ul className='chat-main left-chat-main custom-scroll'>
                            <li>
                                <div className="w-full flex items-center p-2 border-gray-300 search_list">
                                    <img
                                        className="rounded-full h-10 w-10 border-gray-200 border"
                                        src={Image1}
                                    />
                                    <div className="pl-4 w-full">
                                        <div >
                                            Jaina proudmoore
                                            <h6>Typing...</h6>
                                        </div>

                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="w-full flex items-center p-2 border-gray-300 search_list">
                                    <img
                                        className="rounded-full h-10 w-10 border-gray-200 border"
                                        src={Image1}
                                    />
                                    <div className="pl-4 w-full">
                                        <div >
                                            Jaina proudmoore
                                            <h6>Typing...</h6>
                                        </div>

                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="w-full flex items-center p-2 border-gray-300 search_list">
                                    <img
                                        className="rounded-full h-10 w-10 border-gray-200 border"
                                        src={Image1}
                                    />
                                    <div className="pl-4 w-full">
                                        <div >
                                            Jaina proudmoore
                                            <h6>Typing...</h6>
                                        </div>

                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="w-full flex items-center p-2 border-gray-300 search_list">
                                    <img
                                        className="rounded-full h-10 w-10 border-gray-200 border"
                                        src={Image1}
                                    />
                                    <div className="pl-4 w-full">
                                        <div >
                                            Jaina proudmoore
                                            <h6>Typing...</h6>
                                        </div>

                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </ReactDialogBox>
            }
        </>
    )
}

export default TopSection