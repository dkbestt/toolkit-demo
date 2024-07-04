import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Custom Imports
import { next, nextWithMutiStep, setStep } from '../../store/reducers/stepSlice'
import { setChooseMethod, setResetPassword, setValidateYourself } from '../../store/reducers/forgotPasswordSlice'
import RegistrationType from '../Register/RegistrationType'
import UserVerify from '../Register/UserVerify'
import SetPassword from '../Register/SetPassword'
import Box from '../../components/Box'
import ForPassType from './ForPassType'
import SetForPass from './SetForPass'

const ForgotPassword = () => {

    const dispatch = useDispatch()
    const [execute, setExecute] = useState(true)
    const increase = () => {
        if (execute) {
            setExecute(false)
            dispatch(setStep(2))
        }
    }
    increase()

    const steps = useSelector((state) => state.step.value)

    switch (steps) {
        case 2:
            var ForgotPassword = Box(ForPassType)
            break
        case 3:
            var ForgotPassword = Box(SetForPass)
            break
        default:
            var ForgotPassword = Box(ForPassType)
            break
    }

    return (
        <>{
            steps &&
            (<ForgotPassword />)
        }
        </>
    )
}


export default ForgotPassword