import { memo, useCallback, useEffect, useState } from 'react';
import _ from 'lodash';

const TripReplay = (props: any) => {
  const {
    selectedTripArray,
    selectedTripIndex,
    selectedTripReplayFlight,
    onClickedRouteItem,
  } = props;
  const [tripValue, setTripValue] = useState(selectedTripIndex);

  const onChange = (event: any) => {
    setTripValue(event.target.value);
    debounce(selectedTripReplayFlight, event.target.value);
  };

  const increaseIndex = () => {
    if (Number(tripValue) > -1) {
      let value = Number(tripValue) + 1;
      setTripValue(value);
      onClickedRouteItem(selectedTripReplayFlight, value);
    }
  };

  const decreaseIndex = () => {
    if (Number(tripValue) > 0) {
      let value = Number(tripValue) - 1;
      setTripValue(value);
      onClickedRouteItem(selectedTripReplayFlight, value);
    }
  };

  const debounce = useCallback(
    _.debounce((flightId: any, value: string) => {
      console.log('selectedTripReplayFlight', flightId, 'index', value);
      onClickedRouteItem(flightId, value);
      // send the server request here
    }, 300),
    []
  );

  useEffect(() => {
    //console.log('selectedTripIndex', selectedTripIndex);
    setTripValue(selectedTripIndex);
  }, [selectedTripIndex]);
  if (selectedTripArray && selectedTripArray.length > 0) {
    let maxValue = selectedTripArray.length - 1;
    return (
      <div className='side-card trip-replay p-3 mb-3 text-left cl-white'>
        <div className='d-flex justify-content-between'>
          <h3>Trip Replay</h3>
          <div className='d-flex justify-content-end'>
            <span className='mr-3' onClick={decreaseIndex}>
              {' '}
              {'<<'}{' '}
            </span>
            <span className='ml-3' onClick={increaseIndex}>
              {' '}
              {'>>'}{' '}
            </span>
          </div>
        </div>
        {/* <div className='progress-path mt-5 mb-4'></div> */}
        <div className='slidecontainer'>
          <input
            type='range'
            min='0'
            max={maxValue}
            className='slider'
            id='myRange'
            value={tripValue}
            onChange={onChange}
          ></input>
        </div>

        <div className='d-flex justify-content-between'>
          <p>
            Trip Start <span className='d-block'>05:33:44</span>
          </p>
          <p>
            Trip End <span className='d-block'>08:50:00</span>
          </p>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default memo(TripReplay);
