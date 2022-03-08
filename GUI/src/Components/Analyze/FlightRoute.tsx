import React, { memo } from 'react';
import RouteItem from './RouteItem';

const FlightRoute = (props: any) => {
  const { routeData, flightId } = props;
  console.log('routeData', routeData);
  return (
    <div className='route-list-container'>
      {routeData.map((item: any, index: any) => (
        <RouteItem
          key={index}
          index={index}
          item={item}
          flightId={flightId}
        ></RouteItem>
      ))}
    </div>
  );
};

export default memo(FlightRoute);
