import React, { useEffect, useState } from 'react';
import LeftPanel from './LeftPanel';

function CreateLayer(props: any) {
  const { state } = props.location;

  let initialInputValue = {
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

  useEffect(() => {
    console.log('state', state);
  }, []);

  //handle submit updates
  function handleChange(event: any) {
    const { name, value } = event.target;
    console.log('name', name, 'value', value);
    setInputValue({ ...inputValues, [name]: value });
    if (value.trim().length > 0) {
      setValidation({ ...validation, [name]: '' });
    }
  }

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

    if (!inputValues.zip.trim()) {
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
      console.log('check', inputValues);
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

              <div className='d-flex align-items-center justify-content-end mt-3'>
                <button
                  type='button'
                  className='cl-btn cl-btn-primary white-btn mr-3'
                  onClick={handleSubmit}
                >
                  Create
                </button>
                <button
                  type='button'
                  className='cl-btn cl-btn-secondary white-btn'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default CreateLayer;
