import React from 'react'
import { ErrorMessage, Field } from 'formik'
import TextError from './TextError'
import Label from './Label'

function Textarea(props) {
    const { label, name, ...rest } = props
    return (
        <div>
            <Label name={name}>{label}</Label>
            <Field
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                as='textarea'
                id={name}
                name={name}
                {...rest}
            />
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default Textarea