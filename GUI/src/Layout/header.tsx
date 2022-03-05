import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

function Header(props: any) {

    return (
        <React.Fragment>
            <ReactTooltip />
            <div className="container-fluid header-background">
                <div className="row h-100">
                    <div className="col-md-2">
                        <div className="row h-100">
                            <div className="col-12 d-flex align-items-center">
                                <div className="profilePic mr-4"></div>
                                <h4 className="cl-white m-0 text-left header-text-style">
                                    <label className="d-block m-0">Admin</label>
                                    <span>Person Id</span>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="row h-100">
                            <div className="col-md-8 ">
                                <ul className="Menulist text-left h-100">
                                    <li data-tip="Home">
                                        <a href="javascript:void(0)" onClick={() => { props.history.push('/dashboard') }}>
                                            <i className="fas fa-home"></i>
                                        </a>
                                    </li>
                                    <li data-tip="Plan">
                                        <a href="javascript:void(0)" onClick={() => { props.history.push('/plan') }}>
                                            <i className="fas fa-dollar-sign"></i>
                                        </a>
                                    </li>
                                    <li data-tip="View">
                                        <a href="javascript:void(0)" onClick={() => { props.history.push('/view') }}>
                                            <i className="far fa-address-card"></i>
                                        </a>
                                    </li>
                                    <li data-tip="Analyze">
                                        <a href="javascript:void(0)" onClick={() => { props.history.push('/analyze') }}>
                                            <i className="fas fa-chart-line"></i>
                                        </a>
                                    </li>
                                    <li data-tip="Report">
                                        <a href="javascript:void(0)" onClick={() => { props.history.push('/reports') }}>
                                            <i className="fas fa-file"></i>
                                        </a>
                                    </li>
                                    <li>
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fas fa-user-alt user-icon"></i>
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <button className="dropdown-item" onClick={() => { props.history.push('/users') }}>User</button>
                                            <button className="dropdown-item" onClick={() => { props.history.push('/admin') }}>Admin</button>
                                            <button className="dropdown-item" onClick={() => { props.history.push('/customers') }}>Customer</button>
                                        </div>
                                        </div>
                                    </li>
                                    <li data-tip="Support">
                                        <a href="javascript:void(0)">
                                            <i className="far fa-address-book"></i>
                                        </a>
                                    </li>
                                   
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <div className="row h-100">
                                    {/* <div className="col-6 d-flex align-items-center">
                                        <h4 className="cl-white m-0 text-left header-text-style">
                                            <label className="d-block m-0">{currentDateTime.currTime}</label>
                                            <span>{currentDateTime.currDate}</span>
                                        </h4>
                                    </div> */}
                                    <div className="col-6 d-flex align-items-center justify-content-around">
                                        <div className="header-icon-bg">
                                            <i className="fas fa-search"></i>
                                        </div>
                                        <div className="header-icon-bg">
                                            <i className="far fa-comment-dots"></i>
                                        </div>
                                        <div className="header-icon-bg position-relative">
                                            <i className="far fa-bell"></i>
                                            <div className="notification-count">05</div>
                                        </div>
                                        <div className="header-icon-bg position-relative" onClick={() => { props.history.push('/logout') }} data-tip="Sign out">
                                            <i className="fas fa-sign-out-alt"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header;