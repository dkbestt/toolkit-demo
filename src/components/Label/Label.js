import React from 'react'

function Label(props) {
    const { name } = props
    return (
        <label className="flex text-sm font-bold text-gray-700" htmlFor={name}>{props.children}</label>
    )
}

export default Label