import React, { memo } from 'react';
import FlightRoute from './FlightRoute';

const TripList = (props: any) => {
  const { flightData } = props;
  const departureLatLong =
    flightData.data[0].gps_lat + ',' + flightData.data[0].gps_long;
  const departureTime = flightData.data[0].date_time;
  let lastIndex = flightData.data.length - 1;
  const arrivalTime = flightData.data[lastIndex].date_time;
  console.log('props', props);
  return (
    <div className='mb-2'>
      <div className='side-card p-3 mb-3 text-left cl-white'>
        <p className='m-0'>{flightData.flightId}</p>
        <h1 className='my-3'>{flightData.flightNumber}</h1>
        <div className='d-flex'>
          <p className='side-card-level'>Departure</p>
          <p>{departureLatLong}</p>
        </div>
        <div className='d-flex'>
          <p className='side-card-level'>Departure Time</p>
          <p>{departureTime}</p>
        </div>
        <div className='d-flex'>
          <p className='side-card-level'>Duration</p>
          <p>Xxxxxxxxx</p>
        </div>
        <div className='d-flex'>
          <p className='side-card-level'>Arrival</p>
          <p>{arrivalTime}</p>
        </div>
        <div className='d-flex justify-content-between align-items-center mt-3'>
          <p>1 Knot</p>
          <span>|</span>
          <p>627 m</p>
          <span>|</span>
          <p>08:33:14 pm</p>
          <label className='cl-yellow'>Status</label>
        </div>
      </div>
      <FlightRoute routeData={flightData.data} flightId={flightData.flightId} />
    </div>
  );
};

export default memo(TripList);
