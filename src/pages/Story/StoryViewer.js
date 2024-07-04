import React, { useEffect } from 'react'

const StoryViewer = ({ close, views }) => {
    return (
        <div
            style={{
                maxWidth: "100%",
                height: "100%",
                padding: 40,
                background: "white"
            }}
        >
            <h2>VIEWS</h2>
            <p style={{ textDecoration: "underline", cursor: "pointer" }} onClick={close}> &#215; </p>
            <ul>
                {
                    views?.map((v, index) => (
                        <li className='mt-5' key={index}>
                            <div className="post-top">
                                {
                                    v.user.profile_image !== "" ? (
                                        <div className="post_profile"><img src={v.user.profile_image} alt="img" /></div>
                                    ) : (
                                        <div
                                            className="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-red-500 text-xl text-white uppercase"
                                            style={{ backgroundColor: `${v.user.profile_color}` }}
                                        >
                                            {v.user.first_name.charAt(0)}{v.user.last_name.charAt(0)}
                                        </div>
                                    )
                                }
                                <div className="follow_name">
                                    <h6>{v.user.first_name} {v.user.last_name}</h6>
                                </div>
                                <div>count : {v.count}</div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default StoryViewer
