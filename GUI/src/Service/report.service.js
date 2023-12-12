import axios from 'axios';
import {
  IP,
  PORT_8082,
  GET_REPORT,
  GET_REPORT_ENG_MAINTAINANCE,
} from '../Config/siteConfig';
import REPORTDATA from '../store/reportSampleJson.json';

//let apiUrl = IP + PORT_8082 + GET_REPORT + GET_REPORT_ENG_MAINTAINANCE;

export const getReports = (url, flightId) => {
  let apiUrl = `${url}/${flightId}`;
  return new Promise((resolve, reject) => {
    if (flightId) {
      axios
        .get(apiUrl)
        .then((results) => {
          const resultData = results && results.data ? results.data : false;
          if (resultData) {
            //return resolve(REPORTDATA);
            return resolve(resultData);
          } else {
            return reject({ status: 400, msg: 'No record found!' });
          }
        })
        .catch((err) => {
          console.log('err', err);
          return reject({ status: 404, msg: err.message });
        });
    } else {
      return reject({ status: 404, msg: 'Please send flightId' });
    }
  });
};

export const reportService = {
  getReports,
};
