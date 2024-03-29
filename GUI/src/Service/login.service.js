import axios from 'axios';
import { IP, PORT,APP_SERVICE, AUTHENTICATE } from '../Config/siteConfig';

const defaultContentType = 'application/json';
//const apiUrl = IP + PORT + APP_SERVICE + AUTHENTICATE;
const apiUrl = process.env.REACT_APP_URL + process.env.REACT_APP_URL_OTHER_PORT_NEST_APIS + APP_SERVICE + AUTHENTICATE;

const headers = { 'Content-Type': defaultContentType };


/** AUTHENTICATE USER */
export const authenticateUser = (requestParams) => {
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

  export const LoginService = {
    authenticateUser,
  };