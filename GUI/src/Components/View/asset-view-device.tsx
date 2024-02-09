import React, { useState, useEffect, useReducer } from 'react';
import { assetService } from "../../Service/asset.service";
import { toast } from "react-toastify";
import viewIcon from '../../Assets/images/viewfile.png';
import exportIcon from '../../Assets/images/export-icon.png';
import { useLocation } from "react-router-dom";
import moment from "moment";
import { getAirCraft, getAirCraftDetails } from "../../Service";

const UPDATE_ASSET = 'UPDATE_ASSET';

const initialState = { name: '', description: '', customer: '', deviceType: '' };

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case UPDATE_ASSET:
            return { ...state, ...action.value };
        default:
            throw new Error();
    }
}
/**
 * This component is handling  view aspects of asset.
 * @component
 */

const AssetViewDevicesComponent = () => {
    const [loader, setLoader] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);

    const [limitValues, updateLimitValues] = useState({
        page: 1,
        limit: 10,
    });
    const [pageCount, updatePageCount] = useState(3);
    const [showData, setShowData] = useState(false);
    const [airCraftDetails, setAirCraftDetails] = useState([]);

    const location: any = useLocation();
    useEffect(() => {
        if (location.state.selectedAsset) {
            const selectedAsset = location.state.selectedAsset;
            const assetDetail = { name: selectedAsset.name, description: selectedAsset.description, customer: selectedAsset.createdBy, deviceType: selectedAsset.deviceType };
            dispatch({ type: UPDATE_ASSET, value: assetDetail })
            onSelectedAsset(assetDetail.name);
        }
    }, [location.state])

    const onSelectedAsset = (item: any) => {
        let toDate = new Date();
        const toDateFormat = moment(toDate).format('DD-MM-YYYY');
        let fromDate = getLastNMonthDate(toDate, -6);
        const fromDateFormat = moment(fromDate).format('DD-MM-YYYY');
        getAirCraftData(item, fromDateFormat, toDateFormat);
    }

    const getAirCraftData = async (assetName: any, fromDate: any, toDate: any) => {
        setLoader(true);
        try {
            const airCraftData = await getAirCraft(
                fromDate,
                toDate,
                assetName
            );
            const airCrafts = [] as any;
            for (let k in airCraftData) {
                airCrafts.push(airCraftData[k]);
            }
            if (airCrafts.length > 0) {
                getAirCraftDetailsAPI(airCrafts[airCrafts.length - 1].aircraftid);
            } else {
                setLoader(false);
            }
        } catch (e) {
            setLoader(false);
        }
    }

    const getAirCraftDetailsAPI = async (selectedFlight: any) => {

        try {
            const airCraftDetails = await getAirCraftDetails(selectedFlight);
             let airCrafts = [] as any;
            // for (let k in airCraftDetails) {
            //     airCrafts.push(airCraftDetails[k]);
            // }
            if (airCraftDetails.flightData) {
                airCrafts = airCraftDetails.flightData;
            } else {
                airCrafts = [];
            }
            setAirCraftDetails(airCrafts);
            setLoader(false);
        } catch (error) {
            setAirCraftDetails([]);
            setLoader(false);
        }

    }

    const getLastNMonthDate = (date: Date, months: number) => {
        date.setMonth(date.getMonth() + months);
        return date;
    }


    const AssetTable = () => {
        return (
            <div className='col-md-12 my-4 report-list'>
                <div className='row mt-5 d-flex justify-content-center'>
                    <div className='col-md-11'>
                        <div className='row'>
                            <div className='col-md-8 d-flex align-items-center'>
                                <h2 className='cl-white mr-5'>Assets List / View</h2>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='colored-heading'>
                                    <h3 className='cl-white text-left m-0 p-4'>
                                        Utilization
                                    </h3>
                                </div>
                                <div className='light-card-bg p-4'>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <div className='row mb-2'>
                                                <div className='col-md-2 d-flex justify-content-between'>
                                                    <p className='m-0 cl-white text-left'>
                                                        Customer
                                                    </p>
                                                    <span className='cl-white'>:</span>
                                                </div>
                                                <div className='col-md-10'>
                                                    <p className='m-0 cl-white text-left'>
                                                        {state.customer}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='row mb-2'>
                                                <div className='col-md-4 d-flex justify-content-between'>
                                                    <p className='m-0 cl-white text-left'>
                                                        Asset Name
                                                    </p>
                                                    <span className='cl-white'>:</span>
                                                </div>
                                                <div className='col-md-8'>
                                                    <p className='m-0 cl-white text-left'>
                                                        {state.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='row mb-2'>
                                                <div className='col-md-4 d-flex justify-content-between'>
                                                    <p className='m-0 cl-white text-left'>Description</p>
                                                    <span className='cl-white'>:</span>
                                                </div>
                                                <div className='col-md-8'>
                                                    <p className='m-0 cl-white text-left'>
                                                        {state.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='row mb-2'>
                                                <div className='col-md-4 d-flex justify-content-between'>
                                                    <p className='m-0 cl-white text-left'>
                                                        Owner
                                                    </p>
                                                    <span className='cl-white'>:</span>
                                                </div>
                                                <div className='col-md-8'>
                                                    <p className='m-0 cl-white text-left'>
                                                        {state.customer}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='row mb-2'>
                                                <div className='col-md-4 d-flex justify-content-between'>
                                                    <p className='m-0 cl-white text-left'>
                                                        Device Type
                                                    </p>
                                                    <span className='cl-white'>:</span>
                                                </div>
                                                <div className='col-md-8'>
                                                    <p className='m-0 cl-white text-left'>
                                                        {state.deviceType}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-12 table-responsive mt-5 table-max-height'>
                                <table className='table table-striped table-dark'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Time</th>
                                            <th scope='col'>Landmark</th>
                                            <th scope='col'>Heading</th>
                                            <th scope='col'>Velocity(knots)</th>
                                            <th scope='col'>Altitude(ft)</th>
                                            <th scope='col'>Distance(nm)</th>
                                            <th scope='col'>State</th>
                                            <th scope='col'>Event</th>
                                            <th scope='col'>Message</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {airCraftDetails.map(
                                            (item: any, index: any) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.date_time}</td>
                                                        <td>{'N/A'}</td>
                                                        <td>{item.heading}</td>
                                                        <td>{`N/A`}</td>
                                                        <td>{item.altitude}</td>
                                                        <td>{`N/A`}</td>
                                                        <td >{`N/A`}</td>
                                                        <td>{item.eventid}</td>
                                                        <td>{`N/A`}</td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }

    return (
        <React.Fragment>
            <div className='container-fluid content-body vh-100'>
                <div className='loading' style={{ display: loader ? 'block' : 'none' }}>
                    <img src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' />
                </div>
                <div className='row h-100vh-80px'>
                    {AssetTable()}
                </div>
            </div>

        </React.Fragment>
    );
};

export default AssetViewDevicesComponent;
