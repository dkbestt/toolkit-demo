import React from 'react'
import Loader from '../Loader/Loader'

const Button = (props) => {
    const { name, btnName, isDisabled, loader } = props
    return (
        <div className='form'>
            <div className='submit-btn'>
                <button
                    name={name}
                    type="submit"
                    className={isDisabled ? 'disabled' : 'main-btn singup-btn'}
                    disabled={isDisabled}
                >
                    {loader ? <Loader /> : <span>{btnName}</span>}
                </button>
            </div>
        </div>
    )
}

export default Button