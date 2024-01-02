import React, { useEffect, useState } from "react";
import LeftPanel from "./LeftPanel";

/**
 * This component is handling new notifications 
 * @component
 */
function Editlayer(props: any) {
    const [loader, setLoader] = useState(false);

    return <React.Fragment>
        <div className="loading" style={{ display: loader ? 'block' : 'none' }}><img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" /></div>
        <div className="container-fluid content-body vh-100">
            <div className="row">
                <LeftPanel props={props} />
                <div className="col-lg-9 col-xl-10 mt-4">
                
                <div className="row">
                                <div className="col-md-8 d-flex align-items-center">
                                    <h2 className="cl-white mr-5">Notification: Outbound Setup</h2>
                                </div>
                                <div className="col-md-4 d-flex align-items-center justify-content-end">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                            <i className="fas fa-search"></i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Search Name"></input>
                                    </div>
                                </div>
                    </div>

                    <div className="row" >
                        <div className="col-md-8 d-flex align-items-center mt-5">
                            <button className="cl-btn cl-btn-tartiary" data-toggle="modal" data-target="#exampleModal">New Device Rule</button>
                            <button className="cl-btn cl-btn-tartiary ml-3">New Location Rule</button>
                        </div>
                    </div>
                    
                    <table className="table table-striped table-dark mt-3">
                                <thead>
                                    <tr>
                                        <th scope="col">Customer</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Assets</th>
                                        <th scope="col">Locations</th>
                                        <th scope="col">Notification Events</th>
                                        <th scope="col">Notification List</th>
                                        <th scope="col">View</th>
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>starads</td>
                                        <td>Test_layers</td>
                                        <td>TrooQA</td>
                                        <td>starads</td>
                                        <td>Test_layers</td>
                                        <td>TrooQA</td>
                                        <td className="table-icon-cell">
                                            <i className="fa fa-eye" aria-hidden="true"></i>
                                        </td>
                                        <td className="table-icon-cell">
                                            <i className="fa fa-file" aria-hidden="true"></i></td>
                                        <td className="table-icon-cell">
                                            <i className="fa fa-trash" aria-hidden="true"></i></td>
                                    </tr>
                                </tbody>
                            </table>


                   
                </div>
            </div>
        </div>

{/* Modal design */}
        <div className="modal fade" id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content modal-edited">
            <div className="modal-header ">
                <h5 className="modal-title" id="exampleModalLabel">New Asset: Outbound Notification Rule</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body p-3">
                <div className="d-flex justify-content-between">
                    <h3 className="stepper active">
                        1.Assets
                    </h3>
                    <h3 className="stepper">
                        2.Events
                    </h3>
                    <h3 className="stepper">
                        3.Notifications
                    </h3>
                </div>
                <div className="selected-asset my-3">2. Select Assets</div>
                <div className="assets-area">
                    <p className="mb-3">a. Select which assets will trigger this notification</p>
                    <div className="asset-box">
                        <div className="search-box d-flex justify-content-end p-2">
                                <input type="text" className="form-control small-input-box" placeholder="Search"></input>
                        </div>
                    </div>
                    <div className="d-flex justify-content-start my-3">
                        <button className="btn cl-btn-grey mr-3">Add <i className="fa fa-arrow-down" aria-hidden="true"></i></button>
                        <button className="btn cl-btn-grey ">Remove <i className="fa fa-arrow-up" aria-hidden="true"></i></button>
                    </div>
                    <p className="mb-3">b. Summary of selected assets</p>
                    <div className="asset-box">
                        
                    </div>
                </div>
            </div>
            <div className="modal-footer d-flex">
                <button type="button" className="cl-btn cl-btn-gray justify-content-start  mr-3">Back</button>
                <button type="button" className="cl-btn cl-btn-primary ml-auto  mr-3">Save</button>
                <button type="button" className="cl-btn cl-btn-secondary ">Next</button>
            </div>
            </div>
        </div>
        </div>
    </React.Fragment>
}
export default Editlayer;
