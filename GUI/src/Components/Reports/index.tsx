import React, { useState, useEffect } from 'react';
import LeftPanel from './LeftPanel';
import JSONDATA from '../../store/reports.json';
// import Pagination from "react-js-pagination";
import ReactPaginate from 'react-paginate';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { getAirCraft } from '../../Service';
import ReportFilter from './ReportFilter';
import ReportList from './ReportList';
import { useDispatch, useSelector } from 'react-redux';

function Reports(props: any) {
  const [loader, setLoader] = useState(false);
  const reportResponse = useSelector((state: any) => state.reportReducer);

  useEffect(() => {
    setLoader(reportResponse.showLoader);
  }, [reportResponse.showLoader]);

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
