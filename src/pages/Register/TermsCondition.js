import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

// Custom Imports
import {Button} from '../../components/Button'
import BackButton from '../../components/BackButton'
import Checkbox from '../../components/Checkbox'
import Input from '../../components/Input'
import TextError from '../../components/TextError'
import { TERMS_CONDITIONS } from '../../constants/Contants'
import { addUserName } from '../../store/reducers/userSlice'
import apiService from '../../services/apiService'

const TermsCondition = () => {

    const [isLoaded, setIsLoaded] = useState(false)
    const regiData = useSelector((state) => state.register)
    const dispatch = useDispatch()
    const [userName, setUsername] = useState("")
    const [validationMsg, setValidationMsg] = useState(null)
    const [isDisabled, setIsDisabled] = useState(true)
    const [latLong, setLatLong] = useState({
        lat: "0",
        long: "0"
    })

    useEffect(() => {
        apiService.SetUserName(regiData.first_name).then((res) => {
            if (res.success !== 0) {
                dispatch(addUserName(res.data))
                setUsername(res.data)
            }
        })
        navigator.geolocation.getCurrentPosition((position) => {
            setLatLong({
                lat: position.coords.latitude.toString(),
                long: position.coords.longitude.toString()
            })
        })
    }, [])

    const handleChange = (e) => {
        apiService.CheckUserName(e.target.value).then((res) => {
            if (res.success === 1) {
                dispatch(addUserName(e.target.value))
                setValidationMsg('')
            } else {
                setValidationMsg(res.message)
            }
        })
        setUsername(e.target.value)
    }

    const intitialValues = {
        user_name: ''
    }

    const validationSchema = Yup.object({
        user_name: Yup.string(),
    })

    const onSubmit = () => {
        setIsLoaded(true)
        const data = {
            account_id: regiData.user_name,
            first_name: regiData.first_name,
            last_name: regiData.last_name,
            password: regiData.password,
            register_type: regiData.type,
            ...regiData.type === "email" ? { email: regiData.email } : { mobile: regiData.mobile, country_code: regiData.country_code },
            latitude: latLong.lat ? latLong.lat : "0",
            longitude: latLong.long ? latLong.long : "0",
            device_type: 'Web',
            device_token: 'abc',
        }
        apiService.Register(data).then((res) => {
            if (res.success === 1) {
                setIsLoaded(false)
                setValidationMsg(res.message)
            } else {
                setIsLoaded(false)
                setValidationMsg(res.message)
            }
        })
    }

    return (
        <Formik initialValues={intitialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {
                formik => {
                    return (
                        <Form>
                            <BackButton />
                            <h1>{TERMS_CONDITIONS.CREATE_YOUR_USERNAME}</h1>
                            {TERMS_CONDITIONS.CHOOSE_USERNAME}
                            <Input type="text" name="user_name" onChange={handleChange} value={userName} />
                            <div onClick={() => { if (isDisabled) { setIsDisabled(false) } }}>
                                {/* <Checkbox label="I agree to Term of Use and Privacy Policy" /> */}
                                <Checkbox type="checkbox" name="terms_conditions" label="I agree to Term of Use and Privacy Policy" />
                            </div>
                            <TextError>{validationMsg && (validationMsg)}</TextError>
                            <Button btnName="Submit" name="submit" isDisabled={isDisabled} loader={isLoaded} />
                        </Form>
                    )
                }
            }
        </Formik>

    )
}

export default TermsCondition