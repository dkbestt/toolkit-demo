import React, { useState } from 'react'
import { ReactDialogBox } from 'react-js-dialog-box'

// Custom Imports
import CreateLocation from './CreateLocation';
import CreateMoment from './CreateMoment';
import '../../assets/css/dialogbox.css'
import CreateThought from './CreateThought';
import ConnectionExploreTab from '../../components/ConnectionExploreTab/ConnectionExploreTab';

const PostCreate = ({ setIsOpenPostCreate }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [postType, setPostType] = useState("thought")
    const openBox = () => {
        setIsOpen(true)
    }
    const closeBox = () => {
        setIsOpen(false)
        setIsOpenPostCreate(false)
    }
    return (
        <>
            <ul className='create_post'>
                <li><button onClick={() => { openBox(); setPostType("thought") }}><span className='icon '></span> <span>Thought</span> </button></li>
                <li><button onClick={() => { openBox(); setPostType("moment") }}><span className='post-moments-icon  icon'></span> <span>Moment</span>   </button></li>
                <li> <button onClick={() => { openBox(); setPostType("location") }}><span className='post-location-icon icon'></span> <span>Location</span>   </button></li>
            </ul>
            {/* <ConnectionExploreTab color="gray" /> */}
            {isOpen && (
                <>
                    <ReactDialogBox
                        closeBox={closeBox}
                        // modalWidth='50%'
                        modalHeight='70%'
                        // headerBackgroundColor='red'
                        // headerTextColor='white'
                        // headerHeight='65'
                        // closeButtonColor='white'
                        bodyBackgroundColor='white'
                        // bodyTextColor='black'
                        bodyHeight='70%'

                        BorderRadius='10px'
                    >
                        {postType === "thought" &&
                            <CreateThought {...{ isOpen, setIsOpen }} />
                        }
                        {postType === "moment" &&
                            <CreateMoment />
                        }
                        {postType === "location" &&
                            <CreateLocation/>
                        }

                    </ReactDialogBox>
                </>
            )}
        </>

    )
}

export default PostCreate