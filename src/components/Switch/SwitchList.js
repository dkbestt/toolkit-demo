import React, { useState } from 'react'

const SwitchList = (props) => {
  // console.log(props.profilePhoto ,props.value);
  let checked = props.checked ? "checked" : null
  const handleChange = (e) => {
    // e.preventDefault()
    props.setProfilePhoto(e.target.checked)
  }
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h4 className="panel-title">
          <a className="collapsed" role="button" href="#">
            {props.children}
            <span className="ios-toggle">
              <input type={props.radio ? "radio" : "checkbox"} name='sharing' />
              <label htmlFor="sharing"></label>
            </span>
          </a>
        </h4>
      </div>
    </div>
  )
}

export default SwitchList