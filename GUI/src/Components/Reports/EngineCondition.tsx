import { memo, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import exportFromJSON from "export-from-json";
import { GET_REPORT, GET_REPORT_ENG_CONDITION } from "../../Config/siteConfig";
import { fixDecimalService } from "../../Service/fixDecimal.service";

/**
 * This component is handling report page Engine Condition.
 * @component
 */
const EngineCondition = (props: any) => {
  /**
   * State: Holds the list of reports for Engine Condition.
   * @type {Array}
   */
  const [reportList, updateReportsList] = useState<any>([]);
  /**
   * State: Holds the pagination limit values (current page and limit per page).
   * @type {Object}
   */
  const [limitValues, updateLimitValues] = useState({
    page: 1,
    limit: 10,
  });
  
  /**
   * State: Holds the total page count for pagination.
   * @type {number}
   */
  const [pageCount, updatePageCount] = useState(3);
  const [showData, setShowData] = useState(false);
    /**
   * State: Holds the detailed report list data.
   * @type {Object}
   */
  const [reportListData, setReportListData] = useState<any>({});
    /**
   * State: Holds the selected asset ID.
   * @type {string}
   */
  const [selectedAssetId, setSelectedAssetId] = useState("");
   /**
   * Selector: Fetches the report response from the Redux store.
   */
  const reportResponse = useSelector((state: any) => state.reportReducer);

   /**
   * Handles the pagination click event.
   * @param e - The pagination click event.
   */
  const handlePageClick = (e: any) => {
    const newData = [];
    const currPage = parseInt(e.selected) + 1;
    const { limit } = limitValues;
    let start = (currPage - 1) * limit;
    let end = currPage * limit - 1;
    for (let i = start; i <= end; i++) {
      //newData.push(JSONDATA[i]);
      newData.push(reportResponse.engineConditionData.report_data_s2[i]);
    }
    updateReportsList(newData);
  };
 /**
   * Fetches the report data and updates the component state on component mount.
   */
  useEffect(() => {
    let data = reportResponse.engineConditionData;
    if (data && data.status && data.status == "200") {
      setShowData(true);
      setReportListData(data);
      setSelectedAssetId(reportResponse.selectedAssetId);
      const newData = [];
      const { page, limit } = limitValues;
      let start = (page - 1) * limit;
      let end = page * limit - 1;
      for (let i = start; i <= end; i++) {
        newData.push(reportResponse.engineConditionData.report_data_s2[i]);
      }
      updateReportsList(newData);
    }
  }, [reportResponse.engineConditionData]);

   /**
   * Handles errors in the report response and displays toast messages.
   */
  useEffect(() => {
    if (reportResponse.isError) {
      setShowData(false);
      toast(reportResponse.errorMessage.msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportResponse.isError]);

  /**
   * Downloads the report data in Excel format.
   */
  const downloadExcel = () => {
    const fileName = "EngineCondition";
    const exportType = "xls";
    exportFromJSON({
      data: reportResponse.engineConditionData.report_data_s2,
      fileName,
      exportType,
    });
  };

   /**
   * Downloads the report data in PDF format.
   */
  const downloadCsv = () => {
    const fileName = "EngineCondition";
    const exportType = "csv";
    exportFromJSON({
      data: reportResponse.engineConditionData.report_data_s2,
      fileName,
      exportType,
    });
  };

  const downloadPdf = () => {
    const reportName = "Engine Condition";
    const url = `${process.env.REACT_APP_URL}${process.env.REACT_APP_URL_OTHER_PORT_REPORT}${GET_REPORT}${GET_REPORT_ENG_CONDITION}/${reportResponse.selectedFlight}/${reportName}/pdf`;
    console.log(url , 'pdf url');
    
    window.open(url, "_blank", "noreferrer");
  };

   /**
   * Rounds the given value to up to two decimal places.
   * @param {any} value - The value to be rounded.
   * @returns {number} - The rounded value.
   */
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
              <h2 className="cl-white mr-5">Engine Condition</h2>
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
                    <button className="dropdown-item" onClick={downloadCsv}>
                      Download CSV
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
            {/* <div className="col-md-4 d-flex align-items-center justify-content-end">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-search"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Name"
                ></input>
              </div>
            </div> */}
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
                                Aircraft Type
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

                  <div className="col-md-12 table-responsive">
                    <table className="table table-striped table-dark mt-5">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">ECM Parameters</th>
                          <th scope="col">Actual Value at Take Off</th>
                          <th scope="col">Actual Value at Cruise</th>
                          <th scope="col">Units</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportListData.report_data_s2.map(
                          (reports: any, index: any) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{reports.ecmParams}</td>
                                <td>{reports.actualValue_takeoff ? upToTwoDecimal(reports.actualValue_takeoff) : 'NA'}</td>
                                <td>{reports.actualValue_Cruise ? upToTwoDecimal(reports.actualValue_Cruise) : 'NA'}</td>
                                <td>{reports.unit}</td>
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
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default memo(EngineCondition);
