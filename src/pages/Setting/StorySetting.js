import React from 'react'

const StorySetting = () => {
    return (
        <div className="tab-pane show active" id="nav-story" role="tabpanel">
            <div className="panel-group setting_ul" id="accordion">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            Downloads
                            <span className="ios-toggle"><input type="checkbox" name="downloads" id="downloads" />
                                <label htmlFor="downloads"></label>
                            </span>
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StorySetting