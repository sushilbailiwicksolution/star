import {useState} from "react";
import './view.css';

export const Dailogmodal1 = () =>{
    const [togglebtn, settogglebtn]= useState(false);
    return(
        <div className={togglebtn ? 'modal-right show-modal': 'modal-right'}>
            <button className="btn btn-primary modal-btn" onClick={() => settogglebtn(!togglebtn)}><i className={togglebtn ? 'fas la-angle-right': 'fas la-angle-left'}></i></button>
            <div className="modal-right-content">
                <div className="modal-heading">
                    <h1 className="active-state">Asset Tracking</h1>
                </div>
                <div className="modal-right-body">
                    <div className="map-card">
                        <div className="map-header d-flex justify-content-between align-items-center">
                            <span>Tracking</span>
                            <ul className="nav">
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-search-plus"></i></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-search-minus"></i></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-book-open"></i></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-times"></i></a></li>
                            </ul>
                        </div>
                        <div className="map-body"></div>
                    </div>
                    <div className="map-card">
                        <div className="map-header d-flex justify-content-between align-items-center">
                            <span>Tracking</span>
                            <ul className="nav">
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-search-plus"></i></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-search-minus"></i></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-book-open"></i></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-times"></i></a></li>
                            </ul>
                        </div>
                        <div className="map-body"></div>
                    </div>
                    <div className="map-card">
                        <div className="map-header d-flex justify-content-between align-items-center">
                            <span>Tracking</span>
                            <ul className="nav">
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-search-plus"></i></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-search-minus"></i></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-book-open"></i></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-times"></i></a></li>
                            </ul>
                        </div>
                        <div className="map-body"></div>
                    </div>
                    <div className="map-card">
                        <div className="map-header d-flex justify-content-between align-items-center">
                            <span>Tracking</span>
                            <ul className="nav">
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-search-plus"></i></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-search-minus"></i></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-book-open"></i></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-times"></i></a></li>
                            </ul>
                        </div>
                        <div className="map-body"></div>
                    </div>
                    <div className="map-card">
                        <div className="map-header d-flex justify-content-between align-items-center">
                            <span>Tracking</span>
                            <ul className="nav">
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-search-plus"></i></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-search-minus"></i></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-book-open"></i></a></li>
                                <li className="nav-item"><a href="#" className="nav-link text-white"><i className="fas la-times"></i></a></li>
                            </ul>
                        </div>
                        <div className="map-body"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export const Dailogmodal2 = () =>{
    const [togglebtn2, settogglebtn]= useState(false);
    return(
        <div className={togglebtn2 ? 'modal-right show-modal': 'modal-right'}>
            <button className="btn btn-primary modal-btn" style={{top:'250px'}} onClick={() => settogglebtn(!togglebtn2)}><i className={togglebtn2 ? 'fas la-angle-right': 'fas la-angle-left'}></i></button>
            <div className="modal-right-content">
                <div className="modal-heading">
                    <h1 className="active-state">Send Message</h1>
                </div>
                <div className="modal-right-body">
                    <div className="modal-message-top">
                        <div className="alert alert-warning alert-dismissible fade show m-0">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            Send text message: <strong>165</strong>
                        </div>
                        <form action="">
                        <div className="form-group">
                            <label>Phrases:</label>
                            <select className="form-control">
                                <option>select..</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <div className="d-flex align-items-center justify-content-between">
                                <label>Text:</label>
                                <p className="text-right m-0">Message Length 0/255</p>
                            </div>
                            <textarea className="form-control" rows={5} placeholder="Enter password" />                            
                        </div>
                        <div className="form-group form-check">
                            <label className="form-check-label d-inline-flex align-items-center">
                            <input className="form-check-input" type="checkbox" /> <span className="pl-2">Internal Only</span>
                            </label>
                        </div>
                        <div className="text-center"><button type="submit" className="btn btn-primary btn-lg">Send Message</button></div>
                        </form>
                    </div>
                    <div className="modal-message-bottom">
                        <span>No text message to diplay</span>
                    </div>
                </div>
            </div>
        </div>
    );
}