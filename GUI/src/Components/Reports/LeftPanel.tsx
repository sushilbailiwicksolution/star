import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { ReportConstants } from '../../Constants/constants';

/**
 * This component is handling report page left Panel.
 * @component
 */
function LeftPanel(props: any) {
  let { path, url } = useRouteMatch();
  const [activeReport, setActiveReport] = useState('');
  const dispatch = useDispatch();

  const changeReport = (report: any) => {
    props.props.history.push(`/reports/${report}`);
    setActiveReport(report);
    dispatch({ type: ReportConstants.SET_ACTIVE_REPORT, value: report });
  };

  useEffect(() => {
    setActiveReport(props.activeReport);
  }, []);

  return (
    <React.Fragment>
      <input type='checkbox' id='toggle-sidebar' />
      <div className='col-lg-3 col-xl-2'>
        <label htmlFor='toggle-sidebar' className='toggle-btn cursor-pointer'>
          {/* <i className='fa fa-bars'></i> */}
          <i className='fa fa-cog' aria-hidden='true'></i>
        </label>
        <div className='sidebar-wrapper checked-toggle my-4'>
          <div className='d-flex justify-content-between px-3 pt-3'>
            <label>EOF Reports</label>
            {/* <div className='d-flex align-items-center'>
              <div className='rounded-plus mr-4'>
                <i className='fas fa-plus'></i>
              </div>
              <i className='fas fa-ellipsis-v fa-icon-size'></i>
            </div> */}
          </div>

          <div className='list-wrapper user-list mt-4'>
            <ul>
              <li
                className={`px-3 ${
                  activeReport == 'EngineCondition' ? 'active' : ''
                }`}
                onClick={() => {
                  changeReport('EngineCondition');
                }}
              >
                <div className='ml-2'>
                  <label className='m-0'>Engine Condition</label>
                </div>
              </li>
              <li
                className={`px-3 ${
                  activeReport == 'EngineeringAndMaintainance' ? 'active' : ''
                }`}
                onClick={() => {
                  changeReport('EngineeringAndMaintainance');
                }}
              >
                <div className='ml-2'>
                  <label className='m-0'>Engineering and Maintanance</label>
                </div>
              </li>
              <li
                className={`px-3 ${
                  activeReport == 'FinanceAndAdmin' ? 'active' : ''
                }`}
                onClick={() => {
                  changeReport('FinanceAndAdmin');
                }}
              >
                <div className='ml-2'>
                  <label className='m-0'>Finance and admin</label>
                </div>
              </li>
              <li
                className={`px-3 ${
                  activeReport == 'FlightOperations' ? 'active' : ''
                }`}
                onClick={() => {
                  changeReport('FlightOperations');
                }}
              >
                <div className='ml-2'>
                  <label className='m-0'>Flight Operations</label>
                </div>
              </li>
              <li
                className={`px-3 ${
                  activeReport == 'FlightSafety' ? 'active' : ''
                }`}
                onClick={() => {
                  changeReport('FlightSafety');
                }}
              >
                <div className='ml-2'>
                  <label className='m-0'>Flight Safety</label>
                </div>
              </li>
              <li
                className={`px-3 ${
                  activeReport == 'FlightMOQA' ? 'active' : ''
                }`}
                onClick={() => {
                  changeReport('FlightMOQA');
                }}
              >
                <div className='ml-2'>
                  <label className='m-0'>MOQA</label>
                </div>
              </li>
              <li
                className={`px-3 ${
                  activeReport == 'FlightFOQA' ? 'active' : ''
                }`}
                onClick={() => {
                  changeReport('FlightFOQA');
                }}
              >
                <div className='ml-2'>
                  <label className='m-0'>FOQA</label>
                </div>
              </li>
              {/* <li
                className={`px-3 ${
                  activeReport == 'FlightOOOI' ? 'active' : ''
                }`}
                onClick={() => {
                  changeReport('FlightOOOI');
                }}
              >
                <div className='ml-2'>
                  <label className='m-0'>OOOI</label>
                </div>
              </li> */}
              {/* <li
                className={`px-3 ${
                  activeReport == 'ScheduleList' ? 'active' : ''
                }`}
                onClick={() => {
                  changeReport('ScheduleList');
                }}
              >
                <div className='ml-2'>
                  <label className='m-0'>Schedule List</label>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LeftPanel;
