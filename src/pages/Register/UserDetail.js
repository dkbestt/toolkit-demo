import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'


//Custom Impots
import { Button } from '../../components/Button'
import ProfileEdit from '../../components/ProfileEdit'
import Input from '../../components/Input'
import { next } from '../../store/reducers/stepSlice'
import { addFullName } from '../../store/reducers/userSlice'

const UserDetail = () => {

    const dispatch = useDispatch()

    const intitialValues = {
        first_name: '',
        last_name: ''
    }

    const validationSchema = Yup.object({
        first_name: Yup.string().required('This field is Required')
            .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field.")
            .matches(/^(\S+$)/g, `This field can't contain blank spaces`),
        last_name: Yup.string().required('This field is Required')
            .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field.")
            .matches(/^(\S+$)/g, `This field can't contain blank spaces`),
    })

    const onSubmit = (values) => {
        console.log(values)
        dispatch(addFullName(values))
        dispatch(next())
    }

    return (
        <>
            <Formik initialValues={intitialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    formik => {
                        return (
                            <Form className="pt-8 space-y-6">
                                {/* //user can set new profile */}
                                <ProfileEdit />
                                <Input type="text" placeholder="First Name" name="first_name" />
                                <Input type="text" placeholder="Last Name" name="last_name" />
                                <Button btnName="Next" name="nextFirst" />
                            </Form>
                        )
                    }
                }
            </Formik>
        </>
    )
}
export default UserDetail 
