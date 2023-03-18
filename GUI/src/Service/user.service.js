import axios from 'axios';
import {
  IP,
  PORT_8083,
  PORT,
  APP_SERVICE,
  USERS
} from '../Config/siteConfig';

const defaultContentType = 'application/json';
// const apiUrl = IP + PORT + APP_SERVICE + USERS;
const apiUrl = process.env.REACT_APP_URL + process.env.REACT_APP_URL_OTHER_PORT_NEST_APIS + APP_SERVICE + USERS;

const headers = { 'Content-Type': defaultContentType };

/** CRUD Operation on USER */

/** Create User */
export const createUser = (requestParams) => {
  return new Promise((resolve, reject) => {
    axios
      .post(apiUrl, JSON.stringify(requestParams), { headers })
      .then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          let obj = { status: 200, response: resultData };
          return resolve(obj);
          //return resolve(resultData);
        } else {
          return reject({ status: 400, msg: 'Something Went Wrong' });
        }
      })
      .catch((err) => {
        console.log('err', err);
        return reject({ status: 404, msg: err.message });
      });
  });
};

/** Get User */
export const getUsersList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl)
      .then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          let obj = { status: 200, data: resultData };
          return resolve(obj);
          //return resolve(resultData);
        } else {
          return reject({ status: 400, msg: 'No record found!' });
        }
      })
      .catch((err) => {
        console.log('err', err);
        return reject({ status: 404, msg: err.message });
      });
  });
};

/** Delete User */
export const deleteUser = (UserId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${apiUrl}/${UserId}`)
      .then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          let obj = {
            status: 200,
            data: resultData,
            msg: 'Deleted Successfully'
          };
          return resolve(obj);
          //return resolve(resultData);
        } else {
          return reject({ status: 400, msg: 'No record found!' });
        }
      })
      .catch((err) => {
        console.log('err', err);
        return reject({ status: 404, msg: err.message });
      });
  });
};

/** Update User */
export const updateUser = (requestParams) => {
  return new Promise((resolve, reject) => {
    axios
      .put(apiUrl, JSON.stringify(requestParams), {
        headers
      })
      .then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          let obj = {
            status: 200,
            data: resultData,
            msg: 'Updated Successfully'
          };
          return resolve(obj);
        } else {
          return reject({ status: 400, msg: 'No record found!' });
        }
      })
      .catch((err) => {
        console.log('err', err);
        return reject({ status: 404, msg: err.message });
      });
  });
};

export const userService = {
  createUser,
  getUsersList,
  deleteUser,
  updateUser
};
