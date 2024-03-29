import React, { useEffect, useState } from "react";
import LeftPanel from "../LeftPanel";
import { planService } from "../../../Service/plan.service";
import { toast } from "react-toastify";


/**
 * This component is handling various functionality of event notification like view, edit, delete.
 * @component
 */
function NotificationEvent(props: any) {
  const [loader, setLoader] = useState(false);
  const [geofenceList, setGeofenceListItems] = useState([]);

  useEffect(() => {
    getGeofenceList();
  }, []);

   /**
   * Fetches the list of event notifications from the server.
   */
  const getGeofenceList = async () => {
    try {
      let response = await planService.getEventNotificationList();
      setLoader(false);
      if (response.status == 200) {
        setGeofenceListItems(response.data);
        
      }
    } catch (error: any) {
      setLoader(false);
      toast.error(error.msg);
    }
  };

  const deleteGeofence = async (item: any) => {
    setLoader(true);
    try {
      let response = await planService.deleteEventNotification(item.id);
      setGeofenceListItems(
        geofenceList.filter((event: any) => event.id !== item.id)
      );
      setLoader(false);
      toast.success(response.msg);
    } catch (error: any) {
      setLoader(false);
      toast.error(error.msg);
    }
  };
  
  let logedInUser: any = localStorage.getItem("logedInUser");
  logedInUser = JSON.parse(logedInUser);
  const accountType = logedInUser.results.accountType;

  return (
    <React.Fragment>
      <div className="loading" style={{ display: loader ? "block" : "none" }}>
        <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />
      </div>
      <div className="container-fluid content-body vh-100">
        <div className="row h-100vh-80px">
          <LeftPanel props={props} />
          <div className="col-lg-9 col-xl-10 my-4">
            <div className="row mt-5">
              <div className="col-md-4 d-flex align-items-center ">
                <h2 className="cl-white mr-5">Notification Event</h2>
                {accountType === "SERVICE" && (
                <button
                  className="cl-btn cl-btn-tartiary"
                  onClick={() => {
                    props.history.push("/create-notificationEvent");
                  }}
                >
                  Create Event
                </button>
                )}
              </div>
              {/* <div className="col-md-3 d-flex align-items-center justify-content-end">
                <span className="cl-white mr-3">Vehicles</span>
                <select className="form-control head-dropdown w-75">
                  <option>All </option>
                  <option>High</option>
                </select> */}
              {/* </div> */}
              {/* <div className="col-md-5 d-flex align-items-center justify-content-end">
                <span className="cl-white mr-3">Layer Name</span>
                <select className="form-control head-dropdown w-50">
                  <option>All </option>
                  <option>High</option>
                </select>
                <button className="cl-btn cl-btn-tartiary">Filter</button>
              </div> */}
            </div>
            <div className="row">
              <div className="col-md-12">
                <table className="table table-striped table-dark mt-5">
                  <thead>
                    <tr>
                      <th scope="col">Customer</th>
                      <th scope="col">Name</th>
                      <th scope="col">Event Name</th>
                      <th scope="col">Created By</th>
                      <th scope="col">View</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {geofenceList.map((item: any, index: any) => {
                      return (
                        <tr key={item.id}>
                          <td>{item?.customerName}</td>
                          <td>{item.name}</td>
                          <td>{item?.eventName}</td>
                          <td>{item.createdBy}</td>
                          <td className="table-icon-cell">
                            <i
                              className="fa fa-eye"
                              aria-hidden="true"
                              onClick={() => {
                                props.history.push({
                                  pathname: "/create-notificationEvent",
                                  state: { isEdit: false, data: item }, // your data array of objects
                                });
                              }}
                            ></i>
                          </td>
                          <td className="table-icon-cell">
                            <i
                              className="fa fa-file"
                              aria-hidden="true"
                              onClick={() => {
                                props.history.push({
                                  pathname: "/create-notificationEvent",
                                  state: { isEdit: true, data: item }, // your data array of objects
                                });
                              }}
                            ></i>
                          </td>
                          <td className="table-icon-cell">
                            <i
                              className="fa fa-trash"
                              aria-hidden="true"
                              onClick={() => deleteGeofence(item)}
                            ></i>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NotificationEvent;
