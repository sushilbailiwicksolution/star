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
                            <li className="breadcrumb-item"><a href="#" onClick={() => {props.history.push('/geofences')}}>GeoFences</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Create</li>
                        </ol>
                    </nav>
                    <div className="cl-white text-left mt-4 mb-3">
                        <h3>Add New Event</h3>
                    </div>
                    <table className="table table-striped table-bordered table-dark custom-dark-table">
                            <tbody>
                                <tr>
                                    <td className="small-shell"><h3 className="edit-heading">Customer</h3></td>
                                    <td colSpan={3}>StarAds</td>
                                </tr>
                                <tr>
                                    <td className="small-shell"><h3 className="edit-heading">Cretor</h3></td>
                                    <td>Admin</td>
                                    <td className="small-shell"><h3 className="edit-heading">Active</h3></td>
                                    <td>
                                    <input type="checkbox" className="form-check-input" id="examck1">
                                                        </input>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="small-shell"><h3 className="edit-heading">Severity</h3></td>
                                    <td>    <select className="form-control select-dropdown w-75">
                                                    <option>High</option>
                                                    <option>Low</option>
                                            </select>
                                    </td>
                                    <td className="small-shell"><h3 className="edit-heading">Notify Map</h3></td>
                                    <td>
                                    <input type="checkbox" className="form-check-input" id="examck12">
                                                        </input>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="small-shell"><h3 className="edit-heading">Name</h3></td>
                                    <td>    
                                        <input type="text" className="form-control small-input-box d-inline" placeholder="Type Name"></input>
                                    </td>
                                    <td rowSpan={2} className="small-shell"><h3 className="edit-heading">Notify Email</h3></td>
                                    <td rowSpan={2}>
                                    <input type="checkbox" className="form-check-input" id="examck11">
                                                        </input>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="small-shell"><h3 className="edit-heading">Notify</h3></td>
                                    <td>    <select className="form-control select-dropdown w-75">
                                                    <option>While Inside</option>
                                                    <option>While Outside</option>
                                            </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="small-shell"><h3 className="edit-heading">Vehicles</h3></td>
                                    <td>
                                        <div className="scrollableArea">
                                            <div className="check-items-block selection-list">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck1">AAT-HZ-NSA</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block selection-list">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck2">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck1">Demo-161</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block selection-list">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck3">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck1">Demo-162</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block selection-list">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck4">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck1">Demo-163</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block selection-list">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck5">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck1">Demo-164</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block selection-list">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck5">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck1">Demo-165</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center mt-3">
                                            <span className="mx-3">All</span> | <span className="mx-3">None</span>
                                            <select className="form-control select-dropdown">
                                                <option>starts with</option>
                                                <option>2</option>
                                            </select>
                                            <input type="text" className="form-control small-input-box ml-3 w-50"></input>
                                            <button type="button" className="cl-btn cl-btn-gray white-btn ml-3 mr-3">Filter</button>
                                            <button type="button" className="cl-btn cl-btn-gray  white-btn">Clear</button>
                                        </div>
                                    </td>
                                    <td className="small-shell"><h3 className="edit-heading">Notification Lists</h3></td>
                                    <td>
                                        <div className="scrollableArea">
                                            <div className="check-items-block selection-list">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck1">Stars-dev</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block selection-list">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck2">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck1">StarAds-Junaid</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block selection-list">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck3">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck1">StarAds-star Engineering</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center mt-3">
                                            <span className="mx-3">All</span> | <span className="mx-3">None</span>
                                            <select className="form-control select-dropdown">
                                                <option>starts with</option>
                                                <option>2</option>
                                            </select>
                                            <input type="text" className="form-control small-input-box ml-3 w-50"></input>
                                            <button type="button" className="cl-btn cl-btn-gray white-btn ml-3 mr-3">Filter</button>
                                            <button type="button" className="cl-btn cl-btn-gray  white-btn">Clear</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="small-shell"><h3 className="edit-heading">Layer Name</h3></td>
                                    <td>    <select className="form-control select-dropdown w-75">
                                                    <option>Test layer</option>
                                                    <option>Test layer_2</option>
                                            </select>
                                    </td>
                                    <td className="small-shell"><h3 className="edit-heading">Landmark</h3></td>
                                    <td>    <select className="form-control select-dropdown w-75">
                                                    <option>All</option>
                                                    <option>Test</option>
                                            </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="small-shell"><h3 className="edit-heading">Buffer Distance (nm)</h3></td>
                                    <td>   
                                        <input type="text" className="form-control small-input-box d-inline" placeholder="0.000"></input>
                                    </td>
                                    <td className="small-shell"><h3 className="edit-heading">Description</h3></td>
                                    <td>   
                                        <textarea  className="form-control" rows={7}></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={4}>
                                        <h3 className="edit-heading">Optional Limits</h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="small-shell text-right">
                                        <input type="checkbox" className="form-check-input" id="eamp1"></input>
                                    </td>
                                    <td>   
                                        <div className="d-flex text-left mb-3">Altitude</div>
                                        <div className="d-flex text-left mb-3">
                                            Min. Altitude
                                            <input type="text" className="ml-3 form-control small-input-box d-inline" placeholder="0"></input>
                                        </div>
                                        <div className="d-flex text-left">
                                            Max. Altitude
                                            <input type="text" className="ml-3 form-control small-input-box d-inline" placeholder="0"></input>
                                        </div>
                                    </td>
                                    <td className="small-shell text-right">
                                        <input type="checkbox" className="form-check-input" id="examp1"></input>
                                    </td>
                                    <td>   
                                    <div className="d-flex text-left mb-3">Time</div>
                                        <div className="d-flex text-left mb-3">
                                            Start Time
                                            <input type="text" className="ml-3 form-control small-input-box d-inline" placeholder="09 00"></input>
                                        </div>
                                        <div className="d-flex text-left">
                                            End Time
                                            <input type="text" className="ml-3 form-control small-input-box d-inline" placeholder="06 00"></input>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="small-shell text-right">
                                        <input type="checkbox" className="form-check-input" id="eamp1"></input>
                                    </td>
                                    <td>   
                                        <div className="d-flex text-left mb-3">Velocity</div>
                                        <div className="d-flex text-left mb-3">
                                            <input type="text" className="form-control small-input-box d-inline" placeholder="Knots"></input>
                                        </div>
                                        <div className="d-flex text-left">
                                            <div className="form-group form-check m-0 d-flex align-items-center justify-content-between mr-3">
                                                    <input type="radio" className="form-check-input" id="exampradio1">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampradio1">Above</label>
                                                </div>
                                                <div className="form-group ml-3 form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="radio" className="form-check-input" id="exampleCheck222">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck222">Below</label>
                                                </div>
                                        </div>
                                    </td>
                                    <td className="small-shell text-right">
                                        <h3 className="edit-heading">Days</h3>
                                       
                                    </td>
                                    <td>   
                                        <div className="d-flex">
                                            <div className="day-column">
                                                <div className="form-group ml-3 form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="day1">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck222">Mon</label>
                                                </div>
                                            </div>
                                            <div className="day-column">
                                                <div className="form-group ml-3 form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="day2">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck222">Tue</label>
                                                </div>
                                            </div>
                                            <div className="day-column">
                                                <div className="form-group ml-3 form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="day">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck222">Wed</label>
                                                </div>
                                            </div>
                                            <div className="day-column">
                                                <div className="form-group ml-3 form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="day4">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck222">Thr</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex mt-3">
                                            <div className="day-column">
                                                <div className="form-group ml-3 form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="day5">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck222">Fri</label>
                                                </div>
                                            </div>
                                            <div className="day-column">
                                                <div className="form-group ml-3 form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="day6">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck222">Sat</label>
                                                </div>
                                            </div>
                                            <div className="day-column">
                                                <div className="form-group ml-3 form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="day7">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck222">Sun</label>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                    </table>


                    <div className="d-flex align-items-center justify-content-end mt-3 mr-3" >
                    <button type="button" className="cl-btn cl-btn-secondary white-btn">Cancel</button>
                                            <button type="button" className="cl-btn cl-btn-primary white-btn ml-3">Create</button>
                    </div>
                   
                </div>
            </div>
        </div>
    </React.Fragment>
}
export default Editlayer;
