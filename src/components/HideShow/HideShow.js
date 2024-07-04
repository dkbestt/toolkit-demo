import React from 'react'

const HideShow = ({ passwordShown, setPasswordShown, children }) => {

    const handleClick = () => {
        if (passwordShown) {
            setPasswordShown(false)
        }
        else {
            setPasswordShown(true)
        }
    }

    return (
        <div className='relative'>
            {children}
            <button type='button' className="absolute bottom-1 top-1 right-1" onClick={handleClick}>
                {passwordShown ? <i className="fa fa-eye"></i> : <i className="fa fa-eye-slash" ></i>}
            </button >
        </div>
    )
}

export default HideShow