import React, { useState, useEffect } from 'react';
import LeftPanel from './LeftPanel';
import JSONDATA from '../../store/reports.json';
// import Pagination from "react-js-pagination";
import ReactPaginate from 'react-paginate';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { getAirCraft } from '../../Service';

function Reports(props: any) {
  const [reportList, updateReportsList] = useState([
    {
      'ECM Parameters': '' as string,
      'Actual Value at Take Off': 0 as number,
      'Actual Value at Cruise': 0 as number,
      Units: '' as string,
    },
  ]);
  const [limitValues, updateLimitValues] = useState({
    page: 1,
    limit: 10,
  });
  const [pageCount, updatePageCount] = useState(3);

  const [showFilter, updateShowFilter] = useState(true);

  const [loader, setLoader] = useState(false);

  const [showData, setShowData] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [todayDate, setTodayDate] = useState(new Date());
  const [flights, setFlights] = useState([]);
  const [airCraftsIds, setAirCraftdIds] = useState([166, 165]);
  const [selectedAicraftId, changeSelectedAircraftId] = useState(166);
  const [selectedFlight, setSelectedFlight] = useState('');

  useEffect(() => {
    const newData = [];
    const { page, limit } = limitValues;
    let start = (page - 1) * limit;
    let end = page * limit - 1;
    for (let i = start; i <= end; i++) {
      newData.push(JSONDATA[i]);
    }
    updateReportsList(newData);
    // setTimeout(() => {
    //     setLoader(false);
    // }, 300)
  }, []);

  useEffect(() => {
    getData();
  }, [startDate, endDate]);

  const handlePageClick = (e: any) => {
    const newData = [];
    const currPage = parseInt(e.selected) + 1;
    const { limit } = limitValues;
    let start = (currPage - 1) * limit;
    let end = currPage * limit - 1;
    for (let i = start; i <= end; i++) {
      newData.push(JSONDATA[i]);
    }
    updateReportsList(newData);
  };

  const showHideFilter = () => {
    updateShowFilter(!showFilter);
    if (showFilter) {
      try {
        document.getElementById('filter_lane')?.classList.add('my-class');
      } catch (err1) {}
    } else {
      try {
        document.getElementById('filter_lane')?.classList.remove('my-class');
      } catch (err2) {}
    }
  };

  const showReportData = () => {
    setShowData(true);
    try {
      document.getElementById('filter_lane')?.classList.add('my-class');
      updateShowFilter(false);
    } catch (err) {}
  };

  const hideFilter = () => {
    try {
      document.getElementById('filter_lane')?.classList.add('my-class');
      updateShowFilter(false);
    } catch (err) {}
  };

  const endDateChange = async (date: any) => {
    setEndDate(date);
  };

  const startDateChange = async (date: any) => {
    setStartDate(date);
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

  return (
    <React.Fragment>
      <div className='loading' style={{ display: loader ? 'block' : 'none' }}>
        <img src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' />
      </div>
      <div className='container-fluid content-body vh-100'>
        <div className='row'>
          <LeftPanel />
          <div className='col-lg-9 col-xl-10 my-4'>
            <div className='row mt-5'>
              <div className='col-md-12'>
                {showData === true ? (
                  <div className='row'>
                    <div className='col-md-8 d-flex align-items-center justify-content-between'>
                      <h2 className='cl-white mr-5'>Report results</h2>
                      <div className='dropdown text-right custom-d-dropdown'>
                        <button
                          className='custom-toast-menu dropdown-toggle'
                          type='button'
                          id='dropdownMenuButton'
                          data-toggle='dropdown'
                          aria-haspopup='true'
                          aria-expanded='false'
                        >
                          <i className='fas fa-ellipsis-v user-icon'></i>
                        </button>
                        <div
                          className='dropdown-menu'
                          aria-labelledby='dropdownMenuButton'
                          x-placement='bottom-start'
                        >
                          <button className='dropdown-item'>
                            Download Excel
                          </button>
                          <button className='dropdown-item'>
                            Download Pdf
                          </button>
                          <button className='dropdown-item'>
                            Download Csv
                          </button>
                          <button className='dropdown-item'>Email</button>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4 d-flex align-items-center justify-content-end'>
                      <div className='input-group'>
                        <div className='input-group-prepend'>
                          <span className='input-group-text'>
                            <i className='fas fa-search'></i>
                          </span>
                        </div>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Search Name'
                        ></input>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* {showFilter === true ? ( */}
                <div className='ap-filter ' id='filter_lane'>
                  <div
                    className='square_click'
                    style={{ cursor: 'pointer' }}
                    onClick={showHideFilter}
                  >
                    <i className='fa fa-cog' aria-hidden='true'></i>
                  </div>
                  <div className='d-flex align-items-center justify-content-between filter-heading p-4'>
                    <h4 className='cl-white m-0 text-left '>Report Filter</h4>
                    <i
                      className='fa fa-times cl-white'
                      aria-hidden='true'
                      style={{ cursor: 'pointer' }}
                      onClick={hideFilter}
                    ></i>
                  </div>

                  <div className='filter-block p-4 pt-5'>
                    <div className='row'>
                      <div className='col-md-12 mb-3'>
                        <div className='select-dropdown'>
                          <select
                            className='form-control'
                            id='select4'
                            onChange={(e: any) => {
                              changeSelectedAircraftId(e.target.value);
                            }}
                            value={selectedAicraftId}
                          >
                            {airCraftsIds.map((aircraft) => {
                              return (
                                <option value={aircraft} key={aircraft}>
                                  {aircraft}
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
                      <div className='col-md-12'>
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
                              console.log(aircraftid);
                              return (
                                <option value={aircraftid} key={aircraftid}>
                                  {aircraftid}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className='col-md-12'>
                        <div className='select-dropdown'>
                          <select className='form-control' id='select4'>
                            <option>Flights</option>
                            <option>a</option>
                            <option>b</option>
                            <option>c</option>
                            <option>d</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-12  mt-5 mb-3'>
                        <div className='button-block d-flex'>
                          <button
                            type='button'
                            className='cl-btn cl-btn-primary mr-5'
                            onClick={showReportData}
                          >
                            Run
                          </button>
                          <button
                            type='button'
                            className='cl-btn cl-btn-outline'
                          >
                            Distribution List
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ) : (null)} */}

                {showData === true ? (
                  <div className='row mt-5'>
                    <div className='col-md-12'>
                      <div className='row'>
                        <div className='col-md-12'>
                          <div className='colored-heading'>
                            <h3 className='cl-white text-left m-0 p-4'>
                              Aircraft and Flight Id
                            </h3>
                          </div>
                          <div className='light-card-bg p-4'>
                            <div className='row'>
                              <div className='col-md-6'>
                                <div className='row mb-2'>
                                  <div className='col-md-4 d-flex justify-content-between'>
                                    <p className='m-0 cl-white text-left'>
                                      {' '}
                                      Reg. No.
                                    </p>
                                    <span className='cl-white'>:</span>
                                  </div>
                                  <div className='col-md-8'>
                                    <p className='m-0 cl-white text-left'>
                                      164
                                    </p>
                                  </div>
                                </div>
                                <div className='row mb-2'>
                                  <div className='col-md-4 d-flex justify-content-between'>
                                    <p className='m-0 cl-white text-left'>
                                      Aircraft Reg. No.
                                    </p>
                                    <span className='cl-white'>:</span>
                                  </div>
                                  <div className='col-md-8'>
                                    <p className='m-0 cl-white text-left'>
                                      164
                                    </p>
                                  </div>
                                </div>
                                <div className='row mb-2'>
                                  <div className='col-md-4 d-flex justify-content-between'>
                                    <p className='m-0 cl-white text-left'>
                                      Origin
                                    </p>
                                    <span className='cl-white'>:</span>
                                  </div>
                                  <div className='col-md-8'>
                                    <p className='m-0 cl-white text-left'>
                                      46.5248,24.9304
                                    </p>
                                  </div>
                                </div>
                                <div className='row mb-2'>
                                  <div className='col-md-4 d-flex justify-content-between'>
                                    <p className='m-0 cl-white text-left'>
                                      Taxi Out Time
                                    </p>
                                    <span className='cl-white'>:</span>
                                  </div>
                                  <div className='col-md-8'>
                                    <p className='m-0 cl-white text-left'>
                                      2021-10-22 03:13
                                    </p>
                                  </div>
                                </div>
                                <div className='row mb-2'>
                                  <div className='col-md-4 d-flex justify-content-between'>
                                    <p className='m-0 cl-white text-left'>
                                      Taxi Off Time
                                    </p>
                                    <span className='cl-white'>:</span>
                                  </div>
                                  <div className='col-md-8'>
                                    <p className='m-0 cl-white text-left'>
                                      2021-10-22 03:13
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className='col-md-6'>
                                <div className='row mb-2'>
                                  <div className='col-md-4 d-flex justify-content-between'>
                                    <p className='m-0 cl-white text-left'>
                                      Date
                                    </p>
                                    <span className='cl-white'>:</span>
                                  </div>
                                  <div className='col-md-8'>
                                    <p className='m-0 cl-white text-left'>
                                      22/10/2021
                                    </p>
                                  </div>
                                </div>
                                <div className='row mb-2'>
                                  <div className='col-md-4 d-flex justify-content-between'>
                                    <p className='m-0 cl-white text-left'>
                                      Flight ID / Call Sign:
                                    </p>
                                    <span className='cl-white'>:</span>
                                  </div>
                                  <div className='col-md-8'>
                                    <p className='m-0 cl-white text-left'>0</p>
                                  </div>
                                </div>
                                <div className='row mb-2'>
                                  <div className='col-md-4 d-flex justify-content-between'>
                                    <p className='m-0 cl-white text-left'>
                                      Destination
                                    </p>
                                    <span className='cl-white'>:</span>
                                  </div>
                                  <div className='col-md-8'>
                                    <p className='m-0 cl-white text-left'>
                                      39.7244,24.4761
                                    </p>
                                  </div>
                                </div>
                                <div className='row mb-2'>
                                  <div className='col-md-4 d-flex justify-content-between'>
                                    <p className='m-0 cl-white text-left'>
                                      Gate In Time
                                    </p>
                                    <span className='cl-white'>:</span>
                                  </div>
                                  <div className='col-md-8'>
                                    <p className='m-0 cl-white text-left'>
                                      2021-10-22 03:14
                                    </p>
                                  </div>
                                </div>
                                <div className='row mb-2'>
                                  <div className='col-md-4 d-flex justify-content-between'>
                                    <p className='m-0 cl-white text-left'>
                                      Landing Time
                                    </p>
                                    <span className='cl-white'>:</span>
                                  </div>
                                  <div className='col-md-8'>
                                    <p className='m-0 cl-white text-left'>
                                      2021-10-22 03:14
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='col-md-12'>
                          <table className='table table-striped table-dark mt-5'>
                            <thead>
                              <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>ECM Parameters</th>
                                <th scope='col'>Actual Value at Take Off</th>
                                <th scope='col'>Actual Value at Cruise</th>
                                <th scope='col'>Units</th>
                              </tr>
                            </thead>
                            <tbody>
                              {reportList.map((reports, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{reports['ECM Parameters']}</td>
                                    <td>
                                      {reports['Actual Value at Take Off']}
                                    </td>
                                    <td>{reports['Actual Value at Cruise']}</td>
                                    <td>{reports['Units']}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                          <div className='pagingnation text-right'>
                            <div className='pagingnation-list'>
                              <ReactPaginate
                                breakLabel='...'
                                nextLabel=' >'
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
                                previousLabel='< '
                              />
                            </div>
                          </div>
                        </div>

                        <div className='col-md-12'>
                          <div className='card cardbox mt-5'>
                            <div className='card-body'>
                              <h4 className='cl-white text-left mb-3'>
                                Licence File Note
                              </h4>
                              <p className='cl-white card-text text-left'>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content. Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Sit dolores nam expedita?
                                Minima omnis nihil ea enim aut sequi tempora
                                dolor ad, sunt at magnam suscipit veritatis
                                nulla adipisci accusamus?
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Reports;
