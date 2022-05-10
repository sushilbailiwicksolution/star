import React, { useState, useEffect } from "react";

function View(props: any) {
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
                <div className='craftAnalitic-detail d-flex align-items-center justify-content-between p-4 craftAnalitic-detail-view'>
                    <div className='d-flex leftBox-area'>
                        <div className='d-flex align-items-center'>
                            <div className='loader-circle'></div>
                            <h2>
                                67%
                                <span className='d-block'>Fuel</span>
                            </h2>
                        </div>
                        <div className='d-flex align-items-center'>
                            <div className='loader-circle yellow-circle'></div>
                            <h2>
                                300 KTS
                                <span className='d-block'>True Air Speed</span>
                            </h2>
                        </div>
                        <div className='d-flex align-items-center'>
                            <div className='loader-circle green-circle'></div>
                            <h2>
                                290KTS
                                <span className='d-block'>Ground Speed</span>
                            </h2>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <i className='fas fa-ellipsis-v fa-icon-size'></i>
                    </div>
                </div>
                {/* <div className="col-lg-9 col-xl-10 my-4"> */}
                <img src={require("../../Assets/images/view.jpg").default}
                    style={{ maxWidth: '100%' }} />
                {/* </div> */}
            </div>
        </div>
    </React.Fragment>
}

export default View;