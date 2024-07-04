import { ErrorMessage, Field } from 'formik'
import React from 'react'
import Label from './Label'
import TextError from './TextError'

function Dropdown(props) {
    const { label, name, options, ...rest } = props
    return (
        <div>
            <Label name={name}>{label}</Label>
            <Field
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                as='dropdown'
                id={name}
                name={name}
                {...rest}
            >
                {
                    options.map((option) => {
                        return (
                            <option key={option.value} value={option.value}>{option.key}</option>
                        )
                    })
                }
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default Dropdown