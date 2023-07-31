import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { customerService } from "../../Service/customer.service";
import LeftPanel from "../Assets/LeftPanel";

/**
 * This component is handling view, edit, and delete operations for customers.
 * @component
 * @param {Object} props - The props passed to the component.
 */
function Customer(props: any) {
  const [loader, setLoader] = useState(true);
  const [userList, setUserList] = useState([]);

  let logedInUser: any = localStorage.getItem("logedInUser");
  logedInUser = JSON.parse(logedInUser);

  const accountType= logedInUser.results.accountType;
  const customerId = logedInUser.results.customerId;
  const loggedInId = logedInUser.results.id;

  useEffect(() => {
   
    getUserList();
  }, []);

  const getUserList = async () => {
    
    if(accountType==="SERVICE" && customerId===0){
    try {
      let response = await customerService.getCustomersList();
      setLoader(false);
      if (response.status == 200) {
        //setUserList(response.data);
        setUserList(response.data.results);
      }
    } catch (error: any) {
      setLoader(false);
      toast.error(error.msg);
    }
  }
  else if(accountType==="CUSTOMER"){
    try {
      const customer_response = await customerService.getCustomerByUserId(logedInUser.results.id);
      let response = await customerService.getCustomerById(customer_response.data.results.id);
      setLoader(false);
      if (response.status == 200) {
        let data = response.data.results;
        if (!Array.isArray(data)) {
          data = [data];
        }
        
        setUserList(data);
      }
    } catch (error: any) {
      setLoader(false);
      toast.error(error.msg);
    }
  }
  else if(accountType==="SERVICE" && customerId !==0){
    try {
      let response = await customerService.getCustomerById(customerId);
      setLoader(false);
      if (response.status == 200) {
        let data = response.data;
    if (!Array.isArray(data)) {
      // Convert single object to array
      data = [data];
    }
    setUserList(data);
      }
    } catch (error: any) {
      setLoader(false);
      toast.error(error.msg);
    }
  }
  };

  const deleteAsset = async (item: any) => {
    setLoader(true);
    try {
      let response = await customerService.deleteCustomer(item.id);
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
      <div className="loading" style={{ display: loader ? "block" : "none" }}>
        <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />
      </div>
      <div className="container-fluid content-body">
        <div className="row h-100vh-80px">
          <LeftPanel props={props} />
          <div className="col-lg-9 col-xl-10 my-4">
            <div className="row mt-5">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-8 d-flex align-items-center">
                    <h2 className="cl-white mr-5">Customer</h2>
                   
                   { accountType==="SERVICE" && customerId===0 &&(
                    <button
                      className="cl-btn cl-btn-tartiary"
                      onClick={() => {
                        props.history.push("/create-customer");
                      }}
                    >
                      Create New Customer
                    </button>
                    )}
                  
                  </div>
                  
                  {/* {accountType==="SERVICE" && customerId===0 && (<div className="col-md-4 d-flex align-items-center justify-content-end">
                    <i className="fas fa-filter cl-white mr-5 fa-2x"></i>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-search"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Name"
                      ></input>
                    </div>
                  </div>
                  )} */}
                </div>

                <div className="row mt-5">
                  {userList.map((item: any, index: any) => {
                    return (
                      <div className="col-md-4 mb-5">
                        <div className="users-card px-4">
                          <div className="row cl-white ">
                            <div className=" d-flex w-100 py-4">
                              <div className="col-md-3">
                                <div className="user-pic">
                                  <img
                                    src={
                                      require("../../../src/Assets/images/user-img.jpg")
                                        .default
                                    }
                                    style={{ maxWidth: "100%" }}
                                  />
                                </div>
                              </div>
                              <div className="col-md-9">
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="row">
                                      <div className="col-md-7 text-left ">
                                        <h3 className="m-0">
                                          <span>{}</span>
                                        </h3>
                                      </div>
                                      <div className="col-md-5 d-flex justify-content-between">
                                        <i
                                          className="fas fa-edit"
                                          onClick={() => {
                                            props.history.push({
                                              pathname: "/create-customer",
                                              state: {
                                                isEdit: true,
                                                data: item,
                                              }, // your data array of objects
                                            });
                                          }}
                                        ></i>
                                      {accountType==="SERVICE" && customerId===0 && ( <i
                                          className="far fa-trash-alt"
                                          onClick={() => deleteAsset(item)}
                                        ></i>
                                      )}
                                        {/* <i className="fas fa-ellipsis-v"></i> */}
                                      </div>
                                    </div>
                                    <div className="row mt-4">
                                      <div className="col-md-12 text-left user-content">
                                        <p className="m-0">Customer</p>
                                        <p className="m-0">
                                          Name: <span>{item.name}</span>
                                        </p>
                                        <p className="m-0">
                                          Email :<span>{item.email}</span>
                                        </p>
                                        <p className="m-0">
                                          Mobile:{" "}
                                          <span>{item.phone}</span>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Customer;
