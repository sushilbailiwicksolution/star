/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { userService } from '../../Service/user.service';
import LeftPanel from '../Assets/LeftPanel';
import { toast } from 'react-toastify';

function Users(props: any) {
  const [loader, setLoader] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    let logedInUser: any = localStorage.getItem('logedInUser');
    logedInUser = JSON.parse(logedInUser);
    setLoggedInUser(logedInUser.results.username);
    getUserList();
  }, []);

  const getUserList = async () => {
    try {
      let response = await userService.getUsersList();
      setLoader(false);
      if (response.status == 200) {
        //setUserList(response.data);
        setUserList(response.data.results);
      }
    } catch (error: any) {
      setLoader(false);
      toast.error(error.msg);
    }
  };

  const deleteAsset = async (item: any) => {
    setLoader(true);
    try {
      let response = await userService.deleteUser(item.id);
      setUserList(userList.filter((event: any) => event.id !== item.id));
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
      <div className='container-fluid content-body'>
        <div className='row h-100vh-80px'>
          <LeftPanel props={props} />
          <div className='col-lg-9 col-xl-10 my-4'>
            <div className='row mt-5'>
              <div className='col-md-12'>
                <div className='row'>
                  <div className='col-md-8 d-flex align-items-center'>
                    <h2 className='cl-white mr-5'>Users</h2>
                    <button
                      className='cl-btn cl-btn-tartiary'
                      onClick={() => {
                        props.history.push('/create-user');
                      }}
                    >
                      Create New User
                    </button>
                  </div>
                  <div className='col-md-4 d-flex align-items-center justify-content-end'>
                    <i className='fas fa-filter cl-white mr-5 fa-2x'></i>
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

                <div className='row mt-5'>
                  {userList.map((item: any, index: any) => {
                    return (
                      <div className='col-md-4 mb-5'>
                        <div className='users-card px-4'>
                          <div className='row cl-white '>
                            <div className=' d-flex w-100 py-4'>
                              <div className='col-md-3'>
                                <div className='user-pic'>
                                  <img
                                    src={
                                      require('../../../src/Assets/images/user-img.jpg')
                                        .default
                                    }
                                    style={{ maxWidth: '100%' }}
                                  />
                                </div>
                              </div>
                              <div className='col-md-9'>
                                <div className='row'>
                                  <div className='col-md-12'>
                                    <div className='row'>
                                      <div className='col-md-7 text-left '>
                                        <h3 className='m-0'>
                                          <span>
                                            {item.username} {item.lastname}
                                          </span>
                                        </h3>
                                      </div>
                                      <div className='col-md-5 d-flex justify-content-between'>
                                        <i
                                          className='fas fa-edit'
                                          onClick={() => {
                                            props.history.push({
                                              pathname: '/create-user',
                                              state: {
                                                isEdit: true,
                                                data: item,
                                              }, // your data array of objects
                                            });
                                          }}
                                        ></i>
                                        <i
                                          className='far fa-trash-alt'
                                          onClick={() => deleteAsset(item)}
                                        ></i>
                                        <i className='fas fa-ellipsis-v'></i>
                                      </div>
                                    </div>
                                    <div className='row mt-4'>
                                      <div className='col-md-12 text-left user-content'>
                                        <p className='m-0'>Customer</p>
                                        <p className='m-0'>
                                          Login Id: <span>sntest</span>
                                        </p>
                                        <p className='m-0'>
                                          Email :<span>allen.gille@me.com</span>
                                        </p>
                                        <p className='m-0'>
                                          Mobile: <span>8713933932</span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* <div className='col-md-4 mb-5'>
                    <div className='users-card px-4'>
                      <div className='row cl-white '>
                        <div className=' d-flex w-100 py-4'>
                          <div className='col-md-3'>
                            <div className='user-pic'></div>
                          </div>
                          <div className='col-md-9'>
                            <div className='row'>
                              <div className='col-md-12'>
                                <div className='row'>
                                  <div className='col-md-7 text-left '>
                                    <h3 className='m-0'>
                                      <span>Star Nav</span>
                                    </h3>
                                  </div>
                                  <div className='col-md-5 d-flex justify-content-between'>
                                    <i className='fas fa-edit'></i>
                                    <i className='far fa-trash-alt'></i>
                                    <i className='fas fa-ellipsis-v'></i>
                                  </div>
                                </div>
                                <div className='row mt-4'>
                                  <div className='col-md-12 text-left user-content'>
                                    <p className='m-0'>Customer</p>
                                    <p className='m-0'>
                                      Login Id: <span>sntest</span>
                                    </p>
                                    <p className='m-0'>
                                      Email :<span>allen.gille@me.com</span>
                                    </p>
                                    <p className='m-0'>
                                      Mobile: <span>8713933932</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            {/*             
            <div className='row mt-5'>
              <div className='col-md-12'>
                <nav aria-label='Page navigation example'>
                  <ul className='pagination justify-content-end'>
                    <li className='page-item'>
                      <a className='page-link' href='#' aria-label='Previous'>
                        <span aria-hidden='true'>&laquo;</span>
                        <span className='sr-only'>Previous</span>
                      </a>
                    </li>
                    <li className='page-item'>
                      <a className='page-link' href='#'>
                        1
                      </a>
                    </li>
                    <li className='page-item'>
                      <a className='page-link' href='#'>
                        2
                      </a>
                    </li>
                    <li className='page-item'>
                      <a className='page-link' href='#'>
                        3
                      </a>
                    </li>
                    <li className='page-item'>
                      <a className='page-link' href='#'>
                        4
                      </a>
                    </li>
                    <li className='page-item'>
                      <a className='page-link' href='#'>
                        5
                      </a>
                    </li>
                    <li className='page-item'>
                      <a className='page-link' href='#'>
                        6
                      </a>
                    </li>
                    <li className='page-item'>
                      <a className='page-link' href='#' aria-label='Next'>
                        <span aria-hidden='true'>&raquo;</span>
                        <span className='sr-only'>Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Users;
