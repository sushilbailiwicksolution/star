import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { COUNTRIES } from "../../Constants/countries";
import { customerService } from "../../Service/customer.service";
import LeftPanel from "../Assets/LeftPanel";

/**
 * This component is handling customer creation.
 * @component
 * @param {Object} props - The props passed to the component.
 */
function CreateCustomer(props: any) {
  const [username, setUserName] = useState("");
  const [isReadonly, setReadOnly] = useState(false);
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const { state } = props.location;
  const [userId, setUserId] = useState();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",

    city: "",
    state: "",
    country: "",
    user: {
      login_id: "",
      firstname: "",
      lastname: "",
      password: "",
      email_id: "",
      phone_no: "",
      expires_on: "",
    },
  });
  const initFormFields = {
    name: "",
    email: "",
    phone: "",
    address: "",

    city: "",
    state: "",
    country: "",
    isAdmin: false,
    user: {
      login_id: "",
      firstname: "",
      lastname: "",
      password: "",
      email_id: "",
      phone_no: "",
      neverExpire: "",
      expires_on: "",
    },
  };
  const [formFields, setFormFields] = useState(initFormFields);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    let loggedInUser = JSON.parse(localStorage.getItem("logedInUser") || "{}");
    const user = loggedInUser.results.username
      ? loggedInUser.results.username
      : "Dev";
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
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: "",
      state: "",
      country: data.country,

      isAdmin: false,
      user: {
        login_id: "",
        firstname: "",
        lastname: "",
        password: "",
        email_id: data.email,
        phone_no: data.phone,
        neverExpire: "",
        expires_on: "",
      },
    };
    setFormFields({ ...obj });
  };

  const addCustomer = () => {
    const isValid = validateForm();
    if (isValid) {
      const requestParams: any = formFields;
      requestParams.user.accountType = "CUSTOMER";
      requestParams.user.userType = "customer";
      requestParams.user.customerId = null;
      requestParams.user.username = requestParams.name;
      requestParams.user.createdBy = username;
      requestParams.user.active = true;
      requestParams.user.canChangePassword = true;
      createCustomer(requestParams);
    }
  };

  const updateHandleSubmit = (e: any) => {
    const isValid = validateForm();
    if (isValid) {
      const requestParams: any = formFields;
      requestParams.user.accountType = "CUSTOMER";
      requestParams.user.userType = "customer";
      requestParams.user.customerId = null;
      requestParams.user.username = requestParams.name;
      requestParams.user.createdBy = username;
      requestParams.user.active = true;
      requestParams.user.canChangePassword = true;
      updateCustomer(requestParams);
    }
  };

  const validateForm = () => {
    const formError = { ...errors };
    let returnValue = true;
    const { name, email, address, city, state, country, isAdmin, user } =
      formFields;

    const { login_id, firstname, lastname, password, email_id, phone_no } =
      user;

    if (name) {
      formError.name = "";
    } else {
      returnValue = false;
      formError.name = "Please enter Customer Name";
    }

    if (email) {
      formError.email = "";
    } else {
      returnValue = false;
      formError.email = "Please enter email id";
    }

    if (email && validateEmail(email)) {
      formError.email = "";
    } else {
      returnValue = false;
      formError.email = "Please enter Valid email id";
    }

    if (city) {
      formError.city = "";
    } else {
      returnValue = false;
      formError.city = "Please enter City";
    }

    if (state) {
      formError.state = "";
    } else {
      returnValue = false;
      formError.state = "Please enter State";
    }

    if (country) {
      formError.country = "";
    } else {
      returnValue = false;
      formError.country = "Please enter Country";
    }

    if (isAdmin) {
      if (login_id) {
        formError.user.login_id = "";
      } else {
        returnValue = false;
        formError.user.login_id = "Please enter login id";
      }

      if (firstname) {
        formError.user.firstname = "";
      } else {
        returnValue = false;
        formError.user.firstname = "Please enter first name";
      }

      if (lastname) {
        formError.user.lastname = "";
      } else {
        returnValue = false;
        formError.user.lastname = "Please enter last name";
      }

      if (password) {
        formError.user.password = "";
      } else {
        returnValue = false;
        formError.user.password = "Please enter password";
      }

      if (email_id) {
        formError.user.email_id = "";
      } else {
        returnValue = false;
        formError.user.email_id = "Please enter email id";
      }

      if (email_id && validateEmail(email_id)) {
        formError.user.email_id = "";
      } else {
        returnValue = false;
        formError.user.email_id = "Please enter Valid email id";
      }

      if (phone_no) {
        formError.user.phone_no = "";
      } else {
        returnValue = false;
        formError.user.phone_no = "Please enter phone number";
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
    let allErrors = { ...errors, [fName]: "" };
    setErrors(allErrors);
  };

  const handleAdminChange = (e: any) => {
    let target = e.target;
    let fName = target.name;
    let value = target.value;
    let fields = {
      ...formFields,
      user: {
        ...formFields.user,
        [fName]: value,
      },
    };
    setFormFields(fields);
    let allErrors = { ...errors, [fName]: "" };
    setErrors(allErrors);
  };

  const createCustomer = async (request: any) => {
    setLoader(true);
    try {
      let data = await customerService.createCustomer(request);
      setLoader(false);
      if (data.status == 200) {
        toast.success(`You have added a new Customer`);
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
          type="submit"
          className="cl-btn cl-btn-secondary"
          onClick={updateHandleSubmit}
        >
          Update
        </button>
      );
    } else {
      return (
        <button
          type="submit"
          className="cl-btn cl-btn-secondary"
          onClick={addCustomer}
        >
          Submit
        </button>
      );
    }
  };

  return (
    <React.Fragment>
      <div className="loading" style={{ display: loader ? "block" : "none" }}>
        <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />
      </div>
      <div className="container-fluid content-body pb-5">
        <div className="row">
          <LeftPanel props={props} />
          <div className="col-md-9">
            <div className="row">
              <div className="col-lg-12">
                <h1 className="cl-white py-4 mt-4 mb-5 text-left">
                  Identification
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 mb-4">
                <h3 className="cl-white text-left">
                  Customer : <span>{username}</span>
                </h3>
              </div>
              <div className="col-lg-12">
                <div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <div className="form-group mb-3">
                        <label className="d-block text-left  cl-white">
                          Customer Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Customer Name"
                          onChange={handleChange}
                          value={formFields.name}
                          disabled={isReadonly}
                        />
                        {errors.name ? (
                          <span className="d-block text-left cl-red">
                            {errors.name}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <div className="form-group mb-3">
                        <label className="d-block text-left  cl-white">
                          Email
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          placeholder="Email"
                          onChange={handleChange}
                          value={formFields.email}
                          disabled={isReadonly}
                        />
                        {errors.email ? (
                          <span className="d-block text-left cl-red">
                            {errors.email}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-3">
                        <label className="d-block text-left  cl-white">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                          placeholder="Phone Number"
                          onChange={handleChange}
                          value={formFields.phone}
                          disabled={isReadonly}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <div className="form-group mb-3">
                        <label className="d-block text-left  cl-white">
                          City
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          placeholder="City"
                          onChange={handleChange}
                          value={formFields.city}
                          disabled={isReadonly}
                        />
                        {errors.city ? (
                          <span className="d-block text-left cl-red">
                            {errors.city}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-3">
                        <label className="d-block text-left  cl-white">
                          State
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="state"
                          placeholder="State"
                          onChange={handleChange}
                          value={formFields.state}
                          disabled={isReadonly}
                        />
                        {errors.state ? (
                          <span className="d-block text-left cl-red">
                            {errors.state}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  {/* take this above city  */}

                  <div className="row mb-3">
                    <div className="col-md-4">
                      <div className="form-group mb-3">
                        <label className="d-block text-left  cl-white">
                          Country
                        </label>
                        <select
                          className="form-control select-country-style"
                          name="country"
                          placeholder="Country"
                          onChange={handleChange}
                          disabled={isReadonly}
                          value={formFields.country}
                        >
                          <option value="">Select Country</option>;
                          {COUNTRIES.map((item: any, index: any) => {
                            return (
                              <option key={item.country} value={item.country}>
                                {item.country}
                              </option>
                            );
                          })}
                        </select>
                        {errors.country ? (
                          <span className="d-block text-left cl-red">
                            {errors.country}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {/* Add address here  */}

                    <div className="col-md-4">
                      <div className="form-group mb-3">
                        <label className="d-block text-left  cl-white">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          placeholder="Address"
                          onChange={handleChange}
                          value={formFields.address}
                          disabled={isReadonly}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group d-flex text-left">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="isAdmin"
                          onChange={() => {
                            let check = formFields.isAdmin ? false : true;
                            setFormFields({
                              ...formFields,
                              isAdmin: check,
                            });
                          }}
                          checked={formFields.isAdmin}
                          disabled={isReadonly}
                        ></input>
                        <label className="form-check-label cl-white ml-4">
                          Administrator : Default
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                {formFields.isAdmin ? (
                  <div className="col-lg-12">
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label className="d-block text-left  cl-white">
                            login Id
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="login_id"
                            placeholder="Id"
                            onChange={handleAdminChange}
                            value={formFields.user.login_id}
                            disabled={isReadonly}
                          />
                          {errors.user.login_id ? (
                            <span className="d-block text-left cl-red">
                              {errors.user.login_id}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label className="d-block text-left  cl-white">
                            First Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="firstname"
                            placeholder="First Name"
                            onChange={handleAdminChange}
                            value={formFields.user.firstname}
                            disabled={isReadonly}
                          />
                          {errors.user.firstname ? (
                            <span className="d-block text-left cl-red">
                              {errors.user.firstname}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label className="d-block text-left  cl-white">
                            last Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastname"
                            placeholder="last Name"
                            onChange={handleAdminChange}
                            value={formFields.user.lastname}
                            disabled={isReadonly}
                          />
                          {errors.user.lastname ? (
                            <span className="d-block text-left cl-red">
                              {errors.user.lastname}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label className="d-block text-left  cl-white">
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            onChange={handleAdminChange}
                            value={formFields.user.password}
                            disabled={isReadonly}
                          />
                          {errors.user.password ? (
                            <span className="d-block text-left cl-red">
                              {errors.user.password}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label className="d-block text-left  cl-white">
                            Email Id
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            name="email_id"
                            placeholder="Email Id"
                            onChange={handleAdminChange}
                            value={formFields.user.email_id}
                            disabled={isReadonly}
                          />
                          {errors.user.email_id ? (
                            <span className="d-block text-left cl-red">
                              {errors.user.email_id}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label className="d-block text-left  cl-white">
                            Phone Number
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="phone_no"
                            placeholder="phone Number"
                            onChange={handleAdminChange}
                            value={formFields.user.phone_no}
                            disabled={isReadonly}
                          />
                          {errors.user.phone_no ? (
                            <span className="d-block text-left cl-red">
                              {errors.user.phone_no}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label className="d-block text-left  cl-white">
                            Expires on
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            name="expires_on"
                            onChange={handleAdminChange}
                            value={formFields.user.expires_on}
                            disabled={isReadonly}
                          />
                          {errors.user.expires_on ? (
                            <span className="d-block text-left cl-red">
                              {errors.user.expires_on}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                <div className="row mt-4">
                  <div className="col-md-4 justify-content-start d-flex">
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
