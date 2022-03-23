import axios from 'axios';
import {
  IP,
  PORT_3333,
  APP_SERVICE,
  LAYERS,
  LANDMARKS,
} from '../Config/siteConfig';
import REPORTDATA from '../store/reportSampleJson.json';

const defaultContentType = 'application/json';
const apiUrl_layer = IP + PORT_3333 + APP_SERVICE + LAYERS;
const apiUrl_landmark = IP + PORT_3333 + APP_SERVICE + LANDMARKS;
const headers = { 'Content-Type': defaultContentType };

/** CRUD Operation on Layer */

export const createLayer = (requestParams) => {
  return new Promise((resolve, reject) => {
    axios
      .post(apiUrl_layer, JSON.stringify(requestParams), { headers })
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

export const getLayersList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl_layer)
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

export const deleteLayer = (layerId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${apiUrl_layer}/${layerId}`)
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

export const updateLayer = (layerId, requestParams) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${apiUrl_layer}/${layerId}`, JSON.stringify(requestParams), {
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

/** CRUD Operation on Landmark */

export const createLandmark = (requestParams) => {
  console.log('requestParams', requestParams);
  return new Promise((resolve, reject) => {
    axios
      .post(apiUrl_landmark, JSON.stringify(requestParams), { headers })
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

export const getLandmarkList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl_landmark)
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

export const deleteLandmark = (landmarkId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${apiUrl_landmark}/${landmarkId}`)
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

export const updateLandmark = (landmarkId, requestParams) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${apiUrl_landmark}/${landmarkId}`, JSON.stringify(requestParams), {
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

export const planService = {
  createLayer,
  getLayersList,
  deleteLayer,
  updateLayer,
  createLandmark,
  getLandmarkList,
  deleteLandmark,
  updateLandmark,
};
