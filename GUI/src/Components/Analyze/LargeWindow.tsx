import React, { useState } from "react";
import Select from 'react-select';
import { memo, useEffect } from "react";
import * as d3Graph from "d3";
import {
  LineChart,
  Label,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";
import { viewService } from "../../Service/view.service";
import { getAirCraftDetails, getAirCraftDetailsForGraoh } from "../../Service";
import { ToastContainer, toast } from "react-toastify";

// const d3: any = d3Graph;
// console.log("d3", d3);

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { [key: string]: any } }>;
  label?: string | number;
}

const CustomTooltip: React.FC<CustomTooltipProps & { selected_X_Axis: any; selected_Y_Axis: any }> = ({ active, payload, label, selected_X_Axis, selected_Y_Axis }) => {
  if (active && payload) {
    const flightData = payload[0]?.payload; 
    const flightId = flightData?.flightid;
  //  console.log('Flight data', flightData);

   const tooltipStyle = {
    backgroundColor: 'white',
    color:'black',
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };
   
    return (
      <div className="custom-tooltip" style={tooltipStyle}>
        <p>{`Flight: ${flightId}`}</p>
        <p>{`${selected_X_Axis.label || 'Date Time'}: ${label}`}</p>
        <p>{`${selected_Y_Axis.label || 'Speed(KTS)'}: ${flightData[selected_Y_Axis.key || 'speed']}`}</p>
      </div>
    );
  }

  return null;
};


/**
 * Interface for the data structure of each test object.
 * @interface TestObject
 */
interface test {
  flightid: string;
  packet_type: string;
  date_time: string;
  aircraftid: string;
  eventid: string;
  gps_lat: string;
  gps_long: string;
  altitude: string;
  speed: string;
  heading: string;
}

/**
 * Default axis configuration object.
 * @const {Object}
 * @property {null} label - The label for the axis.
 * @property {string} key - The key for the axis.
 */

const defaultAxis = { label: "", key: "" };

/**
 * This component handles the large window section, which is used to show a graph.
 * @component
 * @param {Object} props - The props object containing the data, flightsList, and selectedFlightValue.
 * @param {TestObject[]} props.data - The data for the graph.
 * @param {Object[]} props.flightsList - The list of flights.
 * @param {string} props.selectedFlightValue - The selected flight value.
 */



