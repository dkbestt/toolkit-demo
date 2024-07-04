import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

//.. Custom Imports
import Box from '../../components/Box'
import UserDetail from '../Register/UserDetail'
import TermsCondition from '../Register/TermsCondition'
import RegistrationType from '../Register/RegistrationType'
import SetPassword from '../Register/SetPassword'
import { setStep } from '../../store/reducers/stepSlice'

const Registers = () => {

    const dispatch = useDispatch()
    const [execute, setExecute] = useState(true)
    const increase = () => {
        if (execute) {
            setExecute(false)
            dispatch(setStep(1))
        }
    }
    increase()

    const steps = useSelector((state) => state.step.value)
    let RegisterForm = null;
    
    //It will iterate swich on the steps count for register
    switch (steps) {
        case 1:
            RegisterForm = Box(UserDetail)
            break;
        case 2:
            RegisterForm = Box(RegistrationType)
            break;
        case 3:
            RegisterForm = Box(SetPassword)
            break;
        case 4:
            RegisterForm = Box(TermsCondition)
            break;
        default:
            RegisterForm = Box(UserDetail)
            break;
    }

    return (
        <><RegisterForm /></>
    )
}

export default Registers