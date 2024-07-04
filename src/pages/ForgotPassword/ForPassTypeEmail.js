import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import { next } from '../../store/reducers/stepSlice'
import apiService from '../../services/apiService'
import { LinkButton } from '../../components/Button'
// import UserVerify from './UserVerify'
import Input from '../../components/Input'
import TextError from '../../components/TextError'
import { addForPassEmailData, addForPassOtp } from '../../store/reducers/forgotPasswordSlice'
import ForPassVerify from './ForPassVerify'

const ForPassTypeEmail = () => {
    
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [validationMsg, setValidationMsg] = useState(null)
    // const {choose_method} = useSelector((state) => state.forgot_password)
    const { choose_method, email } = useSelector((state) => ({ ...state.forgot_password }))
    const [isSend, setIsSend] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [btnConst, setBtnConst] = useState(1)

    const intitialValues = {
        email: '',
        otp: ''
    }
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email ld'),
        otp: Yup.string().required('Please enter OTP').min(6, 'OTP Length should be 6 digits long')
    })
    
    const onSubmit = (values) => {
        setIsLoaded(true)
        if (values.otp) {
            const OTPData = {
                code: values.otp,
                user_name: email
            }
            apiService.ForPassOTPVerify(OTPData).then((res) => {
                if (res.success === 1) {
                    setIsLoaded(false)
                    setIsSend(true)
                    dispatch(addForPassOtp(values.otp)) //send OTP
                    dispatch(next())
                } else {
                    setIsLoaded(false)
                    setValidationMsg(res.message)
                }
            })
        } else {

        }
    }

    const handleChange = (event) => {
        if (!setUserEmail(event.target.value)) {
            setValidationMsg("")
            setBtnConst(1)
            setIsSend(false)
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    const sendOTPCode = () => {
        setDisabled(true)
        if (userEmail === "") {
            setValidationMsg("This field is required")
            return;
        }
        const emailData = {
            email: userEmail,
            type: 'email'
        }
        apiService.ForPassOTP(emailData).then((res) => {
            if (res.success === 0) {
                setValidationMsg(res.message)
            } else {
                dispatch(addForPassEmailData(emailData))
                setBtnConst(2)
                setIsSend(true)
            }
        })
    }
    
    return (
        <Formik initialValues={intitialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {
                formik => {
                    return (
                        <Form>
                            {/* <h1>{reset_password && (reset_password)}</h1> */}
                            <div className='flex  w-96'>
                                <div className="relative pb-5">
                                    <div className='border-b'>
                                        {/* <input type="email" placeholder="Enter Email" name="email"
                                            className='bg-transparent border-none text-gray-700 focus:outline-none object-fill h-10 w-96'
                                            onChange={(e) => { setUserEmail(e.target.value) }} /> */}
                                        <input type="email" placeholder="Enter Email" name="email" style={{ marginTop: "10px" }}
                                            className='bg-transparent border-none text-gray-700 focus:outline-none object-fill h-10 w-96'
                                            value={userEmail} onChange={handleChange} />
                                    </div>
                                    <button
                                        className="absolute bottom-1 top-1 right-1 text-[#619cb0]"
                                        type='submit'
                                        name='sendCode'
                                        disabled={disabled}
                                        onClick={sendOTPCode}
                                    // onClick={btnConst === 1 ? sendOTPCode : resetMobile}
                                    >
                                        {btnConst === 1 ? "Send Code" : ""}
                                    </button>
                                </div>
                            </div>
                            <TextError>{validationMsg && (validationMsg)}</TextError>
                            <div id='verify-otp'></div>
                            {
                                isSend && (<ForPassVerify {...{ disabled, setDisabled, validationMsg, setValidationMsg, sendOTPCode, isSend, isLoaded }} />)
                            }

                        </Form>
                    )
                }
            }
        </Formik>
    )
}

export default ForPassTypeEmail
