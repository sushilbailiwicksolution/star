/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useEffect, createContext } from 'react';
import MapContainers from './map';
import {
  getAirCraft,
  getAirCraftDetails,
  getCityDetail,
} from '../../Service/index';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import CSVDATA from './../../store/csvjson_1.json';
import { toast } from 'react-toastify';
import TripList from './TripList';
import TripReplay from './TripReplay';
import { RouteSelectedContext } from './RouteSelectedContext';
import { assetService } from '../../Service/asset.service';

interface FlightReview {
  flightId: any;
  departure: any;
  departureTime: any;
  arrivalTime: any;
  duration: any;
  data: [];
  flightNumber: any;
}

interface selectionInterface {
  selectedTripReplayFlight: any;
  selectedTripArray: [];
  selectedTripIndex: any;
}

function Analyze(props: any) {
  const [loader, setLoader] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState('');
  const [todayDate, setTodayDate] = useState(new Date());
  const [airCraftjson, setAirCraftJson] = useState([]);
  // const [airCraftjson, setAirCraftJson] = useState(CSVDATA);
  const [airCraftsIds, setAirCraftdIds] = useState([
    161, 162, 163, 164, 165, 166, 167, 168,
  ]);
  const [selectedAicraftId, changeSelectedAircraftId] = useState();
  const [addtoReviewFlights, setAddtoReviewFlights] = useState<FlightReview[]>(
    []
  );
  const [selectedTripReplayFlight, setSelectedTripReplayFlight] = useState('');
  const [selectedTripIndex, setSelectedTripIndex] = useState(0);
  const [selectedTripArray, setSelectedTripArray] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);
  const [assetsList, setAssetsList] = useState([]);

  useEffect(() => {
    onInit();
  }, []);

  useEffect(() => {
    getData();
  }, [startDate, endDate]);

  const onInit = async () => {
    setLoader(true);
    await getAssetsList();
    setLoader(false);
  }

  const getAssetsList = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await assetService.getAssetsList();
        if (userData.status == '200') {
          const checkListArr = userData.data.results;
          setAssetsList(checkListArr);
          if(checkListArr.length > 0){
            changeSelectedAircraftId(checkListArr[0].name);
          }
        }else{
          setAssetsList([]);
          changeSelectedAircraftId(undefined);
        }
        resolve(true);
      } catch (error: any) {
        resolve(true);
        toast.error(error.msg);
        console.error(error);
      }
    });
  };

  const getData = async () => {
    if (startDate && endDate) {
      try {
        const formattedStartDate = startDate
          ? moment(startDate).format('DD-MM-YYYY')
          : null;
        const formattedEndDate = endDate
          ? moment(endDate).format('DD-MM-YYYY')
          : null;
        const airCraftData = await getAirCraft(
          formattedStartDate,
          formattedEndDate,
          selectedAicraftId
        );
        console.log(airCraftData);
        if (airCraftData && !airCraftData.status) {
          const airCrafts = [] as any;
          for (let k in airCraftData) {
            airCrafts.push(airCraftData[k]);
          }
          setFlights(airCrafts);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onClickedRouteItem = (flightId: any, routeIndex: any) => {
    if (selectedTripReplayFlight == flightId) {
      let index = addtoReviewFlights.findIndex(
        (item: any) => item.flightId === flightId
      );
      let data = addtoReviewFlights[index].data;
      setSelectedTripArray(data);
    } else {
      setSelectedTripReplayFlight(flightId);
    }
    setSelectedTripIndex(routeIndex);
  };

  const deleteFlightRoutes = (flightId: any) => {
    let filteredArray = addtoReviewFlights.filter(
      (item) => item.flightId != flightId
    );
    setMapCenter(null);
    setAddtoReviewFlights(filteredArray);
    if (filteredArray.length > 0) {
      setSelectedTripArray(filteredArray[0].data);
      setSelectedTripIndex(0);
      setSelectedTripReplayFlight(filteredArray[0].flightId);
    }
  };

  const updateMapCenter = (latLong: any) => {
    setMapCenter(latLong);
  };

  const onClickedMaker = (flightId: any, index: any) => {
    onClickedRouteItem(flightId, index);
  };

  const endDateChange = async (date: any) => {
    setEndDate(date);
  };

  const startDateChange = async (date: any) => {
    setStartDate(date);
  };

  const getFlightData = async () => {
    // const airCrafts = CSVDATA as  any;
    // setAirCraftJson(airCrafts);
    try {
      if (selectedFlight) {
        if (addtoReviewFlights.length > 0) {
          let index = addtoReviewFlights.findIndex(
            (item) => item.flightId === selectedFlight
          );
          if (index > -1) {
            toast.error('Trip Already Added');
            return;
          }
        }
        const airCraftDetails = await getAirCraftDetails(selectedFlight);
        if (airCraftDetails && !airCraftDetails.status) {
          const airCrafts = [] as any;
          for (let k in airCraftDetails) {
            airCrafts.push(airCraftDetails[k]);
          }
          let lat = airCrafts[0].gps_lat;
          let long = airCrafts[0].gps_long;
          const cityDetail = await getCityDetail(lat, long);
          let departureAddress = 'Not Available';
          if (cityDetail.status == 'OK' && cityDetail.results.length > 0) {
            departureAddress = cityDetail.results[0].formatted_address;
          }
          let departureTime = airCrafts[0].date_time;
          departureTime = departureTime.split(' ');
          let lastIndex = airCrafts.length - 1;
          let arrivalTime = airCrafts[lastIndex].date_time;
          arrivalTime = arrivalTime.split(' ');
          departureTime = departureTime[0] + 'T' + departureTime[1];
          arrivalTime = arrivalTime[0] + 'T' + arrivalTime[1];
          let a = moment(departureTime, 'DD-MM-YYYY HH:mm:ss').format(
            'YYYY-MM-DD HH:mm:ss'
          ); //now
          let b = moment(arrivalTime, 'DD-MM-YYYY HH:mm:ss').format(
            'YYYY-MM-DD HH:mm:ss'
          );
          let duration = moment(b).diff(moment(a), 'hours') + ' Hours';
          let obj = {
            flightId: selectedFlight,
            departureTime: airCrafts[0].date_time,
            departure: departureAddress,
            duration: duration,
            arrivalTime: airCrafts[lastIndex].date_time,
            data: airCrafts,
            flightNumber: selectedAicraftId,
          };
          setAddtoReviewFlights((old) => [...old, obj]);
          let newArr = [...airCraftjson];
          newArr = newArr.concat(airCrafts);
          setAirCraftJson(newArr);
          if (selectedTripArray.length < 1) {
            setSelectedTripReplayFlight(obj.flightId);
            setSelectedTripArray(obj.data);
          }
          //setAirCraftJson(airCrafts);
        } else {
          setAirCraftJson([]);
        }
      }
    } catch (err) {
      setAirCraftJson([]);
    }
  };

  return (
    <React.Fragment>
      <div className='loading' style={{ display: loader ? 'block' : 'none' }}>
        <img src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' />
      </div>
      <div className='container-fluid content-body vh-100'>
        <div className='row'>
          <div className='col-md-3 my-4'>
            <div className='sidebar-wrapper noheight-wrapper p-4'>
              <label className='text-left d-block mb-3'>
                Select Flight Details
              </label>
              <div className='row'>
                <div className='dd-style w-100'>
                  <div className='col-md-12 mb-3'>
                    <div className='select-dropdown'>
                      <select
                        className='form-control'
                        id='select2'
                        onChange={(e: any) => {
                          console.log('selectedAicraftId',e.target.value)
                          changeSelectedAircraftId(e.target.value);
                        }}
                        value={selectedAicraftId}
                      >
                        {/* {airCraftsIds.map((aircraft) => {
                          return (
                            <option value={aircraft} key={aircraft}>
                              {aircraft}
                            </option>
                          );
                        })} */}
                        {assetsList.map((item:any) => {
                          return (
                            <option value={item.name} key={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className='col-md-12 mb-3 customDatePickerWidth'>
                    {/* <div className="select-dropdown"> */}
                    <DatePicker
                      wrapperClassName='datePicker'
                      selected={startDate}
                      onChange={(date: any) => startDateChange(date)}
                      placeholderText='To Date'
                      maxDate={todayDate ? todayDate : null}
                    />
                    {/* </div> */}
                  </div>
                  <div className='col-md-12 mb-3 customDatePickerWidth'>
                    {/* <div className="select-dropdown"> */}
                    <DatePicker
                      wrapperClassName='datePicker'
                      selected={endDate}
                      onChange={(date: any) => endDateChange(date)}
                      placeholderText='From Date'
                      maxDate={todayDate ? todayDate : null}
                    />
                    {/* </div> */}
                  </div>
                  <div className='col-md-12 mb-3'>
                    <div className='select-dropdown'>
                      <select
                        className='form-control'
                        id='select2'
                        onChange={(e: any) => {
                          console.log(e.target.value);
                          setSelectedFlight(e.target.value);
                        }}
                      >
                        <option value=''>Select Flight By</option>
                        {flights.map(({ aircraftid }) => {
                          return (
                            <option value={aircraftid} key={aircraftid}>
                              {aircraftid}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className='col-md-12 mb-3'>
                  <div className='button-block d-flex justify-content-end'>
                    <button
                      type='button'
                      className='btn btn-primary'
                      onClick={getFlightData}
                    >
                      Add to Review
                    </button>
                  </div>
                </div>
              </div>
              {addtoReviewFlights.map((item, index) => (
                <RouteSelectedContext.Provider
                  value={{
                    onClickedRouteItem,
                    selectedTripIndex,
                    selectedTripReplayFlight,
                  }}
                >
                  <TripList
                    key={`${index}${item.flightId}`}
                    flightData={item}
                    deleteFlightRoutes={deleteFlightRoutes}
                    updateMapCenter={updateMapCenter}
                  />
                </RouteSelectedContext.Provider>
              ))}

              <TripReplay
                selectedTripArray={selectedTripArray}
                selectedTripIndex={selectedTripIndex}
                selectedTripReplayFlight={selectedTripReplayFlight}
                onClickedRouteItem={onClickedRouteItem}
              ></TripReplay>
            </div>
          </div>
          <div className='col-md-9 my-4'>
            <div className='maparea-container mb-4'>
              {/* <div className='craftAnalitic-detail d-flex align-items-center justify-content-between p-4'>
                <div className='d-flex leftBox-area'>
                  <div className='d-flex align-items-center'>
                    <div className='loader-circle'></div>
                    <h2>
                      67%
                      <span className='d-block'>Fuel</span>
                    </h2>
                  </div>
                  <div className='d-flex align-items-center'>
                    <div className='loader-circle yellow-circle'></div>
                    <h2>
                      300 KTS
                      <span className='d-block'>True Air Speed</span>
                    </h2>
                  </div>
                  <div className='d-flex align-items-center'>
                    <div className='loader-circle green-circle'></div>
                    <h2>
                      290KTS
                      <span className='d-block'>Ground Speed</span>
                    </h2>
                  </div>
                </div>
                <div className='d-flex'>
                  <i className='fas fa-ellipsis-v fa-icon-size'></i>
                </div>
              </div> */}

              {/* <MapContainers mapJson={airCraftjson} /> */}
              <MapContainers
                mapJson={addtoReviewFlights}
                onClickedMaker={onClickedMaker}
                selectedTripIndex={selectedTripIndex}
                selectedTripReplayFlight={selectedTripReplayFlight}
                mapCenter={mapCenter}
              />
              {/* <div className="addArea-name cl-white">
                            <h2 className="mb-3">Add Name of the Area</h2>
                            <input type="text" className="form-control mb-3" ></input>
                            <button type="button" className="btn btn-primary">Add Name</button>
                        </div> */}
            </div>

            <div className='charting-window p-4 cl-white'>
              <div className='d-flex justify-content-between'>
                <h2>Reporting And Charting Window</h2>
                <div className='d-flex justify-content-between text-left Charting-detail-width'>
                  <div className='d-flex align-items-center'>
                    <h1>
                      6567 KM
                      <span className='d-block'>Great Circle Distance</span>
                    </h1>
                  </div>
                  <div className='d-flex align-items-center'>
                    <h1>
                      19.079
                      <span className='d-block'>latitude</span>
                    </h1>
                  </div>
                  <div className='d-flex align-items-center'>
                    <h1>
                      78.14
                      <span className='d-block'>Longitude</span>
                    </h1>
                  </div>
                </div>
              </div>
              <div className='d-block text-left'>
                <p>V | 454 | date Time Stamp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Analyze;
