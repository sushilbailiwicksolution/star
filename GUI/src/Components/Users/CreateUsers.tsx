import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// import LeftPanel from './LeftPanel';

function CreateUsers(props: any) {
  const [username, setUserName] = useState('');
  const [errors, setErrors] = useState({
    login_id: '',
    first_name: '',
    last_name: '',
    password: '',
    retype_password: '',
    email_id: '',
    phone_no: '',
    expires_on: '',
  });
  const [formFields, setFormFields] = useState({
    login_id: '',
    first_name: '',
    last_name: '',
    password: '',
    retype_password: '',
    email_id: '',
    phone_no: '',
    expires_on: '',
  });
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    let loggedInUser = JSON.parse(localStorage.getItem('logedInUser') || '{}');
    const user = loggedInUser.userName ? loggedInUser.userName : 'Dev';
    setUserName(user);
    setTimeout(() => {
      setLoader(false);
    }, 300);
  });

  const addUsers = () => {
    const isValid = validateForm();
    console.log('isValid', isValid);
    if (isValid) {
      toast.success(
        `You have added a new user ${formFields.first_name} ${formFields.last_name}`
      );
      setFormFields({
        login_id: '',
        first_name: '',
        last_name: '',
        password: '',
        retype_password: '',
        email_id: '',
        phone_no: '',
        expires_on: '',
      });
    }
  };

  const validateForm = () => {
    const formError = { ...errors };
    let returnValue = true;
    const {
      login_id,
      first_name,
      last_name,
      password,
      retype_password,
      email_id,
      phone_no,
      expires_on,
    } = formFields;
    if (login_id) {
      formError.login_id = '';
    } else {
      returnValue = false;
      formError.login_id = 'Please enter login id';
    }

    if (first_name) {
      formError.first_name = '';
    } else {
      returnValue = false;
      formError.first_name = 'Please enter first name';
    }

    if (last_name) {
      formError.last_name = '';
    } else {
      returnValue = false;
      formError.last_name = 'Please enter last name';
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

    if (email_id) {
      formError.email_id = '';
    } else {
      returnValue = false;
      formError.email_id = 'Please enter email id';
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

  const handleChange = (e: any) => {
    let target = e.target;
    let fName = target.name;
    let value = target.value;
    let fields = { ...formFields, [fName]: value };
    setFormFields(fields);
    let allErrors = { ...errors, [fName]: '' };
    setErrors(allErrors);
  };

  return (
    <React.Fragment>
      <div className='loading' style={{ display: loader ? 'block' : 'none' }}>
        <img src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' />
      </div>
      <div className='container-fluid content-body vh-100 pb-5'>
        <div className='row'>
          {/* <LeftPanel props={props}/> */}
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
                        onChange={handleChange}
                      />
                      {errors.login_id ? (
                        <span className='d-block text-left cl-red'>
                          {errors.login_id}
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
                        name='first_name'
                        placeholder='First Name'
                        onChange={handleChange}
                      />
                      {errors.first_name ? (
                        <span className='d-block text-left cl-red'>
                          {errors.first_name}
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
                        name='last_name'
                        placeholder='last Name'
                        onChange={handleChange}
                      />
                      {errors.last_name ? (
                        <span className='d-block text-left cl-red'>
                          {errors.last_name}
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
                        type='text'
                        className='form-control'
                        name='phone_no'
                        placeholder='phone Number'
                        onChange={handleChange}
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
                    <button
                      type='submit'
                      className='cl-btn cl-btn-secondary'
                      onClick={addUsers}
                    >
                      Submit
                    </button>
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

export default CreateUsers;
