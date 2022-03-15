import moment from 'moment';
import { memo, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import { reportActions } from '../../action/report.action';
import { getAirCraft } from '../../Service';

const ReportFilter = (props: any) => {
  const [showFilter, updateShowFilter] = useState(true);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [todayDate, setTodayDate] = useState(new Date());
  const [flights, setFlights] = useState([]);
  const [airCraftsIds, setAirCraftdIds] = useState([
    161, 162, 163, 164, 165, 166, 167, 168,
  ]);
  const [flightby, setFlightBy] = useState(['By Date', 'Last 20 trips']);
  const [slectedFlightBy, setSlectedFlightBy] = useState('');
  const [selectedAicraftId, changeSelectedAircraftId] = useState(166);
  const [selectedFlight, setSelectedFlight] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, [startDate, endDate]);

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
        setSelectedFlight('');
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

  const showReportData = () => {
    if (selectedFlight.length < 1) {
      return;
    }

    dispatch(reportActions.getReport(selectedFlight));

    try {
      document.getElementById('filter_lane')?.classList.add('my-class');
      updateShowFilter(false);
    } catch (err) {}
  };

  return (
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

          <div className='col-md-12'>
            <div className='select-dropdown'>
              <select
                className='form-control'
                id='select4'
                onChange={(e: any) => {
                  console.log(e.target.value);
                  setSlectedFlightBy(e.target.value);
                }}
                value={slectedFlightBy}
              >
                <option>Select Flight By</option>
                {flightby.map((flightbyValue) => {
                  return (
                    <option value={flightbyValue} key={flightbyValue}>
                      {flightbyValue}
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
                value={selectedFlight}
              >
                <option value=''>Flights</option>
                {flights.map(({ aircraftid }) => {
                  return (
                    <option value={aircraftid} key={aircraftid}>
                      {aircraftid}
                    </option>
                  );
                })}
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
              <button type='button' className='cl-btn cl-btn-outline'>
                Distribution List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ReportFilter);