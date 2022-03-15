import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { RouteSelectedContext } from './RouteSelectedContext';

const RouteItem = React.forwardRef((props: any, ref: any) => {
  const { index, item, flightId, showTrue } = props;
  const value: any = useContext(RouteSelectedContext);
  let selectedTripIndex = value.selectedTripIndex;
  let selectedTripReplayFlight = value.selectedTripReplayFlight;
  const onClick = (flightId: any, routeIndex: any) => {
    value.onClickedRouteItem(flightId, routeIndex);
  };
  useEffect(() => {
    if (showTrue) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [selectedTripIndex]);

  return (
    <div
      id={`${flightId}-${index}`}
      ref={(el) => (ref.current = el)}
      className={`row route-container p-2 ${
        index == selectedTripIndex && flightId == selectedTripReplayFlight
          ? ' selected-trip'
          : ''
      }`}
      onClick={() => onClick(flightId, index)}
    >
      <div className='col-4 p-0'>
        <div>
          <span>{item.packet_type}</span>
        </div>
      </div>
      <div className='col-8 p-0'>
        <div className='d-flex'>
          <div className='col-4 p-0'>
            <div className='route-details'>
              <span>{item.speed} Knots</span>
            </div>
          </div>
          <div className='col-4 p-0'>
            <div className='route-details'>
              <span className='color-blue'>{item.altitude} Ft</span>
              <span className='color-gray'>
                {item.gps_lat},{item.gps_long}
              </span>
            </div>
          </div>
          <div className='col-4 p-0'>
            <div className='route-details'>
              <span className='color-gray'>{item.date_time}</span>
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
