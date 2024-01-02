import React, { useEffect, useState } from 'react';
import LeftPanel from './LeftPanel';
import { planService } from '../../Service/plan.service';
import { toast } from 'react-toastify';


/**
 * This component is handling view aspects of geofence create,delete,view etc.
 * @component
 */
function Plan(props: any) {
  const [loader, setLoader] = useState(true);
  const [geofenceList, setGeofenceListItems] = useState([]);

  useEffect(() => {
    getGeofenceList();
  }, []);

    /**
   * Fetches the list of geofences from the server.
   * Updates the state with the fetched geofence list.
   */
  const getGeofenceList = async () => {
    try {
      let response = await planService.getGeofenceList();
      setLoader(false);
      if (response.status == 200) {
        setGeofenceListItems(response.data.results);
      }
    } catch (error: any) {
      setLoader(false);
      toast.error(error.msg);
    }
  };

   /**
   * Deletes a geofence item from the server.
   * Removes the deleted geofence item from the state.
   * @param item - The geofence item to be deleted.
   */
  const deleteGeofence = async (item: any) => {
    setLoader(true);
    try {
      let response = await planService.deleteGeofence(item.id);
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
      <div className='loading' style={{ display: loader ? 'block' : 'none' }}>
        <img src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' />
      </div>
      <div className='container-fluid content-body vh-100'>
        <div className='row h-100vh-80px'>
          <LeftPanel props={props} />
          <div className='col-lg-9 col-xl-10 my-4'>
            <div className='row mt-5'>
              <div className='col-md-4 d-flex align-items-center '>
                <h2 className='cl-white mr-5'>GeoFences</h2>
                {accountType === "SERVICE" && (
                <button
                  className='cl-btn cl-btn-tartiary'
                  onClick={() => {
                    props.history.push('/create-geoFences');
                  }}
                >
                  Create
                </button>
                )}
              </div>
              {/* <div className='col-md-3 d-flex align-items-center justify-content-end'>
                <span className='cl-white mr-3'>Vehicles</span>
                <select className='form-control head-dropdown w-75'>
                  <option>All </option>
                  <option>High</option>
                </select>
              </div>
              <div className='col-md-5 d-flex align-items-center justify-content-end'>
                <span className='cl-white mr-3'>Layer Name</span>
                <select className='form-control head-dropdown w-50'>
                  <option>All </option>
                  <option>High</option>
                </select>
                <button className='cl-btn cl-btn-tartiary'>Filter</button>
              </div> */}
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <table className='table table-striped table-dark mt-5'>
                  <thead>
                    <tr>
                      <th scope='col'>Customer</th>
                      <th scope='col'>Name</th>
                      <th scope='col'>Layer Name</th>
                      <th scope='col'>Notify</th>
                      {/* <th scope='col'>Active</th> */}
                      <th scope='col'>Severity</th>
                      <th scope='col'>Created By</th>
                      <th scope='col'>View</th>
                      {accountType === "SERVICE" && (
                      <th scope='col'>Edit</th>
                      )}
                       {accountType === "SERVICE" && (
                      <th scope='col'>Delete</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {geofenceList.map((item: any, index: any) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.createdBy}</td>
                          <td>{item.name}</td>
                          <td>{item?.layer?.name}</td>
                          <td>{item.notify}</td>
                          {/* <td>Yes</td> */}
                          <td>{item.eventSeverity}</td>
                          <td>{item.createdBy}</td>
                          <td className='table-icon-cell'>
                            <i
                              className='fa fa-eye'
                              aria-hidden='true'
                              onClick={() => {
                                props.history.push({
                                  pathname: '/create-geoFences',
                                  state: { isEdit: false, data: item }, // your data array of objects
                                });
                              }}
                            ></i>
                          </td>
                          {accountType === "SERVICE" && (
                          <td className='table-icon-cell'>
                            <i
                              className='fa fa-file'
                              aria-hidden='true'
                              onClick={() => {
                                props.history.push({
                                  pathname: '/create-geoFences',
                                  state: { isEdit: true, data: item }, // your data array of objects
                                });
                              }}
                            ></i>
                          </td>
                          )}
                          {accountType === "SERVICE" && ( <td className='table-icon-cell'>
                            <i
                              className='fa fa-trash'
                              aria-hidden='true'
                              onClick={() => deleteGeofence(item)}
                            ></i>
                          </td>
                          )}
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

export default Plan;
