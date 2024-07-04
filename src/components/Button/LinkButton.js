import React from 'react'

const LinkButton = (props) => {
  return (
    <button
      className="absolute bottom-1 top-1 right-1"
      type='submit'
      disabled={props.disabled}>
      <a className="text-[#619cb0]">Send Code</a>
    </button>
  )
}

export default LinkButton