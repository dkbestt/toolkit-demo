import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

// Custom Imports
import { next } from '../../store/reducers/stepSlice'
import apiService from '../../services/apiService'
import UserVerify from './UserVerify'
import { addOtp } from '../../store/reducers/userSlice'
import { addRegistrationEmailData } from '../../store/reducers/userSlice'
import TextError from '../../components/TextError'

const RegisterTypeEmail = () => {

    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [validationMsg, setValidationMsg] = useState(null)
    const { email } = useSelector((state) => ({ ...state.register }))
    const [isSend, setIsSend] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [btnConst, setBtnConst] = useState(1)

    const intitialValues = {
        email: '',
        otp: ''
    }
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email ld'),
        otp: Yup.string().min(6, 'Must be 6 characters or less')
    })

    const onSubmit = (values) => {
        setIsLoaded(true)
        if (values.otp === "") {
            setIsLoaded(false)
            setValidationMsg("Please Enter valid OTP.")
        }
        if (values.otp) {
            const OTPData = {
                code: values.otp,
                user_name: email
            }
            apiService.OTPVerify(OTPData).then((res) => {
                if (res.success === 1) {
                    setIsLoaded(false)
                    dispatch(addOtp(values.otp)) //send OTP
                    dispatch(next())
                } else {
                    setIsLoaded(false)
                    setValidationMsg(res.message)
                }
            })
        } else { }
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
        apiService.EmailOTP(emailData).then((res) => {
            if (res.success === 0) {
                setValidationMsg(res.message)
            } else {
                dispatch(addRegistrationEmailData(emailData))
                setBtnConst(2)
                setIsSend(true)
            }
        })
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

    return (
        <Formik initialValues={intitialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {
                formik => {
                    return (
                        <Form>
                            <div className='flex w-96'>
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
                                        className="absolute bottom-10 top-1 right-1 text-[#619cb0]"
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
                            <div id='verify-otp'></div>
                            {
                                isSend && (<UserVerify {...{ disabled, setDisabled, validationMsg, setValidationMsg, sendOTPCode, isSend, isLoaded }} />)
                            }
                            <TextError>{validationMsg && (validationMsg)}</TextError>
                        </Form>
                    )
                }
            }
        </Formik>
    )
}

export default RegisterTypeEmail