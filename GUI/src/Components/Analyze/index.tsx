/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useEffect, createContext, memo } from "react";
import MapContainers from "./map";
import {
  getAirCraft,
  getAirCraftDetails,
  getCityDetail,
  getLatestFlightsForAssetDateOrLimit,
} from "../../Service/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import CSVDATA from "./../../store/csvjson_1.json";
import { toast } from "react-toastify";
import TripList from "./TripList";
import TripReplay from "./TripReplay";
import { RouteSelectedContext } from "./RouteSelectedContext";
import { assetService } from "../../Service/asset.service";
import LineChart from "./LineChart";
import "./analyse.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem } from "@mui/material";
import LargeWindow from "./LargeWindow";

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

interface FlightReview {
  flightId: any;
  departure: any;
  departureTime: any;
  arrivalTime: any;
  duration: any;
  data: [];
  flightNumber: any;
  eventCount?: any;
}

interface selectionInterface {
  selectedTripReplayFlight: any;
  selectedTripArray: [];
  selectedTripIndex: any;
}

const flightByData = [
  {
    label: "By Date",
    id: 1,
  },
  {
    label: "Last 20 trips",
    id: 2,
  },
];

function Analyze(props: any) {
  const [loader, setLoader] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState("");
  const [todayDate, setTodayDate] = useState(new Date());
  const [airCraftjson, setAirCraftJson] = useState([]);
  const [flightby, setFlightBy] = useState(flightByData);
  const [slectedFlightBy, setSlectedFlightBy] = useState(1);
  // const [airCraftjson, setAirCraftJson] = useState(CSVDATA);
  const [selectedAicraftId, changeSelectedAircraftId] = useState();
  const [addtoReviewFlights, setAddtoReviewFlights] = useState<FlightReview[]>(
    []
  );
  const [selectedTripReplayFlight, setSelectedTripReplayFlight] = useState("");
  const [selectedTripIndex, setSelectedTripIndex] = useState(0);
  const [selectedTripArray, setSelectedTripArray] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);
  const [assetsList, setAssetsList] = useState([]);
  const [showGraph, setShowGraph] = useState(false);
  const [graphData, setgraphData] = useState([]);
  const [clickedFlightAndRoute, setClickedFlightAndRoute] = useState({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showLargeWindow, setShowLargeWindow] = useState(false);
  const [mapboxTogglebtn, setMapboxTogglebtn] = useState(false);

  useEffect(() => {
    onInit();
  }, []);

  useEffect(() => {
    getData();
  }, [startDate, endDate]);

  const onInit = async () => {
    handleLargeScreenEvents();
    setLoader(true);
    await getAssetsList();
    setLoader(false);
  };

  useEffect(() => {
    if (selectedAicraftId && slectedFlightBy && slectedFlightBy == 2) {
      getLatestFlightsForAsset();
    }
  }, [slectedFlightBy, selectedAicraftId]);

  const getLatestFlightsForAsset = async () => {
    try {
      const payLoad = {
        assetId: selectedAicraftId,
        limit: 20,
      };

      const airCraftData = await getLatestFlightsForAssetDateOrLimit(payLoad);
      setFlights(airCraftData);
      console.log(airCraftData);
    } catch (error) {}
  };

  const handleLargeScreenEvents = () => {
    document.addEventListener("fullscreenchange", exitHandler);
    document.addEventListener("webkitfullscreenchange", exitHandler);
    document.addEventListener("mozfullscreenchange", exitHandler);
    document.addEventListener("MSFullscreenChange", exitHandler);

    function exitHandler() {
      const document: any = window.document;
      if (
        !document.fullscreenElement &&
        !document?.webkitIsFullScreen &&
        !document.mozFullScreen &&
        !document.msFullscreenElement
      ) {
        ///fire your event
        console.log("No Large Screen");
        setShowLargeWindow(false);
      } else {
        console.log("Yes Large Screen");
      }
    }
  };

  const getAssetsList = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await assetService.getAssetsList();
        if (userData.status == "200") {
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

  const getData = async () => {
    if (startDate && endDate) {
      try {
        const formattedStartDate = startDate
          ? moment(startDate).format("DD-MM-YYYY")
          : null;
        const formattedEndDate = endDate
          ? moment(endDate).format("DD-MM-YYYY")
          : null;
        const airCraftData = await getAirCraft(
          formattedStartDate,
          formattedEndDate,
          selectedAicraftId
        );
        console.log(airCraftData);
        if (airCraftData && !airCraftData.status) {
          const airCrafts = [] as any;
          for (let k in airCraftData) {
            airCrafts.push(airCraftData[k]);
          }
          setFlights(airCrafts);
        } else {
          setFlights([]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onClickedRouteItem = (
    flightId: any,
    routeIndex: any,
    isMarkerClicked?: any
  ) => {
    if (!isMarkerClicked) {
      let obj = {
        flightId: flightId,
        routeIndex: routeIndex,
      };
      setClickedFlightAndRoute(obj);
    }
    if (selectedTripReplayFlight == flightId) {
      let index = addtoReviewFlights.findIndex(
        (item: any) => item.flightId === flightId
      );
      let data = addtoReviewFlights[index].data;
      setSelectedTripArray(data);
    } else {
      setSelectedTripReplayFlight(flightId);
    }
    setSelectedTripIndex(routeIndex);
  };

  const deleteFlightRoutes = (flightId: any) => {
    let filteredArray = addtoReviewFlights.filter(
      (item) => item.flightId != flightId
    );
    setMapCenter(null);
    setAddtoReviewFlights(filteredArray);
    if (filteredArray.length > 0) {
      setSelectedTripArray(filteredArray[0].data);
      setSelectedTripIndex(0);
      setSelectedTripReplayFlight(filteredArray[0].flightId);
    }
  };

  const addGraph = (flightId: any) => {
    let filteredArray = addtoReviewFlights.filter(
      (item) => item.flightId == flightId
    );
    setgraphData(filteredArray[0].data);
    setShowGraph(true);
  };

  const updateMapCenter = (latLong: any) => {
    setMapCenter(latLong);
  };

  const onClickedMaker = (flightId: any, index: any) => {
    onClickedRouteItem(flightId, index, true);
  };

  const endDateChange = async (date: any) => {
    setEndDate(date);
  };

  const startDateChange = async (date: any) => {
    setStartDate(date);
  };

  const getFlightData = async () => {
    // const airCrafts = CSVDATA as  any;
    // setAirCraftJson(airCrafts);
    try {
      if (selectedFlight) {
        if (addtoReviewFlights.length > 0) {
          let index = addtoReviewFlights.findIndex(
            (item) => item.flightId === selectedFlight
          );
          if (index > -1) {
            toast.error("Trip Already Added");
            return;
          }
        }
        const airCraftDetails = await getAirCraftDetails(selectedFlight);
        if (airCraftDetails && !airCraftDetails.status) {
          let airCrafts = [] as any;
          let eventCount = {};
          // for (let k in airCraftDetails) {
          //   airCrafts.push(airCraftDetails[k]);
          // }
          if (airCraftDetails.flightData) {
            airCrafts = airCraftDetails.flightData;
            eventCount = airCraftDetails.eventCount;
          }
          const unique = Array.from(
            new Set(airCrafts.map((item: any) => item.event_name))
          );
          console.log("unique", unique);
          let lat = airCrafts[0].gps_lat;
          let long = airCrafts[0].gps_long;
          const cityDetail = await getCityDetail(lat, long);
          let departureAddress = "Not Available";
          let arrivalAddress = "Not Available";

          if (cityDetail.status == "OK" && cityDetail.results.length > 0) {
            departureAddress = cityDetail.results[0].formatted_address;
          }
          let departureTime = airCrafts[0].date_time;
          departureTime = departureTime.split(" ");
          let lastIndex = airCrafts.length - 1;

          let arrival_lat = airCrafts[lastIndex].gps_lat;
          let arrival_long = airCrafts[lastIndex].gps_long;
          const arrivalDetail = await getCityDetail(arrival_lat, arrival_long);
          if (
            arrivalDetail.status == "OK" &&
            arrivalDetail.results.length > 0
          ) {
            arrivalAddress = arrivalDetail.results[0].formatted_address;
          }

          let arrivalTime = airCrafts[lastIndex].date_time;
          arrivalTime = arrivalTime.split(" ");
          departureTime = departureTime[0] + "T" + departureTime[1];
          arrivalTime = arrivalTime[0] + "T" + arrivalTime[1];
          let a = moment(departureTime, "DD-MM-YYYY HH:mm:ss").format(
            "YYYY-MM-DD HH:mm:ss"
          ); //now
          let b = moment(arrivalTime, "DD-MM-YYYY HH:mm:ss").format(
            "YYYY-MM-DD HH:mm:ss"
          );

          let duration = moment.duration(moment(b).diff(moment(a))) as any;
          duration =
            moment.utc(duration.asMilliseconds()).format("HH:mm:ss") + " h";

          let obj = {
            flightId: selectedFlight,
            departureTime: airCrafts[0].date_time,
            departure: departureAddress,
            arrival: arrivalAddress,
            duration: duration,
            arrivalTime: airCrafts[lastIndex].date_time,
            data: airCrafts,
            flightNumber: selectedAicraftId,
            eventCount,
          };
          setAddtoReviewFlights((old) => [...old, obj]);
          let newArr = [...airCraftjson];
          newArr = newArr.concat(airCrafts);
          setAirCraftJson(newArr);
          if (selectedTripArray.length < 1) {
            setSelectedTripReplayFlight(obj.flightId);
            setSelectedTripArray(obj.data);
          }
          //setAirCraftJson(airCrafts);
        } else {
          setAirCraftJson([]);
        }
      }
    } catch (err) {
      setAirCraftJson([]);
    }
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openLargeWindow = () => {
    const elem: any = document.getElementById("star_large_window");
    if (elem) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
      }
    }
    setShowLargeWindow(true);
  };

  return (
    <React.Fragment>
      <div className="loading" style={{ display: loader ? "block" : "none" }}>
        <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />
      </div>
      <div className="container-fluid content-body vh-100">
        <div className="row">
          <div className="col-md-3 my-4 left-box-padding">
            <div className="sidebar-wrapper noheight-wrapper p-4">
              <label className="text-left d-block mb-3">
                Select Flight Details
              </label>
              <div className="row">
                <div className="dd-style w-100">
                  <div className="col-md-12 mb-3">
                    <div className="select-dropdown">
                      <select
                        className="form-control"
                        id="select2"
                        onChange={(e: any) => {
                          changeSelectedAircraftId(e.target.value);
                          setFlights([]);
                          setStartDate(undefined);
                          setEndDate(undefined);
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
                  <div className="col-md-12 mb-3">
                    <div className="select-dropdown">
                      <select
                        className="form-control"
                        id="select4"
                        onChange={(e: any) => {
                          console.log(e.target.value);
                          setFlights([]);
                          setSlectedFlightBy(e.target.value);
                        }}
                        value={slectedFlightBy}
                      >
                        <option>Select Flight By</option>
                        {flightby.map((flightbyValue) => {
                          return (
                            <option
                              key={flightbyValue.id}
                              value={flightbyValue.id}
                            >
                              {flightbyValue.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div
                    className={`col-md-12 mb-3 customDatePickerWidth ${
                      slectedFlightBy == 2 ? "react-datepicker-disabled" : ""
                    }`}
                  >
                    {/* <div className="select-dropdown"> */}
                    <DatePicker
                      wrapperClassName="datePicker"
                      selected={startDate}
                      onChange={(date: any) => startDateChange(date)}
                      placeholderText="From Date"
                      maxDate={todayDate ? todayDate : null}
                    />
                    {/* </div> */}
                  </div>
                  <div
                    className={`col-md-12 mb-3 customDatePickerWidth ${
                      slectedFlightBy == 2 ? "react-datepicker-disabled" : ""
                    }`}
                  >
                    {/* <div className="select-dropdown"> */}
                    <DatePicker
                      wrapperClassName="datePicker"
                      selected={endDate}
                      onChange={(date: any) => endDateChange(date)}
                      placeholderText="To Date"
                      maxDate={todayDate ? todayDate : null}
                    />
                    {/* </div> */}
                  </div>
                  <div className="col-md-12 mb-3">
                    <div className="select-dropdown">
                      <select
                        className="form-control"
                        id="select2"
                        onChange={(e: any) => {
                          console.log(e.target.value);
                          setSelectedFlight(e.target.value);
                        }}
                      >
                        <option value="">Select Flight By</option>
                        {flights.map(({ aircraftid }) => {
                          return (
                            <option value={aircraftid} key={aircraftid}>
                              {aircraftid}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <div className="button-block d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={getFlightData}
                    >
                      Add to Review
                    </button>
                  </div>
                </div>
              </div>
              {addtoReviewFlights && addtoReviewFlights.length > 0 ? (
                <div className="triplist-container">
                  {addtoReviewFlights.map((item, index) => (
                    <RouteSelectedContext.Provider
                      key={`${index}${item.flightId}`}
                      value={{
                        onClickedRouteItem,
                        selectedTripIndex,
                        selectedTripReplayFlight,
                      }}
                    >
                      <TripList
                        key={`${index}${item.flightId}`}
                        flightData={item}
                        deleteFlightRoutes={deleteFlightRoutes}
                        updateMapCenter={updateMapCenter}
                        addGraph={addGraph}
                      />
                    </RouteSelectedContext.Provider>
                  ))}
                </div>
              ) : null}

              {addtoReviewFlights && addtoReviewFlights.length > 0 ? (
                <TripReplay
                  selectedTripArray={selectedTripArray}
                  selectedTripIndex={selectedTripIndex}
                  selectedTripReplayFlight={selectedTripReplayFlight}
                  onClickedRouteItem={onClickedRouteItem}
                ></TripReplay>
              ) : null}
            </div>
          </div>
          <div className="col-md-9 my-4 map-box-padding">
            <div className="map-header">
              <ul className="nav align-items-center">
                <li className="nav-item">
                  <a href="#" className="nav-link text-white px-2 py-0">
                    <PanToolAltIcon fontSize="large" />
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white px-2 py-0">
                    <ZoomInIcon fontSize="large" />
                  </a>
                </li>
                <li className="nav-item">
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
                    placeholder="go to..."
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
              className="maparea-container"
              style={{
                height: mapboxTogglebtn
                  ? "calc(100vh - 470px)"
                  : "calc(100vh - 160px)",
                transition: "height .4s",
                overflow: "hidden",
                borderRadius: "0px 0px 10px 10px",
              }}
            >
              <MapContainers
                mapJson={addtoReviewFlights}
                onClickedMaker={onClickedMaker}
                selectedTripIndex={selectedTripIndex}
                selectedTripReplayFlight={selectedTripReplayFlight}
                mapCenter={mapCenter}
                clickedFlightAndRoute={clickedFlightAndRoute}
              />

              {showGraph ? (
                <div className="graph-container p-4 charting-window">
                  <div className="d-flex justify-content-between align-item-center">
                    <h2>Reporting And Charting Window</h2>
                    <div className="d-flex justify-content-end text-left Charting-detail-width">
                      <div className="d-flex align-items-end">
                        <div>
                          <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              horizontal: "right",
                              vertical: "bottom",
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                            <MenuItem onClick={openLargeWindow}>
                              Open large window
                            </MenuItem>
                          </Menu>
                        </div>
                        <h1
                          className="ft-xl cursor-pointer"
                          onClick={() => {
                            setShowGraph(false);
                            setgraphData([]);
                          }}
                        >
                          X
                        </h1>
                      </div>
                    </div>
                  </div>
                  <LineChart data={graphData} />
                  <div id="star_large_window">
                    {showLargeWindow ? (
                      <LargeWindow
                        data={graphData}
                        flightsList={flights}
                        selectedFlightValue={selectedFlight}
                      />
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
            <div
              className="map-footer"
              style={{ borderRadius: "0px 0px 10px 10px" }}
            >
              <ul className="nav align-items-center">
                <li className="nav-item text-white px-2 py-0 d-inline-flex">
                  <LocationOnIcon fontSize="large" />
                  <span className="pl-2">41.28°N, 76.39°W</span>
                </li>

                <li className="nav-item ml-auto">
                  <a href="#" className="nav-link text-white px-2 py-0">
                    <NotificationsIcon fontSize="large" />
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

                <li className="nav-item ml-auto text-white px-2 py-0">
                  <span>Last update </span>
                  <span className="text-success"></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default memo(Analyze);
