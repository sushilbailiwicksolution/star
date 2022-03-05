import React, { memo } from 'react';

const TripList = (props: any) => {
  const { flightData } = props;
  return (
    <div className='side-card p-3 mb-3 text-left cl-white'>
      <p className='m-0'>{flightData.flightId}</p>
      <h1 className='my-3'>162</h1>
      <div className='d-flex'>
        <p className='side-card-level'>Departure</p>
        <p>Xxxxxxxxx</p>
      </div>
      <div className='d-flex'>
        <p className='side-card-level'>Departure Time</p>
        <p>Xxxxxxxxx</p>
      </div>
      <div className='d-flex'>
        <p className='side-card-level'>Duration</p>
        <p>Xxxxxxxxx</p>
      </div>
      <div className='d-flex'>
        <p className='side-card-level'>Arrival</p>
        <p>Xxxxxxxxx</p>
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
  );
};

export default memo(TripList);
