import React, { useState } from "react";
import { USERNAME, USERPASSWORD } from "../Config/siteConfig";
import { toast } from "react-toastify";
import { LoginService } from "../Service/login.service";


/**
 * This component is handling  user login section.
 * @component
 */
function UserLogin(props: any) {
  const [inputUsers, updateUsersValues] = useState({
    userName: "",
    userPwd: "",
  });
  const [loader, setLoader] = useState(false);

  const userLogin = async () => {
    const validate = await validateUser();
    if (validate) {
      // if (inputUsers.userName === USERNAME && inputUsers.userPwd === USERPASSWORD) {
      // updateUsersValues({
      //     userName: '',
      //     userPwd: ''
      // })
      let userDetails = {
        username: inputUsers.userName,
        password: inputUsers.userPwd,
      };

      //setLoader(true);

      try {
        let data = await LoginService.authenticateUser(userDetails);
        setLoader(false);
        if (data.status == 200) {
          toast.success(`Welcome Back ${userDetails.username}`);
          console.log("data", data);
          localStorage.setItem("logedInUser", JSON.stringify(data.response));
          props.history.push("/dashboard");
        } else {
          toast.error(`Username or Password is incorrect. Please try again`);
        }
      } catch (err: any) {
        setLoader(false);
        toast.error("Incorrect username or password");
      }

      //localStorage.setItem('logedInUser', JSON.stringify(userDetails));
      //props.history.push('/dashboard');
      console.log(props);
      // } else {
      //     toast.error("Incorrect username or password");
      // }
    }
  };

  const validateUser = () => {
    let returnValue = true;
    if (!inputUsers.userName) {
      returnValue = false;
      toast.error("Please enter username");
    } else if (!inputUsers.userPwd) {
      returnValue = false;
      toast.error("Please enter password");
    }

    return returnValue;
  };

  const moveToSignup = () => {
    props.history.push("/register");
  };

  return (
    <React.Fragment>
      <div className="loading" style={{ display: loader ? "block" : "none" }}>
        <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />
      </div>
      <div className="container-fluid pl-0 ">
        <div className="row">
          <div className="col-md-7 d-none d-md-block">
            <div className="login-bg-image"></div>
          </div>
          <div className="col-md-5 d-flex justify-content-between flex-column">
            <div className="login-container">
              <div className="logoimage mb-5"></div>
              <p className="mt-3 mb-5 grey-text">
                Welcome back! Please login to your account.
              </p>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control mb-4"
                  id="formGroupExampleInput"
                  placeholder="Username"
                  value={inputUsers.userName}
                  onChange={(e) => {
                    updateUsersValues({
                      ...inputUsers,
                      userName: e.target.value,
                    });
                  }}
                ></input>
                <input
                  type="password"
                  className="form-control mb-4"
                  id="formGroupExampleInput"
                  placeholder="Password"
                  value={inputUsers.userPwd}
                  onChange={(e) => {
                    updateUsersValues({
                      ...inputUsers,
                      userPwd: e.target.value,
                    });
                  }}
                ></input>
              </div>
              <div className="d-flex justify-content-between mt-5">
                <div className="form-group m-0 d-flex align-items-center">
                  <div className="form-check d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                    ></input>
                    <label
                      className="form-check-label ml-4"
                      htmlFor="gridCheck"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <button
                  className="cl-btn cl-btn-primary btn-anchor"
                  onClick={(e) => {
                    e.preventDefault();
                    props.history.push("/forgot-password");
                  }}
                >
                  Forgot password
                </button>
              </div>
              <div className="d-flex justify-content-between button-container">
                <button
                  className="cl-btn cl-btn-primary mr-5"
                  onClick={userLogin}
                >
                  Login
                </button>
                {/* <button className="cl-btn cl-btn-outline ml-5" onClick={moveToSignup}>Sign up</button> */}
              </div>
            </div>
            <div className="bottom-anchorbox mb-md-5">
              <p className="m-0 p-0">Term of use Privacy Policy</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserLogin;
