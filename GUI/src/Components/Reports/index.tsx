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

function Reports(props: any) {
  let defaultActiveReport = 'EngineCondition';
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
  const [activeReport, setActiveReport] = useState(defaultActiveReport);
  const [loader, setLoader] = useState(false);
  const reportResponse = useSelector((state: any) => state.reportReducer);
  const dispatch = useDispatch();
  let { path, url } = useRouteMatch();
  useEffect(() => {
    setLoader(reportResponse.showLoader);
  }, [reportResponse.showLoader]);

  useEffect(() => {
    return () => {
      dispatch({
        type: ReportConstants.SET_ACTIVE_REPORT,
        value: defaultActiveReport,
      });
    };
  }, []);

  useEffect(() => {
    reportResponse.activeReport.trim().length > 0
      ? setActiveReport(reportResponse.activeReport)
      : setActiveReport(defaultActiveReport);
  }, [reportResponse.activeReport]);

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
