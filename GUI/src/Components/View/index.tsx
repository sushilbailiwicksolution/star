import React, { useState, useEffect, useRef } from "react";
import LiveTrackingMap from "./LiveTrackingMap";
import MapViewContainer from "./MapViewContainer";
import { Dailogmodal1, Dailogmodal2 } from "./dailogModal";
import { useDispatch, useSelector } from "react-redux";
import { ViewsConstants } from "../../Constants/constants";
import { BaronMethods } from "./baron-weather.js";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StraightenIcon from "@mui/icons-material/Straighten";
import CropIcon from "@mui/icons-material/Crop";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import CloudIcon from "@mui/icons-material/Cloud";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import CircleIcon from "@mui/icons-material/Circle";
import StopIcon from "@mui/icons-material/Stop";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CountdownTimer from "./CountdownTimer";
import { viewService } from "../../Service/view.service";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { fixDecimalService } from "../../Service/fixDecimal.service";
import AlarmSpeedograph from "./alarm_speedograph";
import AssetSpeedograph from "./asset_speedograph";
import { useTypedSelector } from "../../Reducers/RootReducer";
import { customerService } from "../../Service/customer.service";

const defaultSummary = {
  totalassets: "0",
  movingcount: "0",
  activecount: "0",
  stoppedcount: "0",
  inactivecount: "0",
  totalevents: "0",
  totalalarms: "0",
};
// import  MapContainer  from "./map-view";
const PRODUCT = "C39-0x0302-0";

const defaultGoToPlaceholder = "Go to...";
const Error_GoToLocation = "could not locate address";

/**
 * This component is handling  track page.
 * @component
 */
