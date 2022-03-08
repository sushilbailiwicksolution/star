import React, { useEffect, useState } from "react";
import LeftPanel from "./LeftPanel";
import { toast } from 'react-toastify';
import { saveLayer } from '../../Service/index';

function CreateLayer(props: any) {
    const [loader, setLoader] = useState(false);
    const [username, setUserName] = useState('');
    const [errors, setErrors] = useState({
        name: '',
        address: '',
        city: '',
        country: '',
        zip: '',
        state: ''
    });
    const [formFields, setFormFields] = useState({
        name: '',
        address: '',
        city: '',
        country: '',
        zip: '',
        state: ''
    });

    useEffect(() => {
        let loggedInUser = JSON.parse(localStorage.getItem('logedInUser') || '{}');
        const user = loggedInUser.userName ? loggedInUser.userName : "Dev";
        setUserName(user);
        setTimeout(() => {
            setLoader(false);
        }, 300)
    })

    const addLayer = async () => {
        const isValid = validateForm();
        console.log('isValid', isValid);
        if (isValid) {
            await saveLayer(Object.assign({ created_by: username }, formFields));
            toast.success(`You have added a new layer ${formFields.name} ${formFields.address}`);
            props.history.push('/plan');
            setFormFields({
                name: '',
                address: '',
                city: '',
                country: '',
                zip: '',
                state: ''
            });
        }
    }

    const validateForm = () => {
        const formError = { ...errors };
        let returnValue = true;
        const {
            name,
            address,
            city,
            country,
            zip,
            state } = formFields;

        if (name) {
            formError.name = '';
        } else {
            returnValue = false;
            formError.name = 'Please enter layer name';
        }

        if (address) {
            formError.address = '';
        } else {
            returnValue = false;
            formError.address = 'Please enter address';
        }

        if (city) {
            formError.city = '';
        } else {
            returnValue = false;
            formError.city = 'Please enter city';
        }

        if (country) {
            formError.country = '';
        } else {
            returnValue = false;
            formError.country = 'Please enter country';
        }

        if (zip) {
            formError.zip = '';
        } else {
            returnValue = false;
            formError.zip = 'Please enter zip';
        }

        if (state) {
            formError.state = '';
        } else {
            returnValue = false;
            formError.state = 'Please enter state';
        }
        setErrors(formError);
        return returnValue;
    }

    const handleChange = (e: any) => {
        let target = e.target;
        let fName = target.name;
        let value = target.value;
        let fields = { ...formFields, [fName]: value };
        setFormFields(fields);
        let allErrors = { ...errors, [fName]: '' };
        setErrors(allErrors);
    }

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
                                    <td className="ml-3">&nbsp;&nbsp;Demo</td>
                                </tr>
                                {/*  */}
                                <tr>
                                    <td className="small-shell">Name</td>
                                    <td>
                                        <input type="text" className="form-control small-input-box ml-3 w-50" name="name" placeholder="Layer Name" onChange={handleChange}></input>
                                        {errors.name ? (<span className="d-block text-left cl-red ml-3 w-50">{errors.name}</span>) : (null)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="table table-striped table-dark">
                            <tbody>
                                <tr>
                                    <td className="small-shell">Address</td>
                                    <td>
                                        <textarea className="form-control  ml-3 w-50" rows={5} onChange={handleChange} name="address"></textarea>
                                        {errors.address ? (<span className="d-block text-left cl-red ml-3 w-50">{errors.address}</span>) : (null)}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="small-shell">City</td>
                                    <td>
                                        <input type="text" className="form-control small-input-box ml-3 w-50" placeholder="City" onChange={handleChange} name="city"></input>
                                        {errors.city ? (<span className="d-block text-left cl-red ml-3 w-50">{errors.city}</span>) : (null)}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="small-shell">Country</td>
                                    <td>
                                        <input type="text" className="form-control small-input-box ml-3 w-50" placeholder="Country" onChange={handleChange} name="country"></input>
                                        {errors.country ? (<span className="d-block text-left cl-red ml-3 w-50">{errors.country}</span>) : (null)}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="small-shell">ZIP</td>
                                    <td>
                                        <input type="text" className="form-control small-input-box ml-3 w-50" placeholder="ZIP" onChange={handleChange} name="zip"></input>
                                        {errors.zip ? (<span className="d-block text-left cl-red ml-3 w-50">{errors.zip}</span>) : (null)}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="small-shell">State</td>
                                    <td>
                                        <input type="text" className="form-control small-input-box ml-3 w-50" placeholder="State" onChange={handleChange} name="state"></input>
                                        {errors.state ? (<span className="d-block text-left cl-red ml-3 w-50">{errors.state}</span>) : (null)}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="small-shell">Comments</td>
                                    <td><textarea className="form-control ml-3 w-50" rows={5}></textarea></td>
                                </tr>
                            </tbody>
                        </table>
                        {/*                        
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
                                    <td><input type="text" className="form-control small-input-box"></input></td>
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
                            */}
                        <div className="d-flex align-items-center justify-content-end mt-3">
                            <button type="button" className="cl-btn cl-btn-primary white-btn mr-3" onClick={addLayer}>Create</button>
                            <button type="button" className="cl-btn cl-btn-secondary white-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
}
export default CreateLayer;
