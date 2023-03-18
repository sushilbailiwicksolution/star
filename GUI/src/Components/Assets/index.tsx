import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { assetService } from '../../Service/asset.service';
import LeftPanel from './LeftPanel';

function Assets(props: any) {
  const [loader, setLoader] = useState(true);
  const [assetList, setAssetList] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState('');
  useEffect(() => {
    let logedInUser: any = localStorage.getItem('logedInUser');
    logedInUser = JSON.parse(logedInUser);
    setLoggedInUser(logedInUser.results.username);
    getAssetsList();
  }, []);

  const getAssetsList = async () => {
    try {
      let response = await assetService.getAssetsList();
      setLoader(false);
      if (response.status == 200) {
        setAssetList(response.data.results);
      }
    } catch (error: any) {
      setLoader(false);
      toast.error(error.msg);
    }
  };

  const deleteAsset = async (item: any) => {
    setLoader(true);
    try {
      let response = await assetService.deleteAsset(item.id);
      setAssetList(assetList.filter((event: any) => event.id !== item.id));
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
        <div className='row h-100vh-80px'>
          <LeftPanel props={props} />
          <div className='col-lg-9 col-xl-10 my-4'>
            <div className='row mt-5'>
              <div className='col-md-8 d-flex align-items-center '>
                <h2 className='cl-white mr-5'>Assets</h2>
                <button
                  className='cl-btn cl-btn-tartiary'
                  onClick={() => {
                    props.history.push('/create-asset');
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
                      <th scope='col'>Asset Id</th>
                      <th scope='col'>Name</th>
                      <th scope='col'>Customer</th>
                      <th scope='col'>Description</th>
                      <th scope='col'>View</th>
                      <th scope='col'>Edit</th>
                      <th scope='col'>Delete</th>
                      {/* <th scope='col'>Acl</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {assetList.map((item: any, index: any) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{loggedInUser}</td>
                          <td>{item.description}</td>
                          <td className='table-icon-cell'>
                            <i
                              className='fa fa-eye cursor-pointer'
                              aria-hidden='true'
                              onClick={() => {
                                props.history.push({
                                  pathname: '/create-asset',
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
                                  pathname: '/create-asset',
                                  state: { isEdit: true, data: item }, // your data array of objects
                                });
                              }}
                            ></i>
                          </td>
                          <td className='table-icon-cell'>
                            <i
                              className='fa fa-trash cursor-pointer'
                              aria-hidden='true'
                              onClick={() => deleteAsset(item)}
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

export default Assets;
