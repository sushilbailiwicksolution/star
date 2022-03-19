import React, { useState, useEffect } from 'react';
import LeftPanel from './LeftPanel';
import ReportFilter from './ReportFilter';
import ReportList from './ReportList';
import { useDispatch, useSelector } from 'react-redux';
import { ReportConstants } from '../../Constants/constants';

function Reports(props: any) {
  const [loader, setLoader] = useState(false);
  const reportResponse = useSelector((state: any) => state.reportReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoader(reportResponse.showLoader);
  }, [reportResponse.showLoader]);

  useEffect(() => {
    return () => {
      dispatch({ type: ReportConstants.CLEAR_REPORT_RESPONSE });
    };
  }, []);

  return (
    <React.Fragment>
      <div className='loading' style={{ display: loader ? 'block' : 'none' }}>
        <img src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' />
      </div>
      <div className='container-fluid content-body vh-100'>
        <div className='row'>
          <LeftPanel />
          <ReportFilter setLoader={setLoader}></ReportFilter>
          <ReportList></ReportList>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Reports;
