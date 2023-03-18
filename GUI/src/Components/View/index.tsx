import React, { useState, useEffect } from "react";
import LiveTrackingMap from "./LiveTrackingMap";
import MapViewContainer from "./MapViewContainer";
import { Dailogmodal1, Dailogmodal2 } from "./dailogModal";
import { useDispatch, useSelector } from "react-redux";
import { ViewsConstants } from "../../Constants/constants";
import { BaronMethods } from './baron-weather.js';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import  MapContainer  from "./map-view";
const PRODUCT = 'C39-0x0302-0';
function View(props: any) {
    const [loader, setLoader] = useState(false);
    const viewReducerResponse = useSelector((state: any) => state.viewReducer);
    const dispatch = useDispatch();
    useEffect(() => {
      //  onInitBaron();
        setTimeout(() => {
            setLoader(false);
        }, 300)
    }, []);

    const onInitBaron = async () => {
        try {
            const baronMapData = await BaronMethods.baronWeatherMap(PRODUCT);
            console.log("baronMapData", baronMapData);
            dispatch({ type: ViewsConstants.BARON_WEATHER_DATA, value: baronMapData });
        } catch (error) {
            console.log("baronMapData error", error);
        }
    }

    useEffect(() => {
        return () => {
            dispatch({
                type: ViewsConstants.VIEW_CLEAR_DATA,
                value: {},
            });
        };
    }, []);

    return <React.Fragment>
        <div className="loading" style={{ display: loader ? 'block' : 'none' }}><img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" /></div>
        <div className="container-fluid content-body vh-100">
            <div className="row">
                <div className='craftAnalitic-detail d-flex align-items-center justify-content-between p-4 craftAnalitic-detail-view'>
                    <div className='d-flex leftBox-area'>
                        <div className='d-flex align-items-center'>
                            {/* <div className='loader-circle'></div> */}
                            <div className='progress-loader-circle'>
                                <CircularProgressbar value={viewReducerResponse.fuel} styles={buildStyles({
                                    // Rotation of path and trail, in number of turns (0-1)
                                    rotation: 0.25,
                                    // Colors
                                    pathColor: `#3498db`,
                                })} />
                            </div>
                            <h2>
                                {`${viewReducerResponse.fuel}%`}
                                <span className='d-block'>Fuel</span>
                            </h2>
                        </div>
                        <div className='d-flex align-items-center'>
                            {/* <div className='loader-circle yellow-circle'></div> */}
                            <div className='progress-loader-circle'>
                                <CircularProgressbar value={viewReducerResponse.fuel} maxValue={500} styles={buildStyles({
                                    // Rotation of path and trail, in number of turns (0-1)
                                    rotation: 0.25,
                                    // Colors
                                    pathColor: `#FFC43D`,
                                })} />
                            </div>
                            <h2>
                                {`${viewReducerResponse.airSpeed} KTS`}
                                <span className='d-block'>True Air Speed</span>
                            </h2>
                        </div>
                        <div className='d-flex align-items-center'>
                            {/* <div className='loader-circle green-circle'></div> */}
                            <div className='progress-loader-circle'>
                                <CircularProgressbar value={viewReducerResponse.groundSpeed} maxValue={500} styles={buildStyles({
                                    // Rotation of path and trail, in number of turns (0-1)
                                    rotation: 0.25,
                                    // Colors
                                    pathColor: `#4caf50`,
                                })} />
                            </div>
                            <h2>
                                {`${viewReducerResponse.groundSpeed} KTS`}
                                <span className='d-block'>Ground Speed</span>
                            </h2>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <i className='fas fa-ellipsis-v fa-icon-size'></i>
                    </div>
                </div>
                <LiveTrackingMap/>
                <div className='col-md-9 my-4'>
                    <div className='maparea-container-view mb-4'>
                        <MapViewContainer {...props}></MapViewContainer>
                    </div>
                </div>
            </div>
            <Dailogmodal1 />
            <Dailogmodal2 />
        </div>
    </React.Fragment>
}

export default View;