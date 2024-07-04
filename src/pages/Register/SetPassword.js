import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'

// Custom Imports
import { Button } from '../../components/Button'
import { next } from '../../store/reducers/stepSlice'
import BackButton from '../../components/BackButton'
import { addPassword } from '../../store/reducers/userSlice'
import Input from '../../components/Input'
import { SET_YOUR_PASSWORD } from '../../constants/Contants'

const SetPassword = () => {

    const dispatch = useDispatch()
    const reset_password = useSelector((state) => state.forgot_password.reset_password) // this constant use for forgot password

    const intitialValues = {
        password: '',
        confirm_password: ''
    }

    const validationSchema = Yup.object({
        password: Yup.string().min(6, "Your password must be 6 or more Alphanumeric characters").required('This field is Required'),
        confirm_password: Yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Both password need to be the same"
            )
        }).required('This field is Required')
    })

    const onSubmit = (values) => {
        dispatch(addPassword(values.password))
        dispatch(next())
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
                            <Button btnName="Next" name="next" />
                        </Form>)
                }
            }
        </Formik>

    )

}

export default SetPassword 
