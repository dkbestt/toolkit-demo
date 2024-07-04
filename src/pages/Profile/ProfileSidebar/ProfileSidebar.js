import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

// Custom Imports
import ChatList from './ChatList'
import ContactList from './ContactList'
import Images from '../../../assets/images/3.jpg'

const ProfileSidebar = () => {
    const { data } = JSON.parse(localStorage.getItem("user"))
    const [contactActive, setContactActive] = useState("active")
    const [exploreActive, setExploreActive] = useState("")

    useEffect(() => {
        document.getElementById('contacts').style.display = 'none'
        document.getElementById('chat').style.display = ''
    });

    const handleexploreclick = () => {
        document.getElementById('chat').style.display = ''
        document.getElementById('contacts').style.display = 'none'
        document.getElementById('explore_link').style.color = ''
        document.getElementById('contact_link').style.color = '#619cb0'
    }

    const handlecontacttclick = () => {
        document.getElementById('contacts').style.display = ''
        document.getElementById('chat').style.display = 'none'
        document.getElementById('contact_link').style.color = ''
        document.getElementById('explore_link').style.color = '#619cb0'
    }

    return (
        <>
            <div className="profile_sidebar">
                <div className="media text-center ">
                    <div className="profile_pic online">
                        <Link to={"/profile/post"}>
                            <img className="bg-img" src={data?.user.profile_image} alt="Avatar" />
                        </Link>
                    </div>
                    <h2>HELLO {data?.user.first_name} !</h2>
                </div>
                <ul className="relative px-1 ">
                    <div className="chat-tabs text-center">
                        <ul className="nav nav-tabs" role="tablist">
                            <li role="presentation" onClick={handleexploreclick}><a href="#" id="contact_link" className='hover:text[#619cb0]' aria-controls="chat" role="tab"
                                data-toggle="tab">Contacts <span className="badge">5</span></a></li>
                            <li role="presentation" onClick={handlecontacttclick}><a href="#" id="explore_link" className='hover:text[#619cb0]' aria-controls="contacts" role="tab"
                                data-toggle="tab">Explore</a>
                            </li>
                        </ul>
                    </div>
                    <div className="relative px-1">
                        <ContactList />
                        <ChatList />
                    </div>
                </ul>
            </div>
            <div className="chat-cont-toggle">
                <a className="icon-btn btn-fix" href="/"><i className="fa fa-plus"></i></a>
                <ul className="chat-cont-setting">
                    <li><a href="/" data-toggle="modal" data-target="#msgcallModal">New Call</a></li>
                    <li><a href="/" data-toggle="modal" data-target="#exampleModalCenter">New Contact</a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default ProfileSidebar
