import React, { useState } from 'react'

const UpDownSliderLabel = (props) => {
    const [open, setOpen] = useState(false)
    return (
        <div> <div className="panel panel-default">
            <div className="panel-heading" role="tab" id="headingProfile">
                <h4 className="right-panel">
                    <a className=""
                        onClick={() => { open ? setOpen(false) : setOpen(true) }}
                        role="button"
                        href="#"
                    >
                        {props.icon} {props.setting}
                        <span>{props.label}<i className="fa fa-angle-right ml-1" aria-hidden="true"></i></span>
                    </a>
                </h4>
            </div>
            <div id="collapseProfile" className="panel-collapse collapse" role="tabpanel"
                aria-labelledby="headingProfile">
                <div className="panel-body">
                    {open && props.children}
                </div>
            </div>
        </div></div>
    )
}

export default UpDownSliderLabel