import React, { useEffect, useState } from 'react'
import ContentEditable from 'react-contenteditable'
import Loader from "react-js-loader";
import { useDispatch, useSelector } from 'react-redux'

// Custom Imports
import Image1 from '../../assets/images/1.jpg'
import apiService from '../../services/apiService'
import { resetLocation } from '../../store/reducers/postSlice';
import PostSetting from './PostSetting'

const CreateThought = ({ isOpen, setIsOpen }) => {

    const { data } = JSON.parse(localStorage.getItem("user"))
    const { mention_users } = useSelector((state) => ({ ...state.search }))
    const { tag_users } = useSelector((state) => ({ ...state.search }))
    const { location } = useSelector((state) => ({ ...state.post }))
    const { isPublicPost } = useSelector((state) => ({ ...state.setting }))
    const { isCommentTurnOff } = useSelector((state) => ({ ...state.setting }))

    const [align, setAlign] = useState("left")
    const [isBold, setIsBold] = useState(0)
    const [boldClass, setBoldClass] = useState("")
    const [isItalic, setIsTtalic] = useState(0)
    const [italicClass, setItalicClass] = useState("")
    const [pattern, setPattern] = useState(null)
    const [patternData, setPatternData] = useState([])
    const [isUnderline, setIsUnderline] = useState(0)
    const [underlineClass, setUnderlineClass] = useState("")
    const [fontFamily, setFontFamily] = useState(4)
    const [color, setColor] = useState("white")
    const [fontColor, setFontColor] = useState("#000000")
    const [loading, setIsLoaded] = useState(0)
    const [backgroundType, setBackgroundType] = useState(null)

    const [content, setContent] = useState("Type here...")
    const fonts = ["Helvetica", "Calibri", "Futura", "Garamond", "Times New Roman", "Arial", "Cambria", "Verdana"]
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(resetLocation())
    }, []);
    const handleChange = (e) => {
        setContent(e.target.value)
    }

    const createPost = () => {
        let tag_user_ids = []
        tag_users.forEach(element => {
            console.log(element);
            tag_user_ids.push(element.id);
        });
        const tagged_user_ids = Object.values(tag_user_ids).join(',');
        //         const newArray = mention_users.map(({id, accountid,firstname,lastname}) => ({id, accountid,firstname,lastname}));
        // console.log(newArray);
        console.log(mention_users);
        var pattern_id = pattern ? pattern.id : null
        var thought = {
            thought_type: "text",
            background_type: backgroundType,
            color: color,
            font_style: "0",
            pattern_id: 1,
            alignment: align,
            is_bold: isBold,
            is_italic: isItalic,
            is_underline: isUnderline,
            font_color: fontColor,
            content: content,
            pattern_id: pattern_id
        };
        console.log(thought);

        const data = {
            type: "thought",
            is_public: 0,
            thought: thought,
            is_public: isPublicPost,
            user_tags: tagged_user_ids,
            turn_off_comment: isCommentTurnOff,
            location: location
        };
        console.log(data);
        setIsLoaded(true)
        apiService.CreatePost(data).then((res) => {
            if (res.success === 1) {
                console.log("data");
                setIsOpen(false)
                window.location.reload()
                setIsLoaded(1)
            } else {
                setIsLoaded(1)
            }
        })
    }
    const handlePatternSelection = () => {
        const data = {
            limit: 50
        };
        apiService.FetchPattenData(data).then((res) => {
            if (res.success === 1) {
                setPatternData(res.data)
            } else {

            }
        })
    }
    return (
        <div className="modal-content">
            {/* <div className="modal-header"> */}
            <h2 className="modal-title text-center">Create Thoughts</h2>
            {/* </div> */}
            <div >
                {loading ?
                    <Loader type="bubble-top" bgColor={"#619cb0"} color={'transparant'} size={30} />
                    : <></>
                }
            </div>
            <div className="modal-body">
                <div className="post-top">
                    <div className="post_profile"><img src={data?.user.profile_image} alt="" /></div>
                    <div className="post_name">
                        <h3>{data?.user.u_name} </h3>
                    </div>
                </div>
                <a href="#"><span onClick={() => { }}>
                    <div className="custome_select">
                        <div className="input_select"><i className="fa fa-plus-square-o edit-icons" ></i></div>
                        <ul className="custome_ul">
                            <li>Solid <svg style={{ height: "15px", width: "15px", }} viewBox="0 0 576 512"> <path d="M41.37 9.372C53.87-3.124 74.13-3.124 86.63 9.372L168 90.74L221.1 37.66C249.2 9.539 294.8 9.539 322.9 37.66L474.3 189.1C502.5 217.2 502.5 262.8 474.3 290.9L283.9 481.4C246.4 518.9 185.6 518.9 148.1 481.4L30.63 363.9C-6.863 326.4-6.863 265.6 30.63 228.1L122.7 135.1L41.37 54.63C28.88 42.13 28.88 21.87 41.37 9.372V9.372zM217.4 230.6L168 181.3L75.88 273.4C71.69 277.6 68.9 282.6 67.52 288H386.7L429.1 245.7C432.2 242.5 432.2 237.5 429.1 234.3L277.7 82.91C274.5 79.79 269.5 79.79 266.3 82.91L213.3 136L262.6 185.4C275.1 197.9 275.1 218.1 262.6 230.6C250.1 243.1 229.9 243.1 217.4 230.6L217.4 230.6zM448 448C448 422.8 480.6 368.4 499.2 339.3C505.3 329.9 518.7 329.9 524.8 339.3C543.4 368.4 576 422.8 576 448C576 483.3 547.3 512 512 512C476.7 512 448 483.3 448 448H448z"></path></svg>
                            </li>
                            <input type="color" id="color-picker" name="head"
                                value={color} onChange={(e) => {
                                    setColor(e.target.value)
                                    setBackgroundType("solid")
                                }} />
                            <li onClick={handlePatternSelection}>Pattern <svg style={{ height: "15px", width: "15px", }} fill="currentColor" className="bi bi-grid-3x3-gap-fill" viewBox="0 0 16 16"> <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z" /> </svg>
                            </li>

                            <li>Font color<svg style={{ height: "15px", width: "15px", }} width="512" height="512" viewBox="0 0 512 512"><title></title><path d="M416,352c-12.6-.84-21-4-28-12-14-16-14-36,5.49-52.48l32.82-29.14c50.27-44.41,50.27-117.21,0-161.63C389.26,64.14,339.54,48,287.86,48c-60.34,0-123.39,22-172,65.11-90.46,80-90.46,210.92,0,290.87,45,39.76,105.63,59.59,165.64,60h1.84c60,0,119.07-19.5,161.2-56.77C464,390,464,385,444.62,355.56,440,348,431,353,416,352ZM112,208a32,32,0,1,1,32,32A32,32,0,0,1,112,208Zm40,135a32,32,0,1,1,32-32A32,32,0,0,1,152,343Zm40-199a32,32,0,1,1,32,32A32,32,0,0,1,192,144Zm64,271a48,48,0,1,1,48-48A48,48,0,0,1,256,415Zm72-239a32,32,0,1,1,32-32A32,32,0,0,1,328,176Z" /></svg>
                            </li>
                            <input type="color" id="color-picker" name="head" value={fontColor} onChange={(e) => { setFontColor(e.target.value) }} />
                        </ul>
                    </div>
                </span></a>
                <a href="#"> <span onClick={() => {
                    if (!boldClass) {
                        setBoldClass("900")
                        setIsBold(1)
                    } else {
                        setBoldClass("")
                        setIsBold(1)
                    }
                }} >
                    <i className="fa fa-bold edit-icons" >
                    </i></span></a>
                <a href="#"> <span onClick={() => {
                }}>
                    <div className="custome_select">
                        <div className="input_select"><i className="fa fa-font edit-icons"  ></i></div>
                        <ul className="custome_ul">
                            {
                                fonts.map(function (item, i) {
                                    return <li key={i} onClick={() => {
                                        if (item === "Helvetica") {
                                            setFontFamily(i)
                                        } else if (item === "Calibri") {
                                            setFontFamily(i)
                                        } else if (item === "Futura") {
                                            setFontFamily(i)
                                        } else if (item === "Times New Roman") {
                                            setFontFamily(i)
                                        } else if (item === "Arial") {
                                            setFontFamily(i)
                                        } else if (item === "Cambria") {
                                            setFontFamily(i)
                                        } else if (item === "Verdana") {
                                            setFontFamily(i)
                                        } else if (item === "Garamond") {
                                            setFontFamily(i)
                                        }

                                    }}>{item}</li>
                                })
                            }
                        </ul>
                    </div>
                </span></a>
                <a href="#"><span onClick={() => {
                    if (!italicClass) {
                        setItalicClass(" italic")
                        setIsTtalic(1)
                    } else {
                        setItalicClass("")
                        setIsTtalic(1)
                    }

                }}>
                    <i className="fa fa-italic edit-icons" ></i></span></a>
                <a href="#"><span onClick={() => {
                    if (!underlineClass) {
                        setUnderlineClass("underline")
                        setIsUnderline(1)
                    } else {
                        setUnderlineClass("")
                        setIsUnderline(1)
                    }
                }}>
                    <i className="fa fa-underline edit-icons  " ></i></span></a>
                <a href="#"> <span onClick={() => {
                    setAlign("justify")
                }}>
                    <i className="fa fa-align-justify edit-icons" ></i></span></a>
                <a href="#"> <span onClick={() => {
                    setAlign("left")
                }}>
                    <i className="fa fa-align-left edit-icons" ></i></span></a>
                <a href="#"><span onClick={() => {
                    setAlign("right")
                }}>
                    <i className="fa fa-align-right edit-icons" ></i></span></a>
                <a href="#"><span onClick={() => {
                    setAlign("center")
                }}>
                    <i className="fa fa-align-center edit-icons" ></i></span></a>
                <div className="editor" id="editor-1" style={{
                    backgroundColor: color,
                    backgroundImage: `url(${pattern?.name})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'cover',
                    backgroundPositionX: "center",
                    backgroundPositionY: "center",
                }}>
                    <ContentEditable
                        style={{
                            textAlign: align,
                            fontFamily: fonts[fontFamily],
                            fontStyle: italicClass,
                            fontWeight: boldClass,
                            textDecoration: underlineClass,
                            color: fontColor,

                        }}
                        html={content} // innerHTML of the editable div
                        disabled={false}       // use 1 to disable editing
                        onChange={handleChange} // handle innerHTML change
                        tagName='article' // Use a custom HTML tag (uses a div by default)
                    />
                </div>

                {patternData &&
                    <ul className='overflow-x-auto left-chat-main  flex mt-10 mb-0' >
                        {patternData?.map((p, index) => (
                            <li key={index} >
                                <a href="#" className="profile"
                                    onClick={() => { setPattern(p); setBackgroundType("pattern"); setColor("white") }}>
                                    <img src={p.name} alt="" style={{ height: "50px", width: "80px" }} />
                                </a>
                            </li>
                        ))}
                    </ul>
                }
                <PostSetting />
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary button-effect btn-sm right" data-dismiss="modal" onClick={createPost}>Post</button>
            </div>
        </div >
    )
}

export default CreateThought