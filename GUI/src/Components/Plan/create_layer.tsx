import React, { useEffect, useState } from 'react';
import { planService } from '../../Service/plan.service';
import LeftPanel from './LeftPanel';
import { toast } from 'react-toastify';

function CreateLayer(props: any) {
  const { state } = props.location;

  const initialInputValue = {
    name: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zip: '',
    comments: '',
  };
  const [loader, setLoader] = useState(false);
  const [inputValues, setInputValue] = useState(initialInputValue);
  const [validation, setValidation] = useState(initialInputValue);
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const [layerId, setLayeId] = useState();
  const [isReadonly, setReadOnly] = useState(false);
  useEffect(() => {
    console.log('state', state);
    if (state && state.isEdit) {
      setIsUpdateForm(true);
      setLayeId(state.data.id);
      updateValues(state.data);
      // let data = state.data;
      // let obj = {
      //   name: data.name,
      //   address: data.address,
      //   country: data.country,
      //   state: data.state,
      //   city: data.city,
      //   zip: data.zip,
      //   comments: '',
      // };
      // setInputValue({ ...obj });
    }

    if (state && state.isEdit == false) {
      setReadOnly(true);
      setLayeId(state.data.id);
      updateValues(state.data);
    }
  }, []);

  const updateValues = (data: any) => {
    let obj = {
      name: data.name,
      address: data.address,
      country: data.country,
      state: data.state,
      city: data.city,
      zip: data.zip,
      comments: '',
    };
    setInputValue({ ...obj });
  };

  //handle submit updates
  function handleChange(event: any) {
    const { name, value } = event.target;
    setInputValue({ ...inputValues, [name]: value });
    if (value.trim().length > 0) {
      setValidation({ ...validation, [name]: '' });
    }
  }

  const createLayer = async (request: any) => {
    try {
      let data = await planService.createLayer(request);
      setLoader(false);
      if (data.status == 200) {
        toast('Layer Created Successfully');
      }
    } catch (err: any) {
      setLoader(false);
      toast(err.msg);
    }
  };

  const updateLayer = async (request: any) => {
    try {
      let data = await planService.updateLayer(layerId, request);
      setLoader(false);
      if (data.status == 200) {
        toast(data.msg);
      }
    } catch (err: any) {
      setLoader(false);
      toast(err.msg);
    }
  };

  const checkValidation = () => {
    let errors = validation;
    let check = true;
    //first Name validation
    if (!inputValues.name.trim()) {
      check = false;
      errors.name = 'First name is required';
    } else {
      errors.name = '';
    }
    if (!inputValues.address.trim()) {
      check = false;
      errors.address = 'Address is required';
    } else {
      errors.address = '';
    }

    if (!inputValues.country.trim()) {
      check = false;
      errors.country = 'State is required';
    } else {
      errors.country = '';
    }

    if (!inputValues.state.trim()) {
      check = false;
      errors.state = 'State is required';
    } else {
      errors.state = '';
    }

    if (!inputValues.city.trim()) {
      check = false;
      errors.city = 'City is required';
    } else {
      errors.city = '';
    }

    if (!inputValues.zip) {
      check = false;
      errors.zip = 'Zip is required';
    } else {
      errors.zip = '';
    }
    if (!inputValues.comments.trim()) {
      check = false;
      errors.comments = 'Comments is required';
    } else {
      errors.comments = '';
    }
    setValidation({ ...errors });
    return check;
  };

  const handleSubmit = (e: any) => {
    //e.preventDefault();
    let check = checkValidation();
    if (check) {
      let requestParams: any = inputValues;
      let logedInUser: any = localStorage.getItem('logedInUser');
      logedInUser = JSON.parse(logedInUser);
      requestParams['createdBy'] = logedInUser.userName;
      requestParams['zip'] = Number(requestParams.zip);
      setLoader(true);
      createLayer(requestParams);
    }
  };

  const updateHandleSubmit = (e: any) => {
    let check = checkValidation();
    if (check) {
      let requestParams: any = inputValues;
      let logedInUser: any = localStorage.getItem('logedInUser');
      logedInUser = JSON.parse(logedInUser);
      requestParams['createdBy'] = logedInUser.userName;
      requestParams['zip'] = Number(requestParams.zip);
      setLoader(true);
      updateLayer(requestParams);
    }
  };

  const GET_CREATE_UPDATE_BUTTON = () => {
    if (isUpdateForm) {
      return (
        <button
          type='button'
          className='cl-btn cl-btn-primary white-btn mr-3'
          onClick={updateHandleSubmit}
        >
          Update
        </button>
      );
    } else {
      return (
        <button
          type='button'
          className='cl-btn cl-btn-primary white-btn mr-3'
          onClick={handleSubmit}
        >
          Create
        </button>
      );
    }
  };

  return (
    <React.Fragment>
      <div className='loading' style={{ display: loader ? 'block' : 'none' }}>
        <img src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' />
      </div>
      <div className='container-fluid content-body vh-100'>
        <div className='row'>
          <LeftPanel props={props} />
          <div className='col-lg-9 col-xl-10 mt-4'>
            <nav aria-label='breadcrumb'>
              <ol className='breadcrumb p-0'>
                <li className='breadcrumb-item'>
                  <a href='#'>Layers</a>
                </li>
                <li className='breadcrumb-item active' aria-current='page'>
                  Create
                </li>
              </ol>
            </nav>
            <h3 className='heading-bg p-3 m-0'>General Information</h3>
            <div className=' '>
              <table className='table table-striped table-dark'>
                <tbody>
                  <tr>
                    <td className='small-shell'>Name</td>
                    <td>
                      <input
                        type='text'
                        name='name'
                        className='form-control small-input-box'
                        maxLength={254}
                        onChange={(e) => handleChange(e)}
                        value={inputValues.name}
                        readOnly={isReadonly}
                      ></input>
                      {validation.name && <p>{validation.name}</p>}
                    </td>
                  </tr>
                  <tr>
                    <td className='small-shell'>Address</td>
                    <td>
                      <input
                        type='text'
                        name='address'
                        className='form-control small-input-box'
                        maxLength={254}
                        onChange={(e) => handleChange(e)}
                        value={inputValues.address}
                        readOnly={isReadonly}
                      ></input>
                      {validation.address && <p>{validation.address}</p>}
                    </td>
                  </tr>
                  <tr>
                    <td className='small-shell'>Country</td>
                    <td>
                      <input
                        type='text'
                        name='country'
                        className='form-control small-input-box'
                        maxLength={254}
                        onChange={(e) => handleChange(e)}
                        value={inputValues.country}
                        readOnly={isReadonly}
                      ></input>
                      {validation.country && <p>{validation.country}</p>}
                    </td>
                  </tr>
                  <tr>
                    <td className='small-shell'>ST (State or Province)</td>
                    <td>
                      <input
                        type='text'
                        name='state'
                        className='form-control small-input-box'
                        maxLength={254}
                        onChange={(e) => handleChange(e)}
                        value={inputValues.state}
                        readOnly={isReadonly}
                      ></input>
                      {validation.state && <p>{validation.state}</p>}
                    </td>
                  </tr>
                  <tr>
                    <td className='small-shell'>City</td>
                    <td>
                      <input
                        type='text'
                        name='city'
                        className='form-control small-input-box'
                        maxLength={254}
                        onChange={(e) => handleChange(e)}
                        value={inputValues.city}
                        readOnly={isReadonly}
                      ></input>
                      {validation.city && <p>{validation.city}</p>}
                    </td>
                  </tr>
                  <tr>
                    <td className='small-shell'>ZIP (ZIP or postal code)</td>
                    <td>
                      <input
                        type='number'
                        name='zip'
                        className='form-control small-input-box'
                        maxLength={254}
                        onChange={(e) => handleChange(e)}
                        value={inputValues.zip}
                        readOnly={isReadonly}
                      ></input>
                      {validation.zip && <p>{validation.zip}</p>}
                    </td>
                  </tr>
                  <tr>
                    <td className='small-shell'>Comments</td>
                    <td>
                      <input
                        type='text'
                        name='comments'
                        className='form-control small-input-box'
                        maxLength={254}
                        onChange={(e) => handleChange(e)}
                        value={inputValues.comments}
                        readOnly={isReadonly}
                      ></input>
                      {validation.comments && <p>{validation.comments}</p>}
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* <table className='table table-striped table-dark'>
                <thead>
                  <tr>
                    <th scope='col'>Add</th>
                    <th scope='col'>Field Name</th>
                    <th scope='col'>Field Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='table-icon-cell'>Required</td>
                    <td>Name</td>
                    <td>Text (Max. length of 254 character)</td>
                  </tr>
                  <tr>
                    <td className='table-icon-cell'>Required</td>
                    <td>Address</td>
                    <td>Text (Max. length of 254 character)</td>
                  </tr>
                  <tr>
                    <td className='table-icon-cell'>Required</td>
                    <td>City</td>
                    <td>Text (Max. length of 254 character)</td>
                  </tr>
                  <tr>
                    <td className='table-icon-cell'>Required</td>
                    <td>Country</td>
                    <td>Text (Max. length of 254 character)</td>
                  </tr>
                  <tr>
                    <td className='table-icon-cell'>Required</td>
                    <td>ZIP (ZIP or postal code)</td>
                    <td>Text (Max. length of 254 character)</td>
                  </tr>
                  <tr>
                    <td className='table-icon-cell'>Required</td>
                    <td>ST (State or Province)</td>
                    <td>Text (Max. length of 254 character)</td>
                  </tr>
                  <tr>
                    <td className='table-icon-cell'>Required</td>
                    <td>Comments</td>
                    <td>Text (Max. length of 254 character)</td>
                  </tr>
                </tbody>
              </table> */}

              {isReadonly == false ? (
                <div className='d-flex align-items-center justify-content-end mt-3'>
                  <GET_CREATE_UPDATE_BUTTON></GET_CREATE_UPDATE_BUTTON>
                  <button
                    type='button'
                    className='cl-btn cl-btn-secondary white-btn'
                  >
                    Cancel
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default CreateLayer;
