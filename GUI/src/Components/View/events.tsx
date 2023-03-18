import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { viewService } from '../../Service/view.service';
import { assetService } from '../../Service/asset.service';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const EventsComponent = () => {
  const [loader, setLoader] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [todayDate, setTodayDate] = useState(new Date());
  const [sevrityData, setSeverityData] = useState([]);
  const [eventTypeData, setEventTypeData] = useState([]);
  const [assetList, setAssetsList] = useState([]);
  const [selectedAircraftArrayData, setSelectedAircraftArrayData] = useState([]);
  const [selectedSevrityData, setSelectedSeverityData] = useState('1');
  const [selectedEventTypeData, setSelectedEventTypeData] = useState('1');
  const [selectedEventsArrayData, setSelectedEventsArrayData] = useState([]);
  const [selectedAssetType, setSelectedAssetData] = useState('1');
  const [showFilter, setShowFilter] = useState(true);
  const [eventsData, setEventData] = useState<any>([]);
  const changeCustomer = (val: any) => {
    setSelectedAssetData(val);
  }

  const changeEventType = (val: any) => {
    setSelectedEventTypeData(val);
  }

  const changeSeverity = (val: any) => {
    console.log('val', val);
    setSelectedSeverityData(val);
  }

  const endDateChange = async (date: any) => {
    setEndDate(date);
  };

  const startDateChange = async (date: any) => {
    setStartDate(date);
  };

  useEffect(() => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    setStartDate(firstDay);
    onInit();
  }, [])

  const onInit = async () => {
    setLoader(true);
    // await getSevrity();
    await getEventTypes();
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
        } else {
          setAssetsList([]);
        }
        resolve(true);
      } catch (error: any) {
        resolve(true);
        console.error(error);
      }
    });
  };

  const getSevrity = () => {

    return new Promise(async (resolve, reject) => {
      try {
        const data: any = await viewService.getSeverity();
        setSeverityData(data);
        resolve(true);
      } catch (error) {
        resolve(true);
        setSeverityData([]);
      }
    })

  }

  const getEventTypes = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data: any = await viewService.getEventTypes();
        setEventTypeData(data);
        resolve(true);
      } catch (error) {
        setEventTypeData([]);
        resolve(true);
      }
    })
  }


  const onChangeEventTypeCheckbox = (event: any, data: any) => {
    const checked = event.target.checked;
    const value = data.event_type;
    if (checked) {
      const eventTypeDataArr: any = [...selectedEventsArrayData];
      eventTypeDataArr.push(value);
      setSelectedEventsArrayData(eventTypeDataArr);
    } else {
      const eventTypeDataArr: any = [...selectedEventsArrayData];
      const filterArr = eventTypeDataArr.filter((item: any) => item !== value)
      setSelectedEventsArrayData(filterArr);
    }

    let dataArr: any = [...eventTypeData];
    dataArr = dataArr.map((item: any) => {
      if (item.id === data.id) {
        item.checked = checked;
      }
      return item;
    })
    setEventTypeData(dataArr);
  }

  const onChangeAircraftCheckbox = (event: any, data: any) => {
    const checked = event.target.checked;
    const value = data.name;
    if (checked) {
      const aircraftDataArr: any = [...selectedAircraftArrayData];
      aircraftDataArr.push(value);
      setSelectedAircraftArrayData(aircraftDataArr);
    } else {
      const aircraftDataArr: any = [...selectedAircraftArrayData];
      const filterArr = aircraftDataArr.filter((item: any) => item !== value)
      setSelectedAircraftArrayData(filterArr);
    }

    let dataArr: any = [...assetList];
    dataArr = dataArr.map((item: any) => {
      if (item.name === data.name) {
        item.checked = checked;
      }
      return item;
    })
    setAssetsList(dataArr);
  }


  const getEventData = async () => {

    let fromDateString = "";
    if (startDate) {
      fromDateString = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000))
        .toISOString()
        .split("T")[0];
    }

    let endDateString = "";
    if (endDate) {
      endDateString = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000))
        .toISOString()
        .split("T")[0];
    }

    const payLoad = {
      fromDate: fromDateString,
      toDate: endDateString,
      aircraft: selectedAssetType == '1' ? [] : selectedAircraftArrayData,
      eventTypes: selectedEventTypeData == '1' ? [] : selectedEventsArrayData
    }

    try {
      setLoader(true);
      const data = await viewService.getEventList(payLoad);
      console.log('data', data);
      setEventData(data);
      setLoader(false);
    } catch (error) {
      setEventData([]);
      setLoader(false);
    }

  }

  const EventTable = () => {
    return (
      <div className='col-md-12 my-4 report-list'>
        <div className='row mt-5 d-flex justify-content-center'>
          <div className='col-md-11'>
            <div className='row'>
              <div className='col-md-8 d-flex align-items-center'>
                <h2 className='cl-white mr-5'>Events List</h2>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <div className='colored-heading'>
                  <h3 className='cl-white text-left m-0 p-4'>
                    Filters  {showFilter ? <span onClick={() => { setShowFilter(false) }}><ArrowDropUpIcon /></span> : <span onClick={() => { setShowFilter(true) }}><ArrowDropDownIcon /></span>}
                  </h3>
                </div>
                {showFilter ? <div className='light-card-bg p-4'>
                  <div className='row'>
                    <div className='col-md-8'>
                      <div className='row mb-2'>
                        <div className='col-md-2 d-flex justify-content-between'>
                          <p className='m-0 cl-white text-left'>
                            Customer :
                          </p>
                          <span className='cl-white'></span>
                        </div>
                        <div className='col-md-4'>
                          <p className='m-0 cl-white text-left event-style'>
                            <div className='select-dropdown'>
                              <select
                                className='form-control'
                                id='select2'
                                onChange={(e: any) => {
                                  changeCustomer(e.target.value);
                                }}
                                value={''}
                              >
                                <option value={''} >
                                  {'test'}
                                </option>
                              </select>
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-4'>
                      <div className='row mb-2'>
                        <div className='col-md-4 d-flex justify-content-between'>
                          <p className='m-0 cl-white text-left'>
                            From Date :
                          </p>
                          <span className='cl-white'></span>
                        </div>
                        <div className='col-md-8'>
                          <p className='m-0 cl-white text-left'>
                            <div className='mb-3 customDatePickerWidth'>
                              <DatePicker
                                wrapperClassName='datePicker'
                                selected={startDate}
                                onChange={(date: any) => startDateChange(date)}
                                placeholderText='From Date'
                                maxDate={todayDate ? todayDate : null}
                              />
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='row mb-2'>
                        <div className='col-md-4 d-flex justify-content-between'>
                          <p className='m-0 cl-white text-left'>To :</p>
                          <span className='cl-white'></span>
                        </div>
                        <div className='col-md-8'>
                          <p className='m-0 cl-white text-left'>
                            <div className='mb-3 customDatePickerWidth'>
                              <DatePicker
                                wrapperClassName='datePicker'
                                selected={endDate}
                                onChange={(date: any) => endDateChange(date)}
                                placeholderText='To Date'
                                maxDate={todayDate ? todayDate : null}
                              />
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-4'>
                      <div className='row mb-2'>
                        <div className='col-md-4 d-flex justify-content-between'>
                          <p className='m-0 cl-white text-left'>
                            Aircraft :
                          </p>
                          <span className='cl-white'></span>
                        </div>
                        <div className='col-md-8'>
                          <p className='m-0 cl-white text-left event-style'>
                            <div className='select-dropdown'>
                              <select
                                className='form-control'
                                onChange={(e: any) => {
                                  changeCustomer(e.target.value);
                                }}
                                value={selectedAssetType}
                              >
                                <option value={'1'} >
                                  {'All'}
                                </option>
                                <option value={'0'} >
                                  {'Pick from list'}
                                </option>
                              </select>
                            </div>
                          </p>
                        </div>
                      </div>
                      {selectedAssetType === '0' ?
                        <div className='row mb-2'>
                          <div className='col-md-4 d-flex justify-content-between'>
                          </div>
                          <div className='col-md-8'>
                            <p className='m-0 cl-white text-left event-style'>
                              <div className='mutilselect-items'>
                                <div>
                                  <ul>
                                    {assetList.length > 0 ? assetList.map((item: any) => {
                                      return <li key={item.id}>
                                        <div className='checkbox-item'>
                                          <input
                                            type="checkbox"
                                            name={item.name}
                                            value={item.name}
                                            checked={item.checked}
                                            onChange={(e) => onChangeAircraftCheckbox(e, item)}
                                          />
                                          {item.name}
                                        </div>
                                      </li>
                                    }) : <li>No Data Available</li>}
                                  </ul>
                                </div>
                              </div>
                            </p>
                          </div>
                        </div> : null}

                    </div>
                    <div className='col-md-4'>
                      <div className='row mb-2'>
                        <div className='col-md-4 d-flex justify-content-between'>
                          <p className='m-0 cl-white text-left'>
                            Events Type :
                          </p>
                          <span className='cl-white'></span>
                        </div>
                        <div className='col-md-8'>
                          <p className='m-0 cl-white text-left event-style'>
                            <div className='select-dropdown'>
                              <select
                                className='form-control'
                                onChange={(e: any) => {
                                  changeEventType(e.target.value);
                                }}
                                value={selectedEventTypeData}
                              >
                                <option value={'1'} >
                                  {'All'}
                                </option>
                                <option value={'0'} >
                                  {'Pick from list'}
                                </option>
                              </select>
                            </div>
                          </p>
                        </div>
                      </div>
                      {selectedEventTypeData === '0' ?
                        <div className='row mb-2'>
                          <div className='col-md-4 d-flex justify-content-between'>
                          </div>
                          <div className='col-md-8'>
                            <p className='m-0 cl-white text-left event-style'>
                              <div className='mutilselect-items'>
                                <div>
                                  <ul>
                                    {eventTypeData.length > 0 ? eventTypeData.map((item: any) => {
                                      return <li key={item.id}>
                                        <div className='checkbox-item'>
                                          <input
                                            type="checkbox"
                                            name={item.event_type}
                                            value={item.event_type}
                                            checked={item.checked}
                                            onChange={(e) => onChangeEventTypeCheckbox(e, item)}
                                          />
                                          {item.event_type}
                                        </div>
                                      </li>
                                    }) : <li>No Data Available</li>}
                                  </ul>
                                </div>
                              </div>
                            </p>
                          </div>
                        </div> : null}
                    </div>
                    <div className='col-md-4'>
                      <div className='row mb-2'>
                        <div className='col-md-4 d-flex justify-content-between'>
                          <p className='m-0 cl-white text-left'>
                            Severity :
                          </p>
                          <span className='cl-white'></span>
                        </div>
                        <div className='col-md-8'>
                          <p className='m-0 cl-white text-left event-style'>
                            <div className='select-dropdown'>
                              <select
                                className='form-control'
                                onChange={(e: any) => {
                                  changeSeverity(e.target.value);
                                }}
                                value={selectedSevrityData}
                              >
                                <option value={'1'} >
                                  {'All'}
                                </option>
                                {/* <option value={'0'} >
                                  {'Pick from list'}
                                </option> */}
                              </select>
                            </div>
                          </p>
                        </div>
                      </div>
                      {selectedSevrityData === '0' ?
                        <div className='row mb-2'>
                          <div className='col-md-4 d-flex justify-content-between'>
                          </div>
                          <div className='col-md-8'>
                            <p className='m-0 cl-white text-left event-style'>
                              <div className='mutilselect-items'>
                                <div>
                                  <ul>
                                    {sevrityData.length > 0 ? sevrityData.map((item: any) => {
                                      return <li key={`severity${item.id}`}>
                                        <div className='checkbox-item'>
                                          <input
                                            type="checkbox"
                                            name={item.severity_level}
                                            value={item.severity_level}
                                            checked={item.checked}
                                          />
                                          {item.severity_level}
                                        </div>
                                      </li>
                                    }) : <li>No Data Available</li>}
                                  </ul>
                                </div>
                              </div>
                            </p>
                          </div>
                        </div> : null}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12 mb-3'>
                      <div className='button-block d-flex justify-content-center'>
                        <button
                          type='button'
                          className='btn btn-primary pl-5 pr-5'
                          onClick={getEventData}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div> : null}

              </div>
              <div className='col-md-12 table-responsive'>
                <table className='table table-striped table-dark mt-5'>
                  <thead>
                    <tr>
                      <th scope='col'>Customer</th>
                      <th scope='col'>Aircraft</th>
                      <th scope='col'>Time</th>
                      <th scope='col'>Type</th>
                      <th scope='col'>Severity</th>
                      <th scope='col'>Location</th>
                      <th scope='col'>Heading</th>
                      <th scope='col'>Velocity (knots)</th>
                      {/* <th scope='col'>Confirmed By</th>
                      <th scope='col'>Comment</th>
                      <th scope='col'>Message</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {eventsData.map((item: any) => {
                      return <tr>
                        <td>{''}</td >
                        <td>{item.aircraftid}</td>
                        <td>{item.time}</td >
                        <td>{item.type}</td>
                        <td>{'N/A'}</td>
                        <td>{`${item.gps_lat},${item.gps_long}`}</td>
                        <td>{item.heading}</td>
                        <td>{item.distance}</td>
                        {/* <td>{'N/A'}</td>
                        <td>{'N/A'}</td>
                        <td>{'N/A'}</td> */}
                      </tr>
                    })}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>)
  }

  return (
    <React.Fragment>
      <div className='container-fluid content-body vh-100'>
        <div className='loading' style={{ display: loader ? 'block' : 'none' }}>
          <img src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' />
        </div>
        <div className='row'>
          {EventTable()}
        </div>
      </div>

    </React.Fragment>
  );
};

export default EventsComponent;
