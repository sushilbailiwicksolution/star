/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { viewService } from "../../Service/view.service";
import { useDispatch } from "react-redux";
import { ViewsConstants } from "../../Constants/constants";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import PermDeviceInformationIcon from "@mui/icons-material/PermDeviceInformation";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface EventData {
  aircraftid: string;
  time: string;
  type: string;
  gps_lat: string;
  gps_long: string;
  heading: string;
  velocity: string;
  elapsed_time: string;
}

interface Props {
  selectedAicraftId: string;
  selectedAircraftFlightId:string;
  eventsData: EventData[];
}
const Events = (props: any) => {
  const [eventsData, setEventData] = useState<EventData[]>([]);
  const [assetTogglebtn, setAssetTogglebtn] = useState(false);
  const [selectedEventData, setSelectedEventData] = useState<any>(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (props.selectedAicraftId) {
      getEventData();
      console.log(props, 'ye hai selected');
      
    }
  }, [props.selectedAicraftId]);

  const getEventData = async () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    const startDate = firstDay;
    const endDate = new Date();

    let fromDateString = "";
    if (startDate) {
      fromDateString = new Date(
        startDate.getTime() - startDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
    }

    let endDateString = "";
    if (endDate) {
      endDateString = new Date(
        endDate.getTime() - endDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
    }

    const airCraftArray: any = [];
    airCraftArray.push(props.selectedAicraftId);

    const aircraftId =props.selectedAircraftFlightId
   

    try {
      // setLoader(true);
      const data = await viewService.getEventListForFlight(aircraftId);
      console.log(data , aircraftId,'eventsforflight');
      
      setEventData(data);
      //   setLoader(false);
    } catch (error) {
      setEventData([]);
      //  setLoader(false);
    }
  };

  const onClickedEvent = (item: any, index: any) => {
    const value = {
      selectedEvent: item,
    };
    dispatch({
      type: ViewsConstants.VIEW_SELECTED_EVENT,
      value,
    });
    setSelectedEventData(item);
  };

  return (
    <div className="color-white">
      <div className="list-group asset-list">
        {eventsData.map((item: any, index: number) => {
          const dateAndTime = item.time.split(" ");
          const time = dateAndTime[1];
          const date = dateAndTime[0];

          return (
            <a
              key={`event_tab_${index}`}
              href="#"
              className={`list-group-item list-group-item-action `}
              onClick={() => onClickedEvent(item, index)}
            >
              <div className="row event-list-items">
                <div className="col-4 col-item-center">
                  <h5>{item.aircraftid}</h5>
                </div>
                <div className="col-8 text-align-left">
                  <div className="row">
                    <div className="col-6">
                      <p className="text-truncate">{item.type}</p>
                      <p className="text-truncate">{item.time}</p>
                      <p className="text-truncate">{item.elapsed_time} ago</p>
                    </div>
                    <div className="col-6 col-item-center">
                      <div>
                        <p className="text-truncate">{time}</p>
                        <p>{date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
      <div className="custom-card">
        <button
          className="btn btn-primary d-inline-flex align-items-center justify-content-center mb-3 rounded-circle"
          style={{ width: "30px", height: "30px", padding: "0px" }}
          onClick={() => setAssetTogglebtn(!assetTogglebtn)}
        >
          {assetTogglebtn ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </button>
        <div
          className={
            assetTogglebtn
              ? "custom-card-container show-top"
              : "custom-card-container"
          }
        >
          <div className="custom-card-header">
            <ul className="nav">
              <li className="nav-item">
                <a href="#" className="nav-link text-white px-2">
                  <OpenInNewIcon fontSize="large" />
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link text-white px-2">
                  <ZoomInIcon fontSize="large" />
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link text-white px-2">
                  <ModeStandbyIcon fontSize="large" />
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link text-white px-2">
                  <QuestionAnswerIcon fontSize="large" />
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link text-white px-2">
                  <PriorityHighIcon fontSize="large" />
                </a>
              </li>
              <li className="nav-item ml-auto">
                <a href="#" className="nav-link text-white px-2">
                  <PermDeviceInformationIcon fontSize="large" />
                </a>
              </li>
            </ul>
          </div>
          <div className="custom-card-body">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th className="text-warning">Attribute</th>
                  <th className="text-warning">value</th>
                </tr>
              </thead>
              <tbody>
                {selectedEventData ? (
                  <>
                    <tr>
                      <td>Name</td>
                      <td>{selectedEventData.aircraftid}</td>
                    </tr>
                    <tr>
                      <td>type</td>
                      <td>{selectedEventData.type}</td>
                    </tr>
                    <tr>
                      <td>Time</td>
                      <td>{selectedEventData.time}</td>
                    </tr>
                    <tr>
                      <td>Lat/Long</td>
                      <td>{`${selectedEventData.gps_lat},${selectedEventData.gps_long}`}</td>
                    </tr>
                    <tr>
                      <td>Velocity</td>
                      <td>{selectedEventData.velocity}</td>
                    </tr>
                    <tr>
                      <td>Elapsed Time</td>
                      <td>{selectedEventData.elapsed_time}</td>
                    </tr>
                  </>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Events;
