import React, { useEffect, useState, memo } from 'react';
import { planService } from '../../Service/plan.service';
import LeftPanel from './LeftPanel';
import { toast } from 'react-toastify';
import { EDIT_VIEW_LANDMARK_DATA } from '../../Constants/constants';

const LandmarkList = (props: any) => {
  const [loader, setLoader] = useState(true);
  const [landmarkListItems, setLandmarkListItems] = useState([]);

  useEffect(() => {
    sessionStorage.removeItem(EDIT_VIEW_LANDMARK_DATA);
    getLandmarkList();
  }, []);

  const getLandmarkList = async () => {
    try {
      let response = await planService.getLandmarkList();
      setLoader(false);
      if (response.status == 200) {
        setLandmarkListItems(response.data);
      }
    } catch (error: any) {
      setLoader(false);
      toast.error(error.msg);
    }
  };

  const deleteLandmark = async (item: any) => {
    setLoader(true);
    try {
      let response = await planService.deleteLandmark(item.id);
      setLandmarkListItems(
        landmarkListItems.filter((event: any) => event.id !== item.id)
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
      <div className='loading' style={{ display: loader ? 'block' : 'none' }}>
        <img src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' />
      </div>
      <div className='container-fluid content-body vh-100'>
        <div className='row'>
          <LeftPanel props={props} />
          <div className='col-lg-9 col-xl-10 my-4'>
            <div className='row mt-5'>
              <div className='col-md-8 d-flex align-items-center '>
                <h2 className='cl-white mr-5'>Landmark</h2>
                <button
                  className='cl-btn cl-btn-tartiary'
                  onClick={() => {
                    props.history.push('/landmark');
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
                      <th scope='col'>Customer</th>
                      <th scope='col'>Layer Name</th>
                      <th scope='col'>Created By</th>
                      <th scope='col'>View</th>
                      <th scope='col'>Edit</th>
                      <th scope='col'>Delete</th>
                      {/* <th scope='col'>Acl</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr>
                      <td>starads</td>
                      <td>Test_layers</td>
                      <td>TrooQA</td>
                      <td className='table-icon-cell'>
                        <i className='fa fa-eye' aria-hidden='true'></i>
                      </td>
                      <td className='table-icon-cell'>
                        <i
                          className='fa fa-file'
                          aria-hidden='true'
                          onClick={() => {
                            props.history.push({
                              pathname: '/create-layer',
                              state: { isEdit: 'yes' }, // your data array of objects
                            });
                          }}
                        ></i>
                      </td>
                      <td className='table-icon-cell'>
                        <i className='fa fa-trash' aria-hidden='true'></i>
                      </td>
                      <td className='table-icon-cell'>
                        <i className='fa fa-key' aria-hidden='true'></i>
                      </td>
                    </tr> */}
                    {landmarkListItems.map((item: any, index: any) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.createdBy}</td>
                          <td>{item.layerId}</td>
                          <td>{item.createdBy}</td>
                          <td className='table-icon-cell'>
                            <i
                              className='fa fa-eye cursor-pointer'
                              aria-hidden='true'
                              onClick={() => {
                                sessionStorage.setItem(
                                  EDIT_VIEW_LANDMARK_DATA,
                                  JSON.stringify({ isEdit: false, data: item })
                                );
                                props.history.push({
                                  pathname: '/landmark',
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
                                sessionStorage.setItem(
                                  EDIT_VIEW_LANDMARK_DATA,
                                  JSON.stringify({ isEdit: true, data: item })
                                );
                                props.history.push({
                                  pathname: '/landmark',
                                  state: { isEdit: true, data: item }, // your data array of objects
                                });
                              }}
                            ></i>
                          </td>
                          <td className='table-icon-cell'>
                            <i
                              className='fa fa-trash cursor-pointer'
                              aria-hidden='true'
                              onClick={() => deleteLandmark(item)}
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
};

export default memo(LandmarkList);