function View(props: any) {

  const selectedCustomer = useTypedSelector(
    (state) => state.viewReducer.selectedCustomer
  );
  
  const [isClicked, setIsClicked] = useState(false);

  const [loader, setLoader] = useState(false);
  const [showAircraftPopup, updateAircraftPopup] = useState(true);
  const viewReducerResponse = useSelector((state: any) => state.viewReducer);
  const dispatch = useDispatch();
  const [summaryData, setSummaryData] = useState(defaultSummary);
  const [mapboxTogglebtn, setMapboxTogglebtn] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const liveTrackingRef = useRef<any>();
  const mapContainerRef = React.createRef();
  const [onHoverLatLong, setOnHoverLatLong] = useState("");
  const [goToValue, setGoToValue] = useState("");
  const [goToPlaceHolder, setGoToPlaceholder] = useState(
    defaultGoToPlaceholder
  );

  useEffect(() => {
    //  onInitBaron();
    setTimeout(() => {
      setLoader(false);
    }, 300);
  }, []);

  const onInitBaron = async () => {
    try {
      const baronMapData = await BaronMethods.baronWeatherMap(PRODUCT);
      dispatch({
        type: ViewsConstants.BARON_WEATHER_DATA,
        value: baronMapData,
      });
    } catch (error) {
      console.log("baronMapData error", error);
    }
  };

  useEffect(() => {
    onInit();
    return () => {
      dispatch({
        type: ViewsConstants.VIEW_CLEAR_DATA,
        value: {},
      });
    };
  }, [selectedCustomer]);

  let logedInUser: any = localStorage.getItem('logedInUser');
logedInUser = JSON.parse(logedInUser);  
const accountType=logedInUser.results.accountType;
const customerId=logedInUser.results.customerId;
const loggedData=logedInUser.results;
  const onInit = async () => {
   
   
    try {
      setLoader(true);
      if (accountType==="SERVICE" && customerId===0){
      const summaryData = await viewService.getSummaryCount(selectedCustomer?.id);
      
      setLoader(false);
      if (summaryData) {
        setSummaryData({ ...summaryData });
      } else {
        setSummaryData({ ...defaultSummary });
      }
    }
    else if(accountType === "USER"){
      const summaryData = await viewService.getSummaryCount(loggedData?.customerId);
      
      setLoader(false);
      if (summaryData) {
        setSummaryData({ ...summaryData });
      } else {
        setSummaryData({ ...defaultSummary });
      }
    
    }
    else if(accountType === "CUSTOMER"){
            const customer_response = await customerService.getCustomerByUserId(loggedData?.id);

      const summaryData = await viewService.getSummaryCount(customer_response.data.results.id);
      
      setLoader(false);
      if (summaryData) {
        setSummaryData({ ...summaryData });
      } else {
        setSummaryData({ ...defaultSummary });
      }
    
    }
    } catch (error) {
      setLoader(false);
      setSummaryData({ ...defaultSummary });
    }
  };

  const upToTwoDecimal = (value: any) => {
    return fixDecimalService.upToTwoDecimal(value);
  };

  const showHideAircraftPopup = () => {
    updateAircraftPopup(!showAircraftPopup);
    if (showAircraftPopup) {
      try {
        document.getElementById("filter_lane")?.classList.add("my-class-2");
      } catch (err1) {}
    } else {
      try {
        document.getElementById("filter_lane")?.classList.remove("my-class-2");
      } catch (err2) {}
    }
  };

  const AircraftAnalyticDetails = () => {
    return (
      <div className="ap-filter ap-filter-2" id="filter_lane">
        <div
          className="square_click square_click_track-top"
          style={{ cursor: "pointer" }}
          onClick={showHideAircraftPopup}
        >
          {/* <i className="fa fa-cog" aria-hidden="true"></i> */}
          {showAircraftPopup ? (
            <ArrowForwardIosOutlinedIcon />
          ) : (
            <ArrowBackIosNewOutlinedIcon />
          )}
        </div>
        <div className="filter-block p-3">
          <div className="craftAnalitic-parent">
            {/* <div className="title">
              Asset:{viewReducerResponse.selectedAssetId}
                 Event Name : {viewReducerResponse.eventName}
            </div> */}
            <div
              className="title"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span style={{ textAlign: "left" }}>
                Asset: {viewReducerResponse.selectedAssetId}
              </span>
              <span style={{ textAlign: "right" }}>
                Event Name: {viewReducerResponse.eventName}
              </span>
            </div>

            <div className="d-flex">
              <div className="d-flex align-items-center mt-3">
                <div className="progress-loader-circle">
                  <CircularProgressbar
                    value={viewReducerResponse.airSpeed}
                    styles={buildStyles({
                      // Rotation of path and trail, in number of turns (0-1)
                      rotation: 0.25,
                      // Colors
                      pathColor: `#3498db`,
                    })}
                  />
                </div>
                <h2 className="text-align-start">
                  {`${upToTwoDecimal(viewReducerResponse.airSpeed)} kn`}
                  <span className="d-block">True Air Speed</span>
                </h2>
              </div>
              <div className="d-flex align-items-center mt-3">
                <div className="progress-loader-circle">
                  <CircularProgressbar
                    value={viewReducerResponse.fuel}
                    styles={buildStyles({
                      // Rotation of path and trail, in number of turns (0-1)
                      rotation: 0.25,
                      // Colors
                      pathColor: `#3498db`,
                    })}
                  />
                </div>
                <h2 className="text-align-start">
                  {`${upToTwoDecimal(viewReducerResponse.fuel)} lb`}
                  <span className="d-block">Fuel</span>
                </h2>
              </div>
              <div className="d-flex align-items-center mt-3">
                <div className="progress-loader-circle">
                  <CircularProgressbar
                    value={viewReducerResponse.altitude}
                    maxValue={500}
                    styles={buildStyles({
                      // Rotation of path and trail, in number of turns (0-1)
                      rotation: 0.25,
                      // Colors
                      pathColor: `#FFC43D`,
                    })}
                  />
                </div>
                <h2 className="text-align-start">
                  {`${upToTwoDecimal(viewReducerResponse.altitude)} ft`}
                  <span className="d-block">Altitude</span>
                </h2>
              </div>
              <div className="d-flex align-items-center mt-3">
                <div className="progress-loader-circle">
                  <CircularProgressbar
                    value={viewReducerResponse.groundSpeed}
                    maxValue={500}
                    styles={buildStyles({
                      // Rotation of path and trail, in number of turns (0-1)
                      rotation: 0.25,
                      // Colors
                      pathColor: `#4caf50`,
                    })}
                  />
                </div>
                <h2 className="text-align-start">
                  {`${upToTwoDecimal(viewReducerResponse.groundSpeed)} kn`}
                  <span className="d-block">Ground Speed</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const refreshFlight = () => {
    setIsUpdating(true);
    console.log("liveTrackingRef", liveTrackingRef);
    if (liveTrackingRef) {
      liveTrackingRef.current.refresh();
      setTimeout(() => {
        setIsUpdating(false);
      }, 1000);
    }
  };

  const zoomInMap = () => {
    dispatch({
      type: ViewsConstants.VIEW_ZOOM_IN_TRIGGER,
    });
  };

  const zoomOutMap = () => {
    dispatch({
      type: ViewsConstants.VIEW_ZOOM_OUT_TRIGGER,
    });
  };

  const onChangeGoToValue = (event: any) => {
    setGoToPlaceholder(defaultGoToPlaceholder);
    setGoToValue(event.target.value);
  };

  const handleGoToKeyDown = async (event: any) => {
    if (event.key === "Enter") {
      try {
        const response = await viewService.getGoToLocationCount(goToValue);
        const obj = {
          type: ViewsConstants.VIEW_GO_TO_LOCATION_DATA,
          value: response,
        };
        dispatch(obj);
        if (response.status == "ZERO_RESULTS") {
          setGoToValue("");
          setGoToPlaceholder(Error_GoToLocation);
        }
      } catch (error) {
        const obj = {
          type: ViewsConstants.VIEW_GO_TO_LOCATION_DATA,
          value: null,
        };
        dispatch(obj);
      }
    }
  };

  const onClickAlarm = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 15000);
    if (liveTrackingRef) {
      liveTrackingRef.current.onClickAlarm();
    }
  };

  return (
    <React.Fragment>
      <div className="loading" style={{ display: loader ? "block" : "none" }}>
        <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />
      </div>
      <div
        className="container-fluid content-body"
        style={{ minHeight: "calc(100vh - 100px)" }}
        onClick={() => {
          if (liveTrackingRef) {
            liveTrackingRef.current.toggleHide();
          }
        }}
      >
        {viewReducerResponse.selectedAssetId ? AircraftAnalyticDetails() : null}
        <div className="row">
          <LiveTrackingMap ref={liveTrackingRef} />
          <div className="col-md-9 my-4 map-box-padding">
            <div className="map-header">
              <ul className="nav align-items-center">
                <li className="nav-item">
                  <a href="#" className="nav-link text-white px-2 py-0">
                    <PanToolAltIcon fontSize="large" />
                  </a>
                </li>
                <li className="nav-item" onClick={zoomInMap}>
                  <a href="#" className="nav-link text-white px-2 py-0">
                    <ZoomInIcon fontSize="large" />
                  </a>
                </li>
                <li className="nav-item" onClick={zoomOutMap}>
                  <a href="#" className="nav-link text-white px-2 py-0">
                    <ZoomOutIcon fontSize="large" />
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    className="nav-link text-white px-2 py-0 border-right border-secondary d-flex align-items-center"
                  >
                    <ZoomOutMapIcon fontSize="large" />
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white px-2 py-0">
                    <ArrowBackIcon fontSize="large" />
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    className="nav-link text-white px-2 py-0 border-right border-secondary d-flex align-items-center"
                  >
                    <ArrowForwardIcon fontSize="large" />
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    className="nav-link text-white px-2 py-0 border-right border-secondary d-flex align-items-center"
                  >
                    <StraightenIcon fontSize="large" />
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    className="nav-link text-white px-2 py-0 border-right border-secondary d-flex align-items-center"
                  >
                    <CropIcon fontSize="large" />
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    className="nav-link text-white px-2 py-0 border-right border-secondary d-flex align-items-center"
                  >
                    <ModeStandbyIcon fontSize="large" />
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    className="nav-link text-white px-2 py-0 border-right border-secondary d-flex align-items-center"
                  >
                    <NotListedLocationIcon fontSize="large" />
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    className="nav-link text-white px-2 py-0 border-right border-secondary d-flex align-items-center"
                  >
                    <CloudIcon fontSize="large" />
                  </a>
                </li>
                <li className="nav-item ml-auto px-2 py-0 border-right border-secondary d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control map-input"
                    placeholder={goToPlaceHolder}
                    value={goToValue}
                    onKeyDown={handleGoToKeyDown}
                    onChange={onChangeGoToValue}
                  />
                </li>
                <li className="nav-item px-2 py-0 border-right border-secondary d-flex align-items-center">
                  <div className="d-inline-flex align-items-center">
                    <span className="text-white pr-2">Views: </span>
                    <select className="form-control map-input">
                      <option value="">Toronto High Overview</option>
                      <option value="">Europe Icing</option>
                      <option value="">Global Airmets and Sigmets</option>
                      <option value="">North America Icing</option>
                      <option value="">
                        Saudi Arabia Med and High Significant
                      </option>
                    </select>
                  </div>
                </li>
                <li className="nav-item">
                  <a
                    href="#"
                    className="nav-link text-white px-2 py-0 d-flex align-items-center"
                  >
                    <SaveOutlinedIcon fontSize="large" />
                  </a>
                </li>
              </ul>
            </div>
            <div
              className="maparea-container-view"
              style={{
                height: mapboxTogglebtn
                  ? "calc(100vh - 420px)"
                  : "calc(100vh - 160px)",
                transition: "height .4s",
                overflow: "hidden",
                borderRadius: "0px 0px 10px 10px",
              }}
            >
              <MapViewContainer
                ref={mapContainerRef}
                {...props}
                setOnHoverLatLong={setOnHoverLatLong}
              />
            </div>
            <div className="map-footer">
              <ul className="nav align-items-center">
                <li className="nav-item text-white px-2 py-0 d-inline-flex">
                  <LocationOnIcon fontSize="large" />
                  <span className="pl-2">{onHoverLatLong}</span>
                </li>

                <li className="nav-item ml-auto">
                  <a href="#" className="nav-link text-white px-2 py-0">
                    <NotificationsIcon
                      onClick={onClickAlarm}
                      fontSize="large"
                      style={{ color: isClicked ? "red" : "inherit" }}
                    />
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white px-2 py-0">
                    <EmailIcon fontSize="large" />
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white px-2 py-0">
                    <VolumeUpIcon fontSize="large" />
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-success px-2 py-0">
                    <CircleIcon fontSize="large" />
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white px-2 py-0">
                    <StopIcon fontSize="large" />
                  </a>
                </li>

                <li className="nav-item text-white px-2 py-0 ml-auto">
                  <span>Pos. Latency: </span>
                  <span className="text-success">-</span>
                  <span>|</span>
                  <span className="text-success">-</span>
                </li>
                <li className="nav-item text-white px-2 py-0 ml-auto">
                  <span>Net. Latency: </span>
                  <span className="text-success">0:0.824</span>
                </li>

                {/* <li
                  className="nav-item ml-auto text-white px-2 py-0 cursor-pointer"
                  onClick={refreshFlight}
                >
                  <span>Last update (UTC): </span>
                  <span className="text-success">
                    {viewReducerResponse.lastRefreshedTime}
                  </span>
                </li> */}

                <li
                  className="nav-item ml-auto text-white px-2 py-0 cursor-pointer"
                  onClick={refreshFlight}
                >
                  <span>
                    {isUpdating ? (
                      <span>
                        <span className="text-info">Updating...</span>
                      </span>
                    ) : (
                      <span>
                        Last update (UTC):{" "}
                        <span className="text-success">
                          {viewReducerResponse.lastRefreshedTime}
                        </span>
                      </span>
                    )}
                  </span>
                </li>
              </ul>
            </div>
            <div className="custom-card position-relative">
              <button
                className="btn btn-primary d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "30px",
                  height: "16px",
                  padding: "0px",
                  borderRadius: "15px",
                  margin: "10px!important",
                }}
                onClick={() => setMapboxTogglebtn(!mapboxTogglebtn)}
              >
                {mapboxTogglebtn ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
              </button>
              <div
                className={
                  mapboxTogglebtn
                    ? "custom-card-container show-mapcard-top"
                    : "custom-card-container"
                }
              >
                <div className="custom-card-header">
                  {/* <ul className="nav">
                <li className="nav-item">
                  <a href="#" className="nav-link text-white px-2">
                    <OpenInNewIcon fontSize="large"/>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white px-2">
                    <ZoomInIcon fontSize="large"/>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white px-2">
                    <ModeStandbyIcon fontSize="large"/>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white px-2">                    
                    <QuestionAnswerIcon fontSize="large"/>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white px-2">
                    <PriorityHighIcon fontSize="large"/>
                  </a>
                </li>
                <li className="nav-item ml-auto">
                  <a href="#" className="nav-link text-white px-2">
                    <PermDeviceInformationIcon  fontSize="large"/>
                  </a>
                </li>
              </ul> */}
                </div>
                <div className="custom-card-body map-box-container">
                  <div className="row">
                    <div className="col-md-2">
                      <ul className="list-group map-box-list">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Legend
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Moving
                          <span className="badge badge-success badge-pill">
                            {summaryData.movingcount}
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Stopped
                          <span className="badge badge-warning badge-pill">
                            {summaryData.stoppedcount}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-4 text-white text-center">
                      Active Assets({summaryData.activecount})
                      <div style={{ marginTop: "-70px" }}>
                        <AssetSpeedograph summaryData={summaryData} />
                      </div>
                    </div>
                    <div className="col-md-4 text-white text-center">
                      Alarms({summaryData.totalalarms})
                      <div style={{ marginTop: "-70px" }}>
                        <AlarmSpeedograph summaryData={summaryData} />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <ul className="list-group map-box-list">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Active Assets
                          <span className="badge badge-secondary badge-pill">
                            {summaryData.activecount}
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          InActive Assets
                          <span className="badge badge-secondary badge-pill">
                            {summaryData.inactivecount}
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Moving Asset
                          <span className="badge badge-secondary badge-pill">
                            {summaryData.movingcount}
                          </span>
                        </li>
                        {/* <li className="list-group-item d-flex justify-content-between align-items-center">
                          No Fix Asset
                          <span className="badge badge-secondary badge-pill">
                            0
                          </span>
                        </li> */}
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Stopped Asset
                          <span className="badge badge-secondary badge-pill">
                            {summaryData.stoppedcount}
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Total Alarms
                          <span className="badge badge-secondary badge-pill">
                            {summaryData.totalalarms}
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Total Asset
                          <span className="badge badge-secondary badge-pill">
                            {summaryData.totalassets}
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Total Events
                          <span className="badge badge-secondary badge-pill">
                            {summaryData.totalevents}
                          </span>
                        </li>
                        {/* <li className="list-group-item d-flex justify-content-between align-items-center">
                          Unconfirmed Al...
                          <span className="badge badge-secondary badge-pill">
                            0
                          </span>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dailogmodal1 />
        <Dailogmodal2 />
      </div>
    </React.Fragment>
  );
}

export default View;
