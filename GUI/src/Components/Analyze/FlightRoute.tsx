import React, { memo, useContext, useEffect, useRef } from 'react';
import RouteItem from './RouteItem';
import { RouteSelectedContext } from './RouteSelectedContext';

const FlightRoute = (props: any) => {
  const { routeData, flightId } = props;
  const value: any = useContext(RouteSelectedContext);
  let selectedTripIndex = value.selectedTripIndex;
  let selectedTripReplayFlight = value.selectedTripReplayFlight;

  const refs = React.useMemo(
    () =>
      routeData.map((item: any, index: any) => ({ ref: React.createRef() })),
    []
  ); // create refs only once

  return (
    <div className='route-list-container'>
      {routeData.map((item: any, index: any) => (
        <RouteItem
          key={`${index}${item.flightId}${index}`}
          index={index}
          item={item}
          flightId={flightId}
          ref={refs[index].ref}
          //ref={refs2[`${flightId}-${index}`]}
          showTrue={
            selectedTripReplayFlight == flightId && index == selectedTripIndex
              ? true
              : false
          }
        ></RouteItem>
      ))}
    </div>
  );
};

export default memo(FlightRoute);
