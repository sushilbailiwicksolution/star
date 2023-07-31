import React, { useEffect, useState } from 'react';
// import {App } from './map1';
// import MapDirectionsRenderer from './mapRoute';
// import MapContainers from './map';
// import JSMap from './jsMap';

/**
 * This component represents the landing page of the application.
 * @component
 * @param {Object} props - The props passed to the component.
 */
function Dashboard(props:any) {

    const [showLeftPannel, updateshowLeftPannel] = useState(true);

    const [ defaultheight, updateDefaultHeight ] = useState(0);

    // const [ rightPannelWidth, updaterightPannelWidth ] = useState("calc(100% - 315px)");

    const [ rightPanelCss, updateRightPanelCss ] = useState({
        width: "calc(100% - 315px)",
        height: "initial"
    })

    useEffect(() => {
        const width = document.getElementById("sliding_pannel")?.offsetWidth;
        console.log('width', width);
    })
    

  /**
   * Toggles the visibility of the left panel.
   */
    const hideLeftPannel = () =>{
        if(showLeftPannel === false){
            updateshowLeftPannel(true);
            updateDefaultHeight(0);
            updateRightPanelCss({width: "calc(100% - 315px)", height:"initial"})
            document.getElementById('sliding_pannel')?.classList.remove('dashboard-sidebar');
            // document.getElementById('map_container')?.classList.remove('col-xl-12')
        } else {
            updateshowLeftPannel(false);
            updateDefaultHeight(760);
            updateRightPanelCss({width: "100%", height:"100vh"})
            document.getElementById('sliding_pannel')?.classList.add('dashboard-sidebar');
            // document.getElementById('map_container')?.classList.add('col-xl-12')
        }
        
    }

    return (
        <React.Fragment>
        {/* <div className="loading" style={{ display: 'block' }}>Loading&#8230;</div> */}
         <div className="container-fluid">
             <div className="row">
                <div className="col-md-12">
                    <h1 className="Admin-heading">Welcome Admin</h1>
                    <img className="star_dashboard-logo" src={require("../../Assets/images/star.jpeg").default} />
                </div>
                
                 {/* <div className="left-slidearea" id="sliding_pannel">
                     <div className="sidebar-wrapper mt-4">
                         <div className="toggle_arrow" onClick={hideLeftPannel}>
                             <span>&gt;</span>
                         </div>
                        <div className="d-flex justify-content-between px-3 pt-3">
                            <label>Live Tracking Map</label>
                            <div className="d-flex align-items-center">
                                <div className="rounded-plus mr-4">
                                    <i className="fas fa-plus"></i>
                                </div>
                                <i className="fas fa-ellipsis-v fa-icon-size"></i>
                            </div>
                        </div>
                        <div className="sidebar-horizontal-menu px-3 mt-4">
                            <ul>
                                <li>
                                    <a href="avb.com">Assets</a>
                                </li>
                                <li>
                                    <a href="avb.com">Events</a>
                                </li>
                                <li>
                                    <a href="avb.com">Data Layer</a>
                                </li>
                            </ul>
                            <i className="fas fa-bars fa-icon-size"></i>
                        </div>
                        <div className="list-wrapper mt-4">
                            <ul>
                                <li className="px-3 active">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                    <div className="ml-4">
                                        <label className="m-0">Auronautical Charts</label>
                                        <span className="d-block small-text">Lorem Ipsum</span>
                                    </div>
                                </li>
                                <li className="px-3">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                    <div className="ml-4">
                                        <label className="m-0">Base Maps</label>
                                        <span className="d-block small-text">Lorem Ipsum</span>
                                    </div>
                                </li>
                                <li className="px-3">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                    <div className="ml-4">
                                        <label className="m-0">Custom Maps</label>
                                        <span className="d-block small-text">Lorem Ipsum</span>
                                    </div>
                                </li>
                                <li className="px-3">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                    <div className="ml-4">
                                        <label className="m-0">Geofences</label>
                                        <span className="d-block small-text">Lorem Ipsum</span>
                                    </div>
                                </li>
                                <li className="px-3">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                    <div className="ml-4">
                                        <label className="m-0">User Layers</label>
                                        <span className="d-block small-text">Lorem Ipsum</span>
                                    </div>
                                </li>
                                <li className="px-3">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                    <div className="ml-4">
                                        <label className="m-0">Weather Subscription Basics</label>
                                        <span className="d-block small-text">Lorem Ipsum</span>
                                    </div>
                                </li>
                                <li className="px-3">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                    <div className="ml-4">
                                        <label className="m-0">Views</label>
                                        <span className="d-block small-text">Lorem Ipsum</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                     </div>
                 </div> */}
                 {/* <div className="right-area" id="map_container" style={rightPanelCss}>
                     <div id="map_dashboard" className="mt-4"> */}
                          {/* <MapWithAMarker
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                /> */}
                {/* <MapContainers mapHeight={defaultheight} /> */}
                {/* <App /> */}
                 {/* <iframe
                style={{border:0, width:'100%', height:'100%'}}
                loading="lazy"
                allowFullScreen={true}
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA_lCaDli87c4WPO46e2MyeKKhdP6Bk4CQ
                    &q=Saudi+Arabia">
                </iframe> */}
                     {/* </div>
                
                 </div> */}
             </div>
             {/* <div className="row">
                <div className="col-md-3">
                    <div className="card-chart p-3 mb-4">
                        <p className="m-0 text-left cl-white">Hydrolic Pressure Guage</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card-chart p-3 mb-4">
                        <p className="m-0 text-left cl-white">AWR</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card-chart p-3 mb-4">
                        <p className="m-0 text-left cl-white">Engine 1 Throttle</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card-chart p-3 mb-4">
                        <p className="m-0 text-left cl-white">Engine 2 Throttle</p>
                    </div>
                </div>
             </div> */}
         </div>
        </React.Fragment>
    )
}

export default Dashboard;