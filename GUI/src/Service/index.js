import axios from 'axios';
// import { resolve } from 'dns';
import { API_URL, GOOGLE_API_KEY } from '../Config/siteConfig';
const defaultContentType = 'application/json';

export const getAirCraft = (startDate, endDate, airCraftId) => {
  return new Promise((resolve, reject) => {
    // http://103.10.234.248:8081/getLatestNFlights/{assetId}/{last_20_records}
    // http://103.10.234.248:8081/getFlightsForAsset/166/04-02-2020 22|04-02-2020 23
    // `http://103.10.234.248:8081/getFlights/date/${startDate}:22|${endDate}:21`
    //let apiUrl = `http://103.10.234.248:8081/getFlightsForAsset/${airCraftId}/${startDate} 00|${endDate} 23`;
    let apiUrl = `http://103.10.234.158:8081/getFlightsForAsset/${airCraftId}/${startDate} 00|${endDate} 23`;
    axios
      .get(apiUrl)
      .then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          return resolve(resultData);
        } else {
          return resolve({ status: 400, msg: 'No record found!' });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAirCraftDetails = (airCraftId) => {
  //let apiUrl = 'http://103.10.234.248:8081/getFlightDetails';
  let apiUrl = 'http://103.10.234.158:8081/getFlightDetails';
  return new Promise((resolve, reject) => {
    if (airCraftId) {
      // http://103.10.234.248:8081/getFlightDetails/166-2022-02-09-17
      axios.get(`${apiUrl}/${airCraftId}`).then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          return resolve(resultData);
        } else {
          return resolve({ status: 400, msg: 'No record found!' });
        }
      });
    } else {
      return resolve({ status: 404, msg: 'Please send airCraftId' });
    }
  });
};

export const getCityDetail = (lat, long) => {
  let apiUrl =
    'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
    lat +
    ',' +
    long +
    '&key=' +
    GOOGLE_API_KEY +
    '&sensor=false';
  //let apiUrl = 'http://103.10.234.158:8081/getFlightDetails';
  return new Promise((resolve, reject) => {
    if (lat && long) {
      // http://103.10.234.248:8081/getFlightDetails/166-2022-02-09-17
      axios.get(apiUrl).then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          return resolve(resultData);
        } else {
          return resolve({ status: 400, msg: 'No record found!' });
        }
      });
    } else {
      return resolve({ status: 404, msg: 'Please Share Latitude & Longitude' });
    }
  });
};

export const saveLandMarks = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const postData = await postAxios('landmark', data);
      resolve(postData);
    } catch (error) {
      reject(error);
    }
  });
};

export const saveLayer = (layerData = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sendRequest = await postAxios('layers', layerData);
      resolve(sendRequest);
    } catch (error) {
      reject(error);
    }
  });
};

export const getLayer = () => {
  return new Promise((resolve, reject) => {
    try {
      const getData = getAxios('layers');
      resolve(getData);
    } catch (error) {
      reject(error);
    }
  });
};

export const postAxios = (
  apiEndPoint,
  data,
  contentType = defaultContentType
) => {
  return new Promise((resolve, reject) => {
    const headers = { 'Content-Type': contentType };
    axios
      .post(`${API_URL}/${apiEndPoint}`, data, { headers })
      .then((results) => {
        resolve(results.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAxios = (apiEndPoint, contentType = defaultContentType) => {
  return new Promise((resolve, reject) => {
    const headers = { 'Content-Type': contentType };
    axios
      .get(`${API_URL}/${apiEndPoint}`, { headers })
      .then((results) => {
        resolve(results.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const putAxios = (
  apiEndPoint,
  data,
  contentType = defaultContentType
) => {
  return new Promise((resolve, reject) => {
    const headers = { 'Content-Type': contentType };
    axios
      .put(`${API_URL}/${apiEndPoint}`, data, { headers })
      .then((results) => {
        resolve(results.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteAxios = (
  apiEndPoint,
  data = {},
  contentType = defaultContentType
) => {
  return new Promise((resolve, reject) => {
    const headers = { 'Content-Type': contentType };
    axios
      .delete(`${API_URL}/${apiEndPoint}`, data, { headers })
      .then((results) => {
        resolve(results.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
