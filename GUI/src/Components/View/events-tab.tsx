/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { viewService } from "../../Service/view.service";
import { useDispatch } from "react-redux";
import { ViewsConstants } from "../../Constants/constants";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import PermDeviceInformationIcon from "@mui/icons-material/PermDeviceInformation";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FlightLandingBlue from "../../Assets/images/flight_landing_blue.png";
import FlightTaxiInOut from "../../Assets/images/flight_taxi_in_out.png";
import FlightCruise from "../../Assets/images/flight_cruise.png";
import FlightTakeOff from "../../Assets/images/takeoff.png";
import GeneralIcon from "../../Assets/images/general_green.png";
import StartEngine from "../../Assets/images/start-engine.png";
import OffEngine from "../../Assets/images/engine-off.png";
import StartRecording from "../../Assets/images/start-recording.png";
import StopRecording from "../../Assets/images/stop_recording.png";
import Bag_Red from "../../Assets/images/bag_red.svg";
import Bag_Green from "../../Assets/images/bag_green.svg";
import WarningIcon from "../../Assets/images/warning.png";
import ArrowTop from "../../Assets/images/arrow.svg";
import { useTypedSelector } from "../../Reducers/RootReducer";
import ContextMenu from "./ContextMenu";

interface EventData {
  aircraftid: string;
  time: string;
  type: string;
  gps_lat: string;
  gps_long: string;
  heading: string;
  velocity: string;
  elapsed_time: string;
}

interface Props {
  selectedAicraftId: string;
  selectedAircraftFlightId: string;
  eventsData: EventData[];
}

/**
 * This component is handling events tab .
 * @component
 */
