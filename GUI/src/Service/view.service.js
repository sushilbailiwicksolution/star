import axios from "axios";
import {
  IP,
  PORT_8083,
  PORT,
  APP_SERVICE,
  USERS,
  NEW_LAYER,
  SEVERITY,
  EVENT_TYPES,
  GET_EVENT_LIST,
  GET_GRAPH_DROPDOWN,
  GET_SUMMARY_COUNT,
  GET_EVENT_FOR_FLIGHT,
  GET_LOCATION,
  GET_EVENT_FOR_SELECTED_FLIGHT,
} from "../Config/siteConfig";

const defaultContentType = "application/json";
const API_FLIGHT_BASE_URL =
  process.env.REACT_APP_URL + process.env.REACT_APP_URL_OTHER_PORT_FLIGHT;
const API_URL_DATA_LAYER =
  process.env.REACT_APP_URL +
  process.env.REACT_APP_URL_OTHER_PORT_NEST_APIS +
  APP_SERVICE +
  NEW_LAYER;
const headers = { "Content-Type": defaultContentType };

export const getBaronData = (url) => {
  let apiUrl = `${url}`;
  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl)
      .then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          //return resolve(REPORTDATA);
          return resolve(resultData);
        } else {
          return reject({ status: 400, msg: "No record found!" });
        }
      })
      .catch((err) => {
        console.log("err", err);
        return reject({ status: 404, msg: err.message });
      });
  });
};

export const dataLayerData = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URL_DATA_LAYER)
      .then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          //return resolve(REPORTDATA);
          return resolve(resultData);
        } else {
          return reject({ status: 400, msg: "No Data Available" });
        }
      })
      .catch((err) => {
        console.log("err", err);
        return reject({ status: 404, msg: err.message });
      });
  });
};

const getSeverity = () => {
  const apiUrl = `${API_FLIGHT_BASE_URL}${SEVERITY}`;
  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl)
      .then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          //return resolve(REPORTDATA);
          return resolve(resultData);
        } else {
          return reject({ status: 400, msg: "No Data Available" });
        }
      })
      .catch((err) => {
        console.log("err", err);
        return reject({ status: 404, msg: err.message });
      });
  });
};

const getEventTypes = () => {
  const apiUrl = `${API_FLIGHT_BASE_URL}${EVENT_TYPES}`;
  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl)
      .then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          //return resolve(REPORTDATA);
          return resolve(resultData);
        } else {
          return reject({ status: 400, msg: "No Data Available" });
        }
      })
      .catch((err) => {
        console.log("err", err);
        return reject({ status: 404, msg: err.message });
      });
  });
};

const getEventList = (requestParams = {}) => {
  const apiUrl = `${API_FLIGHT_BASE_URL}${GET_EVENT_LIST}`;
  return new Promise((resolve, reject) => {
    axios
      .post(apiUrl, JSON.stringify(requestParams), { headers })
      .then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          //return resolve(REPORTDATA);
          return resolve(resultData);
        } else {
          return reject({ status: 400, msg: "No Data Available" });
        }
      })
      .catch((err) => {
        console.log("err", err);
        return reject({ status: 404, msg: err.message });
      });
  });
};

const getEventListForAsset = (requestParams = {}) => {
  const apiUrl = `${API_FLIGHT_BASE_URL}${GET_EVENT_LIST}`;
  return new Promise((resolve, reject) => {
    axios
      .post(apiUrl, JSON.stringify(requestParams), { headers })
      .then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          //return resolve(REPORTDATA);
          return resolve(resultData);
        } else {
          return reject({ status: 400, msg: "No Data Available" });
        }
      })
      .catch((err) => {
        console.log("err", err);
        return reject({ status: 404, msg: err.message });
      });
  });
};




// // Update the function to accept an array of assetIds
// const getEventListForFlight = (assetIds) => {
//   let apiUrl = `${API_FLIGHT_BASE_URL}${GET_EVENT_FOR_SELECTED_FLIGHT}`;
  
//   // Create an object with assetIds as the request body
//   const requestData = {
//     assetIds: assetIds,
//   };

//   return new Promise((resolve, reject) => {
//     // Make a POST request with the updated data
//     axios
//       .post(apiUrl, requestData)
//       .then((results) => {
//         const resultData = results && results.data ? results.data : false;
//         if (resultData) {
//           return resolve(resultData);
//         } else {
//           return resolve({ status: 400, msg: "No record found!" });
//         }
//       })
//       .catch((error) => {
//         // Handle any errors here
//         console.error('Error:', error);
//         return resolve({ status: 500, msg: "Internal Server Error" });
//       });
//   });
// };

//get event list for flightid
const getEventListForFlight = (airCraftId) => {
  let apiUrl = `${API_FLIGHT_BASE_URL}${GET_EVENT_FOR_FLIGHT}`;
  return new Promise((resolve, reject) => {
    if (airCraftId) {
      axios.get(`${apiUrl}/${airCraftId}`).then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          return resolve(resultData);
        } else {
          return resolve({ status: 400, msg: "No record found!" });
        }
      });
    } else {
      return resolve({ status: 404, msg: "Please send airCraftId" });
    }
  });
};


const getGraphDropdown = (requestParams = {}) => {
  const apiUrl = `${API_FLIGHT_BASE_URL}${GET_GRAPH_DROPDOWN}`;
  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl)
      .then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          //return resolve(REPORTDATA);
          return resolve(resultData);
        } else {
          return reject({ status: 400, msg: "No Data Available" });
        }
      })
      .catch((err) => {
        console.log("err", err);
        return reject({ status: 404, msg: err.message });
      });
  });
};

const getSummaryCount = (customerId) => {
  const apiUrl = `${API_FLIGHT_BASE_URL}${GET_SUMMARY_COUNT}?customerId=${customerId}`;
  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl)
      .then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          //return resolve(REPORTDATA);
          return resolve(resultData);
        } else {
          return reject({ status: 400, msg: "No Data Available" });
        }
      })
      .catch((err) => {
        console.log("err", err);
        return reject({ status: 404, msg: err.message });
      });
  });
};

const getGoToLocationCount = (country) => {
  const apiUrl = `${API_FLIGHT_BASE_URL}${GET_LOCATION}/${country}`;
  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl)
      .then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          //return resolve(REPORTDATA);
          return resolve(resultData);
        } else {
          return reject({ status: 400, msg: "No Data Available" });
        }
      })
      .catch((err) => {
        console.log("err", err);
        return reject({ status: 404, msg: err.message });
      });
  });
};

export const viewService = {
  getBaronData,
  dataLayerData,
  getSeverity,
  getEventTypes,
  getEventList,
  getGraphDropdown,
  getSummaryCount,
  getEventListForFlight,
  getGoToLocationCount,
  getEventListForAsset
};
