import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// Custom Imports
import { Button } from '../../components/Button'
import { next } from '../../store/reducers/stepSlice'
import BackButton from '../../components/BackButton/BackButton'
import { addPassword } from '../../store/reducers/userSlice'
import Input from '../../components/Input'
import { SET_YOUR_PASSWORD } from '../../constants/Contants'
import apiService from '../../services/apiService'
import TextError from '../../components/TextError'

const SetForPass = () => {

    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false)
    const [validationMsg, setValidationMsg] = useState(null)
    const { reset_password, type, email, mobile } = useSelector((state) => ({ ...state.forgot_password })) // this constant use for forgot password

    const intitialValues = {
        password: '',
        confirm_password: ''
    }

    const validationSchema = Yup.object({
        password: Yup.string().min(6, "Your password must be 6 or more Alphanumeric characters").required('This field is Required'),
        confirm_password: Yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")], "Both password need to be the same"
            )
        }).required('This field is Required')
    })

    const onSubmit = (values) => {
        setIsLoaded(true)
        const passData = {
            user_name: email || mobile,
            type: type,
            password: values.password
        }
        apiService.ResetForPass(passData).then((res) => {
            if (res.success === 1) {
                setIsLoaded(false)
                setValidationMsg(res.message)
                setTimeout(() => {
                    navigate('/')
                    // window.location.reload();
                }, 1500)
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
                            <h1>{reset_password ? (reset_password) : SET_YOUR_PASSWORD}</h1>
                            <Input type="password" placeholder="Password" name="password" />
                            <Input type="password" placeholder="Confirm Passowrd" name="confirm_password" />
                            <Button btnName="Submit" name="submit" loader={isLoaded} />
                            <TextError>{validationMsg && (validationMsg)}</TextError>
                        </Form>
                    )
                }
            }
        </Formik>
    )
}

export default SetForPass
