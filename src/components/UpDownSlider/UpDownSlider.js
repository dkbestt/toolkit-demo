import React, { useState } from 'react'

const UpDownSlider = (props) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="panel panel-default">
            <div className="panel-heading" role="tab" id="headingProfile">
                <h4 className="panel-title">
                    <a className="collapsed"
                        onClick={() => { open ? setOpen(false) : setOpen(true) }}
                        role="button"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href={props.href ? props.href : "#"}
                        // target="_blank"
                        aria-controls="collapseProfile"
                    >
                        {props.icon} {props.setting} {props.label}
                    </a>
                </h4>
            </div>
            <div id="collapseProfile" className="panel-collapse collapse" role="tabpanel"
                aria-labelledby="headingProfile">
                <div className="panel-body">
                    {open && props.children}
                </div>
            </div>
        </div>
    )
}

export default UpDownSlider