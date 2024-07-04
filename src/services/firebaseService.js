import { signInWithPhoneNumber } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";
import { Authntication } from "../pages/Register/Firebase";

const configureCaptch = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('verify-otp', {
        'size': 'visible',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
    }, Authntication)
    console.log("verify")
}

const veridyOTP = async (otp) => {
    let isverify = 0;
    let confirmationResult = window.confirmationResult;
    //  confirmationResult = localStorage.getItem('confirmationResult')
    // console.log(confirmationResult.confirm)
    await confirmationResult.confirm(otp).then((result) => {
        // const user = result.user;
        // ...
        isverify = 1
        console.log('verified')
    }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        isverify = 0
        console.log("error " + error)
    })
    return isverify
}

const OTPSendVerify = async (mobile_number, isverifyOTP = 0, otp = 0) => {
    configureCaptch()
    let isverify = 0
    if (isverifyOTP) {
        if (veridyOTP(otp))
            isverify = 1
    } else {
        const phoneNumber = mobile_number;
        const appVerifier = window.recaptchaVerifier;
        console.log(phoneNumber)
        await signInWithPhoneNumber(Authntication, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                localStorage.setItem('confirmationResult', confirmationResult)
                console.log(confirmationResult)
                // ...
                console.log("otp has been sent")
                isverify = 1
            }).catch((error) => {
                // appVerifier.clear()
                console.log("otp has not been sent.............." + error)
            })
    }
    return isverify
}

export default OTPSendVerify