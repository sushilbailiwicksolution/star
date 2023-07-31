import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { RouteSelectedContext } from "./RouteSelectedContext";
import TweetIcon from "../../Assets/images/tweet.png";
import HeartIcon from "../../Assets/images/heart.png";
import AlarmIcon from "../../Assets/images/warning.png";
import FlightLandingGreen from "../../Assets/images/flight_landing_green.png";
import FlightTaxiInOut from "../../Assets/images/flight_taxi_in_out.png";
import FlightCruise from "../../Assets/images/flight_cruise.png";
import FlightLandingBlue from "../../Assets/images/flight_landing_blue.png";
import FlightTakeOff from "../../Assets/images/takeoff.png";
import GeneralIcon from "../../Assets/images/general_green.png";
import StartEngine from "../../Assets/images/start-engine.png";
import StartRecording from "../../Assets/images/start-recording.png";
import StopRecording from "../../Assets/images/stop_recording.png";


/**
 * This component handles the small window which is being used to show various events inside trip replay.
 * @component
 */

const RouteItem = React.forwardRef((props: any, ref: any) => {
  const { index, item, flightId, showTrue } = props;
  const value: any = useContext(RouteSelectedContext);
  let selectedTripIndex = value.selectedTripIndex;
  let selectedTripReplayFlight = value.selectedTripReplayFlight;
  /**
   * Handle the click event for the route item.
   * @memberof RouteItem
   * @param {string} flightId - The ID of the flight associated with the route item.
   * @param {number} routeIndex - The index of the route item.
   */
  const onClick = (flightId: any, routeIndex: any) => {
    value.onClickedRouteItem(flightId, routeIndex);
  };
  /**
   * Scroll into view when the route item is selected.
   * @memberof RouteItem
   */
  useEffect(() => {
    if (showTrue) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedTripIndex]);

  /**
   * Get the appropriate icon based on the event name.
   * @memberof RouteItem
   * @param {string} eventName - The name of the event associated with the route item.
   * @returns {string} - The path to the icon image.
   */

  const getIcon = (eventName: string) => {
    if (eventName == "Start Recording") {
      return StartRecording;
    } else if (eventName == "Stop Recording") {
      return StopRecording;
    } else if (eventName == "Engine Start") {
      return StartEngine;
    } else if (eventName == "Taxi Out" || eventName == "Cruise") {
      return FlightCruise;
    } else if (eventName == "Takeoff" || eventName == "Climb") {
      return FlightTakeOff;
    } else if (eventName == "Landing") {
      return FlightLandingGreen;
    } else if (eventName == "Taxi In") {
      return FlightTaxiInOut;
    } else {
      return GeneralIcon;
    }
  };

  return (
    <div
      id={`${flightId}-${index}`}
      ref={(el) => (ref.current = el)}
      className={`row route-container p-2 ${
        index == selectedTripIndex && flightId == selectedTripReplayFlight
          ? " selected-trip"
          : ""
      }`}
      onClick={() => onClick(flightId, index)}
    >
      <div className="col-4 p-0">
        <div>
          <span>
            <img src={getIcon(item.event_name)}></img>&ensp;{item.event_name}
          </span>
        </div>
      </div>
      <div className="col-8 p-0">
        <div className="d-flex">
          <div className="col-4 p-0">
            <div className="route-details">
              <span>{item.speed} Knots</span>
            </div>
          </div>
          <div className="col-4 p-0">
            <div className="route-details">
              <span className="color-blue">{item.altitude} Ft</span>
              <span className="color-gray">
                {item.gps_lat},{item.gps_long}
              </span>
            </div>
          </div>
          <div className="col-4 p-0">
            <div className="route-details">
              <span className="color-gray">{item.date_time}</span>
            </div>
          </div>
        </div>
        {/* <div>
          <span className='color-gray'>
            25/11/2021 6:25:56 PM to 25/11/2021 6:25:56 PM
          </span>
        </div> */}
      </div>
    </div>
  );
});

export default memo(RouteItem);
