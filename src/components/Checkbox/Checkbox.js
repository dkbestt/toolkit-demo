import React from 'react'
import { Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import { setResetPassword } from '../../store/reducers/forgotPasswordSlice'
import { useDispatch } from 'react-redux'
import { next } from '../../store/reducers/stepSlice'

const Checkbox = (props) => {
    const { label, name, isLogin, ...rest } = props
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(setResetPassword())
    }
    return (
        <div className="wrap-filed checkout-input" >
            <div className="check_input input-check">
                <Field
                    className="mr-2 leading-tight required:border-red-500"
                    name={props.name}
                    id={props.id}
                    {...rest}
                />
                <span className='checkout'>{props.label}</span>
            </div>
            {isLogin && (
                <Link className='forgot-popup' to="/forgot-password" onClick={handleClick}>Forgot Password?</Link>
            )}
        </div>
    )
}

export default Checkbox
