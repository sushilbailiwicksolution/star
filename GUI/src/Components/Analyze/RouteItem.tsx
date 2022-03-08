import React, { memo, useContext } from 'react';
import { RouteSelectedContext } from './RouteSelectedContext';

const RouteItem = (props: any) => {
  const { index, item, flightId } = props;
  const value: any = useContext(RouteSelectedContext);
  const onClick = (flightId: any, routeIndex: any) => {
    console.log('flightId', flightId, 'routeIndex', routeIndex);
    value.onClickedRouteItem(flightId, routeIndex);
  };

  return (
    <div
      id={`${flightId}-${index}`}
      className='row route-container p-2'
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
};

export default memo(RouteItem);
