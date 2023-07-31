import React, { memo, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { userService } from '../../Service/user.service';
import LeftPanel from '../Assets/LeftPanel';
import { COUNTRIES } from '../../Constants/countries';
import { customerService, getCustomerByUserId } from '../../Service/customer.service';

/**
 * This is a React component that represents Edit admin page.
 * In this component, we are handling the edit page.
 * @component
 */

/**
 * @typedef {Object} ErrorState
 * @property {string} login_id - The login ID error message.
 * @property {string} firstname - The first name error message.
 * @property {string} lastname - The last name error message.
 * @property {string} password - The password error message.
 * @property {string} retype_password - The retype password error message.
 * @property {string} email_id - The email ID error message.
 * @property {string} phone_no - The phone number error message.
 * @property {string} expires_on - The expiry date error message.
 */

/**
 * @typedef {Object} FormFields
 * @property {string} login_id - The login ID field value.
 * @property {string} firstname - The first name field value.
 * @property {string} lastname - The last name field value.
 * @property {string} password - The password field value.
 * @property {string} retype_password - The retype password field value.
 * @property {string} email_id - The email ID field value.
 * @property {string} phone_no - The phone number field value.
 * @property {string} expires_on - The expiry date field value.
 * @property {boolean} active - The active checkbox field value.
 * @property {boolean} canChangePassword - The canChangePassword checkbox field value.
 * @property {boolean} neverExpire - The neverExpire checkbox field value.
 */

/**
 * EditAdmin component for editing admin details.
 * @param {Object} props - Component props.
 * @returns {JSX.Element} React component for editing admin details.
 */

function EditAdmin(props: any) {
  const [username, setUserName] = useState('');
  const [isReadonly, setReadOnly] = useState(false);
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const { state } = props.location;
  const [userId, setUserId] = useState();
  const [customers, setCustomers] = useState<{ id: string; name: string }[]>([]);
  

/** @type {ErrorState} */
  const [errors, setErrors] = useState({
    login_id: '',
    firstname: '',
    lastname: '',
    password: '',
    retype_password: '',
    email_id: '',
    phone_no: '',
    expires_on: '',
  });
  
  /** @type {FormFields} */
  const initFormFields = {
    login_id: '',
    firstname: '',
    lastname: '',
    password: '',
    retype_password: '',
    email_id: '',
    phone_no: '',
    expires_on: '',
    // accountType:'',
    active: false,
    canChangePassword: false,
    neverExpire: false,
  };
  const [formFields, setFormFields] = useState(initFormFields);
  const [loader, setLoader] = useState(false);
  const [customerId , setCustomerId] = useState();
  const [customerName , setCustomerName]= useState<string | undefined>('');
  let loggedInUser = JSON.parse(localStorage.getItem('logedInUser') || '{}');
  /**
   * useEffect hook to handle component initialization.
   */
  useEffect(() => {
   
    const user = loggedInUser.results.username ? loggedInUser.results.username : 'Dev';
   
    if (loggedInUser.results.accountType === "CUSTOMER") {

      const getCustomer = async () => {
        const response = await customerService.getCustomerByUserId(loggedInUser.results.id);
        console.log(response.data.results);
        var customerDetails =response.data.results
        setCustomerId(customerDetails.id)
        setCustomerName(customerDetails.name)
      };
      getCustomer();
    }

    else if (loggedInUser.results.accountType==="SERVICE" && loggedInUser.results.customerId !== 0){
      const getCustomer = async () => {
        const response = await customerService.getCustomerById(loggedInUser.results.customerId);
        console.log(response.data.results);
        var customerDetails =response.data.results
        setCustomerId(customerDetails.id)
        setCustomerName(customerDetails.name)
      };
      getCustomer();
    }
    else if (loggedInUser.results.accountType === "SERVICE" && loggedInUser.results.customerId===0) {
      // Handle user creation based on customer selected by admin
      const getCustomers = async () => {
        const response = await customerService.getCustomersList();
        setCustomers(response.data.results);
      };
      getCustomers();

    }

    
    onInit();
  }, []);

  /**
   * Handle customer change event.
   * @param {Object} event - The event object.
   */

  const handleCustomerChange = async (event:any) => {
    
    const response = await customerService.getCustomerById(event.target.value);
    console.log(response.data.results);
    var customerDetails =response.data.results
    setCustomerId(customerDetails.id)
    setCustomerName(customerDetails.name)
  
  };
 

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
      login_id: data.login_id,
      firstname: data.firstname,
      lastname: data.lastname,
      password: data.password,
      retype_password: '',
      email_id: data.email_id,
      phone_no: data.phone_no,
      expires_on: data.expires_on,
    //   accountType:'',
      active: data.active,
      canChangePassword: data.canChangePassword,
      neverExpire: false,
    };
    setFormFields({ ...obj });
  };

  const addUsers = () => {
    const isValid = validateForm();
    if (isValid) {
      const requestParams: any = formFields;
      requestParams.accountType = 'SERVICE';
      requestParams.customerId = 0;
      // requestParams.username = username;
      requestParams.username = requestParams.firstname
      requestParams.createdBy = customerName;
      createUser(requestParams);
    }
  };

  const updateHandleSubmit = (e: any) => {
    const isValid = validateForm();
    if (isValid) {
      const requestParams: any = formFields;
      requestParams.accountType = 'SERVICE';
      requestParams.customerId = 0;
      // requestParams.username = username;
      requestParams.username = requestParams.firstname
      requestParams.createdBy = customerName;
      requestParams.id = userId;
       // Remove the retype_password field
    delete requestParams.retype_password;
      updateUser(requestParams);
    }
  };

  const validateForm = () => {
    const formError = { ...errors };
    let returnValue = true;
    const {
      login_id,
      firstname,
      lastname,
      password,
      retype_password,
      email_id,
      phone_no,
      expires_on,
    //   accountType,
    } = formFields;
    if (login_id) {
      formError.login_id = '';
    } else {
      returnValue = false;
      formError.login_id = 'Please enter login id';
    }

    if (firstname) {
      formError.firstname = '';
    } else {
      returnValue = false;
      formError.firstname = 'Please enter first name';
    }

    if (lastname) {
      formError.lastname = '';
    } else {
      returnValue = false;
      formError.lastname = 'Please enter last name';
    }

    if (password) {
      formError.password = '';
    } else {
      returnValue = false;
      formError.password = 'Please enter password';
    }

    if (retype_password) {
      formError.retype_password = '';
    } else {
      returnValue = false;
      formError.retype_password = 'Please retype password';
    }

    if (password && retype_password) {
      if (password != retype_password) {
        returnValue = false;
        formError.password = 'Password & Retype Password should be same';
        formError.retype_password = 'Password & Retype Password should be same';
      }
    }

    if (email_id) {
      formError.email_id = '';
    } else {
      returnValue = false;
      formError.email_id = 'Please enter email id';
    }

    if (email_id && validateEmail(email_id)) {
      formError.email_id = '';
    } else {
      returnValue = false;
      formError.email_id = 'Please enter Valid email id';
    }

    if (phone_no) {
      formError.phone_no = '';
    } else {
      returnValue = false;
      formError.phone_no = 'Please enter phone number';
    }

    if (expires_on) {
      formError.expires_on = '';
    } else {
      returnValue = false;
      formError.expires_on = 'Please select an expiry date';
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

  const createUser = async (request: any) => {
    setLoader(true);
    try {
      let data = await userService.createUser(request);
      setLoader(false);
      if (data.status == 200) {
        toast.success(
          `You have added a new user ${formFields.firstname} ${formFields.lastname}`
        );

        setFormFields(initFormFields);
      }
    } catch (err: any) {
      setLoader(false);
      toast.error(err.msg);
    }
  };

  const updateUser = async (request: any) => {
    try {
      let data = await userService.updateUser(userId,request);
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
          onClick={addUsers}
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
      <div className='container-fluid content-body pb-5'>
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
            {/* <div>
    {loggedInUser.results.accountType === "SERVICE" && loggedInUser.results.customerId===0 && (
      <select onChange={handleCustomerChange}>
        <option value="">Select a customer</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>
    )}
  </div> */}
              <div className='col-lg-12'>
                <div className='row mb-3'>
                <div className='col-md-4'>
  <div className='form-group mb-3'>
    <label className='d-block text-left cl-white'>
      login Id
    </label>
    <input
      type='text'
      className='form-control'
      name='login_id'
      placeholder='Id'
      onChange={handleChange}
      value={formFields.login_id}
      disabled={isReadonly}
    />
    {errors.login_id ? (
      <span className='d-block text-left cl-red'>
        {errors.login_id}
      </span>
    ) : null}
  </div>
</div>
{/* <div className='col-md-4'>
    <div className='form-group mb-3'>
      <label className='d-block text-left cl-white'>
        Account Type
      </label>
      <select
        className='form-control'
        name='accountType'
        onChange={handleChange}
        value={formFields.accountType}
        disabled={isReadonly}
      >
        <option value='USER'>USER</option>
        <option value='SERVICE'>ADMIN</option>
      </select>
    </div>
  </div> */}
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
                        onChange={handleChange}
                        value={formFields.firstname}
                        disabled={isReadonly}
                      />
                      {errors.firstname ? (
                        <span className='d-block text-left cl-red'>
                          {errors.firstname}
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
                        onChange={handleChange}
                        value={formFields.lastname}
                        disabled={isReadonly}
                      />
                      {errors.lastname ? (
                        <span className='d-block text-left cl-red'>
                          {errors.lastname}
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
                        onChange={handleChange}
                        value={formFields.password}
                        disabled={isReadonly}
                      />
                      {errors.password ? (
                        <span className='d-block text-left cl-red'>
                          {errors.password}
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
                        onChange={handleChange}
                        value={formFields.retype_password}
                        disabled={isReadonly}
                      />
                      {errors.retype_password ? (
                        <span className='d-block text-left cl-red'>
                          {errors.retype_password}
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
                        onChange={handleChange}
                        value={formFields.email_id}
                        disabled={isReadonly}
                      />
                      {errors.email_id ? (
                        <span className='d-block text-left cl-red'>
                          {errors.email_id}
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
                        onChange={handleChange}
                        value={formFields.phone_no}
                        disabled={isReadonly}
                      />
                      {errors.phone_no ? (
                        <span className='d-block text-left cl-red'>
                          {errors.phone_no}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className='row mb-3'>
                  <div className='col-md-4'>
                    <div className='form-group mb-3'>
                      <label className='d-block text-left  cl-white'>
                        Expires on
                      </label>
                      <input
                        type='date'
                        className='form-control'
                        name='expires_on'
                        onChange={handleChange}
                        value={formFields.expires_on}
                        disabled={isReadonly}
                      />
                      {errors.expires_on ? (
                        <span className='d-block text-left cl-red'>
                          {errors.expires_on}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-12'>
                    <h3 className='cl-white text-left mb-4'>
                      Standard configurations
                    </h3>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group d-flex text-left'>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          name='active'
                          onChange={() => {
                            let check = formFields.active ? false : true;
                            setFormFields({
                              ...formFields,
                              active: check,
                            });
                          }}
                          checked={formFields.active}
                          disabled={isReadonly}
                        ></input>
                        <label className='form-check-label cl-white ml-4'>
                          Active
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group d-flex text-left'>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          name='canChangePassword'
                          onChange={() => {
                            let check = formFields.canChangePassword
                              ? false
                              : true;
                            setFormFields({
                              ...formFields,
                              canChangePassword: check,
                            });
                          }}
                          checked={formFields.canChangePassword}
                          disabled={isReadonly}
                        ></input>
                        <label className='form-check-label cl-white ml-4'>
                          Can Change Password
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group d-flex text-left'>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          name='neverExpire'
                          onChange={() => {
                            let check = formFields.neverExpire ? false : true;
                            setFormFields({
                              ...formFields,
                              neverExpire: check,
                            });
                          }}
                          checked={formFields.neverExpire}
                          disabled={isReadonly}
                        ></input>
                        <label className='form-check-label cl-white ml-4'>
                          Never Expire
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
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

export default memo(EditAdmin);