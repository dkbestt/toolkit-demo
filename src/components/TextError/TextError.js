import React from 'react'

function TextError(props) {
    return (
        <div className="text-red-500 text-sm mb-2">{props.children}</div>
    )
}

export default TextError