import { memo, useCallback, useEffect, useState } from 'react';
import _ from 'lodash';



/**
 * This component is handling trip replay and start time and stop time of trip replay.
 * @component
 * @param {Object} props - The props passed to the component.
 * @param {Array} props.selectedTripArray - An array containing the trip data for replay.
 * @param {number} props.selectedTripIndex - The index of the selected trip in the trip array.
 * @param {string} props.selectedTripReplayFlight - The flight ID of the selected trip for replay.
 * @param {Function} props.onClickedRouteItem - The function to handle the click on a route item.
 */
const TripReplay = (props: any) => {
  const {
    selectedTripArray,
    selectedTripIndex,
    selectedTripReplayFlight,
    onClickedRouteItem,
  } = props;
  const [tripValue, setTripValue] = useState(selectedTripIndex);

  
  /**
   * Handles the change event of the range input.
   * Updates the tripValue state and debounces the onClickedRouteItem function.
   * @param {Object} event - The change event of the input.
   */
  const onChange = (event: any) => {
    setTripValue(event.target.value);
    debounce(selectedTripReplayFlight, event.target.value);
  };

  /**
   * Increases the tripValue state and calls onClickedRouteItem with the updated value.
   */
  const increaseIndex = () => {
    if (Number(tripValue) > -1) {
      let value = Number(tripValue) + 1;
      setTripValue(value);
      onClickedRouteItem(selectedTripReplayFlight, value);
    }
  };

   /**
   * Decreases the tripValue state and calls onClickedRouteItem with the updated value.
   */
  const decreaseIndex = () => {
    if (Number(tripValue) > 0) {
      let value = Number(tripValue) - 1;
      setTripValue(value);
      onClickedRouteItem(selectedTripReplayFlight, value);
    }
  };

  /**
   * Debounces the onClickedRouteItem function to avoid multiple rapid calls.
   */
  const debounce = useCallback(
    _.debounce((flightId: any, value: string) => {
      console.log('selectedTripReplayFlight', flightId, 'index', value);
      onClickedRouteItem(flightId, value);
      // send the server request here
    }, 300),
    []
  );

  useEffect(() => {
       
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
            Trip Start <span className='d-block'>{ selectedTripArray[0].date_time.slice(-8)|| `05:33:44`}</span>
          </p>
          <p>
            Trip End <span className='d-block'>{ selectedTripArray[selectedTripArray.length-1].date_time.slice(-8)|| `05:33:44`}</span>
          </p>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default memo(TripReplay);
