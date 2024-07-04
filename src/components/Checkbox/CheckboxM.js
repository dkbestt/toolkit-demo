import { ErrorMessage, Field } from 'formik'
import React from 'react'
import Label from './Label'
import TextError from './TextError'

function Checkbox(props) {
    const { label, name, options, ...rest } = props
    return (
        <div>
            <Label name={name}>{label}</Label>
            <Field
                name={name} {...rest}>
                {
                    ({ field }) => {
                        return options.map(option => {
                            return (
                                <React.Fragment key={option.value}>
                                    <input
                                        className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white float-left mr-2 cursor-pointer"
                                        type="checkbox"
                                        id={option.value}
                                        {...field}
                                        value={option.value}
                                        checked={field.value.includes(option.value)}
                                    />
                                    <Label name={option.value}>{option.key}</Label>
                                </React.Fragment>
                            )
                        })
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default Checkbox