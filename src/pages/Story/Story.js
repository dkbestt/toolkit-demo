import React, { useEffect, useState } from 'react'
import { ReactDialogBox } from 'react-js-dialog-box'
import { useDispatch, useSelector } from 'react-redux/es/exports'

import { getAllStory, removeStoryData } from '../../store/reducers/storySlice'
import StoryCard from './StoryCard'

const Story = () => {
    const { data } = JSON.parse(localStorage.getItem("user"))
    const { mystory, otherstory } = useSelector((state) => ({ ...state.story }))
    const [isOpen, setIsOpen] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)
    const [UID, setUID] = useState(0)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(removeStoryData());
        dispatch(getAllStory())
    }, [])

    return (
        <>
            <div className="bottom-side">
                <div className="post-center">
                    <div className="story_post">
                        <div className="other_story">
                            <div className="add_story">
                                <a onClick={() => setIsOpen(true)} style={{ cursor: "pointer" }}>
                                    <img src={data?.user.profile_image} alt="img" />
                                    <span className="hor_line">Me</span>
                                </a>
                            </div>
                            {/* {isOpen && mystory?.story && */}
                            {isOpen &&
                                <ReactDialogBox
                                    closeBox={() => setIsOpen(false)}
                                    // bodyBackgroundColor='white'
                                    BorderRadius='10px'
                                    bodyWidth='50%'
                                >
                                    <StoryCard story={mystory} userID={data?.user.id} func={() => setIsOpen(false)} />
                                </ReactDialogBox>
                            }
                            <ul className="owl-carousel" >
                                {
                                    otherstory.map((oth_story, index) => (
                                        <div key={index}>
                                            <li>
                                                {/* <a rel="example_group" href={<StoryCard story={otherstory} />}> */}
                                                <a rel="example_group" onClick={() => { setIsOpen2(true); setUID(oth_story.id); }}>
                                                    <img src={oth_story.profile_image} alt="Image1" />
                                                    <h4>{oth_story.first_name + " " + oth_story.last_name}</h4>
                                                </a>
                                            </li>
                                        </div>
                                    ))
                                }
                                {isOpen2 &&
                                    <ReactDialogBox
                                        closeBox={() => setIsOpen2(false)}
                                        // bodyBackgroundColor='white'
                                        BorderRadius='10px'
                                        bodyWidth='50%'
                                    >
                                        <StoryCard story={otherstory} userID={UID} func={() => setIsOpen2(false)} />
                                    </ReactDialogBox>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div></>
    )
}

export default Story