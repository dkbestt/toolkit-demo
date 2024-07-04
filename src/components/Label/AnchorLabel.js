import React from 'react'

const AnchorLabel = ({ children }) => {

    return (
        <div className="text-red panel-group setting_ul" id="accordion" role="tablist" aria-multiselectable="true">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <a className="p-3" role="button" href="#">
                        <p className='text-red-500'> {children}</p>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default AnchorLabel