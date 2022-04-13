import React, { useEffect, useState } from 'react';
import LeftPanel from './LeftPanel';
import { toast } from 'react-toastify';
import { planService } from '../../Service/plan.service';

function Notification(props: any) {
  const [loader, setLoader] = useState(true);
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    getNotificationList();
  }, []);

  const getNotificationList = async () => {
    try {
      let response = await planService.getNotificationList();
      setLoader(false);
      if (response.status == 200) {
        //setNotificationList(response.data.result);
        setNotificationList(response.data.results);
      }
    } catch (error: any) {
      setLoader(false);
      toast(error.msg);
    }
  };

  const deleteNotification = async (item: any) => {
    setLoader(true);
    try {
      let response = await planService.deleteNotification(item.id);
      setNotificationList(
        notificationList.filter((event: any) => event.id !== item.id)
      );
      setLoader(false);
      toast.success(response.msg);
    } catch (error: any) {
      setLoader(false);
      toast.error(error.msg);
    }
  };

  return (
    <React.Fragment>
      <div className='container-fluid content-body vh-100'>
        <div className='row'>
          <LeftPanel props={props} />
          <div className='col-lg-9 col-xl-10 my-4'>
            <div className='row mt-5'>
              <div className='col-md-8 d-flex align-items-center '>
                <h2 className='cl-white mr-5'>Notifications User List</h2>
                <button
                  className='cl-btn cl-btn-tartiary'
                  onClick={() => {
                    props.history.push('/create-notification');
                  }}
                >
                  Create
                </button>
              </div>
              <div className='col-md-4 d-flex align-items-center justify-content-end'>
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <i className='fas fa-search'></i>
                    </span>
                  </div>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Search Name'
                  ></input>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <table className='table table-striped table-dark mt-5'>
                  <thead>
                    <tr>
                      <th scope='col'>Notification Name</th>
                      <th scope='col'>Creation Date</th>
                      <th scope='col'>Created By</th>
                      <th scope='col'>View</th>
                      <th scope='col'>Edit</th>
                      <th scope='col'>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notificationList.map((item: any, index: any) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.createdAt}</td>
                          <td>{item.createdBy}</td>
                          <td className='table-icon-cell'>
                            <i
                              className='fa fa-eye cursor-pointer'
                              aria-hidden='true'
                              onClick={() => {
                                props.history.push({
                                  pathname: '/create-notification',
                                  state: { isEdit: false, data: item }, // your data array of objects
                                });
                              }}
                            ></i>
                          </td>
                          <td className='table-icon-cell'>
                            <i
                              className='fa fa-file cursor-pointer'
                              aria-hidden='true'
                              onClick={() => {
                                props.history.push({
                                  pathname: '/create-notification',
                                  state: { isEdit: true, data: item }, // your data array of objects
                                });
                              }}
                            ></i>
                          </td>
                          <td className='table-icon-cell'>
                            <i
                              className='fa fa-trash cursor-pointer'
                              aria-hidden='true'
                              onClick={() => deleteNotification(item)}
                            ></i>
                          </td>
                          {/* <td className='table-icon-cell'>
                            <i className='fa fa-key' aria-hidden='true'></i>
                          </td> */}
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

export default Notification;
