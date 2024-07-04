import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CryptoJS from "crypto-js"

//Custom Imports
import { CRYPTO_JS_KEY } from '../../constants/Contants';
import { encryptID } from '../../utils/Helper';

const UserProfileImgName = ({ PROFILE_IMG, PROFILE_COLOR, FIRST_NAME, LAST_NAME, USER_ID }) => {
    const { data } = JSON.parse(localStorage.getItem("user"))
    // console.log(USER_ID);
    // const encodedData = window.btoa(USER_ID);
    // const encodedData = ciphertext.toString().replace('/','Por21Ld');
    // var encodedData = CryptoJS.MD5(`${USER_ID}`).toString();

    // var encodedData = CryptoJS.AES.encrypt(`${USER_ID}`, CRYPTO_JS_KEY);
    // var dataString = encodedData.toString().replace(/\//g, 'TriFtEl')
    return (
        // <Link to={data?.user.id === USER_ID ? `/profile/post` : `/other-profile/post/${encryptID(USER_ID)}`} style={{ cursor: 'pointer' }} >
        <a href={data?.user.id === USER_ID ? `/profile/post` : `/other-profile/post/${USER_ID}`} style={{ cursor: 'pointer' }} >
            {
                PROFILE_IMG !== "" ? (
                    <div className="post_profile"><img src={PROFILE_IMG} alt="Image1" /></div>
                ) : (
                    <div
                        className="m-1 mr-0 ml-0 w-12 h-12 relative flex justify-center items-center rounded-full bg-red-500 text-xl text-white uppercase"
                        style={{ backgroundColor: `${PROFILE_COLOR}` }}
                    >
                        {FIRST_NAME.charAt(0)}{LAST_NAME.charAt(0)}
                    </div>
                )
            }
        </a>
    )
}

export default UserProfileImgName
