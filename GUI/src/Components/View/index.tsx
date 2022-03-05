import React, { useState, useEffect } from "react";

function View (props:any) {
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 300)
    }, [])

    return <React.Fragment>
        <div className="loading" style={{ display: loader ? 'block' : 'none' }}><img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" /></div>
        <div className="container-fluid content-body vh-100">
            <div className="row">
                 {/* <div className="col-lg-9 col-xl-10 my-4"> */}
                     <img src={require("../../Assets/images/view.jpg").default} style={{maxWidth:'100%'}}/>
                {/* </div> */}
            </div>
            </div>
    </React.Fragment>
}

export default View;