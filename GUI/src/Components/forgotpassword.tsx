import React, {useState} from 'react';
import { USERNAME, USERPASSWORD } from '../Config/siteConfig';
import { toast } from 'react-toastify';

/**
 * This component is handling  forgot password section .
 * @component
 */
function ForgotPassword(props:any) {
     /**
   * State: Holds the input values for username and password.
   * @type {Object}
   */
    const [ inputUsers, updateUsersValues ] = useState({
        userName : '',
        userPwd: ''
    });

     /**
   * Sends the reset password link to the user.
   */
    const sendLink = async() => {
        return false;
        const validate = await validateUser();
        if(validate) {
            if(inputUsers.userName === USERNAME && inputUsers.userPwd === USERPASSWORD) {
                updateUsersValues({
                    userName : '',
                    userPwd: ''
                })
                toast.success(`Welcome Back ${USERNAME}`);
            } else {
                toast.error("Incorrect username or password");
            }
        }
    }

      /**
   * Validates the user input for username and password.
   * @returns {boolean} - Returns true if the input is valid, otherwise false.
   */
    const validateUser = () => {
        let returnValue = true;
        if(!inputUsers.userName) {
            returnValue = false;
            toast.error("Please enter username");
        } else if (!inputUsers.userPwd) {
            returnValue = false;
            toast.error("Please enter password");
        }

        return returnValue;
    }

    
  /**
   * Redirects the user to the login page.
   */
    const moveToLogin = () => {
        props.history.push('/');
    }

    return (
        <React.Fragment>
            <div className="container-fluid pl-0 ">
                <div className="row">
                    <div className="col-md-7 d-none d-md-block">
                        <div className="login-bg-image"></div>
                    </div>
                    <div className="col-md-5 d-flex justify-content-between flex-column">
                        <div className="login-container">
                            <div className="logoimage mb-5"></div>
                            <p className="mt-3 mb-5 grey-text">Please enter you email to get reset password link!</p>
                            <div className="form-group">
                                <input type="text" className="form-control mb-4" id="formGroupExampleInput" placeholder="Username" value={inputUsers.userName} onChange={(e) => {updateUsersValues({...inputUsers, userName: e.target.value})}}></input>
                                <input type="password" className="form-control mb-4" id="formGroupExampleInput" placeholder="Password" value={inputUsers.userPwd} onChange={(e) => {updateUsersValues({...inputUsers, userPwd: e.target.value})}}></input>
                            </div>
                            <div className="d-flex justify-content-between button-container">
                                <button className="cl-btn cl-btn-primary mr-5" onClick={sendLink}>Send OTP</button>
                                <button className="cl-btn cl-btn-outline ml-5" onClick={moveToLogin}>Login</button>
                            </div>
                        </div>
                        <div className="bottom-anchorbox mb-md-5">
                            <p className="m-0 p-0">
                                Term of use Privacy Policy
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ForgotPassword;