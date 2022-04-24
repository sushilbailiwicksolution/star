import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { COUNTRIES } from '../../Constants/countries';
import { customerService } from '../../Service/customer.service';
import LeftPanel from '../Assets/LeftPanel';

function CreateCustomer(props: any) {
  const [username, setUserName] = useState('');
  const [isReadonly, setReadOnly] = useState(false);
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const { state } = props.location;
  const [userId, setUserId] = useState();

  const [errors, setErrors] = useState({
    customerName: '',
    contact: '',
    email: '',
    phoneNumber: '',
    address: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    countryCode: '',
    postalCode: '',
    adminDetails: {
      login_id: '',
      firstname: '',
      lastname: '',
      password: '',
      retype_password: '',
      email_id: '',
      phone_no: '',
    }
  });
  const initFormFields = {
    customerName: '',
    contact: '',
    email: '',
    phoneNumber: '',
    address: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    countryCode: '',
    postalCode: '',
    isAdministrator: false,
    adminDetails: {
      login_id: '',
      firstname: '',
      lastname: '',
      password: '',
      retype_password: '',
      email_id: '',
      phone_no: '',
    }
  };
  const [formFields, setFormFields] = useState(initFormFields);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    let loggedInUser = JSON.parse(localStorage.getItem('logedInUser') || '{}');
    const user = loggedInUser.userName ? loggedInUser.userName : 'Dev';
    setUserName(user);
    onInit();
  }, []);

  const onInit = async () => {
    if (state && state.isEdit) {
      setIsUpdateForm(true);
      setUserId(state.data.id);
      updateValues(state.data);
    }

    if (state && state.isEdit == false) {
      setReadOnly(true);
      setUserId(state.data.id);
      updateValues(state.data);
    }
  };

  const updateValues = (data: any) => {
    let obj = {
      customerName: data.name,
      contact: '',
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      line1: '',
      line2: '',
      city: '',
      state: '',
      countryCode: data.countryCode,
      postalCode: '',
      isAdministrator: false,
      adminDetails: {
        login_id: '',
        firstname: '',
        lastname: '',
        password: '',
        retype_password: '',
        email_id: '',
        phone_no: '',
      }

    };
    setFormFields({ ...obj });
  };

  const addCustomer = () => {
    const isValid = validateForm();
    if (isValid) {
      const requestParams: any = formFields;
      requestParams.accountType = 'USER';
      requestParams.customerId = 0;
      requestParams.username = username;
      requestParams.name = requestParams.customerName;
      createCustomer(requestParams);
    }
  };

  const updateHandleSubmit = (e: any) => {
    const isValid = validateForm();
    if (isValid) {
      const requestParams: any = formFields;
      requestParams.accountType = 'USER';
      requestParams.customerId = 0;
      requestParams.username = username;
      requestParams.id = userId;
      updateCustomer(requestParams);
    }
  };

  const validateForm = () => {
    const formError = { ...errors };
    let returnValue = true;
    const {
      customerName,
      contact,
      email,
      phoneNumber,
      address,
      line1,
      line2,
      city,
      state,
      countryCode,
      postalCode,
      isAdministrator,
      adminDetails
    } = formFields;

    const {
      login_id,
      firstname,
      lastname,
      password,
      retype_password,
      email_id,
      phone_no,
    } = adminDetails;

    if (customerName) {
      formError.customerName = '';
    } else {
      returnValue = false;
      formError.customerName = 'Please enter Customer Name';
    }

    if (email) {
      formError.email = '';
    } else {
      returnValue = false;
      formError.email = 'Please enter email id';
    }

    if (email && validateEmail(email)) {
      formError.email = '';
    } else {
      returnValue = false;
      formError.email = 'Please enter Valid email id';
    }

    if (line1) {
      formError.line1 = '';
    } else {
      returnValue = false;
      formError.line1 = 'Please enter Line 1';
    }

    if (city) {
      formError.city = '';
    } else {
      returnValue = false;
      formError.city = 'Please enter City';
    }

    if (state) {
      formError.state = '';
    } else {
      returnValue = false;
      formError.state = 'Please enter State';
    }

    if (countryCode) {
      formError.countryCode = '';
    } else {
      returnValue = false;
      formError.countryCode = 'Please enter Country';
    }

    if (postalCode) {
      formError.postalCode = '';
    } else {
      returnValue = false;
      formError.postalCode = 'Please enter Postal Code';
    }

    if (isAdministrator) {
      if (login_id) {
        formError.adminDetails.login_id = '';
      } else {
        returnValue = false;
        formError.adminDetails.login_id = 'Please enter login id';
      }

      if (firstname) {
        formError.adminDetails.firstname = '';
      } else {
        returnValue = false;
        formError.adminDetails.firstname = 'Please enter first name';
      }

      if (lastname) {
        formError.adminDetails.lastname = '';
      } else {
        returnValue = false;
        formError.adminDetails.lastname = 'Please enter last name';
      }

      if (password) {
        formError.adminDetails.password = '';
      } else {
        returnValue = false;
        formError.adminDetails.password = 'Please enter password';
      }

      if (retype_password) {
        formError.adminDetails.retype_password = '';
      } else {
        returnValue = false;
        formError.adminDetails.retype_password = 'Please retype password';
      }

      if (password && retype_password) {
        if (password != retype_password) {
          returnValue = false;
          formError.adminDetails.password = 'Password & Retype Password should be same';
          formError.adminDetails.retype_password = 'Password & Retype Password should be same';
        }
      }

      if (email_id) {
        formError.adminDetails.email_id = '';
      } else {
        returnValue = false;
        formError.adminDetails.email_id = 'Please enter email id';
      }

      if (email_id && validateEmail(email_id)) {
        formError.adminDetails.email_id = '';
      } else {
        returnValue = false;
        formError.adminDetails.email_id = 'Please enter Valid email id';
      }

      if (phone_no) {
        formError.adminDetails.phone_no = '';
      } else {
        returnValue = false;
        formError.adminDetails.phone_no = 'Please enter phone number';
      }
    }
    setErrors(formError);
    return returnValue;
  };

  const validateEmail = (inputText: any) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
      return true;
    } else {
      return false;
    }
  };

  const handleChange = (e: any) => {
    let target = e.target;
    let fName = target.name;
    let value = target.value;
    let fields = { ...formFields, [fName]: value };
    setFormFields(fields);
    let allErrors = { ...errors, [fName]: '' };
    setErrors(allErrors);
  };

  const handleAdminChange = (e: any) => {
    let target = e.target;
    let fName = target.name;
    let value = target.value;
    let fields = {
      ...formFields, adminDetails: {
        ...formFields.adminDetails,
        [fName]: value
      }
    };
    setFormFields(fields);
    let allErrors = { ...errors, [fName]: '' };
    setErrors(allErrors);
  };

  const createCustomer = async (request: any) => {
    setLoader(true);
    try {
      let data = await customerService.createCustomer(request);
      setLoader(false);
      if (data.status == 200) {
        toast.success(
          `You have added a new Customer`
        );
        setFormFields(initFormFields);
      }
    } catch (err: any) {
      setLoader(false);
      toast.error(err.msg);
    }
  };

  const updateCustomer = async (request: any) => {
    try {
      let data = await customerService.updateCustomer(request);
      setLoader(false);
      if (data.status == 200) {
        toast.success(data.msg);
      }
    } catch (err: any) {
      setLoader(false);
      toast.error(err.msg);
    }
  };

  const GET_CREATE_UPDATE_BUTTON = () => {
    if (isUpdateForm) {
      return (
        <button
          type='submit'
          className='cl-btn cl-btn-secondary'
          onClick={updateHandleSubmit}
        >
          Update
        </button>
      );
    } else {
      return (
        <button
          type='submit'
          className='cl-btn cl-btn-secondary'
          onClick={addCustomer}
        >
          Submit
        </button>
      );
    }
  };

  return (
    <React.Fragment>
      <div className='loading' style={{ display: loader ? 'block' : 'none' }}>
        <img src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' />
      </div>
      <div className='container-fluid content-body vh-100 pb-5'>
        <div className='row'>
          <LeftPanel props={props} />
          <div className='col-md-9'>

            <div className='row'>
              <div className='col-lg-12'>
                <h1 className='cl-white py-4 mt-4 mb-5 text-left'>
                  Identification
                </h1>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-12 mb-4'>
                <h3 className='cl-white text-left'>
                  Customer : <span>{username}</span>
                </h3>
              </div>
              <div className='col-lg-12'>
                <div>
                  <div className='row mb-3'>
                    <div className='col-md-4'>
                      <div className='form-group mb-3'>
                        <label className='d-block text-left  cl-white'>
                          Customer Name
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          name='customerName'
                          placeholder='Customer Name'
                          onChange={handleChange}
                          value={formFields.customerName}
                          disabled={isReadonly}
                        />
                        {errors.customerName ? (
                          <span className='d-block text-left cl-red'>
                            {errors.customerName}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='form-group mb-3'>
                        <label className='d-block text-left  cl-white'>
                          Contact
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          name='contact'
                          placeholder='Contact'
                          onChange={handleChange}
                          value={formFields.contact}
                          disabled={isReadonly}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <div className='col-md-4'>
                      <div className='form-group mb-3'>
                        <label className='d-block text-left  cl-white'>
                          Email
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          name='email'
                          placeholder='Email'
                          onChange={handleChange}
                          value={formFields.email}
                          disabled={isReadonly}
                        />
                        {errors.email ? (
                          <span className='d-block text-left cl-red'>
                            {errors.email}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='form-group mb-3'>
                        <label className='d-block text-left  cl-white'>
                          Phone Number
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          name='phoneNumber'
                          placeholder='Phone Number'
                          onChange={handleChange}
                          value={formFields.phoneNumber}
                          disabled={isReadonly}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12 mb-4'>
                    <h3 className='cl-white text-left'>
                      Address
                    </h3>
                  </div>
                  <div className='row mb-3'>
                    <div className='col-md-4'>
                      <div className='form-group mb-3'>
                        <label className='d-block text-left  cl-white'>
                          Line 1
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          name='line1'
                          placeholder='Line 1'
                          onChange={handleChange}
                          value={formFields.line1}
                          disabled={isReadonly}
                        />
                        {errors.line1 ? (
                          <span className='d-block text-left cl-red'>
                            {errors.line1}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='form-group mb-3'>
                        <label className='d-block text-left  cl-white'>
                          Line 2
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          name='line2'
                          placeholder='Line 2'
                          onChange={handleChange}
                          value={formFields.line2}
                          disabled={isReadonly}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <div className='col-md-4'>
                      <div className='form-group mb-3'>
                        <label className='d-block text-left  cl-white'>
                          City
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          name='city'
                          placeholder='City'
                          onChange={handleChange}
                          value={formFields.city}
                          disabled={isReadonly}
                        />
                        {errors.city ? (
                          <span className='d-block text-left cl-red'>
                            {errors.city}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='form-group mb-3'>
                        <label className='d-block text-left  cl-white'>
                          State
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          name='state'
                          placeholder='State'
                          onChange={handleChange}
                          value={formFields.state}
                          disabled={isReadonly}
                        />
                        {errors.state ? (
                          <span className='d-block text-left cl-red'>
                            {errors.state}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <div className='col-md-4'>
                      <div className='form-group mb-3'>
                        <label className='d-block text-left  cl-white'>
                          Country
                        </label>
                        <select
                          className='form-control select-country-style'
                          name='countryCode'
                          placeholder='Country'
                          onChange={handleChange}
                          disabled={isReadonly}
                          value={formFields.countryCode}
                        >
                          <option value=''>Select Country</option>;
                          {COUNTRIES.map((item: any, index: any) => {
                            return (
                              <option key={item.country} value={item.country}>
                                {item.country}
                              </option>
                            );
                          })}
                        </select>
                        {errors.countryCode ? (
                          <span className='d-block text-left cl-red'>
                            {errors.countryCode}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='form-group mb-3'>
                        <label className='d-block text-left  cl-white'>
                          Postal Code
                        </label>
                        <input
                          type='number'
                          className='form-control'
                          name='postalCode'
                          placeholder='Postal Code'
                          onChange={handleChange}
                          value={formFields.postalCode}
                          disabled={isReadonly}
                        />
                        {errors.postalCode ? (
                          <span className='d-block text-left cl-red'>
                            {errors.postalCode}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-3'>
                    <div className='form-group d-flex text-left'>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          name='isAdministrator'
                          onChange={() => {
                            let check = formFields.isAdministrator ? false : true;
                            setFormFields({
                              ...formFields,
                              isAdministrator: check,
                            });
                          }}
                          checked={formFields.isAdministrator}
                          disabled={isReadonly}
                        ></input>
                        <label className='form-check-label cl-white ml-4'>
                          Administrator : Default
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg-12'>
                {formFields.isAdministrator ?
                  <div>
                    <div className='row mb-3'>
                      <div className='col-md-4'>
                        <div className='form-group mb-3'>
                          <label className='d-block text-left  cl-white'>
                            login Id
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            name='login_id'
                            placeholder='Id'
                            onChange={handleAdminChange}
                            value={formFields.adminDetails.login_id}
                            disabled={isReadonly}
                          />
                          {errors.adminDetails.login_id ? (
                            <span className='d-block text-left cl-red'>
                              {errors.adminDetails.login_id}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <div className='col-md-4'>
                        <div className='form-group mb-3'>
                          <label className='d-block text-left  cl-white'>
                            First Name
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            name='firstname'
                            placeholder='First Name'
                            onChange={handleAdminChange}
                            value={formFields.adminDetails.firstname}
                            disabled={isReadonly}
                          />
                          {errors.adminDetails.firstname ? (
                            <span className='d-block text-left cl-red'>
                              {errors.adminDetails.firstname}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className='col-md-4'>
                        <div className='form-group mb-3'>
                          <label className='d-block text-left  cl-white'>
                            last Name
                          </label>
                          <input
                            type='text'
                            className='form-control'
                            name='lastname'
                            placeholder='last Name'
                            onChange={handleAdminChange}
                            value={formFields.adminDetails.lastname}
                            disabled={isReadonly}
                          />
                          {errors.adminDetails.lastname ? (
                            <span className='d-block text-left cl-red'>
                              {errors.adminDetails.lastname}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <div className='col-md-4'>
                        <div className='form-group mb-3'>
                          <label className='d-block text-left  cl-white'>
                            Password
                          </label>
                          <input
                            type='password'
                            className='form-control'
                            name='password'
                            placeholder='Password'
                            onChange={handleAdminChange}
                            value={formFields.adminDetails.password}
                            disabled={isReadonly}
                          />
                          {errors.adminDetails.password ? (
                            <span className='d-block text-left cl-red'>
                              {errors.adminDetails.password}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className='col-md-4'>
                        <div className='form-group mb-3'>
                          <label className='d-block text-left  cl-white'>
                            Retype Password
                          </label>
                          <input
                            type='password'
                            className='form-control'
                            name='retype_password'
                            placeholder='Retype Password'
                            onChange={handleAdminChange}
                            value={formFields.adminDetails.retype_password}
                            disabled={isReadonly}
                          />
                          {errors.adminDetails.retype_password ? (
                            <span className='d-block text-left cl-red'>
                              {errors.adminDetails.retype_password}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <div className='col-md-4'>
                        <div className='form-group mb-3'>
                          <label className='d-block text-left  cl-white'>
                            Email Id
                          </label>
                          <input
                            type='email'
                            className='form-control'
                            name='email_id'
                            placeholder='Email Id'
                            onChange={handleAdminChange}
                            value={formFields.adminDetails.email_id}
                            disabled={isReadonly}
                          />
                          {errors.adminDetails.email_id ? (
                            <span className='d-block text-left cl-red'>
                              {errors.adminDetails.email_id}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className='col-md-4'>
                        <div className='form-group mb-3'>
                          <label className='d-block text-left  cl-white'>
                            Phone Number
                          </label>
                          <input
                            type='number'
                            className='form-control'
                            name='phone_no'
                            placeholder='phone Number'
                            onChange={handleAdminChange}
                            value={formFields.adminDetails.phone_no}
                            disabled={isReadonly}
                          />
                          {errors.adminDetails.phone_no ? (
                            <span className='d-block text-left cl-red'>
                              {errors.adminDetails.phone_no}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  : null}
                <div className='row mt-4'>
                  <div className='col-md-4 justify-content-start d-flex'>
                    <GET_CREATE_UPDATE_BUTTON />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default CreateCustomer;
