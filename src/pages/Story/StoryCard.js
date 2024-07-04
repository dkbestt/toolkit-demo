import React from 'react'
import Stories, { seeMore } from "react-insta-stories"
import { convertStoryDuration1000, convertTimeToFormatText } from '../../utils/Helper'
import StoryViewer from './StoryViewer'

const StoryCard = (props) => {
    const { data } = JSON.parse(localStorage.getItem("user"))
    var newData = []
    props.story.map((STORY_USER) => {

        if (STORY_USER.id === props.userID) {

            STORY_USER.story.map((STORY_USER_DATA) => {
                var views = STORY_USER_DATA?.views
                var storyPayload = {
                    url: STORY_USER_DATA.content,
                    type: STORY_USER_DATA.type,
                    ...STORY_USER_DATA.duration !== null ? { duration: convertStoryDuration1000("00:" + STORY_USER_DATA.duration) * 1000 } : "",
                    header: {
                        profileImage: STORY_USER.profile_image,
                        heading: STORY_USER.first_name + STORY_USER.last_name,
                        subheading: convertTimeToFormatText(STORY_USER_DATA.created_at)
                    },
                    seeMore: STORY_USER_DATA.user_id === data?.user.id ? (({ close }) => (
                        <StoryViewer {...{ close, views }} />
                    )) : ""
                }
                newData.push(storyPayload)
            })
        }
    })
    // console.log(newData, 'story');

    // mystory[0].story.map((s) => {
    //     var data = {
    //         url: s.content,
    //         header: {
    //             profileImage: mystory[0].profile_image,
    //             heading: mystory[0].first_name + mystory[0].last_name,
    //             subheading: convertTimeToFormatText(s.created_at)
    //         },
    //         type: s.type,
    //         ...s.duration !== null ? { duration: convertStoryDuration1000("00:" + s.duration) * 1000 } : "",
    //         seeMore: (({ close }) => (
    //             <div
    //                 style={{
    //                     maxWidth: "100%",
    //                     height: "100%",
    //                     padding: 40,
    //                     background: "white"
    //                 }}
    //             >
    //                 <h2>Just checking the see more feature.</h2>
    //                 <p style={{ textDecoration: "underline" }} onClick={close}>
    //                     Go on, close this popup.
    //                 </p>
    //             </div>

    //         )),
    //     }
    //     newData.push(data)
    // })

    // const stories = [
    //     { url: 'https://picsum.photos/1080/1920', seeMore: <seeMore />, header: { heading: 'Mohit Karekar', subheading: 'Posted 5h ago', profileImage: 'https://picsum.photos/1000/1000' } },
    //     { url: 'https://media.idownloadblog.com/wp-content/uploads/2016/04/iPhone-wallpaper-abstract-portrait-stars-macinmac.jpg', header: { heading: 'mohitk05/react-insta-stories', subheading: 'Posted 32m ago', profileImage: 'https://avatars0.githubusercontent.com/u/24852829?s=400&v=4' } },
    //     { url: 'https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4', type: 'video', duration: 1000 },
    //     { url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', type: 'video', seeMore: <SeeMore /> },
    //     { url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', type: 'video' }
    // ]

    // const stories = mystory[0].story.map((s, index) => [{
    //     content: ({ action, isPaused }) => (
    //         <>
    //             {console.log(s, 'index')}
    //             {
    //                 s.type === "image" ? (
    //                     <div style={contentStylestoryback} key={index}>
    //                         <img className={image} src={s.content}></img>
    //                     </div>
    //                 ) : (
    //                     <div style={contentStylestoryback} key={index}>
    //                         <video className={image} src={s.content}></video>
    //                     </div>
    //                 )
    //             }
    //         </>
    //     )
    // }])
    // {
    //     content: ({ action, isPaused }) => {
    //         return (
    //             <div style={contentStylestoryback}>
    //                 <img className={image} src={mystory[0].story[0].content}></img>
    //             </div>
    //         );
    //     }
    // },

    return (
        <div style={{
            margin: "auto",
            width: "50%",
            padding: "10px",
            marginTop: "25px"
        }}>
            <Stories
                loop
                keyboardNavigation
                defaultInterval={3000}
                stories={newData}
                onStoryEnd={(s, st) => console.log("story ended", s, st)}
                // onAllStoriesEnd={(s, st) => console.log("all stories ended", s, st)}
                onAllStoriesEnd={props.func}
                onStoryStart={(s, st) => console.log("story started", s, st)}
            />
        </div>
    )
}



export default StoryCard
