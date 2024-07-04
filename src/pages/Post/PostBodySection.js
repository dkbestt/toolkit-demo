import React, { useState } from 'react';
import { ReactDialogBox } from 'react-js-dialog-box';
import ReactPlayer from 'react-player'

// Custom Imports
import { MAP_LINK } from '../../constants/Contants'
import BulkImagePost from './BulkImagePost'
import { googleMapImage } from '../../utils/Helper'
import '../../assets/css/post.css'

const PostBodySection = ({ title, postImg, type, mentionUser, lat, long, location }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState("")
    const openBox = (e) => {
        setSelectedImage(e)
        setIsOpen(true)
    }

    const closeBox = () => {
        setIsOpen(false)
    }
    if (mentionUser !== null) {
        var mentionArray = []
        var json = JSON.parse(mentionUser);
        json.map((mention) => {
            mentionArray.push(" " + mention.name + ",")
        })
    }
    return (
        <>
            <div className="description">
                <p>{title}</p>
                <p>{mentionUser && (<>
                    mention: {mentionArray}
                </>)}</p>
                <p>{location && (location)}</p>
            </div>
            {
                type === "location" ? (
                    <div>
                        <a href={MAP_LINK + `${lat},${long}`} target={"_blank"} rel="noreferrer" className="media-big"><img src={googleMapImage(lat, long)} alt="img" /></a>
                    </div>
                ) : (
                    <>
                        {postImg.length >= 2 ?
                            <BulkImagePost {...{ postImg }} />
                            : (
                                <div className=''>
                                    {postImg?.map((c, index2) => (
                                        <div key={index2}>
                                            {c?.thumb !== null ? (
                                                c?.type === "video" ?
                                                    (
                                                        <div className="image-fix">
                                                            <ReactPlayer url={c.content} playing={false} controls={true} onClick={() => { openBox(c) }} height="509px" width="100%" />
                                                        </div>
                                                        // <i className="fa fa-play-circle-o centered-play" ></i>
                                                    ) :
                                                    (<a href="#" className='containerclass media-big' onClick={() => { openBox(c) }}>  <img src={c?.thumb} alt="img" className='' />  </a>)

                                            ) : (
                                                <div style={{ backgroundColor: `${c.color}`, textAlign: `${c.alignment}`, height: "300px", backgroundImage: `url(${c.pattern_id})` }}>
                                                    <p style={{
                                                        textAlign: `${c.alignment}`, color: `${c.font_color}`, fontWeight: `${c.is_bold ? 900 : 200}`, fontStyle: `${c.is_italic ? 'italic' : 'normal'}`,
                                                        textDecoration: `${c.is_underline ? 'underline' : 'none'}`,
                                                        position: 'relative',
                                                        top: '50%',
                                                        transform: ' translateY(-50%)',
                                                        transform: 'translateY(-50%)',
                                                        transform: 'translateY(-50%)'
                                                    }} >{c.content}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )
                        }
                        {isOpen &&
                            <ReactDialogBox
                                closeBox={closeBox}
                                bodyBackgroundColor='transparent'
                                BorderRadius='10px'
                                modalWidth='auto'
                            >
                                {selectedImage &&
                                    <div className='containerclass' >  <img src={selectedImage?.thumb} alt="img" className='' />
                                        {selectedImage?.type === "video" &&
                                            (
                                                <a href=""><i className="fa fa-play-circle-o centered-play" ></i></a>
                                            )
                                        }
                                    </div>}
                            </ReactDialogBox>
                        }
                    </>
                )
            }

        </>
    )
}

export default PostBodySection