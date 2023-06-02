import React, { useState } from "react";
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

const d3: any = d3Graph;
console.log("d3", d3);

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

const defaultAxis = { label: null, key: "" };

const LargeWindow = (props: any) => {
  const { data, flightsList, selectedFlightValue } = props;
  const [graphDropdown, setGraphDropdown] = useState([]);
  const [selected_X_Axis, setSelected_X_Axis] = useState(defaultAxis);
  const [selected_Y_Axis, setSelected_Y_Axis] = useState(defaultAxis);
  const [selectedFlight, setSelectedFlight] = useState("");
  const [airCraftjson, setAirCraftJson] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    onInit();
  }, []);

  useEffect(() => {
    console.log("selectedFlightValue", selectedFlightValue);
    setSelectedFlight(selectedFlightValue);
  }, [selectedFlightValue]);

  const onInit = async () => {
    await getAssetsList();
  };
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

  const getFlightData = async () => {
    try {
      if (selectedFlight) {
        setLoader(true);
        // const airCraftDetails = await getAirCraftDetails(selectedFlight);
        console.log(selected_X_Axis, 'ye hai selected x-axis');
        
        const airCraftDetails = await getAirCraftDetailsForGraoh(selectedFlight, selected_X_Axis.key , selected_Y_Axis.key)
        setLoader(false);
        if (airCraftDetails && !airCraftDetails.status) {
          let airCrafts = [] as any;
          if (airCraftDetails.flightData) {
            airCrafts = airCraftDetails.flightData;
          } else {
            airCrafts = [];
          }
          setAirCraftJson(airCrafts);
        } else {
          setAirCraftJson([]);
        }
      }
    } catch (err) {
      setLoader(false);
      setAirCraftJson([]);
    }
  };

  useEffect(() => {
    setAirCraftJson(data);
  }, [data]);

  const lineChart = () => {
    if (airCraftjson.length == 0) return;

    let xAxisKey = "";
    let xAxisLabel = "";
    let yAxisKey = "";
    let yAxisLabel = "";

    if (selected_X_Axis.label && selected_Y_Axis.label) {
      xAxisKey = selected_X_Axis.key;
      xAxisLabel = selected_X_Axis.label;
      yAxisKey = selected_Y_Axis.key;
      yAxisLabel = selected_Y_Axis.label;
    } else {
      xAxisKey = "heading";
      xAxisLabel = "Heading";
      yAxisKey = "altitude";
      yAxisLabel = "Altitude";
    }

    let xMin = "";
    let xMax = "";
    if (xAxisKey != "date_time") {
      xMin = airCraftjson.reduce(
        (min, b) => Math.min(min, b[xAxisKey]),
        data[0][xAxisKey]
      );
      xMax = airCraftjson.reduce(
        (max, b) => Math.max(max, b[xAxisKey]),
        data[0][xAxisKey]
      );
    }

    let yMin = "";
    let yMax = "";
    if (yAxisKey != "date_time") {
      yMin = airCraftjson.reduce(
        (min, b) => Math.min(min, b[yAxisKey]),
        data[0][yAxisKey]
      );
      yMax = airCraftjson.reduce(
        (max, b) => Math.max(max, b[yAxisKey]),
        data[0][yAxisKey]
      );
    }

    return (
      <ResponsiveContainer width="90%" height={550}>
        <LineChart
          //   width={1000}
          // height={550}
          data={airCraftjson}
          margin={{ top: 5, right: 30, left: 50, bottom: 25 }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}

          <XAxis dataKey={xAxisKey}>
            <Label value={xAxisLabel} offset={0} position="bottom" />
          </XAxis>

          {yAxisKey === "date_time" ? (
            <YAxis
              dataKey={yAxisKey}
              label={{ value: yAxisLabel, angle: -90, position: "insideLeft" }}
            ></YAxis>
          ) : (
            <YAxis
              type="number"
              domain={[yMin, yMax]}
              label={{ value: yAxisLabel, angle: -90, position: "insideLeft" }}
            ></YAxis>
          )}

          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Line type="monotone" dataKey={yAxisKey} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  // const lineChart = () => {
  //     return <div id="chart2"></div>
  // }

  const change_X_Axis = (value: string) => {
    const obj = graphDropdown.find((item: any) => item.label === value);
    if (obj) setSelected_X_Axis(obj);
  };

  const change_Y_Axis = (value: string) => {
    const obj = graphDropdown.find((item: any) => item.label === value);
    if (obj) setSelected_Y_Axis(obj);
  };

  const filters = () => {
    return (
      <div className="row filterContainer">
        <div className="col-md-12">
          <div className="colored-heading">
            <h3 className="cl-white text-left m-0 p-4">Filters</h3>
          </div>
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
                        <select
                          className="form-control"
                          onChange={(e: any) => {
                            setSelectedFlight(e.target.value);
                          }}
                          value={selectedFlight}
                        >
                          <option value="">Select Flight By</option>
                          {flightsList.map((item: any) => {
                            return (
                              <option
                                value={item.aircraftid}
                                key={item.aircraftid}
                              >
                                {item.aircraftid}
                              </option>
                            );
                          })}
                        </select>
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
      <div className="loading" style={{ display: loader ? "block" : "none" }}>
        <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />
      </div>
      <div className="largeScreenContainer">
        {filters()}
        <div className="mt-5 ml-5">{lineChart()}</div>
      </div>
    </>
  );
};

export default LargeWindow;
