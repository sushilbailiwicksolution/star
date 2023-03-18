import React, { useEffect, useState } from "react";
import LeftPanel from "./LeftPanel";

function Editlayer(props: any) {
    const [loader, setLoader] = useState(false);

    return <React.Fragment>
        <div className="loading" style={{ display: loader ? 'block' : 'none' }}><img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" /></div>
        <div className="container-fluid content-body vh-100">
            <div className="row">
                <LeftPanel props={props} />
                <div className="col-lg-9 col-xl-10 mt-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb p-0">
                            <li className="breadcrumb-item"><a href="#">Notification</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Event Severity</li>
                        </ol>
                    </nav>
                    <table className="table table-striped table-bordered table-dark custom-dark-table">
                        <thead>
                            <tr>
                                <th colSpan={4}>Custom Events</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <td>
                                        <h3 className="edit-heading">Event Types</h3>
                                    </td>
                                    <td>
                                        <h3 className="edit-heading">Event Severity</h3>
                                    </td>
                                    <td>
                                        <h3 className="edit-heading">Notify Map</h3>
                                    </td>
                                    <td>
                                        <h3 className="edit-heading">Notify Email</h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td>SSAA left athens:</td>
                                    <td>
                                            <select className="form-control select-dropdown w-75">
                                                    <option>Low </option>
                                                    <option>High</option>
                                            </select>
                                    </td>
                                    <td className="text-center">
                                    <input type="checkbox" className="form-check-input" id="Check1">
                                                        </input>
                                    </td>
                                    <td className="text-center">
                                    <input type="checkbox" className="form-check-input" id="Check2">
                                                        </input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Warsaw Takeoff:</td>
                                    <td>
                                            <select className="form-control select-dropdown w-75">
                                                    <option>Low </option>
                                                    <option>High</option>
                                            </select>
                                    </td>
                                    <td className="text-center">
                                    <input type="checkbox" className="form-check-input" id="Check3">
                                                        </input>
                                    </td>
                                    <td className="text-center">
                                    <input type="checkbox" className="form-check-input" id="Check4">
                                                        </input>
                                    </td>
                                </tr>
                        </tbody>
                    </table>

                    <table className="table table-striped table-bordered table-dark custom-dark-table mt-5">
                        <thead>
                            <tr>
                                <th colSpan={4}>Standard Events</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <td>Use Default</td>
                                    <td colSpan={3}>
                                    <input type="checkbox" className="form-check-input" id="Checkh1">
                                                        </input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h3 className="edit-heading">Event Types</h3>
                                    </td>
                                    <td>
                                        <h3 className="edit-heading">Event Severity</h3>
                                    </td>
                                    <td>
                                        <h3 className="edit-heading">Notify Map</h3>
                                    </td>
                                    <td>
                                        <h3 className="edit-heading">Notify Email</h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Approach:</td>
                                    <td>
                                            <select className="form-control select-dropdown w-75">
                                                    <option>Low </option>
                                                    <option>High</option>
                                            </select>
                                    </td>
                                    <td className="text-center">
                                    <input type="checkbox" className="form-check-input" id="Checkk1">
                                                        </input>
                                    </td>
                                    <td className="text-center">
                                    <input type="checkbox" className="form-check-input" id="Checkk2" checked>
                                                        </input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Arrival:</td>
                                    <td>
                                            <select className="form-control select-dropdown w-75">
                                                    <option>Low </option>
                                                    <option>High</option>
                                            </select>
                                    </td>
                                    <td className="text-center">
                                    <input type="checkbox" className="form-check-input" id="Checkk3">
                                                        </input>
                                    </td>
                                    <td className="text-center">
                                    <input type="checkbox" className="form-check-input" id="Checkk4">
                                                        </input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Assist:</td>
                                    <td>
                                            <select className="form-control select-dropdown w-75">
                                                    <option>Low </option>
                                                    <option>High</option>
                                            </select>
                                    </td>
                                    <td className="text-center">
                                    <input type="checkbox" className="form-check-input" id="Checkk5" checked>
                                                        </input>
                                    </td>
                                    <td className="text-center">
                                    <input type="checkbox" className="form-check-input" id="Checkk6">
                                                        </input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>battery:</td>
                                    <td>
                                            <select className="form-control select-dropdown w-75">
                                                    <option>Low </option>
                                                    <option>High</option>
                                            </select>
                                    </td>
                                    <td className="text-center">
                                    <input type="checkbox" className="form-check-input" id="Checkk3">
                                                        </input>
                                    </td>
                                    <td className="text-center">
                                    <input type="checkbox" className="form-check-input" id="Checkk4">
                                                        </input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Climb:</td>
                                    <td>
                                            <select className="form-control select-dropdown w-75">
                                                    <option>Low </option>
                                                    <option>High</option>
                                            </select>
                                    </td>
                                    <td className="text-center">
                                    <input type="checkbox" className="form-check-input" id="Checkk3">
                                                        </input>
                                    </td>
                                    <td className="text-center">
                                    <input type="checkbox" className="form-check-input" id="Checkk4">
                                                        </input>
                                    </td>
                                </tr>

                        </tbody>
                    </table>


                    <div className="d-flex align-items-center justify-content-end mt-3 mr-3" >
                                            <button type="button" className="cl-btn cl-btn-secondary white-btn">Save</button>
                    </div>
                   
                </div>
            </div>
        </div>
    </React.Fragment>
}
export default Editlayer;