const LargeWindow = (props: any) => {
  const { data, flightsList, selectedFlightValue } = props;
  const [graphDropdown, setGraphDropdown] = useState([]);
  const [selected_X_Axis, setSelected_X_Axis] = useState(defaultAxis);
  const [selected_Y_Axis, setSelected_Y_Axis] = useState(defaultAxis);
  const [selectedFlight, setSelectedFlight] = useState<string[]>([]); 

  // const [airCraftjson, setAirCraftJson] = useState([]);
  const [airCraftjson, setAirCraftJson] = useState<test[]>([]); 

  const [loader, setLoader] = useState(false);
  const xAxisOption=[{id:1,label:"Date Time", key:"date_time"},{id:2,label:"Sample No.",key:"count"}];
  useEffect(() => {
    onInit();
  }, []);

  useEffect(() => {
    // console.log("selectedFlightValue", selectedFlightValue);
    setSelectedFlight([selectedFlightValue]);
  }, [selectedFlightValue]);

  /**
   * Function to initialize the component on load.
   */
  const onInit = async () => {
    await getAssetsList();
  };
  /**
   * Function to fetch the list of assets for the graph dropdown.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the graph dropdown data is fetched successfully, otherwise `false`.
   */
  const getAssetsList = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await viewService.getGraphDropdown();
        if (userData.length > 0) {
          setGraphDropdown(userData);
        } else {
          setGraphDropdown([]);
        }
        resolve(true);
      } catch (error: any) {
        resolve(true);
        console.error(error);
      }
    });
  };

  /**
   * Function to fetch flight data based on the selected flight and graph axes.
   */

  const getFlightData = async () => {
    try {
      
        if (!selected_X_Axis.key || !selected_Y_Axis.key) {
          toast.error("Please select both X-axis and Y-axis");
          return;
        }
      if (selectedFlight.length>0) {
        setLoader(true);
        const promises = selectedFlight.map(async flight => {
          return await getAirCraftDetailsForGraoh(flight, selected_X_Axis.key, selected_Y_Axis.key);
        });
        const responses = await Promise.all(promises);
        setLoader(false);
        const combinedData = responses.reduce((acc, response) => {
          if (response && response.flightData) {
            acc = acc.concat(response.flightData);
          }
          return acc;
        }, []);
        //console.log("Flights For chart", selectedFlight);
        //console.log("Flights Data", combinedData);
        
        
        setAirCraftJson(combinedData);
      } else {
        setLoader(false);
        setAirCraftJson([]);
      }
    } catch (err) {
      setLoader(false);
      setAirCraftJson([]);
    }
  };
  
  useEffect(() => {
    setAirCraftJson(data);
  }, [data]);

  /**
   * Function to render the line chart based on the selected graph axes.
   * @returns {JSX.Element|null} The line chart component or `null` if there is no data.
   */
  const lineChart = () => {
    if (airCraftjson.length == 0) return;

 
    const xAxisKey = selected_X_Axis.key || 'date_time';
  const yAxisKey = selected_Y_Axis.key || 'speed';
  const xAxisLabel = selected_X_Axis.label || 'Date Time';
  const yAxisLabel = selected_Y_Axis.label || 'Speed(KTS)';

  const xMin = Math.min(...airCraftjson.map((data: any) => parseInt(data[selected_X_Axis.key])));
  const xMax = Math.max(...airCraftjson.map((data: any) => parseInt(data[selected_X_Axis.key])));

  let yMin = Math.min(...airCraftjson.map((data: any) => parseInt(data[selected_Y_Axis.key])));
  let yMax = Math.max(...airCraftjson.map((data: any) => parseInt(data[selected_Y_Axis.key])));

   if(yAxisKey=='speed'){
    yMin=0;
    yMax=700
   }
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
   
    
    const renderChart = () => {
      if (xAxisKey === 'date_time') {
        return (
          <ResponsiveContainer width="90%" height={550} >
            <LineChart data={airCraftjson} margin={{ top: 5, right: 30, left: 50, bottom: 25 }}>
              <XAxis dataKey={xAxisKey} type="category"  label={{ value: xAxisLabel, position: 'bottom' }} />
              <YAxis dataKey={yAxisKey} type="number" domain={[yMin, yMax]} label={{ value: yAxisLabel, angle: -90, position: 'left' }} />
              {/* <Tooltip /> */}
              <Tooltip content={<CustomTooltip selected_X_Axis={selected_X_Axis} selected_Y_Axis={selected_Y_Axis} />} />

              <Legend verticalAlign="top" height={36} />
           

              {selectedFlight.map((flight, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={yAxisKey}
                  data={airCraftjson.filter((data: any) => data.flightid === flight)}
                  stroke={getRandomColor()}
                  name={flight}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
      }
  
   
    return (
      <ResponsiveContainer width="90%" height={550}>
      <LineChart data={airCraftjson} margin={{ top: 5, right: 30, left: 50, bottom: 25 }}>
        <XAxis
          dataKey={xAxisKey}
          label={{ value: xAxisLabel, position: "bottom" }}
          domain={[xMin, xMax]}
          type="number"
        />
        <YAxis
          dataKey={yAxisKey}
          type="number"
          domain={[yMin, yMax]}
          label={{ value: yAxisLabel, angle: -90, position: "left" }}
        />
        {/* <Tooltip /> */}
        <Tooltip content={<CustomTooltip selected_X_Axis={selected_X_Axis} selected_Y_Axis={selected_Y_Axis} />} />

        <Legend verticalAlign="top" height={36} />

        {selectedFlight.map((flight, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={yAxisKey}
            data={airCraftjson.filter((data: any) => data.flightid === flight)}
            stroke={getRandomColor()}
            name={flight}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
    );
  };
  return renderChart();
}



  /**
   * Function to change the selected X-axis for the graph.
   * @param {string} value - The value of the selected X-axis.
   */
  const change_X_Axis = (value: string) => {
    const obj = xAxisOption.find((item: any) => item.label === value);
    if (obj) setSelected_X_Axis(obj);
  };

  /**
   * Function to change the selected Y-axis for the graph.
   * @param {string} value - The value of the selected Y-axis.
   */
  const change_Y_Axis = (value: string) => {
    const obj = graphDropdown.find((item: any) => item.label === value);
    if (obj) setSelected_Y_Axis(obj);
  };

  
  /**
   * Function to render the filters section of the large window.
   * @returns {JSX.Element} The filters section JSX.
   */
  const filters = () => {
    return (
      
      <div className="row filterContainer">
        <div className="col-md-12" >
          
          <div className="light-card-bg p-4">
            <div className="row">
              <div className="col-md-4">
                <div className="row mb-2">
                  <div className="col-md-4 d-flex justify-content-between">
                    <p className="m-0 cl-white text-left">X-Axis :</p>
                    <span className="cl-white"></span>
                  </div>
                  <div className="col-md-8">
                    <p className="m-0 cl-white text-left event-style">
                      <div className="select-dropdown">
                        <select
                          className="form-control"
                          onChange={(e: any) => {
                            change_X_Axis(e.target.value);
                          }}
                          value={
                            selected_X_Axis.label ? selected_X_Axis.label : ""
                          }
                        >
                          <option value={""}>Select X-axis</option>
                          {xAxisOption.map((item: any) => {
                            return (
                              <option key={item.key} value={item.label}>
                                {item.label}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row mb-2">
                  <div className="col-md-4 d-flex justify-content-between">
                    <p className="m-0 cl-white text-left">Y-Axis :</p>
                    <span className="cl-white"></span>
                  </div>
                  <div className="col-md-8">
                    <p className="m-0 cl-white text-left event-style">
                      <div className="select-dropdown">
                        <select
                          className="form-control"
                          onChange={(e: any) => {
                            change_Y_Axis(e.target.value);
                          }}
                          value={
                            selected_Y_Axis.label ? selected_Y_Axis.label : ""
                          }
                        >
                          <option value={""}>Select Y-axis</option>
                          {graphDropdown.map((item: any) => {
                            return (
                              <option key={item.key} value={item.label}>
                                {item.label}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row mb-2">
                  <div className="col-md-4 d-flex justify-content-between">
                    <p className="m-0 cl-white text-left">Flights :</p>
                    <span className="cl-white"></span>
                  </div>
                  <div className="col-md-8">
                    <p className="m-0 cl-white text-left event-style">
                      <div className="select-dropdown">


<Select
          isMulti
          options={flightsList.map((item:any) => ({ value: item.aircraftid, label: item.aircraftid }))}
          onChange={selectedOptions => {
            const selectedFlights = selectedOptions ? selectedOptions.map(option => option.value) : [];
            setSelectedFlight(selectedFlights);
          }}
          value={selectedFlight.map((flight:any) => ({ value: flight, label: flight }))}
          styles={{
            option: (provided) => ({
              ...provided,
              color: 'black', 
            }),
          }}
        />
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="button-block d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-primary pl-5 pr-5"
                    onClick={getFlightData}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
    <ToastContainer style={{top:"8rem"}}/>
      <div className="loading" style={{ display: loader ? "block" : "none" }}>
        <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />
      </div>
      <div className="largeScreenContainer">
        {filters()}
        <div className="mt-1 ml-1">{lineChart()}</div>
      </div>

      
    </>
  );
};

export default LargeWindow;
