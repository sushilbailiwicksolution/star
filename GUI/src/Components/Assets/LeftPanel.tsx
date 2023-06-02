import React, { useEffect, useState } from "react";

function LeftPanel(props: any) {
    const [accountType , setAccountType]= useState()
    const [customerId , setCustomerId]= useState()
  useEffect(() => {
    let logedInUser: any = localStorage.getItem('logedInUser');
    logedInUser = JSON.parse(logedInUser);
    setAccountType(logedInUser.results.accountType)
    setCustomerId(logedInUser.results.customerId)
  },[])
  return (
    <React.Fragment>
      <div className="col-lg-3 col-xl-2">
        <div className="sidebar-wrapper my-4">
          <div className="d-flex justify-content-between px-3 pt-3">
            <label>Categories</label>
            <div className="d-flex align-items-center">
              <div className="rounded-plus mr-4">
                <i className="fas fa-plus"></i>
              </div>
              <i className="fas fa-ellipsis-v fa-icon-size"></i>
            </div>
          </div>

          <div className="list-wrapper user-list mt-4">
            <ul>
              <li className="px-3">
                <div className="ml-2">
                  <label
                    className="m-0"
                    onClick={() => {
                      props.props.history.push("/assets");
                    }}
                  >
                    Assets
                  </label>
                </div>
              </li>
              <li className="px-3">
                <div className="ml-2">
                  <label
                    className="m-0"
                    onClick={() => {
                      props.props.history.push("/users");
                    }}
                  >
                    User
                  </label>
                </div>
              </li>
              { accountType==="SERVICE" && customerId===0 && (
              <li className="px-3">
                <div className="ml-2">
                  <label
                    className="m-0"
                    onClick={() => {
                      props.props.history.push("/admin");
                    }}
                  >
                    Management
                  </label>
                </div>
              </li>
              
              )}

           {accountType === "SERVICE" ||accountType === "CUSTOMER" ? (
              <li className="px-3">
                <div className="ml-2">
                  <label
                    className="m-0"
                    onClick={() => {
                      props.props.history.push("/customers");
                    }}
                  >
                    Customer
                  </label>
                </div>
              </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LeftPanel;
