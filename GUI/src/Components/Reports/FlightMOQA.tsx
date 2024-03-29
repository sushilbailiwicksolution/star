import { memo, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import exportFromJSON from "export-from-json";
import { GET_REPORT, GET_REPORT_FLIGHT_MOQA } from "../../Config/siteConfig";
import { fixDecimalService } from "../../Service/fixDecimal.service";

/**
 * This component is handling report page MOQA.
 * @component
 */
const FlightMOQA = (props: any) => {
  const [reportList, updateReportsList] = useState<any>([]);
  const [limitValues, updateLimitValues] = useState({
    page: 1,
    limit: 10,
  });
  const [pageCount, updatePageCount] = useState(3);
  const [showData, setShowData] = useState(false);
  const [reportListData, setReportListData] = useState<any>({});
  const [selectedAssetId, setSelectedAssetId] = useState("");
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
      newData.push(reportResponse.moqaData.report_data_s2_moqa_1[i]);
    }
    updateReportsList(newData);
  };

  useEffect(() => {
    let data = reportResponse.moqaData;
    if (data && data.status && data.status == "200") {
      setShowData(true);
      setReportListData(data);
      setSelectedAssetId(reportResponse.selectedAssetId);
      const newData = [];
      const { page, limit } = limitValues;
      let start = (page - 1) * limit;
      let end = page * limit - 1;
      for (let i = start; i <= end; i++) {
        newData.push(reportResponse.moqaData.report_data_s2_moqa_1[i]);
      }
      updateReportsList(newData);
    }
  }, [reportResponse.moqaData]);

  useEffect(() => {
    console.log("reportResponse.isError", reportResponse.isError);
    console.log("reportResponse.errorMessage.msg", reportResponse.errorMessage);
    if (reportResponse.isError) {
      setShowData(false);
      toast(reportResponse.errorMessage.msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportResponse.isError]);

  const downloadExcel = () => {
    const fileName = "MOQA";
    const exportType = "xls";
    exportFromJSON({
      data: reportResponse.moqaData.report_data_s2_moqa_1,
      fileName,
      exportType,
    });
  };

  const downloadCsv = () => {
    const fileName = "MOQA";
    const exportType = "csv";
    exportFromJSON({
      data: reportResponse.moqaData.report_data_s2_moqa_1,
      fileName,
      exportType,
    });
  };

  const downloadPdf = () => {
    const reportName = "MOQA";
    const url = `${process.env.REACT_APP_URL}${process.env.REACT_APP_URL_OTHER_PORT_REPORT}${GET_REPORT}${GET_REPORT_FLIGHT_MOQA}/${reportResponse.selectedFlight}/${reportName}/pdf`;
    window.open(url, "_blank", "noreferrer");
  };

  const upToTwoDecimal = (value: any) => {
    return fixDecimalService.upToTwoDecimal(value);
  };

  const formatDate = (inputDate:any) => {
    const date = new Date(inputDate);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div className="col-lg-9 col-xl-10 my-4 report-list">
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-8 d-flex align-items-center justify-content-between">
              <h2 className="cl-white mr-5">Flight MOQA</h2>
              {showData === true ? (
                // <div className="dropdown text-right custom-d-dropdown">
                //   <button
                //     className="custom-toast-menu dropdown-toggle"
                //     type="button"
                //     id="dropdownMenuButton"
                //     data-toggle="dropdown"
                //     aria-haspopup="true"
                //     aria-expanded="false"
                //   >
                //     <i className="fas fa-ellipsis-v user-icon"></i>
                //   </button>
                //   <div
                //     className="dropdown-menu"
                //     aria-labelledby="dropdownMenuButton"
                //     x-placement="bottom-start"
                //   >
                //     <button className="dropdown-item" onClick={downloadExcel}>
                //       Download Excel
                //     </button>
                //     <button className="dropdown-item" onClick={downloadPdf}>
                //       Download Pdf
                //     </button>
                //     {/* <button className="dropdown-item">Download Csv</button>
                //     <button className="dropdown-item">Email</button> */}
                //   </div>
                // </div>

                <div className="dropdown custom-d-dropdown">
                  <button
                    className="custom-toast-menu dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <button className="dropdown-item" onClick={downloadExcel}>
                      Download Excel
                    </button>
                    <button className="dropdown-item" onClick={downloadPdf}>
                      Download Pdf
                    </button>
                  </div>
                  <button
                    className="btn btn-outline-secondary ml-2"
                    onClick={downloadExcel}
                  >
                    Download Excel
                  </button>
                  <button
                    className="btn btn-outline-secondary ml-2"
                    onClick={downloadCsv}
                  >
                    Download CSV
                  </button>
                  <button
                    className="btn btn-outline-secondary ml-2"
                    onClick={downloadPdf}
                  >
                    Download Pdf
                  </button>
                </div>
              ) : null}
            </div>
            {/*  */}
          </div>

          {showData === true ? (
            <div className="row mt-5">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12">
                    <div className="colored-heading">
                      <h3 className="cl-white text-left m-0 p-4">
                        Aircraft and Flight Id
                      </h3>
                    </div>
                    <div className="light-card-bg p-4">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="row mb-2">
                            <div className="col-md-4 d-flex justify-content-between">
                              <p className="m-0 cl-white text-left">
                                {" "}
                                Reg. No.
                              </p>
                              <span className="cl-white">:</span>
                            </div>
                            <div className="col-md-8">
                              <p className="m-0 cl-white text-left">
                                {reportListData.report_data_s1.reg_no}
                                {/* {selectedAssetId} */}
                              </p>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-4 d-flex justify-content-between">
                              <p className="m-0 cl-white text-left">
                                Aircraft Reg. No.
                              </p>
                              <span className="cl-white">:</span>
                            </div>
                            <div className="col-md-8">
                              <p className="m-0 cl-white text-left">
                                {reportListData.report_data_s1.aircraft_reg_no}
                                {/* {selectedAssetId} */}
                              </p>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-4 d-flex justify-content-between">
                              <p className="m-0 cl-white text-left">Origin</p>
                              <span className="cl-white">:</span>
                            </div>
                            <div className="col-md-8">
                              <p className="m-0 cl-white text-left">
                                {reportListData.report_data_s1.origin}
                              </p>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-4 d-flex justify-content-between">
                              <p className="m-0 cl-white text-left">
                                Taxi Out Time
                              </p>
                              <span className="cl-white">:</span>
                            </div>
                            <div className="col-md-8">
                              <p className="m-0 cl-white text-left">
                                {reportListData.report_data_s1.taxi_out_time}
                              </p>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-4 d-flex justify-content-between">
                              <p className="m-0 cl-white text-left">
                                Taxi Off Time
                              </p>
                              <span className="cl-white">:</span>
                            </div>
                            <div className="col-md-8">
                              <p className="m-0 cl-white text-left">
                                {reportListData.report_data_s1.taxi_off_time}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="row mb-2">
                            <div className="col-md-4 d-flex justify-content-between">
                              <p className="m-0 cl-white text-left">Date</p>
                              <span className="cl-white">:</span>
                            </div>
                            <div className="col-md-8">
                              <p className="m-0 cl-white text-left">
                                {formatDate(reportListData.report_data_s1.Date)}
                              </p>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-4 d-flex justify-content-between">
                              <p className="m-0 cl-white text-left">
                                Flight ID / Call Sign:
                              </p>
                              <span className="cl-white">:</span>
                            </div>
                            <div className="col-md-8">
                              <p className="m-0 cl-white text-left">
                                {reportListData.report_data_s1.flightId}
                              </p>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-4 d-flex justify-content-between">
                              <p className="m-0 cl-white text-left">
                                Destination
                              </p>
                              <span className="cl-white">:</span>
                            </div>
                            <div className="col-md-8">
                              <p className="m-0 cl-white text-left">
                                {reportListData.report_data_s1.destination}
                              </p>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-4 d-flex justify-content-between">
                              <p className="m-0 cl-white text-left">
                                Gate In Time
                              </p>
                              <span className="cl-white">:</span>
                            </div>
                            <div className="col-md-8">
                              <p className="m-0 cl-white text-left">
                                {reportListData.report_data_s1.gate_in_time}
                              </p>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-4 d-flex justify-content-between">
                              <p className="m-0 cl-white text-left">
                                Landing Time
                              </p>
                              <span className="cl-white">:</span>
                            </div>
                            <div className="col-md-8">
                              <p className="m-0 cl-white text-left">
                                {reportListData.report_data_s1.landing_Time}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 table-responsive mt-5">
                    <div className="color-white">
                      <h2>GENERAL MOQA IF INDIVIDUAL PARAMETERS EXCEEDS</h2>
                    </div>
                    <table className="table table-striped table-dark table-word-wrap">
                      <thead>
                        <tr>
                          <th className="col-4" scope="col">
                            Parameters
                          </th>
                          <th className="col-4" scope="col">
                            Exceedence - Yes/No
                          </th>
                          <th className="col-4" scope="col">
                            Value Exceeded
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportListData.report_moqa_s2.map(
                          (reports: any, index: any) => {
                            return (
                              <tr key={index}>
                                <td>{reports.event_name}</td>
                                {/* <td>{reports.actualValue_takeoff}</td> */}
                                <td>{reports.exceedance||'NA'}</td>
                                <td>{reports.value}</td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                    <div
                      className="pagingnation text-right"
                      style={{ display: "none" }}
                    >
                      <div className="pagingnation-list">
                        <ReactPaginate
                          breakLabel="..."
                          nextLabel=" >"
                          onPageChange={handlePageClick}
                          pageRangeDisplayed={5}
                          pageCount={pageCount}
                          previousLabel="< "
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 table-responsive mt-5">
                    <div className="color-white">
                      <h2>Taxi-Out</h2>
                    </div>
                    <table className="table table-striped table-dark table-word-wrap">
                      <thead>
                        <tr>
                          <th className="col-4" scope="col">
                            Parameters
                          </th>
                          <th className="col-4" scope="col">
                            Exceedence - Yes/No
                          </th>
                          <th className="col-4" scope="col">
                            Value Exceeded
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportListData.report_data_s2_moqa_2.map(
                          (reports: any, index: any) => {
                            return (
                              <tr key={index}>
                                <td>{reports.label}</td>
                                {/* <td>{reports.actualValue_takeoff}</td> */}
                                <td>{reports.param_value}</td>
                                <td>{reports.unit}</td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-12 table-responsive mt-5">
                    <div className="color-white">
                      <h2>Take Off</h2>
                    </div>
                    <table className="table table-striped table-dark table-word-wrap">
                      <thead>
                        <tr>
                          <th className="col-4" scope="col">
                            Parameters
                          </th>
                          <th className="col-4" scope="col">
                            Exceedence - Yes/No
                          </th>
                          <th className="col-4" scope="col">
                            Value Exceeded
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportListData.report_data_s2_moqa_3.map(
                          (reports: any, index: any) => {
                            return (
                              <tr key={index}>
                                <td>{reports.label}</td>
                                {/* <td>{reports.actualValue_takeoff}</td> */}
                                <td>{reports.param_value}</td>
                                <td>{reports.unit}</td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-12 table-responsive mt-5">
                    <div className="color-white">
                      <h2>Climb</h2>
                    </div>
                    <table className="table table-striped table-dark table-word-wrap">
                      <thead>
                        <tr>
                          <th className="col-4" scope="col">
                            Parameters
                          </th>
                          <th className="col-4" scope="col">
                            Exceedence - Yes/No
                          </th>
                          <th className="col-4" scope="col">
                            Value Exceeded
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportListData.report_data_s2_moqa_4.map(
                          (reports: any, index: any) => {
                            return (
                              <tr key={index}>
                                <td>{reports.label}</td>
                                {/* <td>{reports.actualValue_takeoff}</td> */}
                                <td>{reports.param_value}</td>
                                <td>{reports.unit}</td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-12 table-responsive mt-5">
                    <div className="color-white">
                      <h2>Cruise</h2>
                    </div>
                    <table className="table table-striped table-dark table-word-wrap">
                      <thead>
                        <tr>
                          <th className="col-4" scope="col">
                            Parameters
                          </th>
                          <th className="col-4" scope="col">
                            Exceedence - Yes/No
                          </th>
                          <th className="col-4" scope="col">
                            Value Exceeded
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportListData.report_data_s2_moqa_5.map(
                          (reports: any, index: any) => {
                            return (
                              <tr key={index}>
                                <td>{reports.label}</td>
                                {/* <td>{reports.actualValue_takeoff}</td> */}
                                <td>{reports.param_value}</td>
                                <td>{reports.unit}</td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-12 table-responsive mt-5">
                    <div className="color-white">
                      <h2>Descent</h2>
                    </div>
                    <table className="table table-striped table-dark table-word-wrap">
                      <thead>
                        <tr>
                          <th className="col-4" scope="col">
                            Parameters
                          </th>
                          <th className="col-4" scope="col">
                            Exceedence - Yes/No
                          </th>
                          <th className="col-4" scope="col">
                            Value Exceeded
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportListData.report_data_s2_moqa_6.map(
                          (reports: any, index: any) => {
                            return (
                              <tr key={index}>
                                <td>{reports.label}</td>
                                {/* <td>{reports.actualValue_takeoff}</td> */}
                                <td>{reports.param_value}</td>
                                <td>{reports.unit}</td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-12 table-responsive mt-5">
                    <div className="color-white">
                      <h2>Approach,Go-around & Landing</h2>
                    </div>
                    <table className="table table-striped table-dark table-word-wrap">
                      <thead>
                        <tr>
                          <th className="col-4" scope="col">
                            Parameters
                          </th>
                          <th className="col-4" scope="col">
                            Exceedence - Yes/No
                          </th>
                          <th className="col-4" scope="col">
                            Value Exceeded
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportListData.report_data_s2_moqa_7.map(
                          (reports: any, index: any) => {
                            return (
                              <tr key={index}>
                                <td>{reports.label}</td>
                                {/* <td>{reports.actualValue_takeoff}</td> */}
                                <td>{reports.param_value}</td>
                                <td>{reports.unit}</td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-12 table-responsive mt-5">
                    <div className="color-white">
                      <h2>Taxi-In</h2>
                    </div>
                    <table className="table table-striped table-dark table-word-wrap">
                      <thead>
                        <tr>
                          <th className="col-4" scope="col">
                            Parameters
                          </th>
                          <th className="col-4" scope="col">
                            Exceedence - Yes/No
                          </th>
                          <th className="col-4" scope="col">
                            Value Exceeded
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportListData.report_data_s2_moqa_8.map(
                          (reports: any, index: any) => {
                            return (
                              <tr key={index}>
                                <td>{reports.label}</td>
                                {/* <td>{reports.actualValue_takeoff}</td> */}
                                <td>{reports.param_value}</td>
                                <td>{reports.unit}</td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
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

export default memo(FlightMOQA);
