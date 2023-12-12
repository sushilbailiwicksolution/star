import React, { useEffect, useState } from "react";
import LeftPanel from "./LeftPanel";

/**
 * This component is handling layer edit.
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
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb p-0">
                            <li className="breadcrumb-item"><a href="#">Layers</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Edit</li>
                        </ol>
                    </nav>
                    <h3 className="heading-bg p-3 m-0">General Information</h3>
                    <table className="table table-striped table-dark custom-dark-table">
                            <tbody>
                                <tr>
                                    <td><h3 className="edit-heading">Customer</h3></td>
                                    <td colSpan={3}>StarAds</td>
                                </tr>
                                <tr>
                                    <td className="small-shell"><h3 className="edit-heading">Name</h3> </td>
                                    <td><input type="text" className="form-control small-input-box"></input></td>
                                    <td className="small-shell"><h3 className="edit-heading">Creator</h3> </td>
                                    <td className="small-shell">TrooQA</td>
                                </tr>
                                <tr>
                                    <td><h3 className="edit-heading">Symbol</h3></td>
                                    <td colSpan={3}>
                                        <div className="d-flex flex-wrap">
                                            <div className="check-items-block">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                                        </input>
                                                        <i className="fa fa-plug ml-2" aria-hidden="true"></i>
                                                    <label className="form-check-label" htmlFor="exampleCheck1">Cell tower</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                                        </input>
                                                        <i className="fa fa-plug ml-2" aria-hidden="true"></i>
                                                    <label className="form-check-label" htmlFor="exampleCheck1">Cell tower</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                                        </input>
                                                        <i className="fa fa-plug ml-2" aria-hidden="true"></i>
                                                    <label className="form-check-label" htmlFor="exampleCheck1">Cell tower</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                                        </input>
                                                        <i className="fa fa-plug ml-2" aria-hidden="true"></i>
                                                    <label className="form-check-label" htmlFor="exampleCheck1">Cell tower</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                                        </input>
                                                        <i className="fa fa-plug ml-2" aria-hidden="true"></i>
                                                    <label className="form-check-label" htmlFor="exampleCheck1">Cell tower</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                                        </input>
                                                        <i className="fa fa-plug ml-2" aria-hidden="true"></i>
                                                    <label className="form-check-label" htmlFor="exampleCheck1">Cell tower</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                                        </input>
                                                        <i className="fa fa-plug ml-2" aria-hidden="true"></i>
                                                    <label className="form-check-label" htmlFor="exampleCheck1">Cell tower</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                                        </input>
                                                        <i className="fa fa-plug ml-2" aria-hidden="true"></i>
                                                    <label className="form-check-label" htmlFor="exampleCheck1">Cell tower</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                                        </input>
                                                        <i className="fa fa-plug ml-2" aria-hidden="true"></i>
                                                    <label className="form-check-label" htmlFor="exampleCheck1">Cell tower</label>
                                                </div>
                                            </div>
                                            <div className="check-items-block">
                                                <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                                        </input>
                                                        <i className="fa fa-plug ml-2" aria-hidden="true"></i>
                                                    <label className="form-check-label" htmlFor="exampleCheck1">Cell tower</label>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td colSpan={3}>
                                    <div className="d-flex align-items-center ">
                                        <span className="mx-3">All</span> | <span className="mx-3">None</span>
                                        <select className="form-control select-dropdown">
                                            <option>1</option>
                                            <option>2</option>
                                        </select>
                                        <input type="text" className="form-control small-input-box ml-3"></input>
                                        <button type="button" className="cl-btn cl-btn-gray white-btn ml-3 mr-3">Filter</button>
                                        <button type="button" className="cl-btn cl-btn-gray  white-btn">Clear</button>
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><h3 className="edit-heading">Zoom Range</h3> </td>
                                    <td colSpan={3}>
                                    <div className="d-flex align-items-center ">
                                        <div className="d-flex align-items-center mr-5">
                                            <p className="m-0 mr-2">Min. level</p>
                                            <select className="form-control select-dropdown">
                                                    <option>1</option>
                                                    <option>2</option>
                                            </select>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <p className="m-0 mr-2">Max. level</p>
                                            <select className="form-control select-dropdown">
                                                    <option>1</option>
                                                    <option>2</option>
                                            </select>
                                        </div>
                                    </div>
                                    </td>
                                </tr>
                            </tbody>
                    </table>
                    <div className="d-flex align-items-center justify-content-end mt-3 mr-3" >
                                            <button type="button" className="cl-btn cl-btn-primary white-btn mr-3">Save</button>
                                            <button type="button" className="cl-btn cl-btn-secondary white-btn">Cancel</button>
                                        </div>
                    {/* <div className="info-light-bg p-3">
                        <div className="d-flex mb-4">
                            <div className="mr-5">
                                <h3 className="m-0 text-left">Customer </h3>
                            </div>
                            <div className="">
                                <p className="m-0">StarAds</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="d-flex align-items-center">
                                <div className="mr-5">
                                    <h3 className="m-0 text-left">Name </h3>
                                </div>
                                <div className="">
                                    <input type="text" className="form-control small-input-box"></input>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <h3 className="m-0 text-left">Creator</h3>
                                <p className="m-0">TrooQA</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="d-flex">
                                <div className="mr-5">
                                    <h3 className="m-0 text-left mt-2">Symbol</h3>
                                </div>
                                <div className="d-flex flex-column">
                                    <div className="d-flex flex-wrap">
                                        <div className="check-items-block">
                                            <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                                </input>
                                                <i className="fa fa-plug ml-2" aria-hidden="true"></i>
                                                <label className="form-check-label" htmlFor="exampleCheck1">Cell tower</label>
                                            </div>
                                        </div>
                                        <div className="check-items-block">
                                            <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                                </input>
                                                <i className="fa fa-plug ml-2" aria-hidden="true"></i>
                                                <label className="form-check-label" htmlFor="exampleCheck1">Circle</label>
                                            </div>
                                        </div>
                                        <div className="check-items-block">
                                            <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                                </input>
                                                <i className="fa fa-plug ml-2" aria-hidden="true"></i>
                                                <label className="form-check-label" htmlFor="exampleCheck1">Cell tower</label>
                                            </div>
                                        </div>
                                        <div className="check-items-block">
                                            <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                                </input>
                                                <i className="fa fa-plug ml-2" aria-hidden="true"></i>
                                                <label className="form-check-label" htmlFor="exampleCheck1">Circle</label>
                                            </div>
                                        </div>
                                        <div className="check-items-block">
                                            <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                                </input>
                                                <i className="fa fa-plug ml-2" aria-hidden="true"></i>
                                                <label className="form-check-label" htmlFor="exampleCheck1">Cell tower</label>
                                            </div>
                                        </div>
                                        <div className="check-items-block">
                                            <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                                </input>
                                                <i className="fa fa-plug ml-2" aria-hidden="true"></i>
                                                <label className="form-check-label" htmlFor="exampleCheck1">Circle</label>
                                            </div>
                                        </div>
                                        <div className="check-items-block">
                                            <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                                </input>
                                                <i className="fa fa-plug ml-2" aria-hidden="true"></i>
                                                <label className="form-check-label" htmlFor="exampleCheck1">Cell tower</label>
                                            </div>
                                        </div>
                                        <div className="check-items-block">
                                            <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                                </input>
                                                <i className="fa fa-plug ml-2" aria-hidden="true"></i>
                                                <label className="form-check-label" htmlFor="exampleCheck1">Circle</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mt-3">
                                        <span className="mx-3">All</span> | <span className="mx-3">None</span>
                                        <select className="form-control select-dropdown">
                                            <option>1</option>
                                            <option>2</option>
                                        </select>
                                        <input type="text" className="form-control small-input-box ml-3"></input>
                                        <button type="button" className="cl-btn cl-btn-primary white-btn mr-3">Filter</button>
                                        <button type="button" className="cl-btn cl-btn-primary white-btn">Clear</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-4 mt-5">
                            <div className="d-flex align-items-center ">
                                <h3 className="m-0 mr-5">Zoom Range</h3>
                                <div className="d-flex align-items-center mr-5">
                                    <p className="m-0 mr-2">Min. level</p>
                                    <select className="form-control select-dropdown">
                                        <option>1</option>
                                        <option>2</option>
                                    </select>
                                </div>
                                <div className="d-flex align-items-center">
                                    <p className="m-0 mr-2">Max. level</p>
                                    <select className="form-control select-dropdown">
                                        <option>1</option>
                                        <option>2</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-end mt-5">
                            <button type="button" className="cl-btn cl-btn-primary white-btn mr-3">Save</button>
                            <button type="button" className="cl-btn cl-btn-primary white-btn">Cancel</button>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    </React.Fragment>
}
export default Editlayer;
