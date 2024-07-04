import React from 'react'

const Switch = ({ children }) => {
    return (
        <div className="panel-group setting_ul" id="accordion" role="tablist" aria-multiselectable="true">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title">
                        <a className="collapsed" role="button" href="#">
                            {children}
                            <span className="ios-toggle">
                                <input type="checkbox" name="sharing" id="sharing" />
                                <label htmlFor="sharing"></label>
                            </span>
                        </a>
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default Switch