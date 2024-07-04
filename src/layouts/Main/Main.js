import React, { Component } from 'react'

// export default function Main(SideBar, Header, Post, Chat) {
export default function Main(Post) {

    return class extends Component {
        render() {
            return (
                <>
                    <div>
                        <Post />
                    </div>
                </>
            )
        }
    }
}

// //
// <div className="container-fluid">
//                         <div className="row">
//                             {/* <SideBar /> */}
//                             <div className="col-6 col-md-3 border"></div>
//                             <div className="col-6 col-md-9 border">
//                                 {/* <Header /> */}
//                                 <div className="row">
//                                     <div className="col-6 col-md-8 border"><Post /></div>
//                                     {/* <div className="col-6 col-md-4 border"><Chat /></div> */}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>