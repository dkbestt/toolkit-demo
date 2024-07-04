import React, { useEffect, useState } from "react";
import { addSerachData, addMentionData, removeSerachData, removeMentionData } from '../../store/reducers/serchSlice'
import { resetIsCommentTurnOff, resetIsPublicPost, setIsCommentTurnOff, setIsPublicPost } from '../../store/reducers/settingSlice';
import { ReactDialogBox } from 'react-js-dialog-box'
import apiService from '../../services/apiService'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "react-js-loader";

const Mention = () => {
    let list = []
    const [loading, setIsLoaded] = useState(0)
    const [checkList, setCheckList] = useState([])
    const [search, setSearch] = useState("")
    const [isOpenMention, setIsOpenMention] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
        setCheckList([])
    }, [])
  
    const { search_users } = useSelector((state) => ({ ...state.search }))
const handleMention=(value)=>{
    if(value.includes('@')) {
        var search = value.substr(value.indexOf('@')+1); 
        console.log(search);
        handleChangeSearch(search)
     } 
     setSearch(value)
}

const handleChangeSearch = (value) => {
    setIsLoaded(true)
    setIsOpenMention(true)
    const data = {
        flag: 'mention',
        term: value
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
const setMentionData = () => {
    dispatch(removeMentionData())
    dispatch(addMentionData(checkList))
    setIsOpenMention(false)
    setCheckList([])
}
    return (
        <>
        <div className="custome_select border w-full">
        <input type='text' placeholder="@mention" onChange={(e)=>{handleMention(e.target.value)}} name="mention"  className="input_select" />
        </div>
       {isOpenMention && <ReactDialogBox
                    closeBox={() => { setIsOpenMention(false) }}
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
                            <input type="search" value={search} onChange={(e)=>{handleMention(e.target.value)}} className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-[#619cb0] bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-[#619cb0] focus:bg-white focus:border-[#619cb0] focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                            <i className="fa fa-search search-icon" ></i>
                        </div>
                        <div className="date-status  hover:text-[#619cb0] z-10 absolute right-0">
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary button-effect btn-sm" data-dismiss="modal" onClick={setMentionData} >done</button>
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
                </ReactDialogBox>}
        </>

    )
}

export default Mention
