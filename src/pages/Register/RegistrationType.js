import React, { useState } from 'react'
import BackButton from '../../components/BackButton/BackButton'

//.. Custom Imports
import ToggleButtons from '../../components/ToggleButton'
import RegisterTypeEmail from './RegistrationTypeEmail'
import RegisterTypeMobile from './RegistrationTypeMobile'

const RegistrationType = () => {

    const RegistrationTypes = ["Mobile", "Email"];
    const [userRegisterType, setUserRegisterType] = useState("Mobile")
    const getType = (data) => {
        setUserRegisterType(data)
        console.log(userRegisterType)
    }

    return (
        <>
            <BackButton />
            <ToggleButtons name={RegistrationTypes} func={getType} />
            {userRegisterType === "Email" ? <RegisterTypeEmail /> : <RegisterTypeMobile />}
        </>
    )
}

export default RegistrationType