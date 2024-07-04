import React, { useState, useEffect } from 'react'
import { Form, Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { getMessaging, getToken } from "firebase/messaging"
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'

//.. Custom Imports
import Input from '../../components/Input'
import { Button } from '../../components/Button'
import Checkbox from '../../components/Checkbox'
import TextError from '../../components/TextError'
import { login } from '../../store/reducers/loginSlice'
import { addDeviceToken } from '../../store/reducers/tokenSlice'
import HideShow from '../../components/HideShow/HideShow'
import { app } from '../Register/Firebase'
import { VAPID_KEY } from '../../constants/Contants'

const Login = () => {

    const messaging = getMessaging(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false)
    const [deviceToken, setDeviceToken] = useState(null)
    const [response, setResponse] = useState("")
    const [validationMsg, setValidationMsg] = useState(null)
    const [passwordShown, setPasswordShown] = useState(false)
    const [execute, setExecute] = useState(true)
    const [latLong, setLatLong] = useState({
        lat: "0",
        long: "0"
    })

    useEffect(() => {
        if ("user" in localStorage) {
            navigate('/home')
        }
        navigator.geolocation.getCurrentPosition((position) => {
            setLatLong({
                lat: position.coords.latitude.toString(),
                long: position.coords.longitude.toString()
            })
        })
        getDeviceToken()
    }, [])

    const requestPermission = () => {
        console.log('Requesting permission...')
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted.')
            }
        })
    }

    const getDeviceToken = () => {
        if (execute) {
            setExecute(false)
            requestPermission()
            return getToken(messaging, { vapidKey: VAPID_KEY })
                .then((currentToken) => {
                    if (currentToken) {
                        setDeviceToken(currentToken)
                        // dispatch(addDeviceToken(currentToken))
                    } else {
                    }
                }).catch((err) => {
                });
        }
    }

    const intitialValues = {
        username: '',
        password: '',
        remember: false
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required')
            .matches(/^(\S+$)/g, 'Please enter a valid Username'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
        remember: Yup.bool().nullable()
    })

    const onSubmit = (values) => {
        setIsLoaded(true)
        const { username, password, remember } = values;
        const credentialData = {
            user_name: username,
            password,
            latitude: latLong.lat ? latLong.lat : "0",
            longitude: latLong.long ? latLong.long : "0",
            device_token: deviceToken,
            device_type: "Web"
        }
        if (remember) {
            localStorage.setItem('username', username)
            localStorage.setItem('password', password)
            localStorage.setItem('remember', remember)
        } else {
            localStorage.setItem('remember', remember)
        }
        dispatch(login(credentialData)).unwrap().then((response) => {
            // console.log(response);
            if (response?.success !== 1) {
                setValidationMsg(response?.message)
            } else {
                setValidationMsg(response?.message)
                // this condition check when user token set or not if token set you can redirect to another page
                if (response?.data?.token != null) {
                    console.log('redirect page : code here')
                    // navigate('/profile/post')
                    navigate('/home')
                }
            }
            setIsLoaded(false)
        }).catch((error) => {
            console.log("Catch => ", error)
            setIsLoaded(false)
        })
    }

    return (
        <div>
            <Formik initialValues={intitialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    (formik) => {
                        return (
                            <Form className="pt-8 space-y-6">
                                <div className='icon_group'>
                                    <Input type="text" placeholder="Enter your username or phone number" name="username" />
                                    <i className="fa fa-user-o"></i>
                                    {/* <Input type="password" placeholder="Password" name="password" /> */}
                                </div>
                                <HideShow {...{ passwordShown, setPasswordShown }}>
                                    <Input type={passwordShown ? "text" : "password"} placeholder="Password" name="password" />
                                </HideShow>
                                <Checkbox type="checkbox" label="Remember Me" name="remember" isLogin={true} />
                                <TextError>{validationMsg && (validationMsg)}</TextError>
                                <Button btnName="LOGIN" name="login" loader={isLoaded} />
                                <div className='new_user_txt'>
                                    New User? <Link className='main-btn singup-btn' to="/register">Sign Up</Link>
                                </div>
                            </Form>
                        )
                    }
                }
            </Formik>
        </div>
    )
}

export default Login