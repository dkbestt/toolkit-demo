import React from 'react'

const ChatSetting = () => {
  return (
    <div className="tab-pane" id="nav-chat" role="tabpanel"  >
    <h3>Message Notification</h3>
    <div className="panel-group setting_ul" id="accordion" role="tablist" aria-multiselectable="true">
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                    <a className="collapsed" href="/">
                        Show Notification <span className="ios-toggle"><input type="checkbox" name="collapseOne"
                            id="collapseOne" /><label htmlFor="collapseOne"></label></span>
                    </a>
                </h4>
            </div>
        </div>
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                    <a className="collapsed" href="/">
                        Message Preview <span className="ios-toggle"><input type="checkbox" name="collapseTwo"
                            id="collapseTwo" /><label htmlFor="collapseTwo"></label></span>
                    </a>
                </h4>
            </div>
        </div>
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                    <a className="collapsed" href="/">
                        Sound <span className="ios-toggle"><input type="checkbox" name="collapseThree"
                            id="collapseThree" /><label htmlFor="collapseThree"></label></span>
                    </a>
                </h4>
            </div>
        </div>
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                    <a className="collapsed" href="/">
                        Message Request <span className="ios-toggle"><input type="checkbox" name="collapseFor"
                            id="collapseFor" /><label htmlFor="collapseFor"></label></span>
                    </a>
                </h4>
            </div>
        </div>
    </div>
    <h3>Group Notification</h3>
    <div className="panel-group setting_ul" id="accordion" role="tablist" aria-multiselectable="true">
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                    <a className="collapsed" href="/">
                        Show Notification <span className="ios-toggle"><input type="checkbox" name="collapseOne1"
                            id="collapseOne1" /><label htmlFor="collapseOne1"></label></span>
                    </a>
                </h4>
            </div>
        </div>
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                    <a className="collapsed" href="/">
                        Message Preview <span className="ios-toggle"><input type="checkbox" name="collapseTwo1"
                            id="collapseTwo1" /><label htmlFor="collapseTwo1"></label></span>
                    </a>
                </h4>
            </div>
        </div>
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                    <a className="collapsed" href="/">
                        Sound <span className="ios-toggle"><input type="checkbox" name="collapseThree1"
                            id="collapseThree1" /><label htmlFor="collapseThree1"></label></span>
                    </a>
                </h4>
            </div>
        </div>
    </div>
    <h3>In App Notification</h3>
    <div className="panel-group setting_ul" id="accordion" role="tablist" aria-multiselectable="true">
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                    <a className="collapsed" href="/">
                        Show Notification <span className="ios-toggle"><input type="checkbox" name="collapseOne2"
                            id="collapseOne2" /><label htmlFor="collapseOne2"></label></span>
                    </a>
                </h4>
            </div>
        </div>
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                    <a className="collapsed" href="/">
                        Message Preview <span className="ios-toggle"><input type="checkbox" name="collapseTwo2"
                            id="collapseTwo2" /><label htmlFor="collapseTwo2"></label></span>
                    </a>
                </h4>
            </div>
        </div>
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                    <a className="collapsed" href="/">
                        Sound <span className="ios-toggle"><input type="checkbox" name="collapseThree2"
                            id="collapseThree2" /><label htmlFor="collapseThree2"></label></span>
                    </a>
                </h4>
            </div>
        </div>
    </div>
</div>
  )
}

export default ChatSetting