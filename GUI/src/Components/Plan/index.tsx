import React, { useEffect, useState } from 'react';
import { planService } from '../../Service/plan.service';
import LeftPanel from './LeftPanel';
import { toast } from 'react-toastify';

function Plan(props: any) {
  const [loader, setLoader] = useState(true);
  const [layerList, setLayerList] = useState([]);

  useEffect(() => {
    getLayersList();
  }, []);

  const getLayersList = async () => {
    try {
      let response = await planService.getLayersList();
      setLoader(false);
      if (response.status == 200) {
        setLayerList(response.data);
      }
    } catch (error: any) {
      setLoader(false);
      toast(error.msg);
    }
  };

  const deleteLayer = async (item: any) => {
    setLoader(true);
    try {
      let response = await planService.deleteLayer(item.id);
      setLayerList(layerList.filter((event: any) => event.id !== item.id));
      setLoader(false);
      toast(response.msg);
    } catch (error: any) {
      setLoader(false);
      toast(error.msg);
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
                <h2 className='cl-white mr-5'>Layers</h2>
                <button
                  className='cl-btn cl-btn-tartiary'
                  onClick={() => {
                    props.history.push('/create-layer');
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
                    {layerList.map((item: any, index: any) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.createdBy}</td>
                          <td>{item.name}</td>
                          <td>{item.createdBy}</td>
                          <td className='table-icon-cell'>
                            <i
                              className='fa fa-eye cursor-pointer'
                              aria-hidden='true'
                              onClick={() => {
                                props.history.push({
                                  pathname: '/create-layer',
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
                                  pathname: '/create-layer',
                                  state: { isEdit: true, data: item }, // your data array of objects
                                });
                              }}
                            ></i>
                          </td>
                          <td className='table-icon-cell'>
                            <i
                              className='fa fa-trash cursor-pointer'
                              aria-hidden='true'
                              onClick={() => deleteLayer(item)}
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

export default Plan;
