import axios from 'axios';
import { IP, PORT_8080, PORT_8082 } from '../Config/siteConfig';
import REPORTDATA from '../store/reportSampleJson.json';

let apiUrl = IP + PORT_8082;
//let apiUrl = IP + PORT_8080;

export const getReport = (flightId) => {
  let apiUri = `${apiUrl}/getReport/eofsr_em/${flightId}`;
  return new Promise((resolve, reject) => {
    if (flightId) {
      axios
        .get(apiUri)
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
  getReport,
};
