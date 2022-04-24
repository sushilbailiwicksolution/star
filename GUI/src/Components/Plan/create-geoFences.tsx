import { reject } from 'lodash';
import React, { useEffect, useState } from 'react';
import { planService } from '../../Service/plan.service';
import LeftPanel from './LeftPanel';
import { toast } from 'react-toastify';

function Editlayer(props: any) {
  const [loader, setLoader] = useState(false);
  const [isReadonly, setReadOnly] = useState(false);
  const { state } = props.location;
  const initialState = {
    name: '',
    severity: 'low',
    notify: 'While Inside',
    active: false,
    notify_map: false,
    notify_email: false,
    bufferDistance: 0,
    description: '',
    isAltitudeChecked: false,
    minAltitude: 0,
    maxAltitude: 0,
    altitudeReadonly: true,
    isTimeChecked: false,
    startTime: '',
    endTime: '',
    timeReadonly: true,
    isVelocityChecked: false,
    velocityValue: 0,
    velocityTypeSelected: '',
    velocityReadonly: true,
    layerId: 1,
    landmarkId: 1,
    days: [],
  };
  const initialDaysList = [
    { id: 'day1', name: 'Mon', isChecked: false },
    { id: 'day2', name: 'Tue', isChecked: false },
    { id: 'day3', name: 'Wed', isChecked: false },
    { id: 'day4', name: 'Thu', isChecked: false },
    { id: 'day5', name: 'Fri', isChecked: false },
    { id: 'day6', name: 'Sat', isChecked: false },
    { id: 'day7', name: 'Sun', isChecked: false },
  ];
  const initialValidate = {
    name: '',
    description: '',
    bufferDistance: '',
  };
  const [geofenceState, setGeofenceState] = useState(initialState);
  const [validation, setValidation] = useState(initialValidate);
  const [checkboxAssetsList, setCheckboxAssetsList] = useState([]);
  const [checkboxNotificationList, setCheckboxNotificationList] = useState([]);
  const [checkboxDaysList, setCheckboxDaysList] = useState(initialDaysList);
  const [layerList, setLayerList] = useState([]);
  const [landmarkList, setLandmarkList] = useState([]);
  const [geofenceId, setgeofenceId] = useState('');
  const [isUpdateForm, setIsUpdateForm] = useState(false);

  useEffect(() => {
    onInit();
  }, []);

  const onInit = async () => {
    setLoader(true);
    await getAssetsList();
    await getNoificationList();
    await getLayerList();
    await getLandmarkList();
    setLoader(false);
    if (state && state.isEdit) {
      setIsUpdateForm(true);
      setgeofenceId(state.data.id);
      updateValues(state.data);
    }

    if (state && state.isEdit == false) {
      setReadOnly(true);
      setgeofenceId(state.data.id);
      updateValues(state.data);
    }
  };

  const updateValues = (data: any) => {
    console.log('update data', data);
  };

  const getAssetsList = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await planService.getAssetsList();
        if (userData.status == '200') {
          let checkListArr = userData.data.results;
          checkListArr = checkListArr.map((item: any, index: any) => {
            item['isChecked'] = false;
            return item;
          });
          setCheckboxAssetsList(checkListArr);
          resolve(true);
        }
      } catch (error: any) {
        resolve(true);
        toast.error(error.msg);
        console.error(error);
      }
    });
  };

  const getNoificationList = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await planService.getNotificationList();
        if (userData.status == '200') {
          let checkListArr = userData.data.results;
          checkListArr = checkListArr.map((item: any, index: any) => {
            item['isChecked'] = false;
            return item;
          });
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
        if (userData.status == '200') {
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
        if (userData.status == '200') {
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

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setGeofenceState({ ...geofenceState, [name]: value });
    if (value.trim().length > 0) {
      setValidation({ ...validation, [name]: '' });
    }
  };

  const handlebufferDistanceChange = (event: any) => {
    const { name, value } = event.target;
    setGeofenceState({ ...geofenceState, [name]: value });
    if (value.length > 0) {
      setValidation({ ...validation, [name]: '' });
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
    const newCheckboxes: any = [...checkboxNotificationList];
    let index = newCheckboxes.findIndex((item: any) => item.id == id);
    newCheckboxes[index].isChecked = newCheckboxes[index].isChecked
      ? false
      : true;
    setCheckboxNotificationList(newCheckboxes);
  };

  const handleAssetsListCheckboxChange = (id: any) => {
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
      errors.name = 'Name is required';
    } else {
      errors.name = '';
    }

    if (!geofenceState.description.trim()) {
      check = false;
      errors.description = 'Description is required';
    } else {
      errors.description = '';
    }

    setValidation({ ...errors });
    return check;
  };

  const handleSubmit = () => {
    let check = checkValidation();
    if (!check) {
      toast.error('Please enter mandatory values');
      return;
    }

    let logedInUser: any = localStorage.getItem('logedInUser');
    logedInUser = JSON.parse(logedInUser);
    let notification_List = checkboxNotificationList.filter(
      (item: any) => item.isChecked == true
    );
    // let notification_List: any[] = [];
    // checkboxNotificationList.forEach((item: any, index: any) => {
    //   if (item.isChecked == true) {
    //     notification_List.push(item.id);
    //   }
    // });

    let assets_List = checkboxAssetsList.filter(
      (item: any) => item.isChecked == true
    );

    // let assets_List: any[] = [];
    // checkboxAssetsList.forEach((item: any, index: any) => {
    //   if (item.isChecked == true) {
    //     assets_List.push(item.id);
    //   }
    // });

    let daysList = checkboxDaysList.filter(
      (item: any) => item.isChecked == true
    );

    let requestParams = {
      name: geofenceState.name,
      active: geofenceState.active,
      notify: geofenceState.notify,
      notifyMap: geofenceState.notify_map ? 'yes' : 'no',
      notifyEmail: geofenceState.notify_email ? 'yes' : 'no',
      bufferDistance: Number(geofenceState.bufferDistance),
      description: geofenceState.description,
      minAltitude: geofenceState.isAltitudeChecked
        ? Number(geofenceState.minAltitude)
        : 0,
      maxAltitude: geofenceState.isAltitudeChecked
        ? Number(geofenceState.maxAltitude)
        : 0,
      velocityValue: geofenceState.isVelocityChecked
        ? Number(geofenceState.velocityValue)
        : 0,
      minVelocity: 0,
      maxVelocity: 0,
      velocityTypeSelected: geofenceState.velocityTypeSelected,
      eventSeverity: geofenceState.severity,
      scheduleStartTime: geofenceState.isTimeChecked
        ? geofenceState.startTime
        : '00:00',
      scheduleEndTime: geofenceState.isTimeChecked
        ? geofenceState.endTime
        : '00:00',
      customerId: 0,
      notifications: notification_List,
      layerId: Number(geofenceState.layerId),
      landmarkId: Number(geofenceState.landmarkId),
      createdBy: logedInUser.userName,
      days: daysList,
      vehicles:assets_List
    };
    createGeofence(requestParams);
  };

  const updateHandleSubmit = (e: any) => {
    let check = checkValidation();
    if (!check) {
      toast.error('Please enter mandatory values');
      return;
    }

    let logedInUser: any = localStorage.getItem('logedInUser');
    logedInUser = JSON.parse(logedInUser);
    let notificationList = checkboxNotificationList.filter(
      (item: any) => item.isChecked == true
    );

    const assetsList = checkboxAssetsList.filter(
      (item: any) => item.isChecked == true
    );

    let daysList = checkboxDaysList.filter(
      (item: any) => item.isChecked == true
    );

    let requestParams = {
      name: geofenceState.name,
      active: geofenceState.active,
      notify: geofenceState.notify,
      notifyMap: geofenceState.notify_map ? 'yes' : 'no',
      notifyEmail: geofenceState.notify_email ? 'yes' : 'no',
      bufferDistance: Number(geofenceState.bufferDistance),
      description: geofenceState.description,
      minAltitude: geofenceState.isAltitudeChecked
        ? Number(geofenceState.minAltitude)
        : 0,
      maxAltitude: geofenceState.isAltitudeChecked
        ? Number(geofenceState.maxAltitude)
        : 0,
      velocityValue: geofenceState.isVelocityChecked
        ? Number(geofenceState.velocityValue)
        : 0,
      minVelocity: 0,
      maxVelocity: 0,
      velocityTypeSelected: geofenceState.velocityTypeSelected,
      eventSeverity: geofenceState.severity,
      scheduleStartTime: geofenceState.isTimeChecked
        ? geofenceState.startTime
        : '00:00',
      scheduleEndTime: geofenceState.isTimeChecked
        ? geofenceState.endTime
        : '00:00',
      customerId: 0,
      notifications: notificationList,
      layerId: Number(geofenceState.layerId),
      landmarkId: Number(geofenceState.landmarkId),
      createdBy: logedInUser.userName,
      days: daysList,
      vehicles:assetsList
    };
    setLoader(true);
    updateGeofence(requestParams);
  };

  const GET_CREATE_UPDATE_BUTTON = () => {
    if (isUpdateForm) {
      return (
        <button
          type='button'
          className='cl-btn cl-btn-primary white-btn mr-3'
          onClick={updateHandleSubmit}
        >
          Update
        </button>
      );
    } else {
      return (
        <button
          type='button'
          className='cl-btn cl-btn-primary white-btn mr-3'
          onClick={handleSubmit}
        >
          Create
        </button>
      );
    }
  };

  const createGeofence = async (request: any) => {
    setLoader(true);
    try {
      let data = await planService.createGeofence(request);
      setLoader(false);
      if (data.status == 200) {
        toast('Geofence Created Successfully');
      }
    } catch (err: any) {
      setLoader(false);
      toast(err.msg);
    }
  };

  const updateGeofence = async (request: any) => {
    try {
      let data = await planService.updateGeofence(geofenceId, request);
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
      <div className='loading' style={{ display: loader ? 'block' : 'none' }}>
        <img src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' />
      </div>
      <div className='container-fluid content-body vh-100'>
        <div className='row'>
          <LeftPanel props={props} />
          <div className='col-lg-9 col-xl-10 mt-4'>
            <nav aria-label='breadcrumb'>
              <ol className='breadcrumb p-0'>
                <li className='breadcrumb-item'>
                  <a
                    href='#'
                    onClick={() => {
                      props.history.push('/geofences');
                    }}
                  >
                    GeoFences
                  </a>
                </li>
                <li className='breadcrumb-item active' aria-current='page'>
                  Create
                </li>
              </ol>
            </nav>
            <div className='cl-white text-left mt-4 mb-3'>
              <h3>Add New Event</h3>
            </div>
            <table className='table table-striped table-bordered table-dark custom-dark-table'>
              <tbody>
                <tr>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Customer</h3>
                  </td>
                  <td colSpan={3}>StarAds</td>
                </tr>
                <tr>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Cretor</h3>
                  </td>
                  <td>Admin</td>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Active</h3>
                  </td>
                  <td>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      id='examck1'
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
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Severity</h3>
                  </td>
                  <td>
                    <select
                      className='form-control select-dropdown w-75'
                      onChange={(e) => {
                        setGeofenceState({
                          ...geofenceState,
                          severity: e.target.value,
                        });
                      }}
                      value={geofenceState.severity}
                    >
                      <option value='high'>High</option>
                      <option value='low'>Low</option>
                    </select>
                  </td>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Notify Map</h3>
                  </td>
                  <td>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      id='examck12'
                      checked={geofenceState.notify_map}
                      onChange={() => {
                        let check = geofenceState.notify_map ? false : true;
                        setGeofenceState({
                          ...geofenceState,
                          notify_map: check,
                        });
                      }}
                      disabled={isReadonly}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Name</h3>
                  </td>
                  <td>
                    <input
                      type='text'
                      className='form-control small-input-box d-inline'
                      placeholder='Type Name'
                      name='name'
                      value={geofenceState.name}
                      onChange={(e) => handleInputChange(e)}
                    ></input>
                    <span className='color-red'>
                      {validation.name && <p>{validation.name}</p>}
                    </span>
                  </td>
                  <td rowSpan={2} className='small-shell'>
                    <h3 className='edit-heading'>Notify Email</h3>
                  </td>
                  <td rowSpan={2}>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      id='examck11'
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
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Notify</h3>
                  </td>
                  <td>
                    {' '}
                    <select
                      className='form-control select-dropdown w-75'
                      onChange={(e) => {
                        setGeofenceState({
                          ...geofenceState,
                          notify: e.target.value,
                        });
                      }}
                      value={geofenceState.notify}
                    >
                      <option value='While Inside'>While Inside</option>
                      <option value='While Outside'>While Outside</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Vehicles</h3>
                  </td>
                  <td>
                    <div className='scrollableArea'>
                      {checkboxAssetsList.map((item: any, index: any) => {
                        return (
                          <div className='check-items-block selection-list'>
                            <div className='form-group form-check m-0 d-flex align-items-center justify-content-between'>
                              <input
                                type='checkbox'
                                className='form-check-input'
                                id={item.id}
                                checked={item.isChecked}
                                onChange={() =>
                                  handleAssetsListCheckboxChange(item.id)
                                }
                                disabled={isReadonly}
                              ></input>
                              <label
                                className='form-check-label ml-3'
                                htmlFor='exampleCheck1'
                              >
                                {item.name}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className='d-flex align-items-center mt-3'>
                      <span className='mx-3'>All</span> |{' '}
                      <span className='mx-3'>None</span>
                      <select className='form-control select-dropdown'>
                        <option>starts with</option>
                        <option>2</option>
                      </select>
                      <input
                        type='text'
                        className='form-control small-input-box ml-3 w-50'
                      ></input>
                      <button
                        type='button'
                        className='cl-btn cl-btn-gray white-btn ml-3 mr-3'
                      >
                        Filter
                      </button>
                      <button
                        type='button'
                        className='cl-btn cl-btn-gray  white-btn'
                      >
                        Clear
                      </button>
                    </div>
                  </td>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Notification Lists</h3>
                  </td>
                  <td>
                    <div className='scrollableArea'>
                      {checkboxNotificationList.map((item: any, index: any) => {
                        return (
                          <div className='check-items-block selection-list'>
                            <div className='form-group form-check m-0 d-flex align-items-center justify-content-between'>
                              <input
                                type='checkbox'
                                className='form-check-input'
                                id={item.id}
                                checked={item.isChecked}
                                onChange={() =>
                                  handleNotificationListCheckboxChange(item.id)
                                }
                                disabled={isReadonly}
                              ></input>
                              <label
                                className='form-check-label ml-3'
                                htmlFor='exampleCheck1'
                              >
                                {item.name}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className='d-flex align-items-center mt-3'>
                      <span className='mx-3'>All</span> |{' '}
                      <span className='mx-3'>None</span>
                      <select className='form-control select-dropdown'>
                        <option>starts with</option>
                        <option>2</option>
                      </select>
                      <input
                        type='text'
                        className='form-control small-input-box ml-3 w-50'
                      ></input>
                      <button
                        type='button'
                        className='cl-btn cl-btn-gray white-btn ml-3 mr-3'
                      >
                        Filter
                      </button>
                      <button
                        type='button'
                        className='cl-btn cl-btn-gray  white-btn'
                      >
                        Clear
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Layer Name</h3>
                  </td>
                  <td>
                    <select
                      className='form-control select-dropdown w-75'
                      onChange={(e: any) => {
                        setGeofenceState({
                          ...geofenceState,
                          layerId: e.target.value,
                        });
                      }}
                      disabled={isReadonly}
                    >
                      <option value=''>Select Layer</option>;
                      {layerList.map((item: any, index: any) => {
                        return <option value={item.id}>{item.name}</option>;
                      })}
                    </select>
                  </td>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Landmark</h3>
                  </td>
                  <td>
                    <select
                      className='form-control select-dropdown w-75'
                      onChange={(e: any) => {
                        setGeofenceState({
                          ...geofenceState,
                          landmarkId: e.target.value,
                        });
                      }}
                      disabled={isReadonly}
                    >
                      <option value=''>Select Landmark</option>;
                      {landmarkList.map((item: any, index: any) => {
                        return <option value={item.id}>{item.name}</option>;
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Buffer Distance (nm)</h3>
                  </td>
                  <td>
                    <input
                      type='Number'
                      className='form-control small-input-box d-inline'
                      placeholder='0.000'
                      name='bufferDistance'
                      value={geofenceState.bufferDistance}
                      onChange={(e) => handlebufferDistanceChange(e)}
                    ></input>
                  </td>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Description</h3>
                  </td>
                  <td>
                    <textarea
                      className='form-control ft-1-4rem'
                      rows={7}
                      name='description'
                      value={geofenceState.description}
                      onChange={(e) => handleInputChange(e)}
                    ></textarea>
                    <span className='color-red'>
                      {validation.description && (
                        <p>{validation.description}</p>
                      )}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td colSpan={4}>
                    <h3 className='edit-heading'>Optional Limits</h3>
                  </td>
                </tr>
                <tr>
                  <td className='small-shell text-right'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      id='eamp1'
                      onChange={changeAltitude}
                      readOnly={isReadonly}
                    ></input>
                  </td>
                  <td>
                    <div className='d-flex text-left mb-3'>Altitude</div>
                    <div className='d-flex text-left mb-3'>
                      Min. Altitude
                      <input
                        type='text'
                        className='ml-3 form-control small-input-box d-inline'
                        placeholder='0'
                        readOnly={geofenceState.altitudeReadonly || isReadonly}
                        value={geofenceState.minAltitude}
                        onChange={(e: any) => {
                          setGeofenceState({
                            ...geofenceState,
                            minAltitude: e.target.value,
                          });
                        }}
                      ></input>
                    </div>
                    <div className='d-flex text-left'>
                      Max. Altitude
                      <input
                        type='text'
                        className='ml-3 form-control small-input-box d-inline'
                        placeholder='0'
                        readOnly={geofenceState.altitudeReadonly || isReadonly}
                        value={geofenceState.maxAltitude}
                        onChange={(e: any) => {
                          setGeofenceState({
                            ...geofenceState,
                            maxAltitude: e.target.value,
                          });
                        }}
                      ></input>
                    </div>
                  </td>
                  <td className='small-shell text-right'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      id='examp1'
                      onChange={changeTime}
                      readOnly={isReadonly}
                    ></input>
                  </td>
                  <td>
                    <div className='d-flex text-left mb-3'>Time</div>
                    <div className='d-flex text-left mb-3'>
                      Start Time
                      <input
                        type='text'
                        className='ml-3 form-control small-input-box d-inline'
                        placeholder='09 00'
                        readOnly={geofenceState.timeReadonly || isReadonly}
                        value={geofenceState.startTime}
                        onChange={(e: any) => {
                          setGeofenceState({
                            ...geofenceState,
                            startTime: e.target.value,
                          });
                        }}
                      ></input>
                    </div>
                    <div className='d-flex text-left'>
                      End Time
                      <input
                        type='text'
                        className='ml-3 form-control small-input-box d-inline'
                        placeholder='06 00'
                        readOnly={geofenceState.timeReadonly || isReadonly}
                        value={geofenceState.endTime}
                        onChange={(e: any) => {
                          setGeofenceState({
                            ...geofenceState,
                            endTime: e.target.value,
                          });
                        }}
                      ></input>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className='small-shell text-right'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      id='eamp1'
                      onChange={changeVelocity}
                      readOnly={isReadonly}
                    ></input>
                  </td>
                  <td>
                    <div className='d-flex text-left mb-3'>Velocity</div>
                    <div className='d-flex text-left mb-3'>
                      <input
                        type='text'
                        className='form-control small-input-box d-inline'
                        placeholder='Knots'
                        readOnly={geofenceState.velocityReadonly || isReadonly}
                      ></input>
                    </div>
                    <div className='d-flex text-left'>
                      <div className='form-group form-check m-0 d-flex align-items-center justify-content-between mr-3'>
                        <input
                          type='radio'
                          className='form-check-input'
                          id='exampradio1'
                          value='above'
                          disabled={
                            geofenceState.velocityReadonly || isReadonly
                          }
                          checked={
                            geofenceState.velocityTypeSelected === 'above'
                          }
                          onChange={(e) => {
                            setGeofenceState({
                              ...geofenceState,
                              velocityTypeSelected: e.target.value,
                            });
                          }}
                        ></input>
                        <label
                          className='form-check-label ml-3'
                          htmlFor='exampradio1'
                        >
                          Above
                        </label>
                      </div>
                      <div className='form-group ml-3 form-check m-0 d-flex align-items-center justify-content-between'>
                        <input
                          type='radio'
                          className='form-check-input'
                          id='exampleCheck222'
                          value='below'
                          disabled={
                            geofenceState.velocityReadonly || isReadonly
                          }
                          checked={
                            geofenceState.velocityTypeSelected === 'below'
                          }
                          onChange={(e) => {
                            setGeofenceState({
                              ...geofenceState,
                              velocityTypeSelected: e.target.value,
                            });
                          }}
                        ></input>
                        <label
                          className='form-check-label ml-3'
                          htmlFor='exampleCheck222'
                        >
                          Below
                        </label>
                      </div>
                    </div>
                  </td>
                  <td className='small-shell text-right'>
                    <h3 className='edit-heading'>Days</h3>
                  </td>
                  <td>
                    <div className='d-flex'>
                      {checkboxDaysList.map((item: any, index: any) => {
                        return (
                          <div className='day-column'>
                            <div className='form-group ml-3 form-check m-0 d-flex align-items-center justify-content-between'>
                              <input
                                type='checkbox'
                                className='form-check-input'
                                id={item.id}
                                checked={item.isChecked}
                                onChange={() =>
                                  handleDaysListCheckboxChange(item.id)
                                }
                                disabled={isReadonly}
                              ></input>
                              <label
                                className='form-check-label ml-3'
                                htmlFor='exampleCheck222'
                              >
                                {item.name}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {isReadonly == false ? (
              <div className='d-flex align-items-center justify-content-end mt-3 mr-3'>
                <GET_CREATE_UPDATE_BUTTON></GET_CREATE_UPDATE_BUTTON>
                <button
                  type='button'
                  className='cl-btn cl-btn-secondary white-btn'
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
export default Editlayer;
