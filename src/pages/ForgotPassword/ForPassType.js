import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

//.. Custom Imports
import BackButton from '../../components/BackButton'
import ToggleButtons from '../../components/ToggleButton/ToggleButtons'
import ForPassTypeEmail from './ForPassTypeEmail'
import ForPassTypeMobile from './ForPassTypeMobile'
import { Button } from '../../components/Button'
import { LinkButton } from '../../components/Button'
import { prev } from '../../store/reducers/stepSlice'

const ForPassType = () => {

    // const { reset_password } = useSelector((state) => ({ ...state.forgot_password }))
    const ForPassTypes = ["Mobile", "Email"];
    const [userForPassType, setUserForPassType] = useState("Mobile")
    const getType = (data) => {
        setUserForPassType(data)
        console.log(userForPassType)
    }

    return (
        <>
            {/* <h1>{reset_password}</h1> */}
            <BackButton />
            <ToggleButtons name={ForPassTypes} func={getType} />
            {userForPassType === "Email" ? <ForPassTypeEmail /> : <ForPassTypeMobile />}
        </>
    )
}

export default ForPassType
