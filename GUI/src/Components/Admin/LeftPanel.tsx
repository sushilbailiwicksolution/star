import React from "react";
import { NavLink } from "react-router-dom";

function LeftPanel(props: any) {

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
                            
                                <NavLink to = "/admin" activeClassName="active">
                                    <li className="px-3">
                                    <div className="ml-2">
                                        <label className="m-0">Admin</label>
                                    </div>
                                    </li>
                                </NavLink>
                            
                            
                                <NavLink to = "/assets">
                                <li className="px-3">
                                    <div className="ml-2">
                                        <label className="m-0">Assets</label>
                                    </div>
                                    </li>
                                </NavLink>
                                <NavLink to = "/edit-assets">
                                <li className="px-3">
                                    <div className="ml-2">
                                        <label className="m-0">Edit Assets</label>
                                    </div>
                                    </li>
                                </NavLink>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default LeftPanel;