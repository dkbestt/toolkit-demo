import React from 'react'

// Custom Imports
import Image1 from '../../../assets/images/2.jpg'

const ChatList = (props) => {

    return (
        <>
            <div className="chat-msg-search ">
                <div className="input-group relative flex items-stretch ">
                    <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-[#619cb0] bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-[#619cb0] focus:bg-white focus:border-[#619cb0] focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                    <i className="fa fa-search search-icon" ></i>
                </div>
            </div>
            <ul className='chat-main left-chat-main custom-scroll'>
                <li>
                    <div className="chat-box search_list">
                        <div className="profile offline"><img className="bg-img" src={Image1} alt="Avatar" /></div>
                        <div className="details">
                            <h5>Jony Lynetin</h5>
                            <h6>Hi, i am josephin. How are you.. ! There are many variations of passages.</h6>
                        </div>
                        <div className="date-status">
                            <h6 className="font-danger">Failed</h6>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="chat-box search_list">
                        <div className="profile online"><img className="bg-img" src={Image1} alt="Avatar" /></div>
                        <div className="details">
                            <h5>Pravin Suvagiya</h5>
                            <h6>Typing...</h6>
                        </div>
                        <div className="date-status">
                            <h6 className="font-success">Seen</h6>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="chat-box search_list">
                        <div className="profile online"><img className="bg-img" src={Image1} alt="Avatar" /></div>
                        <div className="details">
                            <h5>Pravin Suvagiya</h5>
                            <h6>Typing...</h6>
                        </div>
                        <div className="date-status">
                            <h6 className="font-success">Seen</h6>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="chat-box search_list">
                        <div className="profile online"><img className="bg-img" src={Image1} alt="Avatar" /></div>
                        <div className="details">
                            <h5>Pravin Suvagiya</h5>
                            <h6>Typing...</h6>
                        </div>
                        <div className="date-status">
                            <h6 className="font-success">Seen</h6>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="chat-box search_list">
                        <div className="profile unreachable"><img className="bg-img" src={Image1} alt="Avatar" />
                        </div>
                        <div className="details">
                            <h5>Sufiya Elija</h5>
                            <h6>I need job, please help me.</h6>
                        </div>
                        <div className="date-status">
                            <div className="badge">18</div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="chat-box search_list">
                        <div className="profile unreachable"><img className="bg-img" src={Image1} alt="Avatar" />
                        </div>
                        <div className="details">
                            <h5>Sufiya Elija</h5>
                            <h6>I need job, please help me.</h6>
                        </div>
                        <div className="date-status">
                            <div className="badge">18</div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="chat-box search_list">
                        <div className="profile unreachable"><img className="bg-img" src={Image1} alt="Avatar" />
                        </div>
                        <div className="details">
                            <h5>Sufiya Elija</h5>
                            <h6>I need job, please help me.</h6>
                        </div>
                        <div className="date-status">
                            <div className="badge">18</div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="chat-box search_list">
                        <div className="profile busy"><img className="bg-img" src={Image1} alt="Avatar" /></div>
                        <div className="details">
                            <h5>Josephin water</h5>
                            <h6>Hi, i am josephin. How are you.. ! There are many variations of passages.</h6>
                        </div>
                        <div className="date-status">

                        </div>
                    </div>
                </li>


            </ul>
        </>
    )
}

export default ChatList