const Events = (props: any) => {
  const selectedCustomer = useTypedSelector(
    (state) => state.viewReducer.selectedCustomer
  );
  const [eventsData, setEventData] = useState<EventData[]>([]);
  const [assetTogglebtn, setAssetTogglebtn] = useState(false);
  const [selectedEventData, setSelectedEventData] = useState<any>(null);
  const [toggleContextMenu, setToggleContextMenu] = useState(false);
  const [itemPosition, setItemPosition] = useState({ x: 0, y: 0 });
  const [selectedEvent, setSelectedEvent] = useState<any>();

  useEffect(() => {
    setEventData([]);
    setSelectedEventData(null);
  }, [selectedCustomer]);

  useEffect(() => {
    setToggleContextMenu(false);
  }, [props.toggleContextMenuEvent]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (props.selectedAicraftId) {
      getEventData();
    }
  }, [props.selectedAicraftId]);

  const getEventData = async () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    const startDate = firstDay;
    const endDate = new Date();

    let fromDateString = "";
    if (startDate) {
      fromDateString = new Date(
        startDate.getTime() - startDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
    }

    let endDateString = "";
    if (endDate) {
      endDateString = new Date(
        endDate.getTime() - endDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
    }

    const airCraftArray: any = [];
    airCraftArray.push(props.selectedAicraftId);

    const aircraftId = props.selectedAircraftFlightId;

    try {
      // setLoader(true);
      const data = await viewService.getEventListForFlight(aircraftId);

      setEventData(data);
      //   setLoader(false);
    } catch (error) {
      setEventData([]);
      //  setLoader(false);
    }
  };

  const onClickedEvent = (item: any, index: any) => {
    const value = {
      selectedEvent: item,
    };
    dispatch({
      type: ViewsConstants.VIEW_SELECTED_EVENT,
      value,
    });
    setSelectedEventData(item);
  };

  const zoomToAssetEvents=(e:any)=>{
    e.preventDefault();
    // console.log("AssetEvents data", eventsData);
   
    // const StartRecording = eventsData.find((event: any) => event.eventid == 2001);
      // console.log('This event triggered',selectedEventData );
      
    if (selectedEventData) {
      const moveObj = {
        lat: selectedEventData.gps_lat,
        long: selectedEventData.gps_long,
      };
  
      dispatch({
        type: ViewsConstants.VIEW_ZOOM_TO_ASSET,
        value: { ...moveObj },
      });
    }
  }

  const moveToAssetEvents=(e:any)=>{
    e.preventDefault();
    const StartRecording = eventsData.find((event: any) => event.eventid == 2001);
      // console.log('This event triggered',selectedEventData );
      
      if (StartRecording) {
        const moveObj = {
          lat: StartRecording.gps_lat,
          long: StartRecording.gps_long,
        };
    
        dispatch({
          type: ViewsConstants.VIEW_ZOOM_TO_ASSET,
          value: { ...moveObj },
        });
      }
  }

  const getIcon = (eventName: string) => {
    if (eventName == "Start Recording") {
      return StartRecording;
    } else if (eventName == "Stop Recording") {
      return StopRecording;
    } else if (eventName == "Engine Start") {
      return StartEngine;
    } else if (eventName == "Taxi Out" || eventName == "Cruise") {
      return FlightCruise;
    } else if (eventName == "Climb") {
      return FlightTakeOff;
    } else if (eventName == "Takeoff") {
      return Bag_Green;
    } else if (eventName == "Landing") {
      //return FlightLandingGreen;
      return Bag_Red;
    } else if (eventName == "Taxi In") {
      return FlightTaxiInOut;
    } else if (eventName == "Engine Off") {
      return OffEngine;
    } else if (eventName == "Approach" || eventName == "Descent") {
      return FlightLandingBlue;
    } else {
      return WarningIcon;
    }
  };

  const onContextMenuClick = (name: string) => {
    const itemId: any = selectedEvent;
    switch (name) {
      case "Move to Event":
        const value = {
          selectedEvent: itemId,
        };
        dispatch({
          type: ViewsConstants.VIEW_SELECTED_EVENT,
          value,
        });
        return setToggleContextMenu(false);
      case "Zoom to Event":
        dispatch({
          type: ViewsConstants.VIEW_ZOOM_TO_EVENT,
          value: { ...selectedEvent },
        });
        return setToggleContextMenu(false);
    }
  };

  const onRightClick = (e: any, item: any) => {
    const ele = document.getElementById("singleItem");
    let parentW = ele ? ele.offsetWidth : 0;
    e.preventDefault();

    let x = e.clientX,
      y = e.clientY;

    const conatinerEle = document.getElementById("liveTrackContainer");

    let innerWidth: any;

    if (conatinerEle) {
      innerWidth = conatinerEle.clientWidth;
    }

    let leftMarginOffset = (5 / 100) * parentW;

    if (innerWidth - e.clientX < 160 + leftMarginOffset) {
      x = innerWidth - (leftMarginOffset + 160);
    }

    if (window.innerHeight - e.clientY < 60) {
      y = window.innerHeight - 65;
    }

    var coordinate = { ...itemPosition };
    coordinate.x = x;
    coordinate.y = y - 70;

    setItemPosition(coordinate);
    setToggleContextMenu(true);
    setSelectedEvent(item);
  };

  return (
    <div className="color-white">
      <div className="list-group asset-list">
        {eventsData.map((item: any, index: number) => {
          const dateAndTime = item.time.split(" ");
          const time = dateAndTime[1];
          const date = dateAndTime[0];

          return (
            <a
              key={`event_tab_${index}`}
              href="#"
              className={`list-group-item list-group-item-action `}
              onClick={() => onClickedEvent(item, index)}
              onContextMenu={(e) => {
                onRightClick(e, item);
              }}
            >
              <div className="row event-list-items">
                <div className="col-3 col-item-center">
                  <h5>{item.aircraftid}</h5>
                </div>
                <div className="col-1 p-0">
                  <div>
                    <span>
                      <img
                        src={getIcon(item.type)}
                        className="img-width-16"
                      ></img>
                      &ensp;
                    </span>
                  </div>
                </div>
                <div className="col-8 text-align-left">
                  <div className="row">
                    <div className="col-6">
                      <p className="text-truncate">{item.type}</p>
                      <p className="text-truncate">{item.time}</p>
                      <p className="text-truncate">{item.elapsed_time} ago</p>
                    </div>
                    <div className="col-6 col-item-center">
                      <div>
                        <p className="text-truncate">{time}</p>
                        <p>{date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
        {toggleContextMenu && (
          <ContextMenu
            x={itemPosition.x}
            y={itemPosition.y}
            contextClicked={onContextMenuClick}
            type={"events"}
          />
        )}
      </div>
      <div className="custom-card">
        <button
          className="btn btn-primary d-inline-flex align-items-center justify-content-center mb-3 rounded-circle"
          style={{ width: "30px", height: "30px", padding: "0px" }}
          onClick={() => setAssetTogglebtn(!assetTogglebtn)}
        >
          {assetTogglebtn ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </button>
        <div
          className={
            assetTogglebtn
              ? "custom-card-container show-top"
              : "custom-card-container"
          }
        >
          <div className="custom-card-header">
            <ul className="nav">
              <li className="nav-item" title="Zoom to Start Event">
                <a href="#" className="nav-link text-white px-2" onClick={moveToAssetEvents}>
                  <OpenInNewIcon fontSize="large" />
                </a>
              </li>
              <li className="nav-item" title="Zoom To Event">
                <a href="#" className="nav-link text-white px-2" onClick={zoomToAssetEvents}>
                  <ZoomInIcon fontSize="large" />
                </a>
              </li>
              {/* <li className="nav-item">
                <a href="#" className="nav-link text-white px-2">
                  <ModeStandbyIcon fontSize="large" />
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link text-white px-2">
                  <QuestionAnswerIcon fontSize="large" />
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link text-white px-2">
                  <PriorityHighIcon fontSize="large" />
                </a>
              </li> */}
              <li className="nav-item ml-auto" title="Info Window">
                <a href="#" className="nav-link text-white px-2">
                  <PermDeviceInformationIcon fontSize="large" />
                </a>
              </li>
            </ul>
          </div>
          <div className="custom-card-body">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th className="text-warning">Attribute</th>
                  <th className="text-warning">Value</th>
                </tr>
              </thead>
              <tbody>
                {selectedEventData ? (
                  <>
                    <tr>
                      <td>Name</td>
                      <td>{selectedEventData.aircraftid}</td>
                    </tr>
                    <tr>
                      <td>type</td>
                      <td>{selectedEventData.type}</td>
                    </tr>
                    <tr>
                      <td>Time</td>
                      <td>{selectedEventData.time}</td>
                    </tr>
                    <tr>
                      <td>Lat/Long</td>
                      <td>{`${selectedEventData.gps_lat},${selectedEventData.gps_long}`}</td>
                    </tr>
                    <tr>
                      <td>Velocity</td>
                      <td>{selectedEventData.velocity} knots</td>
                    </tr>
                    <tr>
                      <td>Elapsed Time</td>
                      <td>{selectedEventData.elapsed_time}</td>
                    </tr>
                  </>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Events;
