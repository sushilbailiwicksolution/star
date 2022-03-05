import React, { useEffect, useState } from "react";
import LeftPanel from "./LeftPanel";

function Plan(props: any) {
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 300)
    }, [])

    return <React.Fragment>
        <div className="loading" style={{ display: loader ? 'block' : 'none' }}><img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" /></div>
        <div className="container-fluid content-body vh-100">
            <div className="row">
                <LeftPanel props={props} />
                <div className="col-lg-9 col-xl-10 my-4">
                    <div className="row mt-5">
                        <div className="col-md-4 d-flex align-items-center ">
                            <h2 className="cl-white mr-5">GeoFences</h2>
                            <button className="cl-btn cl-btn-tartiary" onClick={() => { props.history.push('/create-geoFences') }}>Create</button>
                        </div>
                        <div className="col-md-3 d-flex align-items-center justify-content-end">
                            <span className="cl-white mr-3">Vehicles</span>
                            <select className="form-control head-dropdown w-75">
                                                    <option>All </option>
                                                    <option>High</option>
                                            </select>
                        </div>
                        <div className="col-md-5 d-flex align-items-center justify-content-end">
                            <span className="cl-white mr-3">Layer Name</span>
                            <select className="form-control head-dropdown w-50">
                                                    <option>All </option>
                                                    <option>High</option>
                                            </select>
                                            <button className="cl-btn cl-btn-tartiary">Filter</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped table-dark mt-5">
                                <thead>
                                    <tr>
                                        <th scope="col">Customer</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Layer Name</th>
                                        <th scope="col">Notify</th>
                                        <th scope="col">Active</th>
                                        <th scope="col">Severity</th>
                                        <th scope="col">Created By</th>
                                        <th scope="col">View</th>
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>starads</td>
                                        <td>SSAA left athens</td>
                                        <td>Test_layer</td>
                                        <td>On exit</td>
                                        <td>Yes</td>
                                        <td>Low</td>
                                        <td>Admin</td>
                                        <td className="table-icon-cell">
                                            <i className="fa fa-eye" aria-hidden="true"></i>
                                        </td>
                                        <td className="table-icon-cell">
                                            <i className="fa fa-file" aria-hidden="true"></i></td>
                                        <td className="table-icon-cell">
                                            <i className="fa fa-trash" aria-hidden="true"></i></td>
                                    </tr>
                                    <tr>
                                        <td>starads</td>
                                        <td>SSAA left athens</td>
                                        <td>Test_layer</td>
                                        <td>On exit</td>
                                        <td>Yes</td>
                                        <td>Low</td>
                                        <td>Admin</td>
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
            </div>
        </div>
    </React.Fragment>
}

export default Plan;