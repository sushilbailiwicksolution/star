import React, { useState, useEffect } from 'react';
import LeftPanel from '../Assets/LeftPanel';

function Users(props: any) {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 300);
  }, []);

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
                  </div>
                  <div className='col-md-4 mb-5'>
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
                  </div>
                  <div className='col-md-4 mb-5'>
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
                  </div>
                  <div className='col-md-4 mb-5'>
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
                  </div>
                  <div className='col-md-4 mb-5'>
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
                  </div>
                  <div className='col-md-4 mb-5'>
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
                  </div>
                  <div className='col-md-4 mb-5'>
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
                  </div>
                  <div className='col-md-4 mb-5'>
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
                  </div>
                  <div className='col-md-4 mb-5'>
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
                  </div>
                </div>
              </div>
            </div>
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
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Users;
