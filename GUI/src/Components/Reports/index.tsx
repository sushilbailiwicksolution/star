import React, { useState, useEffect } from 'react';
import LeftPanel from './LeftPanel';
import ReportFilter from './ReportFilter';
import { useDispatch, useSelector } from 'react-redux';
import { ReportConstants } from '../../Constants/constants';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import EngineCondition from './EngineCondition';
import EngineeringAndMaintainance from './EngineeringAndMaintainance';
import { reportActions } from '../../action/report.action';
import FinanceAndAdmin from './FinanceAndAdmin';
import FlightOperations from './FlightOperations';
import FlightSafety from './FlightSafety';
import FlightMOQA from './FlightMOQA';
import FlightFOQA from './FlightFOQA';

/**
 * This component is handling report page .
 * @component
 */
function Reports(props: any) {
  let defaultActiveReport = 'EngineCondition';
   /**
   * Constant: Defines the available report names.
   * @type {Object}
   */
  const reports = {
    engCondition: 'EngineCondition',
    engAndMaintainance: 'EngineeringAndMaintainance',
    financeAndAdmin: 'FinanceAndAdmin',
    flightOperations: 'FlightOperations',
    flightSafety: 'FlightSafety',
    MOQA: 'FlightMOQA',
    FOQA: 'FlightFOQA',
    OOOI: 'FlightOOOI',
    ScheduleList: 'ScheduleList',
  };
  /**
   * State: Holds the active report name.
   * @type {string}
   */
  const [activeReport, setActiveReport] = useState(defaultActiveReport);
  /**
   * State: Indicates whether the loader should be shown or not.
   * @type {boolean}
   */
  const [loader, setLoader] = useState(false);
   /**
   * Selector: Fetches the report response from the Redux store.
   */
  const reportResponse = useSelector((state: any) => state.reportReducer);
  /**
   * Dispatch: Used to dispatch actions to the Redux store.
   */
  const dispatch = useDispatch();
   /**
   * Router: Retrieves the current route information.
   */
  let { path, url } = useRouteMatch();
   /**
   * Effect: Sets the loader state based on the report response.
   */
  useEffect(() => {
    setLoader(reportResponse.showLoader);
  }, [reportResponse.showLoader]);

  /**
   * Effect: Resets the active report on component unmount.
   */
  useEffect(() => {
    return () => {
      dispatch({
        type: ReportConstants.SET_ACTIVE_REPORT,
        value: defaultActiveReport,
      });
    };
  }, []);

  
  /**
   * Effect: Sets the active report based on the report response.
   */
  useEffect(() => {
    reportResponse.activeReport.trim().length > 0
      ? setActiveReport(reportResponse.activeReport)
      : setActiveReport(defaultActiveReport);
  }, [reportResponse.activeReport]);

   /**
   * Fetches the reports based on the active report and flight ID.
   * @param {any} flightId - The flight ID.
   */
  const getReports = (flightId: any) => {
    if (activeReport == reports.engAndMaintainance) {
      dispatch(reportActions.getReportEngineMaintainance(flightId));
    }
    if (activeReport == reports.engCondition) {
      dispatch(reportActions.getReportEngineCondition(flightId));
    }
    if (activeReport == reports.financeAndAdmin) {
      dispatch(reportActions.getReportFinanceAndAdmin(flightId));
    }
    if (activeReport == reports.flightOperations) {
      dispatch(reportActions.getReportFlightOperation(flightId));
    }
    if (activeReport == reports.flightSafety) {
      dispatch(reportActions.getReportFlightSafety(flightId));
    }
    if (activeReport == reports.MOQA) {
      dispatch(reportActions.getReportFlightMOQA(flightId));
    }
    if (activeReport == reports.FOQA) {
      dispatch(reportActions.getReportFlightFOQA(flightId));
    }
  };

  return (
    <React.Fragment>
      <div className='loading' style={{ display: loader ? 'block' : 'none' }}>
        <img src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' />
      </div>
      <div className='container-fluid content-body vh-100'>
        <div className='row h-100vh-80px'>
          <LeftPanel props={props} url={url} activeReport={activeReport} />
          <ReportFilter
            setLoader={setLoader}
            getReports={getReports}
            activeReport={reportResponse.activeReport.length > 1 ? reportResponse.activeReport : defaultActiveReport}
          ></ReportFilter>
          <Switch>
            <Route exact path={path}>
              <EngineCondition />
            </Route>
            <Route exact path={`${path}/${reports.engCondition}`}>
              <EngineCondition />
            </Route>
            <Route exact path={`${path}/${reports.engAndMaintainance}`}>
              <EngineeringAndMaintainance />
            </Route>
            <Route exact path={`${path}/${reports.financeAndAdmin}`}>
              <FinanceAndAdmin />
            </Route>
            <Route exact path={`${path}/${reports.flightOperations}`}>
              <FlightOperations />
            </Route>
            <Route exact path={`${path}/${reports.flightSafety}`}>
              <FlightSafety />
            </Route>
            <Route exact path={`${path}/${reports.MOQA}`}>
              <FlightMOQA />
            </Route>
            <Route exact path={`${path}/${reports.FOQA}`}>
              <FlightFOQA />
            </Route>
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Reports;
