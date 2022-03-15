import { memo, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import JSONDATA from '../../store/reports.json';
import { toast } from 'react-toastify';

const ReportList = (props: any) => {
  // const [reportList, updateReportsList] = useState([
  //   {
  //     'ECM Parameters': '' as string,
  //     'Actual Value at Take Off': 0 as number,
  //     'Actual Value at Cruise': 0 as number,
  //     Units: '' as string,
  //   },
  // ]);
  const [reportList, updateReportsList] = useState<any>([]);
  const [limitValues, updateLimitValues] = useState({
    page: 1,
    limit: 10,
  });
  const [pageCount, updatePageCount] = useState(3);
  const [showData, setShowData] = useState(false);
  const [reportListData, setReportListData] = useState<any>({});

  const reportResponse = useSelector((state: any) => state.reportReducer);

  // useEffect(() => {
  //   const newData = [];
  //   const { page, limit } = limitValues;
  //   let start = (page - 1) * limit;
  //   let end = page * limit - 1;
  //   for (let i = start; i <= end; i++) {
  //     newData.push(JSONDATA[i]);
  //   }
  //   updateReportsList(newData);
  // }, []);

  const handlePageClick = (e: any) => {
    const newData = [];
    const currPage = parseInt(e.selected) + 1;
    const { limit } = limitValues;
    let start = (currPage - 1) * limit;
    let end = currPage * limit - 1;
    for (let i = start; i <= end; i++) {
      //newData.push(JSONDATA[i]);
      newData.push(reportResponse.reportListData.report_data_s2[i]);
    }
    updateReportsList(newData);
  };

  useEffect(() => {
    let data = reportResponse.reportListData;
    if (data && data.status && data.status == '200') {
      setShowData(true);
      setReportListData(data);
      const newData = [];
      const { page, limit } = limitValues;
      let start = (page - 1) * limit;
      let end = page * limit - 1;
      for (let i = start; i <= end; i++) {
        newData.push(reportResponse.reportListData.report_data_s2[i]);
      }
      updateReportsList(newData);
    }
  }, [reportResponse.reportListData]);

  useEffect(() => {
    console.log('reportResponse.isError', reportResponse.isError);
    console.log('reportResponse.errorMessage.msg', reportResponse.errorMessage);
    if (reportResponse.isError) {
      setShowData(false);
      toast(reportResponse.errorMessage.msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportResponse.isError]);

  return (
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
                    <button className='dropdown-item'>Download Excel</button>
                    <button className='dropdown-item'>Download Pdf</button>
                    <button className='dropdown-item'>Download Csv</button>
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
                                {reportListData.report_data_s1.airCraftRegNo}
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
                                {reportListData.report_data_s1.regNum}
                              </p>
                            </div>
                          </div>
                          <div className='row mb-2'>
                            <div className='col-md-4 d-flex justify-content-between'>
                              <p className='m-0 cl-white text-left'>Origin</p>
                              <span className='cl-white'>:</span>
                            </div>
                            <div className='col-md-8'>
                              <p className='m-0 cl-white text-left'>
                                {reportListData.report_data_s1.origin}
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
                                {reportListData.report_data_s1.taxi_out_time}
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
                                {reportListData.report_data_s1.taxi_off_time}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='row mb-2'>
                            <div className='col-md-4 d-flex justify-content-between'>
                              <p className='m-0 cl-white text-left'>Date</p>
                              <span className='cl-white'>:</span>
                            </div>
                            <div className='col-md-8'>
                              <p className='m-0 cl-white text-left'>
                                {reportListData.report_data_s1.date}
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
                              <p className='m-0 cl-white text-left'>
                                {reportListData.report_data_s1.flightId}
                              </p>
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
                                {reportListData.report_data_s1.destination}
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
                                {reportListData.report_data_s1.gate_in_time}
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
                                {reportListData.report_data_s1.landing_Time}
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
                        {/* {reportList.map((reports, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{reports['ECM Parameters']}</td>
                              <td>{reports['Actual Value at Take Off']}</td>
                              <td>{reports['Actual Value at Cruise']}</td>
                              <td>{reports['Units']}</td>
                            </tr>
                          );
                        })} */}
                        {/* {reportList.map((reports: any, index: any) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{reports.ecmParams}</td>
                              <td>{reports.actualValue_takeoff}</td>
                              <td>{reports.actualValue_takeCruise}</td>
                              <td>{reports.unit}</td>
                            </tr>
                          );
                        })} */}
                        {reportListData.report_data_s2.map(
                          (reports: any, index: any) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{reports.ecmParams}</td>
                                <td>{reports.actualValue_takeoff}</td>
                                <td>{reports.actualValue_takeCruise}</td>
                                <td>{reports.unit}</td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                    <div
                      className='pagingnation text-right'
                      style={{ display: 'none' }}
                    >
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
                    <table className='table table-striped table-dark mt-5'>
                      <thead>
                        <tr>
                          <th colSpan={3} className='col-2' scope='col'>
                            {''}
                          </th>
                          <th colSpan={9} className='col-5' scope='col'>
                            Engine#1
                          </th>
                          <th colSpan={9} className='col-5' scope='col'>
                            Engine#2
                          </th>
                        </tr>
                        <tr>
                          <td>Flight Phase</td>
                          <td>Time</td>
                          <td>APU Usage Gnd/Air</td>
                          <td>N1 (%)</td>
                          <td>N2 (%)</td>
                          <td>EGT/ITT (DEG C) </td>
                          <td>Oil Pres (PSI)</td>
                          <td>Oil Temp (°C)</td>
                          <td>NAC Temp</td>
                          <td>Vib N1(PSI)</td>
                          <td>Vib N2</td>
                          <td>Fuel Flow (Lbs/Hr)</td>
                          <td>N1 (%)</td>
                          <td>N2 (%)</td>
                          <td>EGT/ITT (DEG C) </td>
                          <td>Oil Pres (PSI)</td>
                          <td>Oil Temp (°C)</td>
                          <td>NAC Temp</td>
                          <td>Vib N1(PSI)</td>
                          <td>Vib N2</td>
                          <td>Fuel Flow (Lbs/Hr)</td>
                        </tr>
                      </thead>
                      <tbody>
                        {reportListData.report_data_s3.map(
                          (reports: any, index: any) => {
                            return (
                              <tr key={index}>
                                <td>{reports.startFlight}</td>
                                <td>{reports.time}</td>
                                <td>{reports.apuUsageGndAir}</td>
                                <td>{reports.engine1_N1}</td>
                                <td>{reports.engine1_N2}</td>
                                <td>{reports.engine1_egtItt}</td>
                                <td>{reports.engine1_Oil_Press}</td>
                                <td>{reports.engine1_Oil_Temp}</td>
                                <td>{reports.engine1_NAC_Temp}</td>
                                <td>{reports.engine1_Vib_N1}</td>
                                <td>{reports.engine1_Vib_N2}</td>
                                <td>{reports.engine1_Fuel_Flow}</td>
                                <td>{reports.engine2_N1}</td>
                                <td>{reports.engine2_N2}</td>
                                <td>{reports.engine2_egtItt}</td>
                                <td>{reports.engine2_Oil_Press}</td>
                                <td>{reports.engine2_Oil_Temp}</td>
                                <td>{reports.engine2_NAC_Temp}</td>
                                <td>{reports.engine2_Vib_N1}</td>
                                <td>{reports.engine2_Vib_N2}</td>
                                <td>{reports.engine2_Fuel_Flow}</td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className='col-md-12'>
                    <div className='card cardbox mt-5'>
                      <div className='card-body'>
                        <h4 className='cl-white text-left mb-3'>
                          Licence File Note
                        </h4>
                        <p className='cl-white card-text text-left'>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content. Lorem ipsum,
                          dolor sit amet consectetur adipisicing elit. Sit
                          dolores nam expedita? Minima omnis nihil ea enim aut
                          sequi tempora dolor ad, sunt at magnam suscipit
                          veritatis nulla adipisci accusamus?
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
  );
};

export default memo(ReportList);