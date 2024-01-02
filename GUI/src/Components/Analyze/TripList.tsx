/* eslint-disable jsx-a11y/alt-text */
import React, { memo } from "react";
import FlightRoute from "./FlightRoute";
import zoomIcon from "../../Assets/images/zoom_icon.png";
import ChartIcon from "../../Assets/images/ChartIcon.png";
import TweetIcon from "../../Assets/images/tweet.png";
import HeartIcon from "../../Assets/images/heart.png";
import AlarmIcon from "../../Assets/images/warning.png";


/**
 * This component is handling the trip list, displaying flight information.
 * @component
 * @param {Object} props - The props passed to the component.
 * @param {Object} props.flightData - The flight data containing information about the flight.
 * @param {Function} props.deleteFlightRoutes - The function to delete flight routes.
 * @param {Function} props.updateMapCenter - The function to update the map center.
 * @param {Function} props.addGraph - The function to add a graph.
 */
const TripList = (props: any) => {
  const { flightData, deleteFlightRoutes, updateMapCenter, addGraph } = props;
  const departureTime = flightData.data[0].date_time;
  let lastIndex = flightData.data.length - 1;
  const arrivalTime = flightData.data[lastIndex].date_time;
  const deleteItem = () => {
    deleteFlightRoutes(flightData.flightId);
  };

  const addGraphItem = () => {
    addGraph(flightData.flightId);
  };

  let len = flightData.data.length;
  len = Math.floor(len / 2);
  const updateCenter = () => {
    updateMapCenter(flightData.data[len]);
  };

  return (
    <div className="mb-2">
      <div className="side-card p-3 mb-3 text-left cl-white">
        <div className="m-0 header-flightId" title="Hide flight data from map">
          <p>{flightData.flightId}</p>
          <span className="crossItem" onClick={deleteItem}>
            X
          </span>
        </div>
        <div className="d-flex align-items-center">
          <h1 className="my-3">{flightData.flightNumber}</h1>
          <div className="mg-l-auto ">
            <img
              className="icon-20 cursor-pointer"
              src={ChartIcon}
              onClick={addGraphItem}
              title="Flight On chart"
            ></img>
            {/* <img
              className="icon-20 cursor-pointer"
              src={zoomIcon}
              onClick={updateCenter}
            ></img> */}
          </div>
        </div>

        <div className="d-flex">
          <p className="side-card-level">Departure</p>
          <p>{flightData.departure.slice(7)}</p>
        </div>
        <div className="d-flex">
          <p className="side-card-level">Departure Time</p>
          <p>{departureTime}</p>
        </div>
        <div className="d-flex">
          <p className="side-card-level">Duration</p>
          <p>{flightData.duration}</p>
        </div>
        <div className="d-flex">
          <p className="side-card-level">Arrival</p>
          <p>{flightData.arrival.slice(7)}</p>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          {/* <p>{flightData.data[lastIndex].speed} Knot</p> */}
          {
            <p>
              <img src={TweetIcon}></img>&ensp;
              {`(${flightData?.eventCount?.tweetcount})`}{" "}
            </p>
          }
          <span>|</span>
          {/* <p>{flightData.data[lastIndex].altitude} m</p> */}
          {
            <p>
              <img src={HeartIcon}></img>&ensp;
              {`(${flightData?.eventCount?.heartbeatcount})`}{" "}
            </p>
          }
          <span>|</span>
          {/* <p>{flightData.data[lastIndex].date_time.slice(-8)}</p> */}
          {
            <p>
              <img src={AlarmIcon}></img>&ensp;
              {`(${flightData?.eventCount?.alarmcount})`}{" "}
            </p>
          }
          <label className="cl-yellow">Status</label>
        </div>
      </div>
      <FlightRoute routeData={flightData.data} flightId={flightData.flightId} />
    </div>
  );
};

export default memo(TripList);
