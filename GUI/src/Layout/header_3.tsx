import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';

function Header(props: any) {
  const [showNotifications, updateShowNotifications] = useState(false);
  useEffect(() => {
    try {
      const element = document.getElementById('root');
      element?.addEventListener('click', bodyClick);
    } catch (err1) { }
    return () => {
      try {
        const element = document.getElementById('root');
        element?.removeEventListener('click', bodyClick);
      } catch (err1) { }
    };
  }, []);

  const bodyClick = (e: any) => {
    const childContainer = document.querySelector('#notification-message-box')
      ? document.querySelector('#notification-message-box')
      : '';
    const parentContainer = document.querySelector('#notification-message')
      ? document.querySelector('#notification-message')
      : '';
    if (
      parentContainer &&
      childContainer &&
      (childContainer.contains(e.target) || parentContainer.contains(e.target))
    ) {
    } else {
      updateShowNotifications(false);
    }
  };

  const showHideList = () => {
    updateShowNotifications(!showNotifications);
  };

  return (
    <React.Fragment>
      <ReactTooltip />
      <div className='container-fluid header-background'>
        <div className='row h-100'>
          <div className='col-md-2'>
            <div className='row h-100'>
              <div className='col-12 d-flex align-items-center'>
                <div className='profilePic mr-4'>
                  <img
                    src={
                      require('../../src/Assets/images/user-img.jpg').default
                    }
                    style={{ maxWidth: '100%' }}
                  />
                </div>
                <h4 className='cl-white m-0 text-left header-text-style'>
                  <label className='d-block m-0'>Admin</label>
                  <span>Junaid</span>
                </h4>
              </div>
            </div>
          </div>
          <div className='col-md-10'>
            <div className='row h-100'>
              <div className='col-md-9'>
                <ul className='Menulist justify-content-end h-100'>
                  <li>
                    <span
                      onClick={() => {
                        window.location.href = '/dashboard';
                      }}
                    >
                      Main
                    </span>
                    {/* <a href="javascript:void(0)" onClick={() => { props.history.push('/dashboard') }}>
                                            <i className="fas fa-home"></i>
                                        </a> */}
                  </li>

                  <li>
                    <div className='dropdown p-0'>
                      <button
                        className='btn btn-secondary dropdown-toggle'
                        type='button'
                        id='dropdownMenu1'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'
                      >
                        Notifications
                      </button>
                      <ul
                        className='dropdown-menu multi-level'
                        role='menu'
                        aria-labelledby='dropdownMenu'
                      >
                        <li className='dropdown-submenu'>
                          <a className='dropdown-item' href='#'>
                            Layers
                          </a>
                          <ul className='dropdown-menu'>
                            <li
                              className='dropdown-item'
                              onClick={() => {
                                props.history.push('/plan');
                              }}
                            >
                              <a href='#'>Layers</a>
                            </li>
                            {/* <li className="dropdown-item"><a href="#" onClick={() => {  window.location.href='/location' }}>Location 1</a></li> */}
                            <li className='dropdown-item'>
                              <a
                                href='#'
                                onClick={() => {
                                  props.history.push('/landmark-list');
                                }}
                              >
                                Landmark
                              </a>
                            </li>
                            <li className='dropdown-item'>
                              <a
                                href='#'
                                onClick={() => {
                                  props.history.push('/map-layer');
                                }}
                              >
                                KML Layer
                              </a>
                            </li>
                            {/* <li className="dropdown-submenu">
                                                <a className="dropdown-item" href="#">Even More..</a>
                                                <ul className="dropdown-menu">
                                                    <li className="dropdown-item"><a href="#">3rd level</a></li>
                                                        <li className="dropdown-submenu"><a className="dropdown-item" href="#">another level</a>
                                                        <ul className="dropdown-menu">
                                                            <li className="dropdown-item"><a href="#">4th level</a></li>
                                                            <li className="dropdown-item"><a href="#">4th level</a></li>
                                                            <li className="dropdown-item"><a href="#">4th level</a></li>
                                                        </ul>
                                                    </li>
                                                        <li className="dropdown-item"><a href="#">3rd level</a></li>
                                                </ul>
                                                </li> */}
                          </ul>
                        </li>
                        <li className='dropdown-item'>
                          <a
                            href='#'
                            onClick={(e) => {
                              props.history.push('/notification');
                            }}
                          >
                            Notification
                          </a>
                        </li>
                        <li className='dropdown-item'>
                          <a
                            href='#'
                            onClick={(e) => {
                              props.history.push('/geofences');
                            }}
                          >
                            Geofences
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li>
                    <div className='dropdown p-0'>
                      <button
                        className='btn btn-secondary dropdown-toggle custom-toggle'
                        type='button'
                        id='dropdownMenuButton'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'
                      >
                        <span>Track</span>
                      </button>
                      <div
                        className='dropdown-menu'
                        aria-labelledby='dropdownMenuButton'
                      >
                        <button
                          className='dropdown-item'
                          onClick={() => {
                            props.history.push('/view');
                          }}
                        >
                          Map
                        </button>
                        {/* <button className="dropdown-item" onClick={() => { props.history.push('/map-layer') }}>KML Layer</button> */}
                        <button className='dropdown-item' onClick={() => {
                          props.history.push('/view/assetList');
                        }}>Assets list</button>
                        <button className='dropdown-item' onClick={() => {
                          props.history.push('/view/events');
                        }}>Events</button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <span
                      onClick={() => {
                        props.history.push('/analyze');
                      }}
                    >
                      Trip Replay
                    </span>
                    {/* <a href="javascript:void(0)" onClick={() => { props.history.push('/analyze') }}>
                                            <i className="fas fa-chart-line"></i>
                                        </a> */}
                  </li>
                  <li>
                    <span
                      onClick={() => {
                        props.history.push('/reports');
                      }}
                    >
                      EOF Reports
                    </span>
                    {/* <a href="javascript:void(0)" onClick={() => { props.history.push('/reports') }}>
                                            <i className="fas fa-file"></i>
                                        </a> */}
                  </li>
                  <li>
                    <div className='dropdown p-0'>
                      <button
                        className='btn btn-secondary dropdown-toggle custom-toggle'
                        type='button'
                        id='dropdownMenuButton'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'
                      >
                        <span>Users</span>
                      </button>
                      <div
                        className='dropdown-menu'
                        aria-labelledby='dropdownMenuButton'
                      >
                        <button
                          className='dropdown-item'
                          onClick={() => {
                            props.history.push('/assets');
                          }}
                        >
                          Assets
                        </button>
                        <button
                          className='dropdown-item'
                          onClick={() => {
                            props.history.push('/users');
                          }}
                        >
                          User
                        </button>
                        <button
                          className='dropdown-item'
                          onClick={() => {
                            props.history.push('/admin');
                          }}
                        >
                          Management
                        </button>
                        <button
                          className='dropdown-item'
                          onClick={() => {
                            props.history.push('/customers');
                          }}
                        >
                          Customer
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <span>Help</span>
                    {/* <a href="javascript:void(0)">
                                            <i className="far fa-address-book"></i>
                                        </a> */}
                  </li>
                </ul>
              </div>
              <div className='col-md-3'>
                <div className='row h-100'>
                  <div className='col-6 d-flex align-items-center'>
                    <h4 className='cl-white m-0 text-left header-text-style'>
                      {/* <label className="d-block m-0">{currentDateTime.currTime}</label>
                                            <span>{currentDateTime.currDate}</span> */}
                    </h4>
                  </div>
                  <div className='col-6 d-flex align-items-center justify-content-around'>
                    {/* <div className="header-icon-bg">
                                            <i className="fas fa-search"></i>
                                        </div>
                                        <div className="header-icon-bg">
                                            <i className="far fa-comment-dots"></i>
                                        </div> */}
                    <div className='header-icon-bg position-relative'>
                      <i
                        className='far fa-bell'
                        id='notification-message'
                        onClick={showHideList}
                        style={{ cursor: 'pointer' }}
                      ></i>
                      <div className='notification-count'>01</div>
                      {showNotifications ? (
                        <div
                          className='notification-message-box'
                          id='notification-message-box'
                        >
                          <p>Sample notification</p>
                          {/* <p>This is dummy data</p>
                          <p>sit amet conser adipisicing elit. ipsum dolor</p>
                          <p>This is only to check the styling</p>
                          <p>Please put some data in this</p>
                          <p>Flight is moving at 360</p> */}
                        </div>
                      ) : null}
                    </div>
                    <div
                      className='header-icon-bg position-relative'
                      onClick={() => {
                        localStorage.clear();
                        props.history.push('/logout');
                      }}
                      data-tip='Sign out'
                    >
                      <i className='fas fa-sign-out-alt'></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Header;
