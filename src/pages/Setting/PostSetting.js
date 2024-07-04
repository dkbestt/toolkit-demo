import React from 'react'

const PostSetting = () => {
    const handleCollapse = (element) => {
        //     var cols = document.getElementsByClassName('panel-collapse');
        //   let  i=0;
        //     for(i = 0; i < cols.length; i++) {
        //      if(cols[i].id===element)
        //      cols[i].style.display=""
        //     }
        // document.getElementsByClassName("panel-collapse").style.display = ""
    }
    return (
        <div className="tab-pane" id="nav-Post" role="tabpanel" >
            <div className="panel-group setting_ul" id="accordion" role="tablist" aria-multiselectable="true">
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingLink">
                        <h4 className="panel-title">
                            <a className=""
                                href="#" onClick={() => { handleCollapse('collapseLink') }} >
                                Likes
                            </a>
                        </h4>
                    </div>
                    <div id="collapseLink" className="panel-collapse collapse" role="tabpanel"
                        aria-labelledby="headingLink">
                        <div className="panel-body">
                            <p>Lorem ipsum dolor sit amet. </p>
                        </div>
                    </div>
                </div>
                <div className="panel panel-default" onClick={() => { console.log("preet"); }}>
                    <div className="panel-heading" role="tab" id="headingComments" >
                        <h4 className="panel-title">
                            <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion"
                                href="#collapseComments" aria-controls="collapseComments">
                                Comments
                            </a>
                        </h4>
                    </div>
                    <div id="dropdownDivider" className="panel-collapse collapse" role="tabpanel">
                        <div className="panel-body">
                            <p>Lorem ipsum dolor sit amet. </p>
                        </div>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingcommentslike" onClick={handleCollapse}>
                        <h4 className="panel-title">
                            <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion"
                                href="#collapsecommentslike" aria-controls="collapsecommentslike">
                                Comments Likes
                            </a>
                        </h4>
                    </div>
                    <div id="collapsecommentslike" className="panel-collapse collapse" role="tabpanel"
                        aria-labelledby="headingcommentslike">
                        <div className="panel-body">
                            <p>Lorem ipsum dolor sit amet. </p>
                        </div>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            Likes and Comments on Photo of You
                            <span className="ios-toggle"><input type="checkbox" name="comments-photo"
                                id="commentphoto" /><label htmlFor="comments-photo"></label></span>
                        </h4>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingPhoto">
                        <h4 className="panel-title">
                            <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion"
                                href="#collapsePhoto" aria-controls="collapsePhoto">
                                Photo of You
                            </a>
                        </h4>
                    </div>
                    <div id="collapsePhoto" className="panel-collapse collapse" role="tabpanel"
                        aria-labelledby="headingPhoto">
                        <div className="panel-body">
                            <p>Lorem ipsum dolor sit amet. </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostSetting