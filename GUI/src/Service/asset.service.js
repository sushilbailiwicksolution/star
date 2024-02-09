import axios from "axios";
import { IP, PORT_8083, PORT, APP_SERVICE, ASSETS, LATEST_ASSETS, USER_ASSET, CUSTOMER_ASSET } from "../Config/siteConfig";

const defaultContentType = "application/json";
//const apiUrl_assets = IP + PORT + APP_SERVICE + ASSETS;
const apiUrl_assets =
  process.env.REACT_APP_URL +
  process.env.REACT_APP_URL_OTHER_PORT_NEST_APIS +
  APP_SERVICE +
  ASSETS;


const apiUrl_Latestassets=process.env.REACT_APP_URL +
process.env.REACT_APP_URL_OTHER_PORT_NEST_APIS +
APP_SERVICE +
LATEST_ASSETS;
const headers = { "Content-Type": defaultContentType };

/** CRUD Operation on Asset */

/** Create Asset */
export const createAsset = (requestParams) => {
  return new Promise((resolve, reject) => {
    axios
      .post(apiUrl_assets, JSON.stringify(requestParams), { headers })
      .then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          let obj = { status: 200, response: resultData };
          return resolve(obj);
          //return resolve(resultData);
        } else {
          return reject({ status: 400, msg: "Something Went Wrong" });
        }
      })
      .catch((err) => {
        console.log("err", err);
        return reject({ status: 404, msg: err.message });
      });
  });
};

/** Get Asset */
export const getAssetsList = (params = "") => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl_Latestassets}${params}`)
      .then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          let obj = { status: 200, data: resultData };
          return resolve(obj);
          //return resolve(resultData);
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

/** Delete Asset */
export const deleteAsset = (assetId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${apiUrl_assets}/${assetId}`)
      .then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          let obj = {
            status: 200,
            data: resultData,
            msg: "Deleted Successfully",
          };
          return resolve(obj);
          //return resolve(resultData);
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

/** Update Asset */
export const updateAsset = (requestParams) => {
  return new Promise((resolve, reject) => {
    axios
      .put(apiUrl_assets, JSON.stringify(requestParams), {
        headers,
      })
      .then((results) => {
        const resultData = results && results.data ? results.data : false;
        if (resultData) {
          let obj = {
            status: 200,
            data: resultData,
            msg: "Updated Successfully",
          };
          return resolve(obj);
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

//Handling show asset based on loged in user 
const apiUrl_assets_user=process.env.REACT_APP_URL +
  process.env.REACT_APP_URL_OTHER_PORT_NEST_APIS +
  APP_SERVICE +
  ASSETS+USER_ASSET;

export const getUserAssets=(customerId)=>{
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl_assets_user}/${customerId}`)
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
          return reject({ status: 400, msg: "No record found!" });
        }
      })
      .catch((err) => {
        console.log("err", err);
        return reject({ status: 404, msg: err.message });
      });
  });
}
//When accountType is customer 
const apiUrl_assets_customer=process.env.REACT_APP_URL +
  process.env.REACT_APP_URL_OTHER_PORT_NEST_APIS +
  APP_SERVICE +
  ASSETS+CUSTOMER_ASSET;
export const getCustomerAssets=(customerId)=>{
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl_assets_customer}/${customerId}`)
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
          return reject({ status: 400, msg: "No record found!" });
        }
      })
      .catch((err) => {
        console.log("err", err);
        return reject({ status: 404, msg: err.message });
      });
  });
}



export const assetService = {
  createAsset,
  getAssetsList,
  deleteAsset,
  updateAsset,
  getUserAssets,
  getCustomerAssets,
};
