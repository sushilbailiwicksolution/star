import axios from 'axios';
import { IP,PORT, APP_SERVICE, CUSTOMERS } from '../Config/siteConfig';

const defaultContentType = 'application/json';
// const apiUrl = IP + PORT + APP_SERVICE + CUSTOMERS;
const apiUrl = process.env.REACT_APP_URL + process.env.REACT_APP_URL_OTHER_PORT_NEST_APIS + APP_SERVICE + CUSTOMERS;
const headers = { 'Content-Type': defaultContentType };

/** CRUD Operation on USER */

/** Create User */
export const createCustomer = (requestParams) => {
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
export const getCustomersList = () => {
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
// http://localhost:3377/application-service/secured/v1/customers/18
export const getCustomerById = (customerId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}/${customerId}`)
      .then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          let obj = {
            status: 200,
            data: resultData,
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

/** Delete User */
export const deleteCustomer = (customerId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${apiUrl}/${customerId}`)
      .then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          let obj = {
            status: 200,
            data: resultData,
            msg: 'Deleted Successfully',
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

export const getCustomerByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}/user/${userId}`)
      .then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          let obj = {
            status: 200,
            data: resultData
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
export const updateCustomer = (requestParams) => {
  return new Promise((resolve, reject) => {
    axios
      .put(apiUrl, JSON.stringify(requestParams), {
        headers,
      })
      .then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          let obj = {
            status: 200,
            data: resultData,
            msg: 'Updated Successfully',
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

export const customerService = {
  createCustomer,
  getCustomersList,
  getCustomerById,
  deleteCustomer,
  updateCustomer,
  getCustomerByUserId,
};