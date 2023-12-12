/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { customerService } from "../Service/customer.service";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { planActions } from "../action/plan.action";

/**
 * This component is handling header sction of site .
 * @component
 */

function Header(props: any) {
  const dispatch = useDispatch();

  const [showNotifications, updateShowNotifications] = useState(false);

  const [showCustomers, setShowCustomers] = useState(false);
  interface Customer {
    id: number;
    name: string;
    // add other properties as needed
  }

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);

  let logedInUser: any = localStorage.getItem("logedInUser");
  logedInUser = JSON.parse(logedInUser);

  useEffect(() => {
    try {
      const element = document.getElementById("root");
      element?.addEventListener("click", bodyClick);

      //Visible buttons based on user logged In
      getCustomer();
    } catch (err1) {}
    return () => {
      try {
        const element = document.getElementById("root");
        element?.removeEventListener("click", bodyClick);
      } catch (err1) {}
    };
  }, []);

  const bodyClick = (e: any) => {
    const childContainer = document.querySelector("#notification-message-box")
      ? document.querySelector("#notification-message-box")
      : "";
    const parentContainer = document.querySelector("#notification-message")
      ? document.querySelector("#notification-message")
      : "";
    if (
      parentContainer &&
      childContainer &&
      (childContainer.contains(e.target) || parentContainer.contains(e.target))
    ) {
    } else {
      updateShowNotifications(false);
    }
  };

  const getCustomer = async () => {
    try {
      let response = await customerService.getCustomersList();
      if (response.status == 200) {
        setCustomers(response.data.results);
      }
    } catch (err) {
      throw err;
    }
  };
  const showHideList = () => {
    updateShowNotifications(!showNotifications);
    setShowCustomers(!showCustomers);
  };

  const pickedCustomer = (customer: any) => {
    // Handle customer selection logic
    setSelectedCustomer(customer);
    dispatch(planActions.setSelectedCustomer(customer));
    toast.info(`Will continue as customer ${customer.name}`);
    // Close the tab
    updateShowNotifications(false);
  };

  return (
    <React.Fragment>
      <ReactTooltip />
      <div className="container-fluid header-background">
        <div className="row h-100">
          <div className="col-md-2">
            <div className="row h-100">
              <div className="col-12 d-flex align-items-center">
                {/* <div className="profilePic mr-4">
                  <img
                    src={
                      require("../../src/Assets/images/user-img.jpg").default
                    }
                    style={{ maxWidth: "100%" }}
                  />
                </div> */}
                <h4 className="cl-white m-0 text-left header-text-style">
                  <label className="d-block m-0">
                    {logedInUser.results.username}{" "}
                    {logedInUser.results.lastname}
                  </label>
                  <span style={{ whiteSpace: "nowrap" }}>
                    {logedInUser.results.email_id}
                  </span>
                </h4>
              </div>
            </div>
          </div>
          <div className="col-md-10">
            <div className="row h-100">
              <div className="col-md-9">
                <ul className="Menulist justify-content-end h-100">
                  <li>
                    <span
                      onClick={() => {
                        window.location.href = "/dashboard";
                      }}
                    >
                      Main
                    </span>
                    {/* <a href="javascript:void(0)" onClick={() => { props.history.push('/dashboard') }}>
                                            <i className="fas fa-home"></i>
                                        </a> */}
                  </li>

                  <li>
                    <div className="dropdown p-0">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Notifications
                      </button>
                      <ul
                        className="dropdown-menu multi-level"
                        role="menu"
                        aria-labelledby="dropdownMenu"
                      >
                        <li className="dropdown-submenu">
                          <a className="dropdown-item" href="#">
                            Layers
                          </a>
                          <ul className="dropdown-menu">
                            <li
                              className="dropdown-item"
                              onClick={() => {
                                props.history.push("/plan");
                              }}
                            >
                              <a href="#">Layers</a>
                            </li>
                            {/* <li className="dropdown-item"><a href="#" onClick={() => {  window.location.href='/location' }}>Location 1</a></li> */}
                            <li className="dropdown-item">
                              <a
                                href="#"
                                onClick={() => {
                                  props.history.push("/landmark-list");
                                }}
                              >
                                Landmark
                              </a>
                            </li>
                            {/* <li className="dropdown-item">
                              <a
                                href="#"
                                onClick={() => {
                                  props.history.push("/map-layer");
                                }}
                              >
                                KML Layer
                              </a>
                            </li> */}
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
                        <li className="dropdown-item">
                          <a
                            href="#"
                            onClick={(e) => {
                              props.history.push("/notification");
                            }}
                          >
                            Notification
                          </a>
                        </li>
                        <li className="dropdown-item">
                          <a
                            href="#"
                            onClick={(e) => {
                              props.history.push("/geofences");
                            }}
                          >
                            Geofences
                          </a>
                        </li>
                        <li className="dropdown-item">
                          <a
                            href="#"
                            onClick={(e) => {
                              props.history.push("/notificationEvent");
                            }}
                          >
                            Event Notification
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li>
                    <div className="dropdown p-0">
                      <button
                        className="btn btn-secondary dropdown-toggle custom-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span>Track</span>
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            props.history.push("/view");
                          }}
                        >
                          Map
                        </button>
                        {/* <button className="dropdown-item" onClick={() => { props.history.push('/map-layer') }}>KML Layer</button> */}
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            props.history.push("/view/assetList");
                          }}
                        >
                          Assets list
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            props.history.push("/view/events");
                          }}
                        >
                          Events
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <span
                      onClick={() => {
                        props.history.push("/analyze");
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
                        props.history.push("/reports");
                      }}
                    >
                      EOF Reports
                    </span>
                    {/* <a href="javascript:void(0)" onClick={() => { props.history.push('/reports') }}>
                                            <i className="fas fa-file"></i>
                                        </a> */}
                  </li>
                  <li>
                    <div className="dropdown p-0">
                      <button
                        className="btn btn-secondary dropdown-toggle custom-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span>Settings</span>
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            props.history.push("/assets");
                          }}
                        >
                          Assets
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            props.history.push("/users");
                          }}
                        >
                          User
                        </button>
                        {/* <button
                          className="dropdown-item"
                          onClick={() => {
                            props.history.push("/admin");
                          }}
                        >
                          Management
                        </button> */}

                        {logedInUser.results.accountType === "SERVICE" &&
                          logedInUser.results.customerId === 0 && (
                            <button
                              className="dropdown-item"
                              onClick={() => {
                                props.history.push("/admin");
                              }}
                            >
                              Management
                            </button>
                          )}
                        {/* <button
                          className="dropdown-item"
                          onClick={() => {
                            props.history.push("/customers");
                          }}
                        >
                          Customer
                        </button> */}

                        {logedInUser.results.accountType !== "USER" && (
                          <button
                            className="dropdown-item"
                            onClick={() => {
                              props.history.push("/customers");
                            }}
                          >
                            Customer
                          </button>
                        )}

                           {/* <button
                            className="dropdown-item"
                            onClick={() => {
                              props.history.push("/assetevents");
                          }}
                        >
                          AssetEvents
                        </button> */}
                      </div>
                    </div>
                  </li>
                  <li>
                  <div className="dropdown p-0">
                      <button
                        className="btn btn-secondary dropdown-toggle custom-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span>Help</span>
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <button
                          className="dropdown-item"
                          
                          onClick={() => {
                            window.location.href = "https://star-ads-app.com/docs/gui/";
                          }}
                        >
                          GUI Documentation
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            window.location.href = "https://star-ads-app.com/docs/node-api/";
                          }}
                        >
                          Node API Documentation
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            window.location.href = "https://star-ads-app.com/docs/tcp-server/";
                          }}
                        >
                          TCP Code Documentation
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-3">
                <div className="row h-100">
                {logedInUser.results.accountType === "SERVICE" &&
                      logedInUser.results.customerId === 0 && ( <div className="col-6 d-flex align-items-center">
                    <h4 className="cl-white m-0 text-left header-text-style">
                      {selectedCustomer ? selectedCustomer.name : ""} :{" "}
                      <span>customer</span>
                    </h4>
                  </div>
                      )}

                  <div className="col-6 d-flex align-items-center justify-content-around">
                    {logedInUser.results.accountType === "SERVICE" &&
                      logedInUser.results.customerId === 0 && (
                        <div className="header-icon-bg position-relative">
                          <i
                            className="far fa-user"
                            id="notification-message"
                            onClick={showHideList}
                            style={{ cursor: "pointer" }}
                          ></i>
                          <div className="notification-count">
                            {customers.length}
                          </div>

                          {showNotifications ? (
                            <div
                              className="notification-message-box"
                              id="notification-message-box"
                            >
                              {customers.map((customer) => (
                                <p
                                  key={customer.id}
                                  style={{
                                    cursor: "pointer",
                                    fontWeight:
                                      customer === selectedCustomer
                                        ? "bold"
                                        : "normal",
                                  }}
                                  onClick={() => pickedCustomer(customer)}
                                >
                                  {customer.name}
                                </p>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      )}

                    <div
                      className="header-icon-bg position-relative"
                      onClick={() => {
                        localStorage.clear();
                        props.history.push("/logout");
                        setSelectedCustomer(null);
                        dispatch(planActions.setSelectedCustomer(null));
                      }}
                      data-tip="Sign out"
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      
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
