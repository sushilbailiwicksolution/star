/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { planService } from '../../Service/plan.service';
import LeftPanel from './LeftPanel';
import { COUNTRIES } from '../../Constants/countries';
import { assetService } from '../../Service/asset.service';
import { customerService } from '../../Service/customer.service';

/**
 * This component is handling asset creation.
 * @component
 * @param {Object} props - The props passed to the component.
 * @param {Object} props.location - The location object passed as a prop.
 */

function CreateAsset(props: any) {
  const [loader, setLoader] = useState(false);
  const [isReadonly, setReadOnly] = useState(false);
  const { state } = props.location;
  const initialState = {
    esn: '',
    deviceType: '',
    serialNumber: '',
    name: '',
    trackingId: '',
    country: '',
    enabled: false,
    description: '',
    vehicleOdometer: '',
  };
  const initialValidate = {
    esn: '',
    deviceType: '',
    serialNumber: '',
    name: '',
    country: '',
    description: '',
  };
  const [assetState, setAssetState] = useState(initialState);
  const [validation, setValidation] = useState(initialValidate);
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [assetId, setAssetId] = useState();
  const [customerId ,setCustomerId]= useState()
  const [customers, setCustomers] = useState<{ id: string; name: string }[]>([]);
  const [customerName , setCustomerName]= useState<string | undefined>('');
  let logedInUser: any = localStorage.getItem('logedInUser');
  logedInUser = JSON.parse(logedInUser);
  useEffect(() => {
    // let logedInUser: any = localStorage.getItem('logedInUser');
    // logedInUser = JSON.parse(logedInUser);
    setLoggedInUser(logedInUser.results.username);
    
    if(logedInUser.results.accountType==="CUSTOMER"){
      const getCustomer = async () => {
        const response = await customerService.getCustomerByUserId(logedInUser.results.id);
        console.log(response.data.results);
        var customerDetails =response.data.results
        setCustomerId(customerDetails.id)
        setCustomerName(customerDetails.name)
      };
      getCustomer();
    }
    else if( logedInUser.results.accountType==="SERVICE" && logedInUser.results.customerId !==0){
      const getCustomer = async () => {
        const response = await customerService.getCustomerById(logedInUser.results.customerId);
        console.log(response.data.results);
        var customerDetails =response.data.results
        setCustomerId(customerDetails.id)
        setCustomerName(customerDetails.name)
      };
      getCustomer();
    }
    else if(logedInUser.results.accountType==="SERVICE" && logedInUser.results.customerId===0){
      const getCustomers = async () => {
        const response = await customerService.getCustomersList();
        setCustomers(response.data.results);
      };
      getCustomers();
    }
    onInit();
  }, []);

//Handling customer change 
 /**
   * Handles the change event of the customer select input.
   * @param {Object} event - The change event of the input.
   */
const handleCustomerChange = async (event:any) => {
  console.log(event.target.value);
  
  const response = await customerService.getCustomerById(event.target.value);
  console.log(response.data.results);
  var customerDetails =response.data.results
  setCustomerId(customerDetails.id)
  setCustomerName(customerDetails.name)

};





 /**
   * Initializes the component on mount.
   */
  const onInit = async () => {
    if (state && state.isEdit) {
      setIsUpdateForm(true);
      setAssetId(state.data.id);
      updateValues(state.data);
    }

    if (state && state.isEdit == false) {
      setReadOnly(true);
      setAssetId(state.data.id);
      updateValues(state.data);
    }
  };

  /**
   * Updates the state with the provided data for editing.
   * @param {Object} data - The data object to update the state.
   */
  const updateValues = (data: any) => {
    console.log('update data', data);

    let obj = {
      esn: data.esn,
      deviceType: data.deviceType,
      serialNumber: '',
      name: data.name,
      trackingId: '',
      country: '',
      enabled: false,
      description: data.description,
      vehicleOdometer: '',
    };
    setAssetState({ ...obj });
  };

  
  /**
   * Handles the change event of the input fields.
   * Updates the state with the input field's value and performs validation.
   * @param {Object} event - The change event of the input.
   */
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setAssetState({ ...assetState, [name]: value });
    if (value.trim().length > 0) {
      setValidation({ ...validation, [name]: '' });
    }
  };

    /**
   * Checks the form validation and sets the validation state accordingly.
   * @returns {boolean} - Returns true if the form is valid, otherwise false.
   */
  const checkValidation = () => {
    let errors = validation;
    let check = true;

    if (!assetState.esn.trim()) {
      check = false;
      errors.esn = 'ESN is required';
    } else {
      errors.esn = '';
    }

    if (!assetState.deviceType.trim()) {
      check = false;
      errors.deviceType = 'Device Type is required';
    } else {
      errors.deviceType = '';
    }

    if (!assetState.serialNumber.trim()) {
      check = false;
      errors.serialNumber = 'Serial Number is required';
    } else {
      errors.serialNumber = '';
    }

    if (!assetState.name.trim()) {
      check = false;
      errors.name = 'Name is required';
    } else {
      errors.name = '';
    }

    if (!assetState.country.trim()) {
      check = false;
      errors.country = 'Country is required';
    } else {
      errors.country = '';
    }

    if (!assetState.description.trim()) {
      check = false;
      errors.description = 'Description is required';
    } else {
      errors.description = '';
    }

    setValidation({ ...errors });
    return check;
  };
