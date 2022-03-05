import React, { useEffect, useState } from "react";
import LeftPanel from "./LeftPanel";

function Editlayer(props: any) {
    const [loader, setLoader] = useState(false);

    return <React.Fragment>
        <div className="loading" style={{ display: loader ? 'block' : 'none' }}><img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" /></div>
        <div className="container-fluid content-body vh-100">
            <div className="row">
                <LeftPanel props={props}  />
                <div className="col-lg-9 col-xl-10 mt-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb p-0">
                            <li className="breadcrumb-item"><a href="#">Notification</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Create</li>
                        </ol>
                    </nav>
                    <table className="table table-striped table-bordered table-dark custom-dark-table">
                            <tbody>
                                <tr>
                                    <td className="small-shell"><h3 className="edit-heading">Customer</h3></td>
                                    <td colSpan={3}>StarAds</td>
                                </tr>
                                <tr>
                                    <td className="small-shell"><h3 className="edit-heading">List Name</h3></td>
                                    <td><input type="text" className="form-control small-input-box"></input></td>
                                    <td rowSpan={4} className="small-shell"><h3 className="edit-heading">Others</h3></td>
                                    <td rowSpan={4}>
                                        <input type="text" className="form-control small-input-box d-inline" placeholder="Email"></input>
                                        <button type="button" className="cl-btn cl-btn-gray  ml-3">Add</button>
                                        <div>
                                            <textarea className="form-control mt-3" rows={5}>

                                            </textarea>
                                            <button type="button" className="cl-btn cl-btn-gray mt-3">Remove</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="small-shell"><h3 className="edit-heading">Timezone</h3></td>
                                    <td>    <select className="form-control select-dropdown w-75">
                                                    <option>(UTC) Coordinated Universal Time</option>
                                                    <option>2</option>
                                            </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="small-shell"><h3 className="edit-heading">Email Template</h3></td>
                                    <td>    <select className="form-control select-dropdown w-75">
                                                    <option>Email Template 1</option>
                                                    <option>2</option>
                                            </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="small-shell"><h3 className="edit-heading">Sms Template</h3></td>
                                    <td>    <select className="form-control select-dropdown w-75">
                                                    <option>Sms template 1</option>
                                                    <option>2</option>
                                            </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="small-shell"><h3 className="edit-heading">Creator</h3></td>
                                    <td colSpan={3}>Admin</td>
                                </tr>
                                <tr>
                                    <td className="small-shell"><h3 className="edit-heading">Creation Date</h3></td>
                                    <td colSpan={3}>2021-11-27 12:32 am</td>
                                </tr>
                                <tr>
                                    <td className="small-shell"><h3 className="edit-heading">Users</h3></td>
                                    <td>
                                        <div className="scrollableArea">
                                            <div className="check-items-block selection-list">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck1">aat</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block selection-list">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck2">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck1">abdullah</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block selection-list">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck3">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck1">admin</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block selection-list">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck4">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck1">abdullah</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block selection-list">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck5">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck1">admin</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block selection-list">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck5">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck1">admin</label>
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
                                    <td className="small-shell"><h3 className="edit-heading">Groups</h3></td>
                                    <td>
                                        <div className="scrollableArea">
                                            <div className="check-items-block selection-list">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck1">aat</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block selection-list">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck2">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck1">abdullah</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block selection-list">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck3">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck1">admin</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block selection-list">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck4">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck1">abdullah</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block selection-list">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck5">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck1">admin</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block selection-list">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck5">
                                                        </input>
                                                    <label className="form-check-label ml-3" htmlFor="exampleCheck1">admin</label>
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
                            </tbody>
                    </table>


                    <div className="d-flex align-items-center justify-content-end mt-3 mr-3" >
                                            <button type="button" className="cl-btn cl-btn-primary white-btn mr-3">Create</button>
                                            <button type="button" className="cl-btn cl-btn-secondary white-btn">Cancel</button>
                    </div>
                   
                </div>
            </div>
        </div>
    </React.Fragment>
}
export default Editlayer;
