import React, { useState } from 'react'
import { ReactDialogBox } from 'react-js-dialog-box'
import ReactPlayer from 'react-player'
import { Slide } from 'react-slideshow-image';
import '../../assets/css/slide.css'

// Custom Imports
import { Slider } from './Slider'

const BulkImagePost = ({ postImg }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [firstSlide, setFirstSlide] = useState("")
    const openBox = (e) => {
        setFirstSlide(e)
        setIsOpen(true)
    }

    const closeBox = () => {
        setIsOpen(false)
    }
    return (
        <>

            <div className="" id="grid-image">
                <Slide>
                    {postImg?.map((firstSlide, index2) => (
                        <div className="" key={index2}>
                            {firstSlide?.thumb !== null ? (
                                <div className="slide-container" >

                                    <div className="each-slide" key={firstSlide.id}>
                                        {firstSlide.type === "image" ? (
                                            <img src={firstSlide.content} alt="" onClick={() => { openBox(firstSlide) }} style={{
                                                height: "509px",
                                                width: "100%"
                                            }} />
                                        ) :
                                            (
                                                <div style={{ backgroundColor: "black" }} className="image-fix">
                                                    <ReactPlayer url={firstSlide.content} playing={false} controls={true} height="509px" width="100%" onClick={() => { openBox(firstSlide) }} />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>

                            ) : (
                                <div style={{ backgroundColor: `${firstSlide.color}`, textAlign: "center", height: "300px" }}>
                                    <p >{firstSlide.content}</p>
                                </div>
                            )}

                        </div>
                    ))}
                </Slide>
                {isOpen &&
                    <ReactDialogBox
                        closeBox={closeBox}
                        bodyBackgroundColor='transparent'
                        BorderRadius='10px'
                    // modalWidth='40%'
                    >
                        <Slider {...{ firstSlide, postImg }} />
                    </ReactDialogBox>
                }
            </div>
        </>
    )
}

export default BulkImagePost