/**
   * Handles the form submission for creating a new asset.
   * Calls the createAsset function and displays success/error toast messages.
   */
  const handleSubmit = () => {
    let check = checkValidation();
    if (!check) {
      toast.error('Please enter mandatory values');
      return;
    }

    let requestParams = {
      esn: assetState.esn,
      deviceType: assetState.deviceType,
      assetSerialNumber: assetState.serialNumber,
      country: assetState.country,
      description: assetState.description,
      name: assetState.name,
      trackingId: assetState.trackingId,
      enabled: assetState.enabled,
      vehicleOdometer: assetState.vehicleOdometer,
      createdBy: customerName,
      owner: customerName,
      vehicletype: 'string',
      countryId: 0,
      customerId: customerId,
      alias: 'string',
      symbolStrokeSize: 0,
      symbolStrokeColor: 'string',
      trackColor: 'string',
      symbolColor: 'string',
      symbolSize: 0,
      trackwidth: 0,
      twoWayMessaging: true,
      twoWayMessageMaxLength: 0,
      weblink: 'string',
      assetRegistrationNumber: 'string',
      assetMake: 'string',
      assetModel: 'string',
      assetColor: 'string',
      vehicleSerialNumber: 'string',
      phone: 'string',
      deviceState: 0,
    };

    createAsset(requestParams);
  };

  /**
   * Handles the form submission for updating an existing asset.
   * Calls the updateAsset function and displays success/error toast messages.
   * @param {Object} e - The form submission event.
   */
  const updateHandleSubmit = (e: any) => {
    let check = checkValidation();
    if (!check) {
      toast.error('Please enter mandatory values');
      return;
    }
    let requestParams = {
      id: assetId,
      esn: assetState.esn,
      deviceType: assetState.deviceType,
      assetSerialNumber: assetState.serialNumber,
      country: assetState.country,
      description: assetState.description,
      name: assetState.name,
      trackingId: assetState.trackingId,
      enabled: assetState.enabled,
      vehicleOdometer: assetState.vehicleOdometer,
      createdBy: customerName,
      owner: customerName,
      vehicletype: 'string',
      countryId: 0,
      customerId: customerId,
      alias: 'string',
      symbolStrokeSize: 0,
      symbolStrokeColor: 'string',
      trackColor: 'string',
      symbolColor: 'string',
      symbolSize: 0,
      trackwidth: 0,
      twoWayMessaging: true,
      twoWayMessageMaxLength: 0,
      weblink: 'string',
      assetRegistrationNumber: 'string',
      assetMake: 'string',
      assetModel: 'string',
      assetColor: 'string',
      vehicleSerialNumber: 'string',
      phone: 'string',
      deviceState: 0,
    };

    updateAsset(requestParams);
  };

  /**
   * Renders the Create or Update button based on the form type.
   * @returns {JSX.Element} - The Create or Update button JSX element.
   */
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

   /**
   * Calls the API to create a new asset with the provided request parameters.
   * Displays success/error toast messages based on the API response.
   * @param {Object} request - The request parameters for asset creation.
   */
  const createAsset = async (request: any) => {
    setLoader(true);
    try {
      let data = await assetService.createAsset(request);
      setLoader(false);
      if (data.status == 200) {
        toast.success('Asset Created Successfully');
      }
    } catch (err: any) {
      setLoader(false);
      toast.error(err.msg);
    }
  };

   /**
   * Calls the API to update an existing asset with the provided request parameters.
   * Displays success/error toast messages based on the API response.
   * @param {Object} request - The request parameters for asset update.
   */
  const updateAsset = async (request: any) => {
    try {
      let data = await assetService.updateAsset(request);
      setLoader(false);
      if (data.status == 200) {
        toast.success(data.msg);
      }
    } catch (err: any) {
      setLoader(false);
      toast.error(err.msg);
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
                  <a
                    href='#'
                    onClick={() => {
                      props.history.push('/assets');
                    }}
                  >
                    Assets
                  </a>
                </li>
                <li className='breadcrumb-item active' aria-current='page'>
                  Create
                </li>
              </ol>
            </nav>
            {/* <div className='cl-white text-left mt-4 mb-3'>
              <h3>Add New Event</h3>
            </div> */}
            <table className='table table-striped table-bordered table-dark custom-dark-table'>
              <tbody>
              {logedInUser.results.accountType === "CUSTOMER" && (  <tr>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Customer</h3>
                  </td>
                  <td colSpan={3}>{customerName}</td>
                </tr>
                    )}


    {logedInUser.results.accountType === "SERVICE" && logedInUser.results.customerId===0 && (
      <tr>
      <select onChange={handleCustomerChange}>
        <option value="">Select a customer</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>
      </tr>
    )}
 


                <tr>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>ESN</h3>
                  </td>
                  <td>
                    <input
                      type='text'
                      className='form-control small-input-box d-inline'
                      placeholder='Type ESN'
                      name='esn'
                      value={assetState.esn}
                      onChange={(e) => handleInputChange(e)}
                    ></input>
                    <span className='color-red'>
                      {validation.esn && <p>{validation.esn}</p>}
                    </span>
                  </td>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Device Type</h3>
                  </td>
                  <td>
                    <input
                      type='text'
                      className='form-control small-input-box d-inline'
                      placeholder='Type Device Type'
                      name='deviceType'
                      value={assetState.deviceType}
                      onChange={(e) => handleInputChange(e)}
                    ></input>
                    <span className='color-red'>
                      {validation.deviceType && <p>{validation.deviceType}</p>}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className='small-shell-2'>
                    <h3 className='edit-heading'>Serial number</h3>
                  </td>
                  <td colSpan={3}>
                    <input
                      type='text'
                      className='form-control small-input-box d-inline'
                      placeholder='Type Serial number'
                      name='serialNumber'
                      value={assetState.serialNumber}
                      onChange={(e) => handleInputChange(e)}
                    ></input>
                    <span className='color-red'>
                      {validation.serialNumber && (
                        <p>{validation.serialNumber}</p>
                      )}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Name</h3>
                  </td>
                  <td>
                    <input
                      type='text'
                      className='form-control small-input-box d-inline'
                      placeholder='Type Name'
                      name='name'
                      value={assetState.name}
                      onChange={(e) => handleInputChange(e)}
                    ></input>
                    <span className='color-red'>
                      {validation.name && <p>{validation.name}</p>}
                    </span>
                  </td>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Owner</h3>
                  </td>
                  <td>{customerName}</td>
                </tr>
                <tr>
                  <td className='small-shell-2'>
                    <h3 className='edit-heading'>Tracking Id</h3>
                  </td>
                  <td colSpan={3}>
                    <input
                      type='text'
                      className='form-control small-input-box d-inline'
                      placeholder='Type Tracking ID'
                      name='trackingId'
                      value={assetState.trackingId}
                      onChange={(e) => handleInputChange(e)}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td className='small-shell-2'>
                    <h3 className='edit-heading'>Country</h3>
                  </td>
                  <td>
                    <select
                      className='form-control select-dropdown w-75'
                      onChange={(e: any) => {
                        setAssetState({
                          ...assetState,
                          country: e.target.value,
                        });
                        setValidation({
                          ...validation,
                          country: '',
                        });
                      }}
                      disabled={isReadonly}
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
                    <span className='color-red'>
                      {validation.country && <p>{validation.country}</p>}
                    </span>
                  </td>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Enabled</h3>
                  </td>
                  <td>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      id='examck1'
                      checked={assetState.enabled}
                      onChange={() => {
                        let check = assetState.enabled ? false : true;
                        setAssetState({
                          ...assetState,
                          enabled: check,
                        });
                      }}
                      disabled={isReadonly}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Description</h3>
                  </td>
                  <td>
                    <textarea
                      className='form-control ft-1-4rem'
                      rows={7}
                      name='description'
                      value={assetState.description}
                      onChange={(e) => handleInputChange(e)}
                    ></textarea>
                    <span className='color-red'>
                      {validation.description && (
                        <p>{validation.description}</p>
                      )}
                    </span>
                  </td>
                  <td colSpan={3}></td>
                </tr>
                <tr>
                  <td className='small-shell-2'>
                    <h3 className='edit-heading'>Vehicle Odometer</h3>
                  </td>
                  <td colSpan={3}>
                    <input
                      type='text'
                      className='form-control small-input-box d-inline'
                      placeholder='Type Vehicle Odometer'
                      name='vehicleOdometer'
                      value={assetState.vehicleOdometer}
                      onChange={(e) => handleInputChange(e)}
                    ></input>
                  </td>
                </tr>
              </tbody>
            </table>

            {isReadonly == false ? (
              <div className='d-flex align-items-center justify-content-end mt-3 mr-3'>
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
    </React.Fragment>
  );
}
export default CreateAsset;
