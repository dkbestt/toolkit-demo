import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import PhoneInput from 'react-phone-input-2'
import { useDispatch, useSelector } from 'react-redux'

//.. Custom Imports
import { addRegistrationMobileData } from '../../store/reducers/userSlice'
import { next } from '../../store/reducers/stepSlice'
import '../../assets/css/phone_number_input.css'
import { addForPassMobileData, addForPassOtp } from '../../store/reducers/forgotPasswordSlice'
import TextError from '../../components/TextError'

//OTP Send and Verify 
import { signInWithPhoneNumber } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";
import { Authentication } from '../Register/Firebase'
import ForPassVerify from './ForPassVerify'

const ForPassTypeMobile = () => {

    const dispatch = useDispatch()
    const [validationMsg, setValidationMsg] = useState(null)
    const [phone, setPhone] = useState("")
    const [dialCode, setDialCode] = useState("91")
    const [disabled, setDisabled] = useState(false)
    const [isSend, setIsSend] = useState(false)
    const [isVerify, setIsVerify] = useState(false)
    const [btnConst, setBtnConst] = useState(1)

    const configureCaptch = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('verify-otp', {
            'size': 'visible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                document.getElementById('verify-otp').style.display = 'none'
                setIsVerify(true)
            },
            'expired-callback': () => {
                // Response expired. Ask user to solve reCAPTCHA again.
                // ...
                document.getElementById('verify-otp').style.display = 'none'
            }
        }, Authentication)
    }

    const verifyOTP = (otp) => {
        let confirmationResult = window.confirmationResult;
        //  confirmationResult = localStorage.getItem('confirmationResult')
        // console.log(confirmationResult.confirm)
        confirmationResult.confirm(otp).then((result) => {
            // const user = result.user;
            // ...
            console.log('verified')
            dispatch(next())

        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            setValidationMsg("Invalid Verification Code")
            console.log(error.message)
            // window.location.reload()
        })
    }

    const OTPSendVerify = (mobile_number, isverifyOTP = 0, otp = 0) => {
        if (isverifyOTP) {
            console.log("veri")
            verifyOTP(otp)
        } else {
            if (!isVerify) {
                document.getElementById('verify-otp').style.display = ''
                configureCaptch()
            } else {
                setIsSend(false)
                document.getElementById('verify-otp').style.display = ''
                //   configureCaptch()
            }
            const phoneNumber = "+" + mobile_number;
            const appVerifier = window.recaptchaVerifier;
            console.log(appVerifier)
            console.log(phoneNumber)
            signInWithPhoneNumber(Authentication, phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    setIsSend(true)
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    window.confirmationResult = confirmationResult;
                    console.log("otp send successfully")
                }).catch((error) => {
                    setValidationMsg("Could not send OTP Please try again later")
                    console.log(error.message)
                })
        }
    }

    const intitialValues = {
        mobile: '',
        otp: ''
    }
    const validationSchema = Yup.object({
        otp: Yup.string().min(6, 'Must be 6 characters or less').required("Please Enter OTP")
    })

    const onSubmit = (values) => {
        if (values.otp) {
            dispatch(addForPassOtp(values.otp)) //send OTP
            OTPSendVerify(null, 1, values.otp)
        }
    }

    const sendOTPCode = () => {
        setDisabled(true)
        document.getElementById('verify-otp').style.display = ''
        if (phone.length <= 5) {
            setValidationMsg("This field is requied")
            return;
        } else {
            setValidationMsg("")
        }
        const code_lenght = dialCode.length;
        const mobileData = {
            mobile: phone.substring(code_lenght),
            dialCode: dialCode,
            type: 'mobile'
        }
        dispatch(addForPassMobileData(mobileData))
        OTPSendVerify(phone)
    }

    return (
        <Formik initialValues={intitialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {
                formik => {
                    return (
                        <Form>
                            <div className='flex w-96'>
                                <div className="relative pb-5">
                                    <div className='pt-5'>
                                        <PhoneInput
                                            country={'in'}
                                            value={dialCode}
                                            disabled={disabled}
                                            onChange={(value, country) => { setDialCode(country.dialCode); setPhone(value); setDisabled(false) }}
                                            enableSearch={true}
                                        />
                                        <button
                                            className="absolute bottom-1 top-1 right-1 text-[#619cb0]"
                                            type='button'
                                            name='sendCode'
                                            onClick={sendOTPCode}
                                        >
                                            Send Code
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div id='verify-otp'></div>
                            <TextError>{validationMsg && (validationMsg)}</TextError>
                            {
                                isSend && (<ForPassVerify {...{ disabled, setDisabled, validationMsg, setValidationMsg, sendOTPCode, isSend }} />)
                            }

                        </Form>
                    )
                }
            }
        </Formik>
    )
}

export default ForPassTypeMobile
