import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Custom Impots
import Timer from '../../components/Timer/Timer'
import Input from '../../components/Input'
import { VERIFY_OTP } from '../../constants/Contants'
import TextError from '../../components/TextError'
import { Button } from '../../components/Button'
import apiService from '../../services/apiService'
import { addForPassEmailData } from '../../store/reducers/forgotPasswordSlice'

const ForPassVerify = ({ disabled, setDisabled, setValidationMsg, sendOTPCode, isSend, isLoaded }) => {
    const { email, type } = useSelector((state) => ({ ...state.forgot_password }))
    const dispatch = useDispatch()
    const validate_yourSelf = useSelector((state) => state.forgot_password.validate_yourSelf) // this constant use for forgot password
    const handleResendCode = () => {
        disabled ? setDisabled(false) : setDisabled(true)
    }
    const ResendCode = () => {
        setDisabled(true)
        if (type === 'email') {
            const emailData = { email: email, type: 'email' }
            apiService.ForPassOTP(emailData).then((res) => {
                if (res.success === 0) {
                    setValidationMsg(res.message)
                } else {
                    dispatch(addForPassEmailData(emailData))
                }
            })
        } else {
            sendOTPCode()
            console.log('mobile otp send code ....')
        }
    }
    return (
        <>
            <h1>{validate_yourSelf && (validate_yourSelf)}</h1>
            {isSend &&
                <>
                    <div className='text-green-700 text-sm'>{VERIFY_OTP}</div>
                    <div className='relative'>
                        <Input placeholder="Enter OTP" type="text" name="otp" />
                        <>
                            <div className='absolute left-1'>
                                <button
                                    className=" bottom-1 text-sm top-1 right-1 text-[#619cb0]"
                                    type='submit'
                                    name='sendCode'
                                    disabled={disabled}
                                    onClick={ResendCode}
                                >
                                    Resend Code
                                </button>
                            </div>
                            {disabled &&
                                (<div className='absolute right-1'>
                                    <Timer func={handleResendCode} />
                                    {/* // set time for next code send */}
                                </div>)
                            }
                        </>
                    </div>
                    <Button btnName="Next" name="nextThird" loader={isLoaded} />
                </>
            }
        </>
    )
}

export default ForPassVerify
