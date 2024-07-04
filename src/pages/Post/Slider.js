import React, { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import '../../assets/css/slide.css'
import ReactPlayer from 'react-player'

export const Slider = ({ firstSlide, postImg }) => {

  const [execute, setExecute] = useState(true)
  const [postImage, setPostImage] = useState("")
  const setSlide = () => {
    if (execute) {
      if (postImg)
        setPostImage(postImg.filter(function (f) { return f.id !== firstSlide.id }))
      setExecute(false)
    }
  }
  setSlide()
  // console.log(postImage);
  // console.log(postImg);
  return (
    <div className="slide-container" >
      <Slide>
        <div className="each-slide" key={firstSlide.id}>
          {firstSlide.type === "image" ? (

            <img src={firstSlide.content} alt="" />
          ) :
            (
              <div style={{ backgroundColor: "black" }} className="image-fix">
                <ReactPlayer url={firstSlide.content} playing={true} controls={true} />
              </div>
            )
          }
        </div>
        {postImage ? postImage.map((slideImage, index) => (

          slideImage.type === "image" ?
            (<div className="each-slide" key={index}>
              <img src={slideImage.content} alt="" />
            </div>
            ) :
            (
              <div style={{ backgroundColor: "black" }} className="image-fix" >
                <ReactPlayer url={slideImage.content} playing={true} controls={true} />
              </div>
            )
        )) : <>
        </>
        }

      </Slide>
    </div>
  )
}