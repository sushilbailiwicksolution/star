import { reject } from "lodash";
import React, { useEffect, useState } from "react";
import { planService } from "../../../Service/plan.service";
import LeftPanel from "../LeftPanel";
import { toast } from "react-toastify";
import { useTypedSelector } from "../../../Reducers/RootReducer";
import { assetService } from "../../../Service/asset.service";
import { customerService } from "../../../Service/customer.service";


/**
 * This component is handling event notification creation and editing.
 * @component
 * @param {Object} props - The props passed to the component.
 * @param {Object} props.location - The location object provided by React Router containing the state data.
 * @param {Object} props.location.state - The state data passed from the previous location.
 * @param {Object} props.history - The history object provided by React Router for navigation.
 */

function EditNotificationEvent(props: any) {
  const selectedCustomer = useTypedSelector(
    (state) => state.viewReducer.selectedCustomer
  );
  let logedInUser: any = localStorage.getItem("logedInUser");
  logedInUser = JSON.parse(logedInUser);
  // console.log(selectedCustomer, "data for selected customer");
const accountType=logedInUser.results.accountType;
const customerId = logedInUser.results.customerId;
const loggedData=logedInUser.results;

  const [loader, setLoader] = useState(false);
  const [isReadonly, setReadOnly] = useState(false);
  const { state } = props.location;
  const initialState = {
    name: "",
    severity: "low",
    notify: "OUTSIDE",
    active: false,
    notify_map: false,
    notify_email: false,
    bufferDistance: 0,
    description: "",
    isAltitudeChecked: false,
    minAltitude: 0,
    maxAltitude: 0,
    altitudeReadonly: true,
    isTimeChecked: false,
    startTime: "",
    endTime: "",
    timeReadonly: true,
    isVelocityChecked: false,
    velocityValue: 0,
    velocityTypeSelected: "",
    velocityReadonly: true,
    layerId: "",
    landmarkId: "",
    eventId: "",
    eventName: "",
    // eventId:[] as string[],
    // eventName:[] as string[],
  };
  const initialDaysList = [
    { id: "day1", name: "Mon", isChecked: false },
    { id: "day2", name: "Tue", isChecked: false },
    { id: "day3", name: "Wed", isChecked: false },
    { id: "day4", name: "Thu", isChecked: false },
    { id: "day5", name: "Fri", isChecked: false },
    { id: "day6", name: "Sat", isChecked: false },
    { id: "day7", name: "Sun", isChecked: false },
  ];
  const initialValidate = {
    name: "",
    description: "",
    bufferDistance: "",
  };
  const [geofenceState, setGeofenceState] = useState(initialState);
  const [validation, setValidation] = useState(initialValidate);
  const [checkboxAssetsList, setCheckboxAssetsList] = useState([]);
  const [checkboxNotificationList, setCheckboxNotificationList] = useState([]);
  const [checkboxDaysList, setCheckboxDaysList] = useState(initialDaysList);
  const [layerList, setLayerList] = useState([]);
  const [landmarkList, setLandmarkList] = useState([]);
  const [eventNotificationId, setEventNotificationId] = useState("");
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const [eventDropdownList, seteventDropdownList] = useState<any>([]);

  useEffect(() => {
    onInit();
  }, [selectedCustomer]);

  const onInit = async () => {
    setLoader(true);
    await getAssetsList();
    await getNoificationList();
    await getLayerList();
    await getLandmarkList();
    await getEventList();
    setLoader(false);
    if (state && state.isEdit) {
      setIsUpdateForm(true);
      setEventNotificationId(state.data.id);
      updateValues(state.data);
    }

    if (state && state.isEdit == false) {
      setReadOnly(true);
      setEventNotificationId(state.data.id);
      updateValues(state.data);
    }
  };

  const updateValues = (data: any) => {
    console.log("data", data);
    const updateData = {
      name: data.name,
      severity: data.eventSeverity,
      notify: data.notify,
      notify_map: data.notifyMap == "Yes" ? true : false,
      notify_email: data.notifyEmail == "Yes" ? true : false,
      bufferDistance: data.bufferDistance,
      description: data.description,
      minAltitude: data.minAltitude,
      maxAltitude: data.maxAltitude,
      startTime: data.scheduleStartTime,
      endTime: data.scheduleEndTime,
      layerId: data.layerId,
      landmarkId: data.landmarkId,
      eventId: data.eventId,
      eventName: data.eventName,
    };
    setGeofenceState({ ...initialState, ...updateData });
  };

  const getAssetsList = () => {
    return new Promise(async (resolve, reject) => {
      try {
        if(accountType==="CUSTOMER"){
          const customer_response = await customerService.getCustomerByUserId(loggedData?.id);
          let response = await assetService.getCustomerAssets(customer_response.data.results.id);
          setLoader(false);
          if (response.status === 200) {
            console.log(response.data.results);
            setCheckboxAssetsList(response.data.results);
          }
        }
        else if (accountType === "USER") {
          let response = await assetService.getUserAssets(loggedData?.customerId);
          setLoader(false);
          if (response.status === 200) {
            console.log(response.data.results);
            setCheckboxAssetsList(response.data.results);
          }
        }
        else if(accountType==="SERVICE" && customerId !==0){
          let response = await assetService.getUserAssets(customerId);
          setLoader(false);
          if (response.status === 200) {
            console.log(response.data.results);
            setCheckboxAssetsList(response.data.results);
          }
        }
        else if(accountType==="SERVICE" && customerId===0){
          let userData;
          if(selectedCustomer){
            userData= await assetService.getCustomerAssets(selectedCustomer.id);
          }
          else{
          userData = await assetService.getAssetsList();
          }
          
        if (userData.status == '200' && selectedCustomer) {
          const checkListArr = userData.data.results;
          console.log('checkListArr', checkListArr);
          setCheckboxAssetsList(checkListArr);
        } else {
          setCheckboxAssetsList([]);
        }
        resolve(true);
      }
      } catch (error: any) {
        resolve(true);
        toast.error(error.msg);
        console.error(error);
      }


      // try {
      //   let userData = await planService.getAssetsList();
      //   if (userData.status == "200") {
      //     let checkListArr = userData.data.results;
      //     checkListArr = checkListArr.map((item: any, index: any) => {
      //       item["isChecked"] = false;
      //       return item;
      //     });
      //     if (state && state.data) {
      //       if (state.data.vehicles.length > 0) {
      //         state.data.vehicles.forEach((user: any) => {
      //           let index = checkListArr.findIndex(
      //             (item: any) => item.id === user.id
      //           );
      //           if (index > -1) {
      //             checkListArr[index].isChecked = true;
      //           }
      //         });
      //       }
      //     }
      //     setCheckboxAssetsList(checkListArr);
      //     resolve(true);
      //   }
      // } catch (error: any) {
      //   resolve(true);
      //   toast.error(error.msg);
      //   console.error(error);
      // }
    });
  };

  const getNoificationList = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await planService.getNotificationList();
        if (userData.status == "200") {
          let checkListArr = userData.data.results;
          checkListArr = checkListArr.map((item: any, index: any) => {
            item["isChecked"] = false;
            return item;
          });
          if (state && state.data) {
            if (state.data.notifications.length > 0) {
              state.data.notifications.forEach((user: any) => {
                let index = checkListArr.findIndex(
                  (item: any) => item.id === user.id
                );
                if (index > -1) {
                  checkListArr[index].isChecked = true;
                }
              });
            }
          }
          setCheckboxNotificationList(checkListArr);
          resolve(true);
        }
      } catch (error: any) {
        resolve(true);
        toast.error(error.msg);
        console.error(error);
      }
    });
  };

  const getLayerList = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await planService.getLayersList();
        if (userData.status == "200") {
          let checkListArr = userData.data.results;
          setLayerList(checkListArr);
          resolve(true);
        }
      } catch (error: any) {
        resolve(true);
        console.error(error);
        toast.error(error.msg);
      }
    });
  };

  const getLandmarkList = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await planService.getLandmarkList();
        if (userData.status == "200") {
          let checkListArr = userData.data.results;
          setLandmarkList(checkListArr);
          resolve(true);
        }
      } catch (error: any) {
        resolve(true);
        console.error(error);
        toast.error(error.msg);
      }
    });
  };

  const getEventList = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await planService.getEventList();
        if (userData.status == "200") {
          let checkListArr = userData.data.data;
          console.log("api data event dropdown", checkListArr);

          seteventDropdownList(checkListArr);
          resolve(true);
        }
      } catch (error: any) {
        resolve(true);
        console.error(error);
        toast.error(error.msg);
      }
    });
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setGeofenceState({ ...geofenceState, [name]: value });
    if (value.trim().length > 0) {
      setValidation({ ...validation, [name]: "" });
    }
  };

  const handlebufferDistanceChange = (event: any) => {
    const { name, value } = event.target;
    setGeofenceState({ ...geofenceState, [name]: value });
    if (value.length > 0) {
      setValidation({ ...validation, [name]: "" });
    }
  };

  const changeAltitude = () => {
    let check = geofenceState.isAltitudeChecked ? false : true;
    setGeofenceState({
      ...geofenceState,
      isAltitudeChecked: check,
      altitudeReadonly: check ? false : true,
    });
  };

  const changeTime = () => {
    let check = geofenceState.isTimeChecked ? false : true;
    setGeofenceState({
      ...geofenceState,
      isTimeChecked: check,
      timeReadonly: check ? false : true,
    });
  };

  const changeVelocity = () => {
    let check = geofenceState.isVelocityChecked ? false : true;
    setGeofenceState({
      ...geofenceState,
      isVelocityChecked: check,
      velocityReadonly: check ? false : true,
    });
  };

  const handleNotificationListCheckboxChange = (id: any) => {
    if (isReadonly) return false;
    const newCheckboxes: any = [...checkboxNotificationList];
    let index = newCheckboxes.findIndex((item: any) => item.id == id);
    newCheckboxes[index].isChecked = newCheckboxes[index].isChecked
      ? false
      : true;
    setCheckboxNotificationList(newCheckboxes);
  };

  const handleAssetsListCheckboxChange = (id: any) => {
    if (isReadonly) return false;
    const newCheckboxes: any = [...checkboxAssetsList];
    let index = newCheckboxes.findIndex((item: any) => item.id == id);
    newCheckboxes[index].isChecked = newCheckboxes[index].isChecked
      ? false
      : true;
    setCheckboxAssetsList(newCheckboxes);
  };

  const handleDaysListCheckboxChange = (id: any) => {
    const newCheckboxes: any = [...checkboxDaysList];
    let index = newCheckboxes.findIndex((item: any) => item.id == id);
    newCheckboxes[index].isChecked = newCheckboxes[index].isChecked
      ? false
      : true;
    setCheckboxDaysList(newCheckboxes);
  };

  const checkValidation = () => {
    let errors = validation;
    let check = true;

    if (!geofenceState.name.trim()) {
      check = false;
      errors.name = "Name is required";
    } else {
      errors.name = "";
    }

    if (!geofenceState.description.trim()) {
      check = false;
      errors.description = "Description is required";
    } else {
      errors.description = "";
    }

    setValidation({ ...errors });
    return check;
  };

  const handleSubmit = () => {
    // return;
    let check = checkValidation();
    if (!check) {
      toast.error("Please enter mandatory values");
      return;
    }

    let notification_List = checkboxNotificationList.filter(
      (item: any) => item.isChecked == true
    );

    let assets_List = checkboxAssetsList.filter(
      (item: any) => item.isChecked == true
    );

    let daysList: any[] = [];
    checkboxDaysList.forEach((item: any, index: any) => {
      if (item.isChecked == true) {
        daysList.push(item.name);
      }
    });

    let requestParams = {
      name: geofenceState.name,
      active: geofenceState.active,
      notifyEmail: geofenceState.notify_email ? "Yes" : "No",
      description: geofenceState.description,
      customerId: selectedCustomer ? selectedCustomer.id : 0,
      customerName: selectedCustomer ? selectedCustomer.name : "",
      notifications: notification_List,
      createdBy: logedInUser.results.username,
      vehicles: assets_List,
      eventId: geofenceState.eventId,
      eventName: geofenceState.eventName,
    };
    createEventNotification(requestParams);
  };

  const updateHandleSubmit = (e: any) => {
    let check = checkValidation();
    if (!check) {
      toast.error("Please enter mandatory values");
      return;
    }

    let notification_List = checkboxNotificationList.filter(
      (item: any) => item.isChecked == true
    );

    let assets_List = checkboxAssetsList.filter(
      (item: any) => item.isChecked == true
    );

    let daysList: any[] = [];
    checkboxDaysList.forEach((item: any, index: any) => {
      if (item.isChecked == true) {
        daysList.push(item.name);
      }
    });

    let requestParams = {
      name: geofenceState.name,
      active: geofenceState.active,
      notifyEmail: geofenceState.notify_email ? "Yes" : "No",
      description: geofenceState.description,
      customerId: selectedCustomer ? selectedCustomer.id : 0,
      customerName: selectedCustomer
        ? selectedCustomer.name
        : logedInUser.results.username,
      notifications: notification_List,
      createdBy: logedInUser.results.username,
      vehicles: assets_List,
      eventId: geofenceState.eventId,
      eventName: geofenceState.eventName,
    };
    setLoader(true);
    updateEventNotification(requestParams);
  };

  const GET_CREATE_UPDATE_BUTTON = () => {
    if (isUpdateForm) {
      return (
        <button
          type="button"
          className="cl-btn cl-btn-primary white-btn mr-3"
          onClick={updateHandleSubmit}
        >
          Update
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="cl-btn cl-btn-primary white-btn mr-3"
          onClick={handleSubmit}
        >
          Create
        </button>
      );
    }
  };

  const createEventNotification = async (request: any) => {
    setLoader(true);
    try {
      let data = await planService.createEventNotification(request);
      setLoader(false);
      if (data.status == 200) {
        toast("Event Notification Created Successfully");
      }
    } catch (err: any) {
      setLoader(false);
      toast(err.msg);
    }
  };

  const updateEventNotification = async (request: any) => {
    try {
      let data = await planService.updateEventNotification(
        eventNotificationId,
        request
      );
      setLoader(false);
      if (data.status == 200) {
        toast(data.msg);
      }
    } catch (err: any) {
      setLoader(false);
      toast(err.msg);
    }
  };

  return (
    <React.Fragment>
      <div className="loading" style={{ display: loader ? "block" : "none" }}>
        <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />
      </div>
      <div className="container-fluid content-body vh-100">
        <div className="row">
          <LeftPanel props={props} />
          <div className="col-lg-9 col-xl-10 mt-4">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb p-0">
                <li className="breadcrumb-item">
                  <a
                    href="#"
                    onClick={() => {
                      props.history.push("/notificationEvent");
                    }}
                  >
                    Event Notification
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Create
                </li>
              </ol>
            </nav>
            <div className="cl-white text-left mt-4 mb-3">
              <h3>Add New Event</h3>
            </div>
            <table className="table table-striped table-bordered table-dark custom-dark-table">
              <tbody>
                <tr>
                  <td className="small-shell">
                    <h3 className="edit-heading">Customer</h3>
                  </td>
                  <td colSpan={3}>{selectedCustomer?.name}</td>
                </tr>
                <tr>
                  <td className="small-shell">
                    <h3 className="edit-heading">Creator</h3>
                  </td>
                  <td>{logedInUser?.results.username}</td>
                  <td className="small-shell">
                    <h3 className="edit-heading">Active</h3>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="examck1"
                      checked={geofenceState.active}
                      onChange={() => {
                        let check = geofenceState.active ? false : true;
                        setGeofenceState({
                          ...geofenceState,
                          active: check,
                        });
                      }}
                      disabled={isReadonly}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td className="small-shell">
                    <h3 className="edit-heading">Name</h3>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control small-input-box d-inline"
                      placeholder="Type Name"
                      name="name"
                      value={geofenceState.name}
                      onChange={(e) => handleInputChange(e)}
                    ></input>
                    <span className="color-red">
                      {validation.name && <p>{validation.name}</p>}
                    </span>
                  </td>
                  <td className="small-shell">
                    <h3 className="edit-heading">Notify Email</h3>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="examck11"
                      checked={geofenceState.notify_email}
                      onChange={() => {
                        let check = geofenceState.notify_email ? false : true;
                        setGeofenceState({
                          ...geofenceState,
                          notify_email: check,
                        });
                      }}
                      disabled={isReadonly}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td className="small-shell">
                    <h3 className="edit-heading">Aircraft</h3>
                  </td>
                  <td>
                    <div className="scrollableArea">
                      {checkboxAssetsList.map((item: any, index: any) => {
                        return (
                          <div className="check-items-block selection-list">
                            <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={item.id}
                                checked={item.isChecked}
                                onChange={() =>
                                  handleAssetsListCheckboxChange(item.id)
                                }
                                // disabled={isReadonly}
                              ></input>
                              <label
                                className="form-check-label ml-3"
                                htmlFor="exampleCheck1"
                              >
                                {item.name}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* <div className="d-flex align-items-center mt-3">
                      <span className="mx-3">All</span> |{" "}
                      <span className="mx-3">None</span>
                      <select className="form-control select-dropdown">
                        <option>starts with</option>
                        <option>2</option>
                      </select>
                      <input
                        type="text"
                        className="form-control small-input-box ml-3 w-50"
                      ></input>
                      <button
                        type="button"
                        className="cl-btn cl-btn-gray white-btn ml-3 mr-3"
                      >
                        Filter
                      </button>
                      <button
                        type="button"
                        className="cl-btn cl-btn-gray  white-btn"
                      >
                        Clear
                      </button>
                    </div> */}

                  </td>
                  <td className="small-shell">
                    <h3 className="edit-heading">Notification Lists</h3>
                  </td>
                  <td>
                    <div className="scrollableArea">
                      {checkboxNotificationList.map((item: any, index: any) => {
                        return (
                          <div className="check-items-block selection-list">
                            <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={item.id}
                                checked={item.isChecked}
                                onChange={() =>
                                  handleNotificationListCheckboxChange(item.id)
                                }
                                // disabled={isReadonly}
                              ></input>
                              <label
                                className="form-check-label ml-3"
                                htmlFor="exampleCheck1"
                              >
                                {item.name}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* <div className="d-flex align-items-center mt-3">
                      <span className="mx-3">All</span> |{" "}
                      <span className="mx-3">None</span>
                      <select className="form-control select-dropdown">
                        <option>starts with</option>
                        <option>2</option>
                      </select>
                      <input
                        type="text"
                        className="form-control small-input-box ml-3 w-50"
                      ></input>
                      <button
                        type="button"
                        className="cl-btn cl-btn-gray white-btn ml-3 mr-3"
                      >
                        Filter
                      </button>
                      <button
                        type="button"
                        className="cl-btn cl-btn-gray  white-btn"
                      >
                        Clear
                      </button>
                    </div> */}

                  </td>
                </tr>
                <tr>
                  <td className="small-shell">
                    <h3 className="edit-heading">Event List</h3>
                  </td>

                  <td>
                    <select
                      className="form-control select-dropdown w-75"
                      onChange={(e) => {
                        setGeofenceState({
                          ...geofenceState,
                          eventId: e.target.value,
                          eventName:
                            e.target.options[e.target.selectedIndex].text,
                        });
                      }}
                      value={geofenceState.eventId}
                      disabled={isReadonly}
                    >
                      <option value="">Select Event</option>
                      {eventDropdownList.map((item: any) => (
                        <option key={item.id} value={item.eventid}>
                          {item.event_name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="small-shell">
                    <h3 className="edit-heading">Description</h3>
                  </td>
                  <td>
                    <textarea
                      className="form-control ft-1-4rem"
                      rows={7}
                      name="description"
                      value={geofenceState.description}
                      onChange={(e) => handleInputChange(e)}
                    ></textarea>
                    <span className="color-red">
                      {validation.description && (
                        <p>{validation.description}</p>
                      )}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            {isReadonly == false ? (
              <div className="d-flex align-items-center justify-content-end mt-3 mr-3">
                <GET_CREATE_UPDATE_BUTTON></GET_CREATE_UPDATE_BUTTON>
                <button
                  type="button"
                  className="cl-btn cl-btn-secondary white-btn"
                >
                  Cancel
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default EditNotificationEvent;
