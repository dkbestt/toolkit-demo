import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from '../TextError'

const Input = (props) => {
    const { label, name, type, ...rest } = props
    const remember = localStorage.getItem('remember')
    // let value = ''
    // if (remember) {
    //     if (type === 'text') {
    //         value = localStorage.getItem('username')
    //     } else {
    //         value = localStorage.getItem('password')
    //     }
    // }
    return (
        <>
            <div className="border-b">
                <Field
                    className="bg-transparent border-none text-gray-700 focus:outline-none object-fill h-10 w-96"
                    // className="bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    // className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id={name}
                    name={name}
                    {...rest}
                    type={type}
                // value={value}
                />
            </div>
            <ErrorMessage
                name={name}
                component={TextError} />
        </>
    )
}

export default Input