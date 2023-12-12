import React, {useEffect, useState} from 'react';
import { USERNAME, USERPASSWORD } from '../Config/siteConfig';
import { toast } from "react-toastify";
import SimpleReactValidator from 'simple-react-validator';
const validator = new SimpleReactValidator();


/**
 * This component is handling  user signup.
 * @component
 */
function UserSignUp(props:any) {
    const [ inputUsers, updateUsersValues ] = useState({
        userName: '',
        userPwd: '',
        userEmail: '',
        confirmPassword: ''
    });

    const [ errors, showErrors ] = useState(false);

    useEffect(() => {
        let allUsers = localStorage.getItem('starUsers') ? localStorage.getItem('starUsers') : [];
    }, []);

    const UserRegister = async() => {
        if (validator.allValid()) {
            alert('You submitted the form and stuff!');
            showErrors(false);
          } else {
            validator.showMessages();
            showErrors(true);
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
          }
        return false;
    }

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
                            <p className="mt-3 mb-5 grey-text">Please create your account.</p>
                            <div className="form-group">
                                <input type="email" className="form-control mb-4" id="formGroupExampleInput" placeholder="Email *" value={inputUsers.userEmail} onChange={(e) => {updateUsersValues({...inputUsers, userEmail: e.target.value})}}></input>
                                <small>{validator.message('userEmail', inputUsers.userEmail, 'required|email', { className: 'text-danger text-left' })}</small>
                                <input type="text" className="form-control mb-4" id="formGroupExampleInput" placeholder="Username *" value={inputUsers.userName} onChange={(e) => {updateUsersValues({...inputUsers, userName: e.target.value})}}></input>
                                <small>{validator.message('userName', inputUsers.userName, 'required', { className: 'text-danger text-left' })}</small>
                                <input type="password" className="form-control mb-4" id="formGroupExampleInput" placeholder="Password *" value={inputUsers.userPwd} onChange={(e) => {updateUsersValues({...inputUsers, userPwd: e.target.value})}}></input>
                                <small>{validator.message('userPwd', inputUsers.userPwd, 'required', { className: 'text-danger text-left' })}</small>
                                <input type="password" className="form-control mb-4" id="formGroupExampleInput" placeholder="Confirm Password *" value={inputUsers.confirmPassword} onChange={(e) => {updateUsersValues({...inputUsers, confirmPassword: e.target.value})}}></input>
                                <small>{validator.message('confirmPassword', inputUsers.confirmPassword, 'required', { className: 'text-danger text-left' })}</small>
                            </div>
                            <div className="d-flex justify-content-between button-container">
                                <button className="cl-btn cl-btn-primary mr-5" onClick={UserRegister}>Sign up</button>
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

export default UserSignUp;