import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from '../TextError'
import Label from '../Label'

function Input(props) {
    const { label, name, ...rest } = props
    return (
        <div>
            <Label name={name}>{label}</Label>
            <Field
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                // className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                id={name}
                name={name}
                {...rest}
            />
            <ErrorMessage
                name={name}
                component={TextError} />
        </div>
    )
}

export default Input