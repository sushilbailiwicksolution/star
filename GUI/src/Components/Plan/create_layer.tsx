import React, { useEffect, useState } from "react";
import LeftPanel from "./LeftPanel";

function CreateLayer(props: any) {
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
                            <li className="breadcrumb-item active" aria-current="page">Create</li>
                        </ol>
                    </nav>
                    <h3 className="heading-bg p-3 m-0">General Information</h3>
                    <div className=" ">
                        <table className="table table-striped table-dark">
                            <tbody>
                                <tr>
                                    <td>Customer</td>
                                    <td>Demo</td>
                                </tr>
                                <tr>
                                    <td className="small-shell">Name</td>
                                    <td><input type="text" className="form-control small-input-box"></input></td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="table table-striped table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">Add</th>
                                    <th scope="col">Field Name</th>
                                    <th scope="col">Field Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="table-icon-cell">Required</td>
                                    <td>Name</td>
                                    <td>Text (Max. length of 254 character)</td>
                                </tr>
                                <tr>
                                    <td className="table-icon-cell">Required</td>
                                    <td>Address</td>
                                    <td>Text (Max. length of 254 character)</td>
                                </tr>
                                <tr>
                                    <td className="table-icon-cell">Required</td>
                                    <td>City</td>
                                    <td>Text (Max. length of 254 character)</td>
                                </tr>
                                <tr>
                                    <td className="table-icon-cell">Required</td>
                                    <td>Country</td>
                                    <td>Text (Max. length of 254 character)</td>
                                </tr>
                                <tr>
                                    <td className="table-icon-cell">Required</td>
                                    <td>ZIP (ZIP or postal code)</td>
                                    <td>Text (Max. length of 254 character)</td>
                                </tr>
                                <tr>
                                    <td className="table-icon-cell">Required</td>
                                    <td>ST (State or Province)</td>
                                    <td>Text (Max. length of 254 character)</td>
                                </tr>
                                <tr>
                                    <td className="table-icon-cell">Required</td>
                                    <td>Comments</td>
                                    <td>Text (Max. length of 254 character)</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="d-flex align-items-center justify-content-end mt-3">
                            <button type="button" className="cl-btn cl-btn-primary white-btn mr-3">Create</button>
                            <button type="button" className="cl-btn cl-btn-secondary white-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
}
export default CreateLayer;
