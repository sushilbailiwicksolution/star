import React, { memo, useCallback, useEffect, useState } from 'react';
import LeftPanel from './LeftPanel';
import { toast } from 'react-toastify';
import { planService } from '../../Service/plan.service';
import { useTypedSelector } from '../../Reducers/RootReducer';
import { userService } from '../../Service/user.service';
import { customerService } from '../../Service/customer.service';
import { useHistory } from 'react-router-dom';
/**
 * This component is handling notification creation.
 * @component
 */
function Editlayer(props: any) {
  const history=useHistory();
  const selectedCustomer = useTypedSelector(state => state.viewReducer.selectedCustomer); // Access the selectedCustomer from the Redux store
  // console.log(selectedCustomer, 'selected customer event');
  
  const { state } = props.location;
  const [loader, setLoader] = useState(false);
  const [othersArray, setOthersArray] = useState<any>([]);
  const [listName, setListName] = useState('');
  const [validation, setValidation] = useState({ listName: '' });
  const [email, setEmail] = useState('');
  const [checkboxUserList, setCheckboxUserList] = useState([]);
  const [checkboxEmailList, setCheckboxEmailList] = useState([]);
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const [notificationId, setNotificationId] = useState();
  const [isReadonly, setReadOnly] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [accountType , setAccountType]= useState();
  const [customerName , setCustomerName]= useState();
  const [loggedInUser, setLoggedInUser] = useState('');
   /**
   * Fetches the user list when the component mounts.
   */
  // useEffect(() => {
  //   getUserList();
  // }, [selectedCustomer]);


    /**
   * Effect to trigger handleEditOrView() when checkboxUserList changes.
   */
  useEffect(() => {
    if (checkboxUserList.length > 0) {
      if (firstLoad) {
        setFirstLoad(false);
        handleEditOrView();
      }
    }
  }, [checkboxUserList])

  useEffect(()=>{
  let logedInUser: any = localStorage.getItem('logedInUser');
  logedInUser = JSON.parse(logedInUser);
  setAccountType(logedInUser.results.accountType);
if(logedInUser.results.accountType==="CUSTOMER"){
const getCustomer = async () => {
  const response = await customerService.getCustomerByUserId(logedInUser.results.id);
  console.log(response.data.results);
  var customerDetails =response.data.results
  setCustomerName(customerDetails.name)
  getUserListOfCustomer(customerDetails.id)

};
getCustomer()

} else if (logedInUser.results.accountType==="SERVICE" && logedInUser.results.customerId !==0){
const getCustomer = async () => {
  const response = await customerService.getCustomerById(logedInUser.results.customerId);
  console.log(response.data.results);
  var customerDetails =response.data.results
  setCustomerName(customerDetails.name)
  getUserListOfCustomer(customerDetails.id)

};
getCustomer()
}

else if(logedInUser.results.accountType==="SERVICE" && logedInUser.results.customerId===0){
if(selectedCustomer){
  getUserListOfCustomer(selectedCustomer.id)
}
else{
getUserList()
}
}
else if(logedInUser.results.accountType==="USER"){
getLoggedInUser(logedInUser.results.id)
}

  setLoggedInUser(logedInUser.results.username);
  // getUserList();
}, [selectedCustomer]);


//When customer logged In 
const getUserListOfCustomer = async (customerId:number) => {
  try {
    let response = await userService.getUsersListForCustomer(customerId);
    setLoader(false);
    if (response.status == 200) {
      //setUserList(response.data);
      setCheckboxUserList(response.data.results);
    }
  } catch (error: any) {
    setLoader(false);
    toast.error(error.msg);
  }
};

//When admin logged In 
const getUserList = async () => {
  try {
    let response = await userService.getUsersList();
    setLoader(false);
    if (response.status == 200) {
      //setUserList(response.data);
      // setUserList(response.data.results);

      const filteredResults = response.data.results.filter((data: { accountType: string; }) => data.accountType === "USER");
      if(selectedCustomer){
      setCheckboxUserList(filteredResults);
      }else{
        setCheckboxUserList([])
      }
    }
  } catch (error: any) {
    setLoader(false);
    toast.error(error.msg);
  }
};


//When user logged In 
const getLoggedInUser = async (id:number) => {
  try {
    let response = await userService.getUserById(id);
    setLoader(false);
    if (response.status == 200) {
      

      let users = response.data.results;
      if (!Array.isArray(users)) {
        users = [users];
      }
      setCheckboxUserList(users);

    }
  } catch (error: any) {
    setLoader(false);
    toast.error(error.msg);
  }
};


    /**
   * Fetches the user list.
   */
  // const getUserList = async () => {
  //   setLoader(true);
  //   try {
  //     let userData = await planService.getUsersList();
  //     setLoader(false);
  //     if (userData.status == '200') {
  //       let checkListArr = userData.data.results;
  //       checkListArr = checkListArr.map((item: any, index: any) => {
  //         item['isChecked'] = false;
  //         return item;
  //       });
  //       console.log('checkListArr', checkListArr);
  //       setCheckboxUserList(checkListArr);
  //       //handleEditOrView();
  //     }
  //   } catch (error) {
  //     setLoader(false);
  //     handleEditOrView();
  //   }

  // };

  
  /**
   * Handles the Edit or View mode based on state data.
   */
  const handleEditOrView = () => {
    if (state && state.isEdit) {
      setIsUpdateForm(true);
      setNotificationId(state.data.id);
      updateValues(state.data);
    }

    if (state && state.isEdit == false) {
      setReadOnly(true);
      setNotificationId(state.data.id);
      updateValues(state.data);
    }
  }

  /**
   * Updates the state with data received from API.
   * @param {Object} data - Notification data received from API.
   */
  const updateValues = (data: any) => {
    setListName(data.name);
    setOthersArray(data.emails);

    const newCheckboxes: any = [...checkboxUserList];
    data.users.forEach((user: any) => {
      let index = newCheckboxes.findIndex((item: any) => item.id === user.id);
      if (index > -1) {
        newCheckboxes[index].isChecked = true;
      }
    });
    setCheckboxUserList(newCheckboxes);
  };

  /**
   * Adds an email to the othersArray state.
   */
  const addEmail = () => {
    if (email.trim().length < 1) {
      toast.error('Please Enter Email');
      return;
    }
    if (!validateEmail(email.trim())) {
      toast.error('Please Enter Valid Email');
      return;
    }
    const emailArr = othersArray;
    let obj = {
      email: email,
    };
    emailArr.push(obj);
    setOthersArray(emailArr);
    setEmail('');
  };

  /**
   * Validates an email address.
   * @param {string} inputText - The email address to validate.
   * @returns {boolean} - Returns true if the email is valid, otherwise false.
   */
  const validateEmail = (inputText: any) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Deletes an email from the othersArray state.
   * @param {number} indexVal - The index of the email to delete.
   */
  const deleteEmail = (indexVal: any) => {
    if (isReadonly) return;
    setOthersArray(
      othersArray.filter((item: any, index: any) => index != indexVal)
    );
  };

  /**
   * Handles the change event for the list name input.
   * @param {Event} e - The input change event.
   */
  const handleListNameChange = (e: any) => {
    let val = e.target.value;
    setListName(val);
    setValidation({ ...validation, listName: '' });
  };

  const handleEmailChange = (e: any) => {
    let val = e.target.value;
    setEmail(val);
  };

  
  /**
   * Handles the change event for the checkbox user list.
   * @param {number} id - The id of the user to update.
   */
  const handleCheckboxChange = (id: any) => {
    const newCheckboxes: any = [...checkboxUserList];
    let index = newCheckboxes.findIndex((item: any) => item.id == id);
    newCheckboxes[index].isChecked = newCheckboxes[index].isChecked
      ? false
      : true;
    setCheckboxUserList(newCheckboxes);
  };

  //Email list checkbox
  const handleCheckboxChangeEmailList = (id: any) => {
    const newCheckboxes: any = [...othersArray];
    let index = newCheckboxes.findIndex((item: any) => item.id == id);
    newCheckboxes[index].isChecked = newCheckboxes[index].isChecked
      ? false
      : true;
    setOthersArray(newCheckboxes);
  };
   /**
   * Checks the form validation.
   * @returns {boolean} - Returns true if the form is valid, otherwise false.
   */
  const checkValidation = () => {
    let errors = validation;
    let check = true;

    if (!listName.trim()) {
      check = false;
      errors.listName = 'List Name is required';
    } else {
      errors.listName = '';
    }
    setValidation({ ...errors });
    return check;
  };

   /**
   * Handles the form submission for creating a notification.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e: any) => {
    let check = checkValidation();
    if (check) {
      let logedInUser: any = localStorage.getItem('logedInUser');
      logedInUser = JSON.parse(logedInUser);
      let userArray = checkboxUserList.filter(
        (item: any) => item.isChecked == true
      );
      let requestParams = {
        createdBy: logedInUser.results.username,
        name: listName,
        timezone: 'India',
        type: 'EMAIL',
        customerId: selectedCustomer.id,
        emailTemplateId: 0,
        smsTemplateId: 0,
        emails: othersArray,
        users: userArray,
        notificationTemplateId: 0,
      };
      createNotification(requestParams);
    }
  };

    /**
   * Creates a notification on form submission.
   * @param {Object} request - The request data for creating a notification.
   */
  const createNotification = async (request: any) => {
    setLoader(true);
    try {
      let data = await planService.createNotification(request);
      setLoader(false);
      if (data.status == 200) {
        toast.success('Notification Created Successfully');
        history.push('/notification')
      }
    } catch (err: any) {
      setLoader(false);
      toast.error(err.msg);
    }
  };

   /**
   * Updates a notification on form submission.
   * @param {Object} request - The request data for updating a notification.
   */
  const updateNotification = async (request: any) => {
    try {
      let data = await planService.updateNotification(notificationId, request);
      setLoader(false);
      if (data.status == 200) {
        toast(data.msg);
        history.push('/notification')
      }
    } catch (err: any) {
      setLoader(false);
      toast(err.msg);
    }
  };

   /**
   * Handles the form submission for updating a notification.
   * @param {Event} e - The form submission event.
   */
  const updateHandleSubmit = (e: any) => {
    let check = checkValidation();
    if (check) {
      let logedInUser: any = localStorage.getItem('logedInUser');
      logedInUser = JSON.parse(logedInUser);
      let userArray = checkboxUserList.filter(
        (item: any) => item.isChecked == true
      );
      let requestParams = {
        createdBy: logedInUser.results.username,
        name: listName,
        timezone: 'India',
        type: 'EMAIL',
        customerId: 0,
        emailTemplateId: 0,
        smsTemplateId: 0,
        emails: othersArray,
        users: userArray,
        notificationTemplateId: 0,
      };
      setLoader(true);
      updateNotification(requestParams);
    }
  };

   /**
   * Renders the Create or Update button based on the form type (Create or Edit).
   * @returns {JSX.Element} - The JSX element for the Create or Update button.
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
                  <a href='notification'>Notification</a>
                </li>
                <li className='breadcrumb-item active' aria-current='page'>
                  Create
                </li>
              </ol>
            </nav>
            <table className='table table-striped table-bordered table-dark custom-dark-table bg-color-dark-blue'>
              <tbody>
                <tr>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Customer</h3>
                  </td>
                  <td colSpan={3}>StarAds</td>
                </tr>
                <tr>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>List Name</h3>
                  </td>
                  <td>
                    <input
                      type='text'
                      name='name'
                      className='form-control small-input-box'
                      onChange={(e) => handleListNameChange(e)}
                      value={listName}
                      readOnly={isReadonly}
                    ></input>
                    {validation.listName && <p>{validation.listName}</p>}
                  </td>

                  <td className='small-shell'>
                    <h3 className='edit-heading'>Email List</h3>
                  </td>
                  <td>
                    <div className='scrollableArea'>
                      {othersArray.map((item: any, index: any) => {
                        return (
                          <div
                            key={item.id}
                            className='check-items-block selection-list'
                          >
                            <div className='form-group form-check m-0 d-flex align-items-center justify-content-between'>
                              <input
                                type='checkbox'
                                className='form-check-input'
                                id={item.id}
                                checked={item.isChecked}
                                onChange={() => handleCheckboxChangeEmailList(item.id)}
                                disabled={isReadonly}
                              ></input>
                              <label
                                className='form-check-label ml-3'
                                htmlFor='exampleCheck1'
                              >
                                {item.email}
                              </label>
                              <span
                                className='cursor-pointer ml-auto'
                                onClick={() => deleteEmail(index)}
                              >X</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* <div className='d-flex align-items-center mt-3'>
                      <span className='mx-3'>All</span> |{' '}
                      <span className='mx-3'>None</span>
                      <select className='form-control select-dropdown'>
                        <option>starts with</option>
                        <option>2</option>
                      </select>
                      <input
                        type='text'
                        className='form-control small-input-box ml-3 w-50'
                      ></input>
                      <button
                        type='button'
                        className='cl-btn cl-btn-gray white-btn ml-3 mr-3'
                      >
                        Filter
                      </button>
                      <button
                        type='button'
                        className='cl-btn cl-btn-gray  white-btn'
                      >
                        Clear
                      </button>
                    </div> */}
                  </td>

             {isReadonly==false ?  (<><td rowSpan={4} className='small-shell'>
                    <h3 className='edit-heading'>Others</h3>
                  </td>
                  <td rowSpan={4}>
                    <input
                      type='text'
                      className='form-control small-input-box d-inline'
                      placeholder='Email'
                      onChange={(e) => handleEmailChange(e)}
                      value={email}
                      readOnly={isReadonly}
                    ></input>
                    <button
                      type='button'
                      className='cl-btn cl-btn-gray  ml-3'
                      onClick={addEmail}
                    >
                      Add
                    </button>
                    <div className='form-control mt-3 height-100 fontsize-1 div-flex'>
                      
                      {othersArray.map((item: any, index: any) => {
                        return (
                          
                          <div>
                            <div key={item.email + index} className={`d-flex ${othersArray.length-1 != index ? 'border-bottom border-dark' : ''}`}>
                              <span> {item.email}</span>
                              <span
                                className='cursor-pointer ml-auto'
                                onClick={() => deleteEmail(index)}
                              >X</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  </>
                   ):null}


                </tr>
                {/* <tr>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Timezone</h3>
                  </td>
                  <td>
                    {' '}
                    <select
                      className='form-control select-dropdown w-75'
                      disabled={true}
                    >
                      <option>(UTC) Coordinated Universal Time</option>
                      <option>2</option>
                    </select>
                  </td>
                </tr> */}
                {/* <tr>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Email Template</h3>
                  </td>
                  <td>
                    {' '}
                    <select
                      className='form-control select-dropdown w-75'
                      disabled={true}
                    >
                      <option>Email Template 1</option>
                      <option>2</option>
                    </select>
                  </td>
                </tr> */}
                {/* <tr>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Sms Template</h3>
                  </td>
                  <td>
                    <select
                      className='form-control select-dropdown w-75'
                      disabled={true}
                    >
                      <option>Sms template 1</option>
                      <option>2</option>
                    </select>
                  </td>
                </tr> */}
                <tr>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Creator</h3>
                  </td>
                  <td colSpan={3}>Admin</td>
                </tr>
                <tr>
                  <td className='small-shell'>
                    <h3 className='edit-heading'>Users</h3>
                  </td>
                  <td>
                    <div className='scrollableArea'>
                      {checkboxUserList.map((item: any, index: any) => {
                        return (
                          <div
                            key={item.id}
                            className='check-items-block selection-list'
                          >
                            <div className='form-group form-check m-0 d-flex align-items-center justify-content-between'>
                              <input
                                type='checkbox'
                                className='form-check-input'
                                id={item.id}
                                checked={item.isChecked}
                                onChange={() => handleCheckboxChange(item.id)}
                                disabled={isReadonly}
                              ></input>
                              <label
                                className='form-check-label ml-3'
                                htmlFor='exampleCheck1'
                              >
                                {item.username}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* <div className='d-flex align-items-center mt-3'>
                      <span className='mx-3'>All</span> |{' '}
                      <span className='mx-3'>None</span>
                      <select className='form-control select-dropdown'>
                        <option>starts with</option>
                        <option>2</option>
                      </select>
                      <input
                        type='text'
                        className='form-control small-input-box ml-3 w-50'
                      ></input>
                      <button
                        type='button'
                        className='cl-btn cl-btn-gray white-btn ml-3 mr-3'
                      >
                        Filter
                      </button>
                      <button
                        type='button'
                        className='cl-btn cl-btn-gray  white-btn'
                      >
                        Clear
                      </button>
                    </div> */}
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
export default memo(Editlayer);
