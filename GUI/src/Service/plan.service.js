import axios from 'axios';
import {
  IP,
  PORT_3333,
  PORT_8083,
  APP_SERVICE,
  LAYERS,
  LANDMARKS,
  USERS,
  NOTIFICATION,
  ASSETS,
  GEOFENCE,
} from '../Config/siteConfig';
import REPORTDATA from '../store/reportSampleJson.json';

const defaultContentType = 'application/json';
const apiUrl_layer = IP + PORT_3333 + APP_SERVICE + LAYERS;
const apiUrl_landmark = IP + PORT_3333 + APP_SERVICE + LANDMARKS;
const apiUrl_users = IP + PORT_3333 + APP_SERVICE + USERS;
//const apiUrl_notification = IP + PORT_8083 + APP_SERVICE + NOTIFICATION;
const apiUrl_notification = IP + PORT_3333 + APP_SERVICE + NOTIFICATION;
const apiUrl_assets = IP + PORT_3333 + APP_SERVICE + ASSETS;
const apiUrl_geofence = IP + PORT_3333 + APP_SERVICE + GEOFENCE;

const headers = { 'Content-Type': defaultContentType };

/** CRUD Operation on Layer */

/** Create Layer */
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

/** Get Layers */
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

/** Delete Layer */
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

/** Update Layer */
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

/** Create Landmark */
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

/** Get Landmarks */
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

/** Delete Landmarks */
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

/** Update Landmarks */
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

/** Get Users */
export const getUsersList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl_users)
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

/** CRUD Operation on Notification */

/** Create Notification */
export const createNotification = (requestParams) => {
  return new Promise((resolve, reject) => {
    axios
      .post(apiUrl_notification, JSON.stringify(requestParams), { headers })
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

/** Get Notifications */
export const getNotificationList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl_notification)
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

/** Delete Notification */
export const deleteNotification = (notificationId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${apiUrl_notification}/${notificationId}`)
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

/** Update Notification */
export const updateNotification = (notificationId, requestParams) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${apiUrl_notification}/${notificationId}`,
        JSON.stringify(requestParams),
        {
          headers,
        }
      )
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

/** Get Assets */
export const getAssetsList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl_assets)
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

/** CRUD Operation on Geofencing */

/** Create Notification */
export const createGeofence = (requestParams) => {
  return new Promise((resolve, reject) => {
    axios
      .post(apiUrl_geofence, JSON.stringify(requestParams), { headers })
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

/** Get Geofence */
export const getGeofenceList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl_geofence)
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

/** Delete Geofence */
export const deleteGeofence = (geofencId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${apiUrl_geofence}/${geofencId}`)
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

/** Update Geofence */
export const updateGeofence = (geofencId, requestParams) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${apiUrl_geofence}/${geofencId}`, JSON.stringify(requestParams), {
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
  getUsersList,
  createNotification,
  getNotificationList,
  deleteNotification,
  updateNotification,
  getAssetsList,
  createGeofence,
  getGeofenceList,
  deleteGeofence,
  updateGeofence,
};
