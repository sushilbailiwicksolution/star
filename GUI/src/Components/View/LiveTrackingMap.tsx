import moment from "moment";
import React, { memo, useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ViewsConstants } from "../../Constants/constants";
import { getAirCraft, getAirCraftDetails } from "../../Service";
import { assetService } from "../../Service/asset.service";
import Events from './events-tab';
import DataLayers from './dataLayer-tab';
import './view.css';
import { clearInterval } from "timers";
const AirCraftDetailInterval = 30000;
const LiveTrackingMap = () => {

    const [selectedTab, setSelectedTab] = useState(1);
    const [loader, setLoader] = useState(false);
    const [assetsList, setAssetsList] = useState([]);
    const [selectedAicraftId, changeSelectedAircraftId] = useState();
    const [selectedAsset, setSelectedAsset] = useState(-1);
    const [intervalState, setIntervalState] = useState<any>();
    const [assetTogglebtn, setAssetTogglebtn] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        onInit();
    }, []);

    const onInit = async () => {
        setLoader(true);
        await getAssetsList();
        setLoader(false);
    }

    const getAssetsList = () => {
        return new Promise(async (resolve, reject) => {
            try {
                let userData = await assetService.getAssetsList();
                if (userData.status == '200') {
                    const checkListArr = userData.data.results;
                    setAssetsList(checkListArr);
                    if (checkListArr.length > 0) {
                        changeSelectedAircraftId(checkListArr[0].name);
                    }
                } else {
                    setAssetsList([]);
                    changeSelectedAircraftId(undefined);
                }
                resolve(true);
            } catch (error: any) {
                resolve(true);
                toast.error(error.msg);
                console.error(error);
            }
        });
    };

    const changeTab = (tabId: number) => {
        if (selectedTab === tabId) return;
        setSelectedTab(tabId);
    }

    const onClickAsset = (item: any) => {
        setSelectedAsset(item.id);
        let toDate = new Date();
        const toDateFormat = moment(toDate).format('DD-MM-YYYY');
        let fromDate = getLastNMonthDate(toDate, -6);
        const fromDateFormat = moment(fromDate).format('DD-MM-YYYY');
        getAirCraftData(item.name, fromDateFormat, toDateFormat);
    }

    const getAirCraftData = async (assetName: any, fromDate: any, toDate: any) => {
        setLoader(true);
        try {
            const airCraftData = await getAirCraft(
                fromDate,
                toDate,
                assetName
            );
            const airCrafts = [] as any;
            for (let k in airCraftData) {
                airCrafts.push(airCraftData[k]);
            }
            if (airCrafts.length > 0) {
                getAirCraftDetailsData(airCrafts[airCrafts.length - 1].aircraftid);
            } else {
                setLoader(false);
            }
        } catch (e) {
            console.error('getAirCraftData', e);
            setLoader(false);
        }
    }

    const getAirCraftDetailsData = async (selectedFlight: any) => {
        getAirCraftDetailsAPI(selectedFlight);
        if (intervalState) {
            clearInterval(intervalState);
        }
        const interval = setInterval(() => {
            getAirCraftDetailsAPI(selectedFlight);
        }, AirCraftDetailInterval);
        setIntervalState(interval);
    }

    const getAirCraftDetailsAPI = async (selectedFlight: any) => {

        try {
            const airCraftDetails = await getAirCraftDetails(selectedFlight);
            let airCrafts = [] as any;
            const fuelDetails = {
                fuel: 0,
                airSpeed: 0,
                groundSpeed: 0
            }

            // for (let k in airCraftDetails) {
            //     airCrafts.push(airCraftDetails[k]);
            // }
            if (airCraftDetails.flightData) {
                airCrafts = airCraftDetails.flightData;
            } else {
                airCrafts = [];
            }
            console.log('airCraftDetails', airCrafts);

            dispatch({
                type: ViewsConstants.FLIGHT_LIST_DATA,
                value: airCrafts,
            });

            if (airCraftDetails.data) {
                fuelDetails.fuel = airCraftDetails.data.fuel ? airCraftDetails.data.fuel : 0;
                fuelDetails.airSpeed = airCraftDetails.data.air_speed ? airCraftDetails.data.air_speed : 0;
                fuelDetails.groundSpeed = airCraftDetails.data.ground_speed ? airCraftDetails.data.ground_speed : 0;
            }
            dispatch({
                type: ViewsConstants.VIEW_FLIGHT_SPEED_DETAILS,
                value: fuelDetails,
            });
            setLoader(false);
        } catch (error) {
            console.error('getAirCraftDetailsData', error);
            dispatch({
                type: ViewsConstants.FLIGHT_LIST_DATA,
                value: [],
            });
            setLoader(false);
        }

    }

    const getLastNMonthDate = (date: Date, months: number) => {
        date.setMonth(date.getMonth() + months);
        return date;
    }

    const Assets = () => {
        return (
            <div className="color-white">
                <div className='row'>
                    <div className='dd-style w-100'>
                        <div className='col-md-12 mb-3'>
                            <div className='select-dropdown'>
                                <select
                                    className='form-control'
                                    id='select2'
                                    onChange={(e: any) => {
                                        changeSelectedAircraftId(e.target.value);
                                    }}
                                    value={selectedAicraftId}
                                >
                                    {assetsList.map((item: any) => {
                                        return (
                                            <option value={item.name} key={item.id}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="list-group asset-list">
                    {assetsList.map((item: any) => {
                        return <a key={item.id} href="#" className={`list-group-item list-group-item-action ${item.id == selectedAsset ? 'selectedAsset' : ''}`}
                            onClick={() => onClickAsset(item)}>
                            <div className="list-row">
                                <img src={require("../../Assets/images/plane.png").default} className="img-fluid" />
                                <div className="list-child-2">
                                    <h5>{item.name}</h5>
                                    <p>4 knots 228.0<sup>o</sup></p>
                                </div>
                                <div className="list-child-3">
                                    <p>Stationary</p>
                                    <p className="text-truncate">Loc: BOD/LFBD Bordeau...</p>
                                    <p>35days 23 hrs 39 miins ago</p>
                                </div>
                            </div>
                        </a>
                    })}

                </div>
                <div className="custom-card">
                    <button className="btn btn-primary px-3 py-2 mb-3" onClick={() => setAssetTogglebtn(!assetTogglebtn)}><i className={assetTogglebtn ? 'fas la-angle-down' : 'fas la-angle-up'}></i></button>
                    <div className={assetTogglebtn ? 'custom-card-container show-top' : 'custom-card-container'}>
                        <div className="custom-card-header">
                            <ul className="nav">
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-external-link-alt"></i></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-search-plus"></i></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-crosshairs"></i></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-comments"></i></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-exclamation"></i></a></li>
                                <li className="nav-item ml-auto"><a href="#" className="nav-link text-white"><i className="fas la-exclamation-circle"></i></a></li>
                            </ul>
                        </div>
                        <div className="custom-card-body">
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th className="text-warning">Attribute</th>
                                        <th className="text-warning">value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>John</td>
                                        <td>Doe</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className='col-md-3 my-4 vh-90'>
            <div className='loading' style={{ display: loader ? 'block' : 'none' }}>
                <img src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' />
            </div>
            <div className='sidebar-wrapper noheight-wrapper noheight-wrapper-view p-4'>
                <label className='text-left d-block mb-3'>
                    Live Tracking Map
                </label>
                <div className="view-tabs">
                    <span className={`cursor-pointer ${selectedTab === 1 ? "tab-active" : ""}`} onClick={() => { changeTab(1) }}>Assets</span>
                    <span className={`cursor-pointer ${selectedTab === 2 ? "tab-active" : ""}`} onClick={() => { changeTab(2) }}>Events</span>
                    <span className={`cursor-pointer ${selectedTab === 3 ? "tab-active" : ""}`} onClick={() => { changeTab(3) }}>Data Layers</span>
                </div>
                {selectedTab === 1 ?
                    Assets() : null}
                {selectedTab === 2 ?
                    <Events /> : null}
                {selectedTab === 3 ?
                    <DataLayers /> : null}

                {/* <div className="view-bottom-popup-container color-white">
                    <div>Bottom Popup</div>
                </div> */}
            </div>
        </div>)
}

export default memo(LiveTrackingMap);