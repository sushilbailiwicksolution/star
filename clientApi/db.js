var Pool = require('pg').Pool
const moment = require('moment');
var bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const logoData = fs.readFileSync('star.jpeg').toString('base64');
const puppeteer = require('puppeteer');



//Google API Key to obtain location 
const GOOGLE_API_KEY="AIzaSyC9gF0NXH_KTIccE1w1a2_BpLqW0KuECb8";


/**
 * @constant db_username 
 * @description Contains username
 * @type {string}
 */
const db_username = 'star'
/**
 * @constant db_password 
 * @description Contains password
 * @type {string}
 */
const db_password = 'Admin@123'
/**
 * @constant db_host 
 * @description Contains host
 * @type {string}
 */
// const db_host     = '103.10.234.244'
const db_host = '127.0.0.1'
/**
 * @constant db_port
 * @description Contains port number
 * @type {number}
 */
const db_port     = 5432
/**
 * @constant db_name
 * @description Contains name of the database
 * @type {string}
 */
const db_name     = 'stardb'

/**
 * @constant pool 
 * @description connectivity information to connect with database 
 * @type {object}
 */
const pool = new Pool({
    user: db_username,
    host: db_host,
    database: db_name,
    password: db_password,
    port: db_port
})


// const starapi_db_host='103.10.234.244'
const starapi_db_host = '127.0.0.1'
const starapi_db_name='starapi'
const starapi_db_password='Admin@123'
const starapi_db_port=5432;
const starapi_db_username='star'


const starapiPool= new Pool({
  user: starapi_db_username,
  host:  starapi_db_host,
  database:  starapi_db_name,
  password:  starapi_db_password,
  port:  starapi_db_port
})


var circle_to_table = [];
circle_to_table['WB'] = 'wb';

/**
 * This function handles the request of getEvents request.
 * It communicates with the 'event_details' table in the database
 * and returns a response based on the executed query.
 * 
 * @constant getEvents
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const getEvents = async ( req, res )=>{

    var EVENT_DETAILS = 'event_details';
    var EVENT_PARAMS_DETAIL = 'event_params_detail';
/**
 * @constant packet_type
 * @description Contains the packet type
 */
    var packetType = 'all';

    if( req.params.ptype && req.params.ptype != 'undefined' ){
       packetType = req.params.ptype;
       packetType = packetType.toUpperCase();
    }
     /**
      * @var query
      * @description contains query to fetch data from database 
      */
    var query = '';
    var paramQuery = '';

    if( packetType.toUpperCase() == 'ALL' ){
        query = "SELECT id, packet_type, date_time, aircraftid, eventid, gps_lat, gps_long, altitude, speed, heading, start_time, stop_time, param_count FROM "+EVENT_DETAILS;
    }else{
        query = "SELECT id, packet_type, date_time, aircraftid, eventid, gps_lat, gps_long, altitude, speed, heading, start_time, stop_time, param_count FROM "+EVENT_DETAILS+" WHERE packet_type = '"+packetType+"'";
    }

    console.log("["+Date(Date.now()).toString()+"] Query is [%s]", query);

    /**
     * @method poolQuery
     * @description This method runs the query on database 
     */
    pool.query(query, (error, results)=>{
         if( error ){
             console.log("["+Date(Date.now()).toString()+"] "+error.code+" Error Message ["+error+"]")
             if( error.code == '42P01' ){
               res.status(400).json({"status":error.code, "message": "Table not found"})
             }
         }else{
            /**
             * @var returnVal 
             * @description stores the query data in array form to be sent to API
             */
             var returnVal = [];
             if( results.rowCount > 0 ){
                returnVal = results.rows;

                console.log("["+Date(Date.now()).toString()+"] Returning JSON as "+JSON.stringify(Object.assign({}, returnVal)));
                res.status(200).end(JSON.stringify(Object.assign({}, returnVal)))
             }else{
                console.log("["+Date(Date.now()).toString()+"] No data found for the request")
                res.status(200).json({"status":"404", "message":"No data found for the given request"})
             }
         }
    })
}


/**
 * This function handles the request of getEventParams API request.
 * It communicates with the 'event_params_detail' table in the database
 * and returns a response based on the executed query.
 * 
 * @function getEventParams
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const getEventParams = async ( req, res )=>{
   var EVENT_PARAMS_DETAIL = 'event_params_detail';

   var packedId = '';

   if( req.params.pid && req.params.pid != 'undefined' ){
      packetId = req.params.pid
   }else{
      console.log("["+Date(Date.now()).toString()+"] No data found for the request")
      res.status(200).json({"status":"404", "message":"Packet Id is missing"})
   }

   var query = 'SELECT ogc_fid, id, param_insert_date_time, packet_type, param_id, param_value FROM '+EVENT_PARAMS_DETAIL;

   console.log("["+Date(Date.now()).toString()+"] Query is [%s]", query);

   pool.query(query, (error, results)=>{
     if( error ){
       console.log("["+Date(Date.now()).toString()+"] "+error.code+" Error Message ["+error+"]")
       res.status(400).json({"status":error.code, "message": "Data not found"})
     }else{
       var returnVal = [];
       if( results.rowCount > 0 ){
          returnVal = results.rows;
          console.log("["+Date(Date.now()).toString()+"] Returning JSON as "+JSON.stringify(Object.assign({}, returnVal)));
          res.status(200).end(JSON.stringify(Object.assign({}, returnVal)))
       }else{
          console.log("["+Date(Date.now()).toString()+"] No data found for the request")
          res.status(200).json({"status":"404", "message":"No data found for the given request"})
       }
     }
   });

}


/**
 * This function handles the response of getFlights API request.
 * It communicates with the 'flight_details' table in the database
 * and returns a response based on the executed query.
 * 
 * @function getFlights
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */

const getFlights = async( req, res ) => {
   /**
    * @constant FLIGHT_DETAILS_TABLE 
    * @description contains the table name 
    * @type {string}
    */
  var FLIGHT_DETAILS_TABLE = 'flight_details';

  var reqType    = '';
  var paramValue = '';
  var paramValueArr = [];

  if( req.params.type && req.params.type != 'undefined' && req.params.paramValue && req.params.paramValue != 'undefined' ){
     reqType     = req.params.type;
     paramValue = req.params.paramValue;
  }else{
     console.log("["+Date(Date.now()).toString()+"] Required Parameters Not Found In Request")
     res.status(200).json({"status":"404", "message":"type or/and paramValue is/are missing in request"})
  }

  var query = "SELECT DISTINCT(aircraftid) FROM " + FLIGHT_DETAILS_TABLE;

  if( reqType == 'asset' ){
     query = query + " WHERE asset_id='"+paramValue+"'";
  }else if( reqType == 'date' ){
     if( paramValue.indexOf("|") != -1 ){
         paramValueArr = paramValue.split("|");
         query = query + " WHERE to_timestamp(start_event_time, 'YYYY-MM-DD HH24')::timestamp >= to_timestamp('"+paramValueArr[0]+"', 'DD-MM-YYYY HH24')::timestamp and to_timestamp(stop_event_time, 'YYYY-MM-DD HH24')::timestamp <= to_timestamp('"+paramValueArr[1]+"', 'DD-MM-YYYY HH24')::timestamp"
     }else{
         console.log("["+Date(Date.now()).toString()+"] Date Received In Request Parameter Is Not In Required Format. It Should Be DD-MM-YYYY HH24|DD-MM-YYYY HH24")
         res.status(200).json({"status":"404", "message":"Date Received In Request Parameter Is Not In Required Format. It Should Be DD-MM-YYYY HH24|DD-MM-YYYY HH24"})
     }
  }else{
     console.log("["+Date(Date.now()).toString()+"] Rquest Type Should Be Either asset OR date")
     res.status(200).json({"status":"404", "message":"Rquest Type Should Be Either asset OR date"})
  }

  console.log("["+Date(Date.now()).toString()+"] Query is [%s]", query);
  pool.query(query, (error, results)=>{
     if( error ){
       console.log("["+Date(Date.now()).toString()+"] "+error.code+" Flight Details Error Message ["+error+"]")
       res.status(400).json({"status":error.code, "message": "Data not found"})
     }else{
       var returnVal = [];
       if( results.rowCount > 0 ){
          returnVal = results.rows;
          console.log("["+Date(Date.now()).toString()+"] Returning JSON as "+JSON.stringify(Object.assign({}, returnVal)));
          res.status(200).end(JSON.stringify(Object.assign({}, returnVal)))
       }else{
          console.log("["+Date(Date.now()).toString()+"] No data found for the request")
          res.status(200).json({"status":"404", "message":"No data found for the given request"})
       }
     }
   });
}


/**
 * @description Handles API request related to getFlightsForAsset
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const getFlightsForAsset = async( req, res ) => {
   /**
    * @var FLIGHT_DETAILS_TABLE 
    * @description Contains table name
    * @type {string}
    */
  var FLIGHT_DETAILS_TABLE = 'flight_details';
/**
 * @var {string} assetid
 * @description Contains assetid 
 */
  var assetid       = '';
  /**
   * @var {string} dates
   * @description Contains dates
   */
  var dates         = '';
  /**
   * @var {array} paramValueArr
   * @description Contains param value  
   */
  var paramValueArr = [];

  if( req.params.assetid && req.params.assetid != 'undefined' && req.params.dates && req.params.dates != 'undefined' ){
     assetid = req.params.assetid;
     dates   = req.params.dates;
  }else{
     console.log("["+Date(Date.now()).toString()+"] Required Parameters Not Found In Request")
     res.status(200).json({"status":"404", "message":"assetid or/and dates is/are missing in request"})
     return
  }

  var query = "SELECT DISTINCT(aircraftid) FROM " + FLIGHT_DETAILS_TABLE;

  if( dates.indexOf("|") != -1 ){
      paramValueArr = dates.split("|");
      query = query + " WHERE asset_id='"+assetid+"' AND to_timestamp(start_event_time, 'YYYY-MM-DD HH24')::timestamp >= to_timestamp('"+paramValueArr[0]+"', 'DD-MM-YYYY HH24')::timestamp and to_timestamp(stop_event_time, 'YYYY-MM-DD HH24')::timestamp <= to_timestamp('"+paramValueArr[1]+"', 'DD-MM-YYYY HH24')::timestamp"
  }else{
      console.log("["+Date(Date.now()).toString()+"] Date Received In Request Parameter Is Not In Required Format. It Should Be DD-MM-YYYY HH24|DD-MM-YYYY HH24")
      res.status(200).json({"status":"404", "message":"Date Received In Request Parameter Is Not In Required Format. It Should Be DD-MM-YYYY HH24|DD-MM-YYYY HH24"})
      return
  }

  console.log("["+Date(Date.now()).toString()+"] Query is [%s]", query);
  pool.query(query, (error, results)=>{
     if( error ){
       console.log("["+Date(Date.now()).toString()+"] "+error.code+" Flight Details Error Message ["+error+"]")
       res.status(400).json({"status":error.code, "message": "Data not found"})
       return
     }else{
       var returnVal = [];
       if( results.rowCount > 0 ){
          returnVal = results.rows;
          console.log("["+Date(Date.now()).toString()+"] Returning JSON as "+JSON.stringify(Object.assign({}, returnVal)));
          res.status(200).end(JSON.stringify(Object.assign({}, returnVal)))
          return
       }else{
          console.log("["+Date(Date.now()).toString()+"] No data found for the request")
          res.status(200).json({"status":"404", "message":"No data found for the given request"})
          return
       }
     }
   });
}


/**
 * @description Handles API request related to getLatestNFlights
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const getLatestNFlights = async( req, res ) => {
  var FLIGHT_DETAILS_TABLE = 'flight_details';

  var assetid       = '';
  var limit         = '';
  var paramValueArr = [];

  if( req.params.assetid && req.params.assetid != 'undefined' && req.params.limit && req.params.limit != 'undefined' ){
     assetid = req.params.assetid;
     limit   = req.params.limit;
  }else{
     console.log("["+Date(Date.now()).toString()+"] Required Parameters Not Found In Request")
     res.status(200).json({"status":"404", "message":"assetid or/and limit is/are missing in request"})
  }

  var query = "SELECT aircraftid, start_event_time as start, stop_event_time as stop, id FROM " + FLIGHT_DETAILS_TABLE;

  if ( limit > 0 ){
     query = query + " WHERE asset_id='"+assetid+"' ORDER BY id DESC limit "+limit
  }else{
     console.log("["+Date(Date.now()).toString()+"] Number of required records should be greater than 0.")
     res.status(200).json({"status":"404", "message":"Number of required records should be greater than 0."})
  }

  console.log("["+Date(Date.now()).toString()+"] Query is [%s]", query);
  pool.query(query, (error, results)=>{
     if( error ){
       console.log("["+Date(Date.now()).toString()+"] "+error.code+" Flight Details Error Message ["+error+"]")
       res.status(400).json({"status":error.code, "message": "Data not found"})
     }else{
       var returnVal = [];
       if( results.rowCount > 0 ){
          returnVal = results.rows.map(row => {return {aircraftid: row.aircraftid, start: row.start, end: row.end}});
          console.log("["+Date(Date.now()).toString()+"] Returning JSON as "+JSON.stringify(Object.assign({}, returnVal)));
          res.status(200).end(JSON.stringify(Object.assign({}, returnVal)))
       }else{
          console.log("["+Date(Date.now()).toString()+"] No data found for the request")
          res.status(200).json({"status":"404", "message":"No data found for the given request"})
       }
     }
   });
}


/**
 * @description Handles API request related to getFlightDetails
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const getFlightDetails = async( req, res ) => {
  var FLIGHT_DETAILS_TABLE = 'flight_details';
  var FLIGHT_EVENTS_DETAIL = 'event_details'
  var EVENT_PARAM_DETAILS_TABLE ="event_params_detail"
/**
 * @var {string} flightid
 * @description Stores value of flightid from getFlightDetails/flightid request 
 */
  var flightid      = '';
  var limit         = '';
  var paramValueArr = [];

  if( req.params.flightid && req.params.flightid != 'undefined' ){
     flightid = req.params.flightid;
  }else{
   //   console.log("["+Date(Date.now()).toString()+"] Required Parameters Not Found In Request")
     res.status(200).json({"status":"404", "message":"flightid is missing in request"})
  }
//Added logic to calculate data when in air and when in flight 
	const current_status_query= await pool.query(`SELECT current_status FROM flight_details WHERE aircraftid ='${flightid}'`);
 var current_status;
  if (current_status_query.rows.length > 0) {
     current_status = current_status_query.rows[0].current_status;
  } else {
    current_status='ON-GROUND'
  }
  
  console.log(current_status);
  var query ;
  var flightQuery;
  if(current_status==='IN-AIR'){
    query =`
    SELECT a.aircraftid AS flightid, b.packet_type, b.date_time, b.aircraftid, b.eventid, 
      b.gps_lat, b.gps_long, b.altitude, b.speed, b.heading, 
      e.distance,
      e.left_engine_N1, e.right_engine_N1,
      e.left_EGT, e.right_EGT,
      e.left_engine_oil_temp, e.right_engine_oil_temp,
      e.left_engine_oil_press, e.right_engine_oil_press,
      en.event_name
    FROM ${FLIGHT_DETAILS_TABLE} a
    JOIN ${FLIGHT_EVENTS_DETAIL} b ON a.asset_id = b.aircraftid 
                    AND b.date_time >= a.start_event_time 
    LEFT JOIN (
      SELECT ed.id, epd.packet_type, 
      MAX(CASE WHEN epd.param_id = '10105710069' THEN epd.param_value END) AS distance,
      MAX(CASE WHEN epd.param_id = '10110780015' THEN epd.param_value END) AS left_engine_N1,
      MAX(CASE WHEN epd.param_id = '10110780016' THEN epd.param_value END) AS right_engine_N1,
      MAX(CASE WHEN epd.param_id = '10110840026' THEN epd.param_value END) AS left_EGT,
      MAX(CASE WHEN epd.param_id = '10110840027' THEN epd.param_value END) AS right_EGT,
      MAX(CASE WHEN epd.param_id = '10110810020' THEN epd.param_value END) AS left_engine_oil_temp,
      MAX(CASE WHEN epd.param_id = '10110810021' THEN epd.param_value END) AS right_engine_oil_temp,
      MAX(CASE WHEN epd.param_id = '10110820022' THEN epd.param_value END) AS left_engine_oil_press,
      MAX(CASE WHEN epd.param_id = '10110820023' THEN epd.param_value END) AS right_engine_oil_press
    FROM ${EVENT_PARAM_DETAILS_TABLE} epd
    JOIN ${FLIGHT_EVENTS_DETAIL} ed ON epd.id = ed.id AND epd.packet_type = ed.packet_type
    WHERE epd.param_id IN ('10105710069','10110780015', '10110780016', '10110840026', '10110840027', '10110810020', '10110810021', '10110820022', '10110820023')
    GROUP BY ed.id, epd.packet_type
    ) e ON b.id = e.id AND b.packet_type = e.packet_type
    LEFT JOIN event_names en ON b.eventid = en.eventid
    WHERE a.aircraftid = '${flightid}'
    ORDER BY b.id;
  `;
  
  flightQuery=
      `
     SELECT
    e.fuel,
    e.air_speed,
    e.ground_speed,
    e.altitude
  FROM  ${FLIGHT_DETAILS_TABLE} a
  JOIN  ${FLIGHT_EVENTS_DETAIL} b ON a.asset_id = b.aircraftid
                      AND b.date_time >= a.start_event_time
  LEFT JOIN (
    SELECT
      MAX(CASE WHEN epd.param_id = '10110930037' THEN epd.param_value END) AS fuel,
      MAX(CASE WHEN epd.param_id = '10104160103' THEN epd.param_value END) AS air_speed,
      MAX(CASE WHEN epd.param_id = '10107270076' THEN epd.param_value END) AS ground_speed,
      MAX(CASE WHEN epd.param_id = '10103920100' THEN epd.param_value END) AS altitude,
      ed.id
    FROM  ${EVENT_PARAM_DETAILS_TABLE} epd
    JOIN  ${FLIGHT_EVENTS_DETAIL} ed ON epd.id = ed.id  AND epd.packet_type = ed.packet_type
    WHERE epd.param_id IN ('10110930037', '10107270076', '10104160103', '10103920100')
    GROUP BY ed.id, epd.packet_type
  ) e ON b.id = e.id
  LEFT JOIN event_names en ON b.eventid = en.eventid
  WHERE a.aircraftid = '${flightid}'
    AND b.date_time = (
      SELECT MAX(date_time)
      FROM event_details
      WHERE aircraftid = a.asset_id
    )
  ORDER BY b.id;
  `;
  
  }else{
    query=
    `SELECT a.aircraftid AS flightid, b.packet_type, b.date_time, b.aircraftid, b.eventid, 
  b.gps_lat, b.gps_long, b.altitude, b.speed, b.heading, 
  e.distance,
  e.left_engine_N1, e.right_engine_N1,
  e.left_EGT, e.right_EGT,
  e.left_engine_oil_temp, e.right_engine_oil_temp,
  e.left_engine_oil_press, e.right_engine_oil_press,
  en.event_name
  FROM ${FLIGHT_DETAILS_TABLE} a
  JOIN ${FLIGHT_EVENTS_DETAIL} b ON a.asset_id = b.aircraftid 
                AND b.date_time >= a.start_event_time 
                AND b.date_time <= a.stop_event_time 
  LEFT JOIN (
  SELECT ed.id, epd.packet_type, 
  MAX(CASE WHEN epd.param_id = '10105710069' THEN epd.param_value END) AS distance,
  MAX(CASE WHEN epd.param_id = '10110780015' THEN epd.param_value END) AS left_engine_N1,
  MAX(CASE WHEN epd.param_id = '10110780016' THEN epd.param_value END) AS right_engine_N1,
  MAX(CASE WHEN epd.param_id = '10110840026' THEN epd.param_value END) AS left_EGT,
  MAX(CASE WHEN epd.param_id = '10110840027' THEN epd.param_value END) AS right_EGT,
  MAX(CASE WHEN epd.param_id = '10110810020' THEN epd.param_value END) AS left_engine_oil_temp,
  MAX(CASE WHEN epd.param_id = '10110810021' THEN epd.param_value END) AS right_engine_oil_temp,
  MAX(CASE WHEN epd.param_id = '10110820022' THEN epd.param_value END) AS left_engine_oil_press,
  MAX(CASE WHEN epd.param_id = '10110820023' THEN epd.param_value END) AS right_engine_oil_press
  FROM ${EVENT_PARAM_DETAILS_TABLE} epd
  JOIN  ${FLIGHT_EVENTS_DETAIL} ed ON epd.id = ed.id AND epd.packet_type = ed.packet_type
  WHERE epd.param_id IN ('10105710069','10110780015', '10110780016', '10110840026', '10110840027', '10110810020', '10110810021', '10110820022', '10110820023')
  GROUP BY ed.id, epd.packet_type
  ) e ON b.id = e.id AND b.packet_type = e.packet_type
  LEFT JOIN event_names en ON b.eventid = en.eventid
  WHERE a.aircraftid = '${flightid}'
  ORDER BY b.id;
  `;
  
  flightQuery =  
  `
  SELECT
      MAX(CASE WHEN epd.param_id = '10110930037' THEN epd.param_value END) AS fuel,
      MAX(CASE WHEN epd.param_id = '10104160103' THEN epd.param_value END) AS air_speed,
      MAX(CASE WHEN epd.param_id = '10107270076' THEN epd.param_value END) AS ground_speed,
      MAX(CASE WHEN epd.param_id = '10103920100' THEN epd.param_value END) AS altitude
  FROM
      ${FLIGHT_DETAILS_TABLE} fd
      JOIN (
          SELECT
              ed.aircraftid,
              epd.param_id,
              MAX(ed.date_time) AS max_date_time
          FROM
              ${FLIGHT_EVENTS_DETAIL} ed
              JOIN ${EVENT_PARAM_DETAILS_TABLE} epd ON epd.id = ed.id
              JOIN ${FLIGHT_DETAILS_TABLE} fd ON fd.asset_id = ed.aircraftid
          WHERE
              fd.aircraftid = '${flightid}'
              AND ed.date_time BETWEEN fd.start_event_time AND fd.stop_event_time
              AND epd.param_id IN ('10110930037', '10107270076', '10104160103', '10103920100')
          GROUP BY
              ed.aircraftid,
              epd.param_id
      ) max_ed ON max_ed.aircraftid = fd.asset_id
      JOIN ${FLIGHT_EVENTS_DETAIL} ed ON ed.aircraftid = max_ed.aircraftid AND ed.date_time = max_ed.max_date_time
      JOIN ${EVENT_PARAM_DETAILS_TABLE} epd ON epd.id = ed.id AND epd.param_id = max_ed.param_id
  WHERE
      fd.aircraftid = '${flightid}'
      AND ed.date_time BETWEEN fd.start_event_time AND fd.stop_event_time
      AND epd.param_id IN ('10110930037', '10107270076', '10104160103', '10103920100')`;
  }
  




var flightQueryData=[];
       const resFuel = await pool.query(flightQuery)
      try
       {
          flightQueryData=resFuel.rows[0]
         }
         catch(err){
                return err
         }		

          var countData;
         try {
          const countQuery = 
          `SELECT 
          COUNT(CASE WHEN b.packet_type = 'A' THEN 1 ELSE NULL END) AS alarmCount, 
          COUNT(CASE WHEN b.packet_type = 'H' THEN 1 ELSE NULL END) AS heartbeatCount, 
          COUNT(CASE WHEN b.packet_type = 'T' THEN 1 ELSE NULL END) AS tweetCount,
          COUNT(CASE WHEN b.packet_type = 'P' THEN 1 ELSE NULL END) AS predefinedCount
        FROM 
          ${FLIGHT_DETAILS_TABLE} a 
          INNER JOIN ${FLIGHT_EVENTS_DETAIL} b ON a.asset_id = b.aircraftid 
        WHERE 
          a.aircraftid = '${flightid}' 
          AND b.date_time >= a.start_event_time 
          AND b.date_time <= a.stop_event_time;        
          `        
          const countDataQuery = await pool.query(countQuery)
          countData=countDataQuery.rows[0]
        } catch (error) {
          throw error
        }
        

	pool.query(query, (error, results)=>{
         if( error ){
           console.log("["+Date(Date.now()).toString()+"] "+error.code+" Flight Details Error Message ["+error+"]")
           res.status(400).json({"status":error.code, "message": "Data not found"})
         }else{
           var returnVal = [];
           if( results.rowCount > 0 ){
              returnVal = results.rows;
              const sendData= {"data":Object.assign({},flightQueryData), "flightData":returnVal , "eventCount":countData}
              res.status(200).end(JSON.stringify(Object.assign({},sendData)))
           }else{
              console.log("["+Date(Date.now()).toString()+"] No data found for the request")
              res.status(200).json({"status":"404", "message":"No data found for the given request"})
           }
         }
       })
}



/**
 * @description Handles post request related to geoFenceData save request 
 * @param {json} req 
 * @param {string} res 
 */

const saveGeoFenceData = async( req, res ) => {
   /**
    * @var {string} GEO_FENCE_TABLE
    * @description Contains table name 
    */
	var GEO_FENCE_TABLE = 'geofence_details_v2';
   /**
    * @var {array} bodyData
    * @description Contains value of json body in bodyData
    */
	var bodyData        = req.body;
	var dataToInsert    = null;
	console.log("bodyData [%s]", bodyData)
	if( bodyData != null ){
		//dataToInsert = JSON.parse( bodyData );//, ['asset_id', 'event_on', 'eventSeverity', 'Landmark', 'emails'] )
		/**
       * @var {string} asset_id
       * @description Contains the asset_id 
       */
      var asset_id = bodyData.asset_id;
		var event_on = bodyData.event_on;
		var eventSeverity = bodyData.eventSeverity.replace(/"/g, '');
		var landmark      = bodyData.Landmark.replace(/"/g, '').replace(/;/g, ',');
		var emails        = bodyData.emails;

		const client = await pool.connect();
		//ST_GeomFromText('POLYGON((55.179695 24.850775, 55.180165 24.927711, 55.151727 24.929547, 55.150769 24.850263, 55.179695 24.850775))', 4326)
		var query    = "INSERT INTO "+GEO_FENCE_TABLE+" (asset_id, event_on, eventseverity, landmark, emails_email) values ("+asset_id+", "+event_on+", '"+eventSeverity+"', ST_GeomFromText('POLYGON(("+landmark+"))', 4326), '"+emails+"')";
		console.log("["+Date(Date.now()).toString()+"] Query to insert data [%s]", query)
		const result = client.query( query, (error, result) =>{
			if( error ){
				console.log("["+Date(Date.now()).toString()+"] Fail:: Result of insert query is [%s]", error);
				res.status(200).json({"status":"404", "message":"Unable to insert data for GeoFence"});
			}else{
				console.log("["+Date(Date.now()).toString()+"] Success:: Result of insert query is [%s]", result);
				res.status(200).json({"status":"200", "message":"Data inserted successfully"});
			}
		});
		client.release()
	}
        
}


/**
 * @description Handles get request related to getParamDetails api request 
 * @param {string} eventId The ID of the event
 * @returns {Promise<Array>} Returns a promise that resolves to an array of parameter details
 */
const getParamDetails = async ( eventId ) => {
   var EVENT_PARAMS_DETAIL = 'event_params_detail';
   paramQuery = "SELECT param_id, param_value FROM "+EVENT_PARAMS_DETAIL+" WHERE id="+eventId;
   const { paramDetails } = await pool.query(paramQuery);
   console.table( paramDetails );
   return paramDetails;
};



/**
 * @description Handles request related to getOtherGridIdsByGridId
 * @param {Object} req The request object
 * @param {Object} res The response object
 */
const getOtherGridIdsByAGridId = (req, res) => {

    var circle   = req.params.circle;
    circle       = circle.toUpperCase();
    var gridType = req.params.type;
    var gridIds  = req.params.gridids;

    var circle_table = circle_to_table[circle]+'_grids_mapping';
    gridIds = '\''+gridIds.replace(/,/g,'\',\'')+'\'';


    var whereClauseGridColumn = '';

    if( gridType.toLowerCase() == '1km' ){
       whereClauseGridColumn = 'gridid_1km';
    }else if( gridType.toLowerCase() == '100m' ){
       whereClauseGridColumn = 'gridid_100m';
    }else if( gridType.toLowerCase() == '20m' ){
       whereClauseGridColumn = 'gridid_20m';
    }else{
       res.status(400).end("{\"status\":\"400\", \"message\":\"Grid Type not defined. Please check the grid type and it should be 20m, 100m, or 1km\"}");
    }


    var query = 'SELECT CASE WHEN gridid_1km IS NULL THEN \'NA\' ELSE gridid_1km END, CASE WHEN gridid_100m IS NULL THEN \'NA\' ELSE gridid_100m END, CASE WHEN gridid_20m IS NULL THEN \'NA\' ELSE gridid_20m END FROM '+circle_table+' WHERE '+whereClauseGridColumn+' in ( '+gridIds+' )'

    console.log("["+Date(Date.now()).toString()+"] Query is [%s]", query);

    pool.query(query, (error, results)=>{
         if( error ){
             console.log("["+Date(Date.now()).toString()+"] "+error.code)
             if( error.code == '42P01' ){
               res.status(400).json({"status":error.code, "message": "Table not found for requested circle "+circle})
             }
         }else{
             var returnVal = [];
             for( var i = 0; i < results.rowCount; i++ ){
                  returnVal[results.rows[i][whereClauseGridColumn]] = results.rows[i];
             }
             console.log("["+Date(Date.now()).toString()+"] Returning JSON as "+JSON.stringify(Object.assign({}, returnVal)));
             res.status(200).end(JSON.stringify(Object.assign({}, returnVal)))
         }
    })

}



/**
 * @description Fetches the list of event types from the database
 * @param {Object} req The request object
 * @param {Object} res The response object
 */
const getEventType = (req, res) => {
   const query = `SELECT DISTINCT eventid, event_name FROM event_details WHERE event_name != 'Unknown'`;
   pool.query(query, (error, result) => {
     if (error) {
       console.log(error);
       res.status(500).json({ error: "Internal server error" });
     } else {
       const events = result.rows.map((row, index) => ({
         id: index + 1,
         eventId:row.eventid,
         event_type: row.event_name,
       }));
       console.log(events);
       res.status(200).json(events);
     }
   });
 };



/**
 * @description Handles filtering of event list based on parameters
 * @param {Object} req The request object
 * @param {Object} res The response object
 */
const getEventListFilter = async (req, res) => {
  const { fromDate, toDate, aircraft, eventTypes } = req.body;
  const fromDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const toDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const fromDateHasTime = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/.test(fromDate);
  const toDateHasTime = /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/.test(toDate);
  let fromDateString = fromDate;
  let toDateString = toDate;
  if (!fromDateHasTime && fromDateRegex.test(fromDate)) {
    fromDateString = `${fromDate} 00:00:00`;
  }
  if (!toDateHasTime && toDateRegex.test(toDate)) {
    toDateString = `${toDate} 23:59:59`;
  }
  const aircraftArray = Array.isArray(aircraft) ? aircraft : [aircraft];
  let query = {
    text: 
	   `SELECT e.aircraftid, e.date_time AS time, en.event_name AS type, e.gps_lat, e.gps_long, e.heading, e.speed AS Velocity
FROM event_details e
INNER JOIN event_names en ON e.eventid = en.eventid
WHERE (($1 = ARRAY[]::text[]) OR (e.aircraftid = ANY($1::text[])))
  AND (($2 = ARRAY[]::text[]) OR (en.event_name = ANY($2)))
  AND e.date_time >= $3 AND e.date_time <= $4
  ORDER BY e.date_time::timestamp DESC
`,
    values: [aircraftArray, eventTypes, fromDateString, toDateString],
  };
  if (aircraftArray.length === 0) {
    query = {
      text: 
            `SELECT e.aircraftid, e.date_time AS time, en.event_name AS type, e.gps_lat, e.gps_long, e.heading, e.speed AS Velocity
FROM event_details e
INNER JOIN event_names en ON e.eventid = en.eventid
WHERE (($1 = ARRAY[]::text[]) OR (en.event_name = ANY($1)))
  AND e.date_time >= $2 AND e.date_time <= $3
  ORDER BY e.date_time::timestamp DESC
`,
      values: [eventTypes, fromDateString, toDateString],
    };
  }
  try {
    const { rows } = await pool.query(query);
    const now = new Date();
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const eventTime = new Date(row.time);
      const elapsedSeconds = Math.floor((now - eventTime) / 1000);
      const elapsedDays = Math.floor(elapsedSeconds / 86400); 
      const elapsedHours = Math.floor((elapsedSeconds % 86400) / 3600);  
      const elapsedMinutes = Math.floor(((elapsedSeconds % 86400) % 3600) / 60); 
      const elapsedString = elapsedDays > 30 ? `${Math.floor(elapsedDays / 30)} months` : `${elapsedDays} days`; 
      rows[i].elapsed_time = `${elapsedString}, ${elapsedHours} hours, ${elapsedMinutes} minutes`;
   
    }
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
}  




/**
 * @description Fetches the dropdown options for the graph
 * @param {Object} req The request object
 * @param {Object} res The response object
 */
const graphDropdown = async (req, res) => {
  try {

	  const validKeys = ['altitude', 'speed', 'left_engine_n1', 'right_engine_n1', 'left_egt', 'right_egt', 'left_engine_oil_temp', 'right_engine_oil_temp', 'left_engine_oil_press', 'right_engine_oil_press'];

const options = validKeys.map((key, index) => {
  let label = '';
  switch (key) {
    case 'altitude':
      label = 'Altitude (m)';
      break;
    case 'speed':
      label = 'Speed (KTS)';
      break;
    case 'left_engine_n1':
      label = 'Left Engine N1';
      break;
    case 'right_engine_n1':
      label = 'Right Engine N1';
      break;
    case 'left_egt':
      label = 'Left EGT';
      break;
    case 'right_egt':
      label = 'Right EGT';
      break;
    case 'left_engine_oil_temp':
      label = 'Left Engine Oil Temp';
      break;
    case 'right_engine_oil_temp':
      label = 'Right Engine Oil Temp';
      break;
    case 'left_engine_oil_press':
      label = 'Left Engine Oil Press';
      break;
    case 'right_engine_oil_press':
      label = 'Right Engine Oil Press';
      break;
    default:
      label = key;
      break;
  }
  return {
    id: index + 1,
    label: label,
    key,
  };
});

res.json(options);

  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

//Events list or only packet P and A based on flightid aka for latest flight 

/**
 * @description Fetches the latest flight and data
 * @param {Object} req The request object
 * @param {Object} res The response object
 */
const getLatestFlightAndData = async (req, res) => {
  var FLIGHT_DETAILS_TABLE = 'flight_details';
  var FLIGHT_EVENTS_DETAIL = 'event_details';
  const getCurrentTime = () => moment();
  const query = 
  
 `SELECT 
 fd.asset_id, 
 fd.aircraftid, 
 fd.start_event_time, 
 fd.stop_event_time, 
 fd.current_status, 
 ed.gps_lat AS final_gps_lat, 
 ed.gps_long AS final_gps_long, 
 ed.date_time,
 ed_initial.gps_lat AS initial_gps_lat,
 ed_initial.gps_long AS initial_gps_long
FROM (
 SELECT 
   fd.asset_id, 
   fd.aircraftid, 
   fd.start_event_time, 
   fd.stop_event_time, 
   fd.current_status
 FROM flight_details fd
 INNER JOIN (
   SELECT 
     asset_id, 
     MAX(start_event_time) AS max_start_event_time
   FROM flight_details
   GROUP BY asset_id
 ) last_fd
 ON fd.asset_id = last_fd.asset_id AND fd.start_event_time = last_fd.max_start_event_time
) fd
INNER JOIN (
 SELECT 
   ed.aircraftid, 
   ed.gps_lat, 
   ed.gps_long, 
   
   ed.date_time, 
   ROW_NUMBER() OVER (PARTITION BY ed.aircraftid ORDER BY ed.date_time DESC) AS rn
 FROM event_details ed
 WHERE ed.date_time <= ANY (SELECT stop_event_time FROM flight_details WHERE asset_id = ed.aircraftid)
) ed
ON fd.asset_id = ed.aircraftid AND ed.rn = 1
INNER JOIN event_details ed_initial
ON fd.asset_id = ed_initial.aircraftid AND ed_initial.date_time = fd.start_event_time;
`



pool.query(query)
  .then((result) => {
    // add elapsed_time to each row of the result
    const currentTime = getCurrentTime();
    const resultRows = result.rows.map(async (row) => {
      const elapsedTime = moment.duration(
        currentTime.diff(moment(row.date_time))
      );
      const elapsedDays = Math.floor(elapsedTime.asDays());
      const elapsedHours = Math.floor(elapsedTime.asHours() % 24);
      const elapsedMinutes = Math.floor(elapsedTime.asMinutes() % 60);

      const initialLat = parseFloat(row.initial_gps_lat);
      const initialLong = parseFloat(row.initial_gps_long);
      const lat = parseFloat(row.final_gps_lat);
      const long = parseFloat(row.final_gps_long);
      const earthRadius = 6371e3; // in meters
      const dLat = (lat - initialLat) * Math.PI / 180;
      const dLong = (long - initialLong) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(initialLat * Math.PI / 180) * Math.cos(lat * Math.PI / 180) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = Math.round(earthRadius * c);

      const flightId = row.aircraftid;
      const current_status = row.current_status;
      console.log(current_status);
      let latestDataQuery;
      if (current_status == 'IN-AIR') {
        // Retrieve the most recent gps_lat and gps_long values when current_status is 'IN-AIR'
        latestDataQuery = `SELECT  b.gps_lat, b.gps_long,b.speed, b.heading,b.altitude,b.date_time AS timestamp
                           FROM ${FLIGHT_DETAILS_TABLE} a
                           JOIN ${FLIGHT_EVENTS_DETAIL} b ON a.asset_id = b.aircraftid 
                           WHERE a.aircraftid = '${flightId}'
                           ORDER BY b.date_time DESC
                           LIMIT 1;`;
      } else {
        // Retrieve the last value of gps_lat and gps_long when current_status is not 'IN-AIR'
        latestDataQuery = `SELECT b.gps_lat, b.gps_long,b.speed, b.heading,b.altitude,b.date_time AS timestamp
                           FROM ${FLIGHT_DETAILS_TABLE} a
                           JOIN ${FLIGHT_EVENTS_DETAIL} b ON a.asset_id = b.aircraftid 
                           WHERE a.aircraftid = '${flightId}'
                           AND b.date_time >= a.start_event_time and b.date_time <= a.stop_event_time
                           ORDER BY b.id DESC
                           LIMIT 1;`;
      }
      const { rows } = await pool.query(latestDataQuery);
      const latestData = rows[0];

      try {
        // Calculating location name with Google API
        const apiUrl =
          'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
          row.final_gps_lat +
          ',' +
          row.final_gps_long +
          '&key=' +
          GOOGLE_API_KEY+
          '&sensor=false';
        const response = await axios.get(apiUrl);
        const location = response.data?.results[0]?.formatted_address;

       

        return {
          ...row,
          ...latestData,
          elapsed_time: {
            days: elapsedDays,
            hours: elapsedHours,
            minutes: elapsedMinutes,
          },
          location,
          distance,
        };
      } catch (error) {
        console.error(error);
        return {
          ...row,
          ...latestData,
          elapsed_time: {
            days: elapsedDays,
            hours: elapsedHours,
            minutes: elapsedMinutes,
          },
          location: '',
          distance,
        };
      }
    });

    Promise.all(resultRows).then((data) => {
      // console.log(data);
      res.status(200).json(data);
    });
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error fetching data');
  });
};


//Get Flights Based on limit or date range selected 
/**
 * Retrieves flights for a given asset based on the specified criteria. Either by date range or by limit like last 10 or 20
 *
 * @async
 * @param {Object} req - The request object containing assetId, fromDate, toDate, and limit.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A Promise that resolves when the function is completed.
 */
const getFlightsForAssetBasedOnChoice = async (req, res) => {
  try {
    const assetId = req.body.assetId;
    let sqlQuery = `SELECT * FROM flight_details WHERE asset_id='${assetId}'`;

    if (req.body.fromDate && req.body.toDate) {
      const fromDate = new Date(req.body.fromDate);
      const toDate = new Date(req.body.toDate);
      sqlQuery += ` AND start_event_time >= '${fromDate.toISOString()}' AND stop_event_time <= '${toDate.toISOString()}'`;
    } else if (req.body.limit) {
      const limit = parseInt(req.body.limit, 10);
      sqlQuery += ` ORDER BY start_event_time DESC LIMIT ${limit}`;
    } else {
      res.status(400).json({ error: 'Invalid request parameters.' });
      return;
    }

    const result = await pool.query(sqlQuery);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};


/**
 * Retrieves summary count data for a given customer's assets.
 *
 * @async
 * @param {Object} req - The request object containing the customerId.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A Promise that resolves when the function is completed.
 */
const getSummaryCountData = async (req, res) => {
  const customerId = req.query.customerId || '';

  try {
    // Get assetIds from starapi database
    const assetIdsQuery = `
      SELECT COUNT(*) AS totalAsset, STRING_AGG(esn, ',') AS "assetIds"
      FROM asset
      WHERE "customerId" = $1`;
    const assetIdsResult = await starapiPool.query(assetIdsQuery, [customerId]);
    const assetIds = assetIdsResult.rows[0]?.assetIds?.split(',');
    const totalassets= assetIds.length;
    console.log(assetIds);

    // Calculate the date 14 days ago
    const today = new Date();
    const fourteenDaysAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);

    const movingCountQuery = `SELECT COUNT(*) AS movingCount FROM flight_details WHERE current_status = 'IN-AIR' AND "asset_id" = ANY($1::text[])`;
    const movingCountResult = await pool.query(movingCountQuery, [assetIds]);
    const movingcount = movingCountResult.rows[0].movingcount;

    const activeCountQuery = `
  SELECT COUNT(*) AS activeCount
  FROM (
    SELECT *,
      ROW_NUMBER() OVER (PARTITION BY "asset_id" ORDER BY start_event_time DESC) AS rn
    FROM flight_details
    WHERE start_event_time >= $1 AND "asset_id" = ANY($2::text[])
  ) AS subquery
  WHERE rn = 1`;

const activeCountResult = await pool.query(activeCountQuery, [fourteenDaysAgo, assetIds]);
const activecount = activeCountResult.rows[0].activecount;

const inactiveCountQuery = `
  SELECT COUNT(*) AS inactiveCount
  FROM (
    SELECT *,
      ROW_NUMBER() OVER (PARTITION BY "asset_id" ORDER BY start_event_time DESC) AS rn
    FROM flight_details
    WHERE start_event_time < $1 AND "asset_id" = ANY($2::text[])
  ) AS subquery
  WHERE rn = 1
    AND NOT EXISTS (
      SELECT 1
      FROM flight_details
      WHERE start_event_time >= $1 AND "asset_id" = subquery."asset_id"
    )`;

const inactiveCountResult = await pool.query(inactiveCountQuery, [fourteenDaysAgo, assetIds]);
const inactivecount = inactiveCountResult.rows[0].inactivecount;

const stoppedCountQuery = `
SELECT COUNT(*) AS stoppedCount
FROM (
  SELECT *,
    ROW_NUMBER() OVER (PARTITION BY "asset_id" ORDER BY start_event_time DESC) AS rn
  FROM flight_details
  WHERE current_status = 'ON-GROUND' AND "asset_id" = ANY($1::text[])
) AS subquery
WHERE rn = 1`;

const stoppedCountResult = await pool.query(stoppedCountQuery, [assetIds]);
const stoppedcount = stoppedCountResult.rows[0].stoppedcount;


//Adding totalevents and totalarms count 
const flightDetailsQuery = `
      SELECT "asset_id", MAX(start_event_time) AS start_event_time, MAX(stop_event_time) AS stop_event_time
      FROM flight_details
      WHERE "asset_id" = ANY($1::text[])
      GROUP BY "asset_id"`;
    const flightDetailsResult = await pool.query(flightDetailsQuery, [assetIds]);
    const eventTimes = flightDetailsResult.rows.map(row => ({
      assetId: row.asset_id,
      startEventTime: row.start_event_time,
      stopEventTime: row.stop_event_time
    }));

    // Obtain the totalevents count for the selected customer assets
    const totaleventsQuery = `
      SELECT COUNT(*) AS totalevents
      FROM event_details
      WHERE date_time >= $1 AND date_time <= $2
        AND "aircraftid" = ANY($3::text[])`;
    const totaleventsResult = await pool.query(totaleventsQuery, [
      eventTimes[0].startEventTime, // Assuming the first asset's flight is the most recent
      eventTimes[0].stopEventTime, // Assuming the first asset's flight is the most recent
      assetIds
    ]);
    const totalevents = totaleventsResult.rows[0].totalevents;

    // Obtain the totalalarms count for the selected customer assets
    const totalalarmsQuery = `
      SELECT COUNT(*) AS totalalarms
      FROM event_details
      WHERE packet_type = 'A'
        AND "aircraftid" = ANY($1::text[])
        AND date_time >= $2 AND date_time <= $3`;
    const totalalarmsResult = await pool.query(totalalarmsQuery, [
      assetIds,
      eventTimes[0].startEventTime, // Assuming the first asset's flight is the most recent
      eventTimes[0].stopEventTime // Assuming the first asset's flight is the most recent
    ]);
    const totalalarms = totalalarmsResult.rows[0].totalalarms;
   
    // Do something with the counts
    console.log('totalassets',  );
    console.log('totalevents:', totalevents);
  

    // Return the counts as a response if needed
    res.json({
      totalassets,
      movingcount,
      activecount,
      inactivecount,
      stoppedcount,
      totalevents,
      totalalarms
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred' });
  }
}




//Get graph data based on selected x-axis and y-axis 

/**
 * Retrieves flight graph data based on selected x-axis and y-axis.
 *
 * @async
 * @param {Object} req - The request object containing xaxis, yaxis, and flightid.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A Promise that resolves when the function is completed.
 */
const getFlightGraphData = async(req, res) => {
  const FLIGHT_DETAILS_TABLE = 'flight_details';
  const FLIGHT_EVENTS_DETAIL = 'event_details'
  const EVENT_PARAM_DETAILS_TABLE ="event_params_detail"

  let flightid      = '';

  let xaxis = ''; 
  let yaxis = ''; 

  const H_PARAMS = ["speed", "altitude"];

  // Check if x-axis and y-axis are selected
  if (req.query.xaxis && req.query.yaxis) {
    xaxis = req.query.xaxis;
    yaxis = req.query.yaxis;
  } else {
    res.status(200).json({ status: "404", message: "x-axis and y-axis are missing" });
    return; // Return early if x-axis and y-axis are not provided
  }

  if( req.params.flightid && req.params.flightid != 'undefined' ){
     flightid = req.params.flightid;
  }else{   
     res.status(200).json({"status":"404", "message":"flightid is missing in request"})
  }

   let query;
  if (H_PARAMS.includes(xaxis) && H_PARAMS.includes(yaxis)) {

   query =
    `SELECT a.aircraftid AS flightid, b.packet_type, b.date_time, b.aircraftid, b.eventid, 
  b.gps_lat, b.gps_long, b.altitude, b.speed, b.heading, 
  e.distance,
  e.left_engine_N1, e.right_engine_N1,
  e.left_EGT, e.right_EGT,
  e.left_engine_oil_temp, e.right_engine_oil_temp,
  e.left_engine_oil_press, e.right_engine_oil_press,
  en.event_name
  FROM ${FLIGHT_DETAILS_TABLE} a
  JOIN ${FLIGHT_EVENTS_DETAIL} b ON a.asset_id = b.aircraftid 
                AND b.date_time >= a.start_event_time 
                AND b.date_time <= a.stop_event_time 
                AND b.packet_type IN ('H', 'T')
  LEFT JOIN (
  SELECT ed.id, epd.packet_type, 
  MAX(CASE WHEN epd.param_id = '10105710069' THEN epd.param_value END) AS distance,
  MAX(CASE WHEN epd.param_id = '10110780015' THEN epd.param_value END) AS left_engine_N1,
  MAX(CASE WHEN epd.param_id = '10110780016' THEN epd.param_value END) AS right_engine_N1,
  MAX(CASE WHEN epd.param_id = '10110840026' THEN epd.param_value END) AS left_EGT,
  MAX(CASE WHEN epd.param_id = '10110840027' THEN epd.param_value END) AS right_EGT,
  MAX(CASE WHEN epd.param_id = '10110810020' THEN epd.param_value END) AS left_engine_oil_temp,
  MAX(CASE WHEN epd.param_id = '10110810021' THEN epd.param_value END) AS right_engine_oil_temp,
  MAX(CASE WHEN epd.param_id = '10110820022' THEN epd.param_value END) AS left_engine_oil_press,
  MAX(CASE WHEN epd.param_id = '10110820023' THEN epd.param_value END) AS right_engine_oil_press
  FROM ${EVENT_PARAM_DETAILS_TABLE} epd
  JOIN  ${FLIGHT_EVENTS_DETAIL} ed ON epd.id = ed.id AND epd.packet_type = ed.packet_type
  WHERE epd.param_id IN ('10105710069','10110780015', '10110780016', '10110840026', '10110840027', '10110810020', '10110810021', '10110820022', '10110820023')
  GROUP BY ed.id, epd.packet_type
  ) e ON b.id = e.id AND b.packet_type = e.packet_type
  LEFT JOIN event_names en ON b.eventid = en.eventid
  WHERE a.aircraftid = '${flightid}'
  ORDER BY b.id;
  `;

  }
  else{
    query =
    `SELECT a.aircraftid AS flightid, b.packet_type, b.date_time, b.aircraftid, b.eventid, 
  b.gps_lat, b.gps_long, b.altitude, b.speed, b.heading, 
  e.distance,
  e.left_engine_N1, e.right_engine_N1,
  e.left_EGT, e.right_EGT,
  e.left_engine_oil_temp, e.right_engine_oil_temp,
  e.left_engine_oil_press, e.right_engine_oil_press,
  en.event_name
  FROM ${FLIGHT_DETAILS_TABLE} a
  JOIN ${FLIGHT_EVENTS_DETAIL} b ON a.asset_id = b.aircraftid 
                AND b.date_time >= a.start_event_time 
                AND b.date_time <= a.stop_event_time 
                AND b.packet_type IN ('T')
  LEFT JOIN (
  SELECT ed.id, epd.packet_type, 
  MAX(CASE WHEN epd.param_id = '10105710069' THEN epd.param_value END) AS distance,
  MAX(CASE WHEN epd.param_id = '10110780015' THEN epd.param_value END) AS left_engine_N1,
  MAX(CASE WHEN epd.param_id = '10110780016' THEN epd.param_value END) AS right_engine_N1,
  MAX(CASE WHEN epd.param_id = '10110840026' THEN epd.param_value END) AS left_EGT,
  MAX(CASE WHEN epd.param_id = '10110840027' THEN epd.param_value END) AS right_EGT,
  MAX(CASE WHEN epd.param_id = '10110810020' THEN epd.param_value END) AS left_engine_oil_temp,
  MAX(CASE WHEN epd.param_id = '10110810021' THEN epd.param_value END) AS right_engine_oil_temp,
  MAX(CASE WHEN epd.param_id = '10110820022' THEN epd.param_value END) AS left_engine_oil_press,
  MAX(CASE WHEN epd.param_id = '10110820023' THEN epd.param_value END) AS right_engine_oil_press
  FROM ${EVENT_PARAM_DETAILS_TABLE} epd
  JOIN  ${FLIGHT_EVENTS_DETAIL} ed ON epd.id = ed.id AND epd.packet_type = ed.packet_type
  WHERE epd.param_id IN ('10105710069','10110780015', '10110780016', '10110840026', '10110840027', '10110810020', '10110810021', '10110820022', '10110820023')
  GROUP BY ed.id, epd.packet_type
  ) e ON b.id = e.id AND b.packet_type = e.packet_type
  LEFT JOIN event_names en ON b.eventid = en.eventid
  WHERE a.aircraftid = '${flightid}'
  ORDER BY b.id;
  `;
  }

  try {
    const { rows } = await pool.query(query);
     res.json(Object.assign({},{"flightData":rows}))
  }
  catch (err){
    res.status(500).json({ error: 'An error occurred' });
  }
}



/**
 * Retrieves events for the latest flight of a given flightid.
 *
 * @async
 * @param {Object} req - The request object containing the flightid.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A Promise that resolves when the function is completed.
 */

const getEventForLatestFlight = async( req, res ) => {
  var FLIGHT_DETAILS_TABLE = 'flight_details';
  var FLIGHT_EVENTS_DETAIL = 'event_details'

  var flightid      = '';

  if( req.params.flightid && req.params.flightid != 'undefined' ){
     flightid = req.params.flightid;
  }else{
     res.status(200).json({"status":"404", "message":"flightid is missing in request"})
  }


  const current_status_query= await pool.query(`SELECT current_status FROM flight_details WHERE aircraftid ='${flightid}'`);
  let current_status;
   if (current_status_query.rows.length > 0) {
      current_status = current_status_query.rows[0].current_status;
   } else {
     current_status='ON-GROUND'
   }
 
   let query;
   if(current_status==="IN-AIR"){
     query= `SELECT b.aircraftid , b.date_time AS time, b.eventid, b.gps_lat, b.gps_long, b.altitude, b.speed AS velocity,
     b.heading, c.event_name AS type FROM ${FLIGHT_DETAILS_TABLE} a, ${FLIGHT_EVENTS_DETAIL} b, event_names c WHERE a.aircraftid='${flightid}' 
     AND a.asset_id=b.aircraftid AND b.eventid = c.eventid AND b.date_time >= a.start_event_time
     AND b.packet_type IN ('P', 'A') ORDER BY b.date_time DESC`;
   }else{
   query= `SELECT b.aircraftid , b.date_time AS time, b.eventid, b.gps_lat, b.gps_long, b.altitude, b.speed AS velocity,
    b.heading, c.event_name AS type FROM ${FLIGHT_DETAILS_TABLE} a, ${FLIGHT_EVENTS_DETAIL} b, event_names c WHERE a.aircraftid='${flightid}' 
    AND a.asset_id=b.aircraftid AND b.eventid = c.eventid AND b.date_time >= a.start_event_time AND b.date_time <= a.stop_event_time 
    AND b.packet_type IN ('P', 'A') ORDER BY b.date_time DESC`;
   }


   try {
    const { rows } = await pool.query(query);
    const now = new Date();
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const eventTime = new Date(row.time);
      const elapsedMilliseconds = now - eventTime;
      const elapsedDays = Math.floor(elapsedMilliseconds / (24 * 60 * 60 * 1000));
      const elapsedHours = Math.floor((elapsedMilliseconds / (60 * 60 * 1000)) % 24);
      const elapsedMinutes = Math.floor((elapsedMilliseconds / (60 * 1000)) % 60);
      rows[i].elapsed_time = `${elapsedDays} days, ${elapsedHours} hours, ${elapsedMinutes} minutes`;
    }    
    
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
}



/**
 * Retrieves geolocation data for a given address using the Google Maps Geocoding API.
 *
 * @async
 * @param {Object} req - The request object containing the address to geocode.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A Promise that resolves when the function is completed.
 */

const getGeoLocation= async (req,res)=>{

  const { address } = req.params;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?sensor=false&key=${GOOGLE_API_KEY}&address=${address}`
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }  
}


/**
 * Retrieves event names for event notification dropdown.
 *
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A Promise that resolves when the function is completed.
 */
const getEventNotificationDropdown = async (req, res) => {
  try {
    const query = "SELECT * FROM event_names WHERE packet_type = 'P' OR packet_type = 'A'";
    const result = await pool.query(query);
    const data = result.rows;

    res.status(200).json({data});
  } catch (error) {
    res.status(500).json({message: 'Error retrieving data from database.' });
  }
};






//Reports API Code



//report_events_eofsr_em

/**
 * Retrieves different type of reports based on request parameters.
 *
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A Promise that resolves when the function is completed.
 */
const getReport = async ( req, res )=>{

  var EVENT_DETAILS          = 'event_details';
  var EVENT_PARAMS_DETAIL    = 'event_params_detail';
  var FLIGHT_DETAILS         = 'flight_details';
  var REPORT_P_DETAILS_TABLE = 'report_events_eofsr_em';
  var REPORT_ENGI_COND_MONI_DETAILS_TABLE = 'report_events_eofsr_engi_cond_moni';
  var REPORT_FINA_ADMI_DETAILS_TABLE = 'report_events_eofsr_fina_admi';
var REPORT_FLIG_OPER_DETAILS_TABLE = 'report_events_eofsr_flig_oper';
var REPORT_FLIG_SAFE_DETAILS_TABLE = 'report_events_eofsr_flig_safe';
var REPORT_MOQA_DETAILS_TABLE = 'report_events_eofsr_moqa';
var REPORT_FOQA_DETAILS_TABLE = 'report_events_eofsr_foqa';
  var report_conf_table      = '';

  var packetType = '';
  var flightId   = '';
  var reportType = '';

  var report_object = '';
  

  if( req.params.rType && req.params.rType != 'undefined' ){
     reportType = req.params.rType;
     reportType = reportType.toUpperCase();
  }

  if( req.params.fid && req.params.fid != 'undefined' ){
     flightId = req.params.fid;
     flightId = flightId.toUpperCase();
  }

  if( reportType == 'EOFSR_EM' ){
     packetType = 'P';
     report_conf_table = REPORT_P_DETAILS_TABLE;
     report_object = { label: '', eventid: '', param_id: '', param_value: '', unit: ''};
  }

  if( reportType == 'EOFSR_ENGI_COND_MONI' ){
     packetType = 'P';
     report_conf_table = REPORT_ENGI_COND_MONI_DETAILS_TABLE;
     report_object = { label: '', eventid: '', param_id: '', param_value: '', unit: ''};
  }
  if( reportType == 'EOFSR_FINA_ADMI' ){
     packetType = 'P';
     report_conf_table = REPORT_FINA_ADMI_DETAILS_TABLE;
     report_object = { label: '', eventid: '', param_id: '', param_value: '', unit: ''};
  }
  if( reportType == 'EOFSR_FLIG_OPER' ){
     packetType = 'P';
     report_conf_table = REPORT_FLIG_OPER_DETAILS_TABLE;
     report_object = { label: '', eventid: '', param_id: '', param_value: '', unit: ''};
  }
  if( reportType == 'EOFSR_FLIG_SAFE' ){
     packetType = 'P';
     report_conf_table = REPORT_FLIG_SAFE_DETAILS_TABLE;
     report_object = { label: '', eventid: '', param_id: '', param_value: '', unit: ''};
  }
  if( reportType == 'EOFSR_MOQA' ){
     packetType = 'P';
     report_conf_table = REPORT_MOQA_DETAILS_TABLE;
     report_object = { label: '', eventid: '', param_id: '', param_value: '', unit: ''};
  }
if( reportType == 'EOFSR_FOQA' ){
     packetType = 'P';
     report_conf_table = REPORT_FOQA_DETAILS_TABLE;
     report_object = { label: '', eventid: '', param_id: '', param_value: '', unit: ''};
  }	
  //1. get start_event_time, stop_event_time, asset_id from flight_details table based on input flight_id
  //2. get event_id, event_name, report_label, param_id, unit_label from report_events_eofsr_em where
    // event_status = 'a' and order by priority
  //3. get id, eventid, aircraftid as asset_id, packet_type, aircraftid as flight_id, a.data_insert_date_time from event_details and flight_details as b where
    // b.aircraftidis equals to input flight_id
    // eventid IN event_id received from point 2
    // and a.start_time >= b.start_event_time
    // and a.stop_time <= b.stop_event_time
    // and a.packet_type='P'; 
  //4. get param_id and param_value from event_params_detail where 
    // packet_type='P'
    // and id is equals to the id from point 3
    // and param_id is equals to param_id received from point 3
  //5. Prepare output with
    // report_label (received from report_events_eofsr_em)
    // (event_id, param_id) received from report_events_eofsr_em
    // unit_label received from report_events_eofsr_em
    // param_value received from point 4

  var report_conf_data_query      = "select event_id, event_name, report_label, param_id, unit_label, priority, section, block_priority from "+report_conf_table+" where event_status='a' order by block_priority, priority";
  var flight_and_event_data_query = '';
  var param_value_query           = '';

  console.log("["+Date(Date.now()).toString()+"] Report Configuration Query [%s]", report_conf_data_query);

  const client = await pool.connect()

  try{
      var eventId            = '';
      var event_name         = '';
      var report_label       = '';
      var param_id           = '';
      var unit_label         = '';
      var messageId          = '';
var param_section      = '';
      var param_value        = '';
var block_priority     = '';
var old_block_priority = '';
var priority           = '';

var report_data_first_str = '';
var report_data_third_str = '';

      report_data_first  = [];
      report_data_second = [];
      report_data_second_2 = [];
      report_data_second_moqa_1 = [];
      report_data_second_moqa_2 = [];
      report_data_second_moqa_3 = [];
      report_data_second_moqa_4 = [];
      report_data_second_moqa_5 = [];
      report_data_second_moqa_6 = [];
      report_data_second_moqa_7 = [];
      report_data_second_moqa_8 = [];
      report_data_second_combined = [];
      report_data_third  = [];

      const results = await client.query(report_conf_data_query)
      if( results.rowCount > 0 ){
           const data = results.rows;
           for( var i = 0; i < data.length; i++ ){
              eventId        = data[i].event_id;
              event_name     = data[i].event_name;
              report_label   = data[i].report_label;
              param_id       = data[i].param_id;
              block_priority = data[i].block_priority;
              priority       = data[i].priority;
  param_section  = data[i].section;
              unit_label     = data[i].unit_label;

              if( eventId != 0 || eventId != '0' ){

                 //flight_and_event_data_query = "select a.id as mid, a.eventid, a.aircraftid as asset_id, a.packet_type, b.aircraftid as flight_id, a.data_insert_date_time from "+EVENT_DETAILS+" as a, "+FLIGHT_DETAILS+" as b where b.aircraftid='"+flightId+"' and a.eventid = '"+eventId+"' and a.data_insert_date_time >= b.start_event_time and a.data_insert_date_time <= b.stop_event_time and a.packet_type='"+packetType+"'";
                 flight_and_event_data_query = "select a.id as mid, a.eventid, a.aircraftid as asset_id, a.packet_type, b.aircraftid as flight_id, a.data_insert_date_time, a.start_time from "+EVENT_DETAILS+" as a, "+FLIGHT_DETAILS+" as b where b.aircraftid='"+flightId+"' and a.eventid = '"+eventId+"' and a.data_insert_date_time >= b.start_event_time and a.data_insert_date_time <= to_char((to_timestamp(b.stop_event_time,'YYYY-MM-DD HH24:MI:SS' )+ INTERVAL '1 hours'),'YYYY-MM-DD HH24:MI:SS') and a.packet_type='"+packetType+"'";
                 //flight_and_event_data_query = "select a.id as mid, a.eventid, a.aircraftid as asset_id, a.packet_type, b.aircraftid as flight_id, a.data_insert_date_time, a.start_time from "+EVENT_DETAILS+" as a, "+FLIGHT_DETAILS+" as b where b.aircraftid='"+flightId+"' and a.eventid = '"+eventId+"' and a.data_insert_date_time >= b.start_event_time and a.data_insert_date_time <= b.stop_event_time and a.packet_type='"+packetType+"'";
                 console.log("["+Date(Date.now()).toString()+"] Query To Get Flight Data [%s]", flight_and_event_data_query);
                 const flight_result = await client.query(flight_and_event_data_query);
                 if( flight_result.rowCount > 0 ){
                    const flight_data = flight_result.rows;
                    for( var j = 0; j < flight_data.length; j++ ){
                       messageId = flight_data[j].mid;
     if( param_id == 'DIRECT' ){
                          param_value = flight_data[j].start_time;
                       }else{
                         param_value_query = "select param_id, param_value from "+EVENT_PARAMS_DETAIL+" where packet_type='"+packetType+"' and id = "+messageId+" and param_id = '"+param_id+"'";
                         console.log("["+Date(Date.now()).toString()+"] Query To Get Param Values [%s]", param_value_query);
                         const param_value_data = await client.query(param_value_query);
                         if( param_value_data.rowCount > 0 ){
                             const param_data = param_value_data.rows;
                             param_value = param_data[0].param_value;
                         }else{
                             param_value = '';
                         }
     }
                    }
                 }else{
                    param_value = '';
                 }
                 //console.log("["+Date(Date.now()).toString()+"] resp %s | (%s, %s) | %s | %s", report_label, eventId, param_id, param_value, unit_label );
              }else{
                 eventId     = 'N';
                 param_id    = '-A';
                 param_value = '';
                 //console.log("["+Date(Date.now()).toString()+"] resp %s | (%s%s) | %s | %s", report_label, eventId, param_id, param_value, unit_label );
              }
       console.log("["+Date(Date.now()).toString()+"] Section Value second_moqa_1 "+param_section);
  if ( param_section == 'first' ){
                  //report_data_first.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: param_value, unit: unit_label, priority: priority } );
                  //report_data_first.push( { [report_label]: param_value } );
                  report_data_first_str = report_data_first_str + ",\"" + report_label + "\":\"" + param_value + "\"";
              }else if( param_section == 'second' ){
                  report_data_second.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: param_value, unit: unit_label, priority: priority } );
              }else if( param_section == 'second_2' ){
                  report_data_second_2.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: param_value, unit: unit_label, priority: priority } );
              }else if( param_section == 'second_moqa_1' ){
    console.log("["+Date(Date.now()).toString()+"] Param Value second_moqa_1 <"+param_value.toString().length+">");
    if(param_value.toString().length == 0 ){
                      report_data_second_moqa_1.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'No', unit: 'N/A', priority: priority } );
    }
                      else {
      report_data_second_moqa_1.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'Yes', unit: param_value, priority: priority } );
    }
              }else if( param_section == 'second_moqa_2' ){
                      console.log("["+Date(Date.now()).toString()+"] Param Value second_moqa_2 <"+param_value.toString().length+">");
                      if(param_value.toString().length == 0 ){
                              report_data_second_moqa_2.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'No', unit: 'N/A', priority: priority } );
    }else {
      report_data_second_moqa_2.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'Yes', unit: param_value, priority: priority } );
    }
                      }else if( param_section == 'second_moqa_3' ){
                      console.log("["+Date(Date.now()).toString()+"] Param Value second_moqa_3 <"+param_value.toString().length+">");
                      if(param_value.toString().length == 0 ){
                              report_data_second_moqa_3.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'No', unit: 'N/A', priority: priority } );
                      }else {
                              report_data_second_moqa_3.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'Yes', unit: param_value, priority: priority } );
                      }
                      }else if( param_section == 'second_moqa_4' ){
                      console.log("["+Date(Date.now()).toString()+"] Param Value second_moqa_4 <"+param_value.toString().length+">");
                      if(param_value.toString().length == 0 ){
                              report_data_second_moqa_4.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'No', unit: 'N/A', priority: priority } );
                      }else {
                              report_data_second_moqa_4.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'Yes', unit: param_value, priority: priority } );
                      }
                      }else if( param_section == 'second_moqa_5' ){
                      console.log("["+Date(Date.now()).toString()+"] Param Value second_moqa_5 <"+param_value.toString().length+">");
                      if(param_value.toString().length == 0 ){
                              report_data_second_moqa_5.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'No', unit: 'N/A', priority: priority } );
                      }else {
                              report_data_second_moqa_5.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'Yes', unit: param_value, priority: priority } );
                      }
                      }else if( param_section == 'second_moqa_6' ){
                      console.log("["+Date(Date.now()).toString()+"] Param Value second_moqa_5 <"+param_value.toString().length+">");
                      if(param_value.toString().length == 0 ){
                              report_data_second_moqa_6.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'No', unit: 'N/A', priority: priority } );
                      }else {
                              report_data_second_moqa_6.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'Yes', unit: param_value, priority: priority } );
                      }
    }else if( param_section == 'second_moqa_7' ){
                      console.log("["+Date(Date.now()).toString()+"] Param Value second_moqa_5 <"+param_value.toString().length+">");
                      if(param_value.toString().length == 0 ){
                              report_data_second_moqa_7.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'No', unit: 'N/A', priority: priority } );
                      }else {
                              report_data_second_moqa_7.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'Yes', unit: param_value, priority: priority } );
                      }
                      }else if( param_section == 'second_moqa_8' ){
                      console.log("["+Date(Date.now()).toString()+"] Param Value second_moqa_5 <"+param_value.toString().length+">");
                      if(param_value.toString().length == 0 ){
                              report_data_second_moqa_8.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'No', unit: 'N/A', priority: priority } );
                      }else {
                              report_data_second_moqa_8.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'Yes', unit: param_value, priority: priority } );
                      }
                      }else if( param_section == 'third' ){
                  //report_data_third.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: param_value, unit: unit_label, priority:priority } );
            if( block_priority != old_block_priority ){
                     report_data_third_str = report_data_third_str + "},{\"startFlight\":\""+event_name+"\",\"" + report_label + "\":\"" + param_value + "\"";
                  }else{
                     report_data_third_str = report_data_third_str + ",\"" + report_label + "\":\"" + param_value + "\"";
                  }
                  old_block_priority = block_priority;
              }
              //report_data.push( { section: param_section, label: report_label, eventid: eventId, param_id: param_id, param_value: param_value, unit: unit_label} );
           }
           report_data_first_str = "{"+(report_data_first_str.substring(1, report_data_first_str.length))+"}";
  console.log(" -- Test1 --");
           console.log(" -- Test1 --["+Date(Date.now()).toString()+"] " + report_data_first_str);
           report_data_first_str = JSON.parse(report_data_first_str);
  console.log(" -- Test2 --");
           report_data_third_str = "[{"+(report_data_third_str.substring(3, report_data_third_str.length))+"}]";
           console.log(" -- Test3 --["+Date(Date.now()).toString()+"] " + report_data_third_str);
           report_data_third_str = JSON.parse(report_data_third_str);
           //report_data_first.push(report_data_first_str);
           //console.log("["+Date(Date.now()).toString()+"] JSON is "+JSON.stringify(report_data));
           //res.status(200).json({"status":"200", "report_data_s1":report_data_first, "report_data_s2":report_data_second, "report_data_s3": report_data_third})

    const locationQuery = `SELECT a.aircraftid AS flightid , a.asset_id as reg_no,
           (SELECT b.gps_lat FROM event_details b WHERE a.asset_id=b.aircraftid AND b.date_time=a.start_event_time) AS initial_gps_lat,
           (SELECT b.gps_long FROM event_details b WHERE a.asset_id=b.aircraftid AND b.date_time=a.start_event_time) AS initial_gps_long,
           (SELECT b.gps_lat FROM event_details b WHERE a.asset_id=b.aircraftid AND b.date_time=a.stop_event_time) AS last_gps_lat,
           (SELECT b.gps_long FROM event_details b WHERE a.asset_id=b.aircraftid AND b.date_time=a.stop_event_time) AS last_gps_long
           FROM flight_details a
           WHERE a.aircraftid='${flightId}'`;

           try {
             const locationQueryResult = await pool.query(locationQuery);

             if (locationQueryResult.rows.length === 0) {
               throw new Error('No rows returned from location query');
             }

             const origin_lat = parseFloat(locationQueryResult.rows[0].initial_gps_lat);
             const origin_long = parseFloat(locationQueryResult.rows[0].initial_gps_long);
             const destination_lat = parseFloat(locationQueryResult.rows[0].last_gps_lat);
             const destination_long = parseFloat(locationQueryResult.rows[0].last_gps_long);

             const originUrl =
               'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
               origin_lat +
               ',' +
               origin_long +
               '&key=' +
               GOOGLE_API_KEY +
               '&sensor=false';
             const destinationUrl =
               'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
               destination_lat +
               ',' +
               destination_long +
               '&key=' +
               GOOGLE_API_KEY +
               '&sensor=false';
             const origin_response = await axios.get(originUrl);
             const destination_response = await axios.get(destinationUrl);
             const originLocation = origin_response.data.results[0].formatted_address;
             const destinationLocation = destination_response.data.results[0].formatted_address;
             const reg_no = locationQueryResult.rows[0].reg_no;
             const aircraft_reg_no =locationQueryResult.rows[0].flightid;
             var location = { "origin": originLocation.slice(7), "destination": destinationLocation.slice(7) , "reg_no":reg_no ,"aircraft_reg_no":aircraft_reg_no};
             // Use the location object as needed
                console.log(location , "location");
           } catch (error) {
             // Handle the error here
             console.error(error);
           }


  if ( reportType == 'EOFSR_EM' ){

           res.status(200).json({"status":"200", "report_data_s1":{...report_data_first_str, ...location}
, "report_data_s2":report_data_second, "report_data_s3": report_data_third_str});
           return;
  } else if( reportType == 'EOFSR_ENGI_COND_MONI' ){
    let i = 0;
    console.log(" -- EOFSR_ENGI_COND_MONI --");
       //report_data_second_2.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: param_value, unit: unit_label, priority: priority }
    while (i < report_data_second.length) {
      console.log(" -- EOFSR_ENGI_COND_MONI --"+i+report_data_second[i].label);
        report_data_second_combined.push({ecmParams:report_data_second[i].label,actualValue_takeoff:report_data_second[i].param_value,actualValue_Cruise:report_data_second_2[i].param_value,unit:report_data_second[i].unit,priority:report_data_second[i].priority});
        i++;
    }
    console.log(" -- report_data_second_combined_str --["+Date(Date.now()).toString()+"] "  );
  //	report_data_second_combined_str = JSON.parse(report_data_second_combined);
    console.log(" -- Test3 --["+Date(Date.now()).toString()+"] "  );
    //res.status(200).json({"status":"200", "report_data_s1":report_data_first_str, "report_data_s2_1":report_data_second, "report_data_s2_2": report_data_second_2});
    res.status(200).json({"status":"200", "report_data_s1":{...report_data_first_str, ...location}
, "report_data_s2":report_data_second_combined});
    return;
  }else if ( reportType == 'EOFSR_FINA_ADMI' ){

           res.status(200).json({"status":"200", "report_data_s1":{...report_data_first_str, ...location}
, "report_data_s2":report_data_second});
           return;
              }else if ( reportType == 'EOFSR_FLIG_OPER' ){

           res.status(200).json({"status":"200", "report_data_s1":{...report_data_first_str, ...location}
, "report_data_s2":report_data_second});
           return;
              }else if ( reportType == 'EOFSR_FLIG_SAFE' ){

           res.status(200).json({"status":"200", "report_data_s1":{...report_data_first_str, ...location}
, "report_data_s2":report_data_second, "report_data_s3": report_data_third_str});
           return;
              }else if ( reportType == 'EOFSR_MOQA' ){

           res.status(200).json({"status":"200", "report_data_s1":{...report_data_first_str, ...location}
, "report_data_s2_moqa_1":report_data_second_moqa_1,"report_data_s2_moqa_2":report_data_second_moqa_2,"report_data_s2_moqa_3":report_data_second_moqa_3,"report_data_s2_moqa_4":report_data_second_moqa_4,"report_data_s2_moqa_5":report_data_second_moqa_5,"report_data_s2_moqa_6":report_data_second_moqa_6,"report_data_s2_moqa_7":report_data_second_moqa_7,"report_data_s2_moqa_8":report_data_second_moqa_8});
           return;
              }else if ( reportType == 'EOFSR_FOQA' ){
//In Thius first section is not there. So 2nd is mapped to 1, 3rd is mapped to 2 so on
           res.status(200).json({"status":"200", "report_data_s1":{...report_data_first_str, ...location}
, "report_data_s2_moqa_1":report_data_second_moqa_2,"report_data_s2_moqa_2":report_data_second_moqa_3,"report_data_s2_moqa_3":report_data_second_moqa_4,"report_data_s2_moqa_4":report_data_second_moqa_5,"report_data_s2_moqa_5":report_data_second_moqa_6,"report_data_s2_moqa_6":report_data_second_moqa_7,"report_data_s2_moqa_7":report_data_second_moqa_8});
           return;
              }else {
    console.log(" -- Report Not Defined -- ");
  }

      }else{
         res.status(200).json({"status":"404", "message":"Report not configured for report type "+reportType})
         return;
      }
  }catch( error ) {
    console.log("["+Date(Date.now()).toString()+"] Error: "+error.code)
    console.log("["+Date(Date.now()).toString()+"] Error: "+error)
    res.status(200).json({"status":"404", "message":"Unable to get report data for report type "+reportType})
  }finally{
    client.release()
  }
}

//handling request for pdf 
/**
 * Retrieves report in pdf format.
 *
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A Promise that resolves when the function is completed.
 */
const getAllPDFReport=async(reportData ,rName) => {
    const browser = await puppeteer.launch({
                    args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    let FlightSafetyEngineeringOrMaintenanceReport;
    if(rName==="Flight Safety" || rName==="Engineering & Maintainance"){
      FlightSafetyEngineeringOrMaintenanceReport=
`<!DOCTYPE html>
<html>
<head>
  <title>End Of Flight Report Summary</title>
  <style type="text/css">
        body {
            font-family: Arial, sans-serif;
        }

        .heading {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #f2f2f2;
            padding: 20px;
            text-align: center;
            margin: 0 auto;
            max-width: 960px;
        }

        .logo {
            max-height: 220px;
            max-width: 220px;
            margin-right: 20px;
        }

        .box {
            border: 1px solid black;
            padding: 10px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            background-color: #f0f0f0;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin: 20px;
        }

        .box p {
            margin: 0;
            flex-basis: 100%;
        }

        .box .left,
        .box .right {
            flex-basis: 50%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-start;
        }

        .box .left p,
        .box .right p {
            margin-right: 10px;
        }

        .gap {
            flex-basis: 100%;
            height: 10px;
        }

        table {
            border-collapse: collapse;
            width: 100%;
            page-break-inside: avoid;
        }

        th,
        td {
          font-size:0.7rem;
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }


        table:last-of-type {
          border-collapse: collapse;
          width: 100%;
          margin-top: 20px;
          font-size: 0.7rem;
        }
        
        table:last-of-type td, table:last-of-type th {
          border: 0.2px solid #ddd;
          padding: 3px;
          text-align: center;
        }
        
        table:last-of-type td:first-of-type,
        table:last-of-type th:first-of-type {
          border-left: none;
        }
        
        table:last-of-type td:last-of-type,
        table:last-of-type th:last-of-type {
          border-right: none;
        }
        
        table:last-of-type th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        
        table:last-of-type th:nth-child(1),
        table:last-of-type td:nth-child(1) {
          text-align: left;
        }
        
        table:last-of-type th:nth-child(n+2):nth-child(-n+7),
        table:last-of-type td:nth-child(n+2):nth-child(-n+7) {
          border-left: none;
        }
        
        table:last-of-type th:nth-child(n+10):nth-child(-n+17),
        table:last-of-type td:nth-child(n+10):nth-child(-n+17) {
          border-left: none;
        }
        
        table:last-of-type th:nth-child(2),
        table:last-of-type th:nth-child(9),
        table:last-of-type th:nth-child(16),
        table:last-of-type td:nth-child(2),
        table:last-of-type td:nth-child(9),
        table:last-of-type td:nth-child(16) {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        
        table:last-of-type th:nth-child(2),
        table:last-of-type td:nth-child(2) {
          text-align: center;
        }
        
        table:last-of-type th:nth-child(9),
        table:last-of-type td:nth-child(9),
        table:last-of-type th:nth-child(16),
        table:last-of-type td:nth-child(16) {
          text-align: center;
        }
        

table:last-of-type th:nth-child(2),
table:last-of-type th:nth-child(9),
table:last-of-type th:nth-child(16) {
    border-right: 3px solid black;
}
table:last-of-type th:nth-child(2),
table:last-of-type th:nth-child(9),
table:last-of-type th:nth-child(16) {
    color: blue;
}

table:last-of-type th:nth-child(6),
table:last-of-type th:nth-child(13),
table:last-of-type th:nth-child(20) {
    color: green;
}

table:last-of-type th:nth-child(4),
table:last-of-type th:nth-child(11),
table:last-of-type th:nth-child(23) {
    color: red;
}

</style>

</head>
<body>
  <div class="heading">
    <h1>End Of Flight Summary Report ${rName}</h1>
    <img src="data:image/jpeg;base64,${logoData}" alt="Logo" class="logo">
  </div>
  <div class="box">
  <div class="left">
      <p>Aircraft Type:${reportData.report_data_s1?.reg_no || ''}</p>
      <p>Aircraft Reg. No.:${reportData.report_data_s1?.aircraft_reg_no || ''}</p>
      <p>Origin:${reportData.report_data_s1?.origin || ''}</p>
      <p>Taxi Out Time:${reportData.report_data_s1?.taxi_out_time || ''}</p>
      <p>Taxi Off Time :${reportData.report_data_s1?.taxi_off_time || ''}</p>
  </div>
  <div class="right">
      <p>Date:${reportData.report_data_s1?.Date || ''}</p>
      <p>Flight ID/Call Sign:${reportData.report_data_s1?.flightID || ''}</p>
      <p>Destination:${reportData.report_data_s1?.destination || ''}</p>
      <p>Gate In Time:${reportData.report_data_s1?.gate_in_time || ''}</p>
      <p>Landing Time:${reportData.report_data_s1?.landing_Time || ''}</p>
  </div>
</div>      
  <div class="box">
    <table>
      <tbody>
                
                  <tr>
                    <td>Take Off Gross Weight </td>
                    <td>${reportData.report_data_s2[0]?.param_value || ''}</td>
                    <td>LBS/KG</td>
                  </tr>
                  <tr>
                  <td>Zero Fuel Weight </td>
                  <td>${reportData.report_data_s2[1]?.param_value || ''}</td>
                  <td>LBS/KG</td>
                </tr>
                <tr>
                <td>Fuel Quantity-Fuel on Board at Take-off </td>
                <td>${reportData.report_data_s2[2]?.param_value || ''}</td>
                <td>LBS/KG</td>
              </tr>
              <tr>
              <td>Fuel Quantity-Fuel on Board at Landing</td>
              <td>${reportData.report_data_s2[3]?.param_value || ''}</td>
              <td>LBS/KG</td>
            </tr>
            <tr>
            <td>Before Engine Start Oil Quantity</td>
            <td>${reportData.report_data_s2[4]?.param_value || ''}</td>
            <td>USG/QTS</td>
          </tr>
          <tr>
          <td>After Engine Shut Down Oil Quantity</td>
          <td>${reportData.report_data_s2[5]?.param_value || ''}</td>
          <td>USG/QTS</td>
        </tr>
        <tr>
        <td>Cruise Altitude </td>
        <td>${reportData.report_data_s2[6]?.param_value || ''}</td>
        <td>Feet/Meters</td>
      </tr>
      <tr>
      <td>Cruise Mach Number </td>
      <td>${reportData.report_data_s2[7]?.param_value || ''}</td>
      <td>Mach</td>
    </tr>
    <tr>
    <td> Cruise Speed/IAS</td>
    <td>${reportData.report_data_s2[8]?.param_value || ''}</td>
    <td>Knots</td>
  </tr>
  <tr>
  <td>Total Air Temperature </td>
  <td>${reportData.report_data_s2[9]?.param_value || ''}</td>
  <td>Degree C</td>
</tr>
              </tbody>
  </table>
</div>

<div class="box">
     <h2> Fuel Consumption and Engine Parameter Summary</h2>
  <table id="my-table">
    <thead>
      <tr>
        <th rowspan="2">Flight Phase</th>
        <th colspan="2"></th>
        <th colspan="7">Engine 1</th>
        <th colspan="7">Engine 2</th>
      </tr>
      <tr>
      <th>Elapse Time</th>
      <th>Actual Burn-Off</th>
        <th>N1</th>
        <th>N2</th>
        <th>EGT</th>
        <th>Oil Press</th>
        <th>Oil Temp</th>
        <th> Fuel Flow</th>
        <th> Fuel Used</th>
        <th>N1</th>
        <th>N2</th>
        <th>EGT</th>
        <th>Oil Press</th>
        <th>Oil Temp</th>
        <th> Fuel Flow</th>
        <th> Fuel Used</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Engine Start</td>
        <td>${reportData.report_data_s3[0]?.elapse_time|| ''}</td>
  <td>${reportData.report_data_s3[0]?.engine1_Actual_Burn_Off || ''}</td>
  <td>${reportData.report_data_s3[0]?.engine1_N1 || ''}</td>
  <td>${reportData.report_data_s3[0]?.engine1_N2|| ''}</td>
  <td>${reportData.report_data_s3[0]?.engine1_egt || ''}</td>
  <td>${reportData.report_data_s3[0]?.engine1_Oil_Press || ''}</td>
  <td>${reportData.report_data_s3[0]?.engine1_Oil_Temp || ''}</td>
  <td>${reportData.report_data_s3[0]?.engine1_Fule_Flow || ''}</td>
  <td>${reportData.report_data_s3[0]?.engine1_Fule_Used || ''}</td>
  

  <td>${reportData.report_data_s3[0]?.engine2_N1 || ''}</td>
  <td>${reportData.report_data_s3[0]?.engine2_N2|| ''}</td>
  <td>${reportData.report_data_s3[0]?.engine2_egt || ''}</td>
  <td>${reportData.report_data_s3[0]?.engine2_Oil_Press || ''}</td>
  <td>${reportData.report_data_s3[0]?.engine2_Oil_Temp || ''}</td>
  <td>${reportData.report_data_s3[0]?.engine2_Fule_Flow || ''}</td>
  <td>${reportData.report_data_s3[0]?.engine2_Fule_Used || ''}</td>
      </tr>
      <tr>
      <td>Take-Off</td>
      <td>${reportData.report_data_s3[1]?.elapse_time|| ''}</td>
      <td>${reportData.report_data_s3[1]?.engine1_Actual_Burn_Off || ''}</td>
      <td>${reportData.report_data_s3[1]?.engine1_N1 || ''}</td>
      <td>${reportData.report_data_s3[1]?.engine1_N2|| ''}</td>
      <td>${reportData.report_data_s3[1]?.engine1_egt || ''}</td>
      <td>${reportData.report_data_s3[1]?.engine1_Oil_Press || ''}</td>
      <td>${reportData.report_data_s3[1]?.engine1_Oil_Temp || ''}</td>
      <td>${reportData.report_data_s3[1]?.engine1_Fule_Flow || ''}</td>
      <td>${reportData.report_data_s3[1]?.engine1_Fule_Used || ''}</td>
      
    
      <td>${reportData.report_data_s3[1]?.engine2_N1 || ''}</td>
      <td>${reportData.report_data_s3[1]?.engine2_N2|| ''}</td>
      <td>${reportData.report_data_s3[1]?.engine2_egt || ''}</td>
      <td>${reportData.report_data_s3[1]?.engine2_Oil_Press || ''}</td>
      <td>${reportData.report_data_s3[1]?.engine2_Oil_Temp || ''}</td>
      <td>${reportData.report_data_s3[1]?.engine2_Fule_Flow || ''}</td>
      <td>${reportData.report_data_s3[1]?.engine2_Fule_Used || ''}</td>
     
    </tr> <tr>
    <td>Climb</td>
    <td>${reportData.report_data_s3[2]?.elapse_time|| ''}</td>
    <td>${reportData.report_data_s3[2]?.engine1_Actual_Burn_Off || ''}</td>
    <td>${reportData.report_data_s3[2]?.engine1_N1 || ''}</td>
    <td>${reportData.report_data_s3[2]?.engine1_N2|| ''}</td>
    <td>${reportData.report_data_s3[2]?.engine1_egt || ''}</td>
    <td>${reportData.report_data_s3[2]?.engine1_Oil_Press || ''}</td>
    <td>${reportData.report_data_s3[2]?.engine1_Oil_Temp || ''}</td>
    <td>${reportData.report_data_s3[2]?.engine1_Fule_Flow || ''}</td>
    <td>${reportData.report_data_s3[2]?.engine1_Fule_Used || ''}</td>
    
  
    <td>${reportData.report_data_s3[2]?.engine2_N1 || ''}</td>
    <td>${reportData.report_data_s3[2]?.engine2_N2|| ''}</td>
    <td>${reportData.report_data_s3[2]?.engine2_egt || ''}</td>
    <td>${reportData.report_data_s3[2]?.engine2_Oil_Press || ''}</td>
    <td>${reportData.report_data_s3[2]?.engine2_Oil_Temp || ''}</td>
    <td>${reportData.report_data_s3[2]?.engine2_Fule_Flow || ''}</td>
    <td>${reportData.report_data_s3[2]?.engine2_Fule_Used || ''}</td>
  </tr> <tr>
  <td>Cruise</td>
  <td>${reportData.report_data_s3[3]?.elapse_time|| ''}</td>
  <td>${reportData.report_data_s3[3]?.engine1_Actual_Burn_Off || ''}</td>
  <td>${reportData.report_data_s3[3]?.engine1_N1 || ''}</td>
  <td>${reportData.report_data_s3[3]?.engine1_N2|| ''}</td>
  <td>${reportData.report_data_s3[3]?.engine1_egt || ''}</td>
  <td>${reportData.report_data_s3[3]?.engine1_Oil_Press || ''}</td>
  <td>${reportData.report_data_s3[3]?.engine1_Oil_Temp || ''}</td>
  <td>${reportData.report_data_s3[3]?.engine1_Fule_Flow || ''}</td>
  <td>${reportData.report_data_s3[3]?.engine1_Fule_Used || ''}</td>
  

  <td>${reportData.report_data_s3[3]?.engine2_N1 || ''}</td>
  <td>${reportData.report_data_s3[3]?.engine2_N2|| ''}</td>
  <td>${reportData.report_data_s3[3]?.engine2_egt || ''}</td>
  <td>${reportData.report_data_s3[3]?.engine2_Oil_Press || ''}</td>
  <td>${reportData.report_data_s3[3]?.engine2_Oil_Temp || ''}</td>
  <td>${reportData.report_data_s3[3]?.engine2_Fule_Flow || ''}</td>
  <td>${reportData.report_data_s3[3]?.engine2_Fule_Used || ''}</td>
</tr> <tr>
<td>Descent/Approach</td>
<td>${reportData.report_data_s3[4]?.elapse_time|| ''}</td>
  <td>${reportData.report_data_s3[4]?.engine1_Actual_Burn_Off || ''}</td>
  <td>${reportData.report_data_s3[4]?.engine1_N1 || ''}</td>
  <td>${reportData.report_data_s3[4]?.engine1_N2|| ''}</td>
  <td>${reportData.report_data_s3[4]?.engine1_egt || ''}</td>
  <td>${reportData.report_data_s3[4]?.engine1_Oil_Press || ''}</td>
  <td>${reportData.report_data_s3[4]?.engine1_Oil_Temp || ''}</td>
  <td>${reportData.report_data_s3[4]?.engine1_Fule_Flow || ''}</td>
  <td>${reportData.report_data_s3[4]?.engine1_Fule_Used || ''}</td>
  

  <td>${reportData.report_data_s3[4]?.engine2_N1 || ''}</td>
  <td>${reportData.report_data_s3[4]?.engine2_N2|| ''}</td>
  <td>${reportData.report_data_s3[4]?.engine2_egt || ''}</td>
  <td>${reportData.report_data_s3[4]?.engine2_Oil_Press || ''}</td>
  <td>${reportData.report_data_s3[4]?.engine2_Oil_Temp || ''}</td>
  <td>${reportData.report_data_s3[4]?.engine2_Fule_Flow || ''}</td>
  <td>${reportData.report_data_s3[4]?.engine2_Fule_Used || ''}</td>
</tr> <tr>
<td>Landing</td>
<td>${reportData.report_data_s3[5]?.elapse_time|| ''}</td>
  <td>${reportData.report_data_s3[5]?.engine1_Actual_Burn_Off || ''}</td>
  <td>${reportData.report_data_s3[5]?.engine1_N1 || ''}</td>
  <td>${reportData.report_data_s3[5]?.engine1_N2|| ''}</td>
  <td>${reportData.report_data_s3[5]?.engine1_egt || ''}</td>
  <td>${reportData.report_data_s3[5]?.engine1_Oil_Press || ''}</td>
  <td>${reportData.report_data_s3[5]?.engine1_Oil_Temp || ''}</td>
  <td>${reportData.report_data_s3[5]?.engine1_Fule_Flow || ''}</td>
  <td>${reportData.report_data_s3[5]?.engine1_Fule_Used || ''}</td>
  

  <td>${reportData.report_data_s3[5]?.engine2_N1 || ''}</td>
  <td>${reportData.report_data_s3[5]?.engine2_N2|| ''}</td>
  <td>${reportData.report_data_s3[5]?.engine2_egt || ''}</td>
  <td>${reportData.report_data_s3[5]?.engine2_Oil_Press || ''}</td>
  <td>${reportData.report_data_s3[5]?.engine2_Oil_Temp || ''}</td>
  <td>${reportData.report_data_s3[5]?.engine2_Fule_Flow || ''}</td>
  <td>${reportData.report_data_s3[5]?.engine2_Fule_Used || ''}</td>
</tr> <tr>
<td>Taxi-In</td>
<td>${reportData.report_data_s3[6]?.elapse_time|| ''}</td>
  <td>${reportData.report_data_s3[6]?.engine1_Actual_Burn_Off || ''}</td>
  <td>${reportData.report_data_s3[6]?.engine1_N1 || ''}</td>
  <td>${reportData.report_data_s3[6]?.engine1_N2|| ''}</td>
  <td>${reportData.report_data_s3[6]?.engine1_egt || ''}</td>
  <td>${reportData.report_data_s3[6]?.engine1_Oil_Press || ''}</td>
  <td>${reportData.report_data_s3[6]?.engine1_Oil_Temp || ''}</td>
  <td>${reportData.report_data_s3[6]?.engine1_Fule_Flow || ''}</td>
  <td>${reportData.report_data_s3[6]?.engine1_Fule_Used || ''}</td>
  

  <td>${reportData.report_data_s3[6]?.engine2_N1 || ''}</td>
  <td>${reportData.report_data_s3[6]?.engine2_N2|| ''}</td>
  <td>${reportData.report_data_s3[6]?.engine2_egt || ''}</td>
  <td>${reportData.report_data_s3[6]?.engine2_Oil_Press || ''}</td>
  <td>${reportData.report_data_s3[6]?.engine2_Oil_Temp || ''}</td>
  <td>${reportData.report_data_s3[6]?.engine2_Fule_Flow || ''}</td>
  <td>${reportData.report_data_s3[6]?.engine2_Fule_Used || ''}</td>
</tr> <tr>
<td>Engine Stop</td>
<td>${reportData.report_data_s3[7]?.elapse_time|| ''}</td>
  <td>${reportData.report_data_s3[7]?.engine1_Actual_Burn_Off || ''}</td>
  <td>${reportData.report_data_s3[7]?.engine1_N1 || ''}</td>
  <td>${reportData.report_data_s3[7]?.engine1_N2|| ''}</td>
  <td>${reportData.report_data_s3[7]?.engine1_egt || ''}</td>
  <td>${reportData.report_data_s3[7]?.engine1_Oil_Press || ''}</td>
  <td>${reportData.report_data_s3[7]?.engine1_Oil_Temp || ''}</td>
  <td>${reportData.report_data_s3[7]?.engine1_Fule_Flow || ''}</td>
  <td>${reportData.report_data_s3[7]?.engine1_Fule_Used || ''}</td>
  

  <td>${reportData.report_data_s3[7]?.engine2_N1 || ''}</td>
  <td>${reportData.report_data_s3[7]?.engine2_N2|| ''}</td>
  <td>${reportData.report_data_s3[7]?.engine2_egt || ''}</td>
  <td>${reportData.report_data_s3[7]?.engine2_Oil_Press || ''}</td>
  <td>${reportData.report_data_s3[7]?.engine2_Oil_Temp || ''}</td>
  <td>${reportData.report_data_s3[7]?.engine2_Fule_Flow || ''}</td>
  <td>${reportData.report_data_s3[7]?.engine2_Fule_Used || ''}</td>
</tr>
</tbody>
</body>
</html>`
    }
    else if(rName==="FINANCE AND ADMINISTRATION"){
      FlightSafetyEngineeringOrMaintenanceReport=
      `<!DOCTYPE html>
      <html>
      <head>
        <title>End Of Flight Report Summary</title>
        <style type="text/css">
              body {
                  font-family: Arial, sans-serif;
              }
      
              .heading {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  background-color: #f2f2f2;
                  padding: 20px;
                  text-align: center;
                  margin: 0 auto;
                  max-width: 960px;
              }
      
              .logo {
                  max-height: 220px;
                  max-width: 220px;
                  margin-right: 20px;
              }
      
              .box {
                  border: 1px solid black;
                  padding: 10px;
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                  align-items: center;
                  background-color: #f0f0f0;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  margin: 20px;
              }
      
              .box p {
                  margin: 0;
                  flex-basis: 100%;
              }
      
              .box .left,
              .box .right {
                  flex-basis: 50%;
                  display: flex;
                  flex-wrap: wrap;
                  align-items: center;
                  justify-content: flex-start;
              }
      
              .box .left p,
              .box .right p {
                  margin-right: 10px;
              }
      
              .gap {
                  flex-basis: 100%;
                  height: 10px;
              }
      
              table {
                  border-collapse: collapse;
                  width: 100%;
              }
      
              th,
              td {
                font-size:0.7rem;
                  padding: 8px;
                  text-align: left;
                  border-bottom: 1px solid #ddd;
              }
      
              tr:nth-child(even) {
                  background-color: #f2f2f2;
              }
      </style>
      
      </head>
      <body>
        <div class="heading">
          <h1>End Of Flight Summary Report ${rName || 'Flight Safety '}</h1>
          <img src="data:image/jpeg;base64,${logoData}" alt="Logo" class="logo">
        </div>
        <div class="box">
        <div class="left">
            <p>Aircraft Type:${ reportData.report_data_s1?.reg_no || ''}</p>
            <p>Aircraft Reg. No.:${reportData.report_data_s1?.aircraft_reg_no || ''}</p>
            <p>Origin:${ reportData.report_data_s1?.origin || ''}</p>
            <p>Taxi Out Time:${ reportData.report_data_s1?.taxi_out_time || ''}</p>
            <p>Taxi Off Time :${ reportData.report_data_s1?.taxi_off_time || ''}</p>
        </div>
        <div class="right">
            <p>Date:${reportData.report_data_s1?.Date || ''}</p>
            <p>Flight ID/Call Sign:${reportData.report_data_s1?.flightID || ''}</p>
            <p>Destination:${reportData.report_data_s1?.destination || ''}</p>
            <p>Gate In Time:${reportData.report_data_s1?.gate_in_time || ''}</p>
            <p>Landing Time:${reportData.report_data_s1?.landing_Time || ''}</p>
        </div>
      </div>      
        <div class="box">
          <table>
            <tbody>
                        <tr>
                          <td>Take Off Gross Weight </td>
                          <td>${reportData.report_data_s2[0]?.param_value || ''}</td>
                          <td>${reportData.report_data_s2[0]?.unit || 'Lbs/kg'}</td>
                        </tr>
                        <tr>
                        <td>Zero Fuel Weight </td>
                        <td>${reportData.report_data_s2[1]?.param_value || ''}</td>
                        <td>${reportData.report_data_s2[1]?.unit || 'Lbs/kg'}</td>
                      </tr>
                      <tr>
                      <td>Fuel Quantity-Fuel on Board at Take-off </td>
                      <td>${reportData.report_data_s2[2]?.param_value || ''}</td>
                      <td>${reportData.report_data_s2[2]?.unit || 'Lbs/kg'}</td>
                    </tr>
                    <tr>
                    <td>Fuel Quantity-Fuel on Board at Landing</td>
                    <td>${reportData.report_data_s2[3]?.param_value || ''}</td>
                    <td>${reportData.report_data_s2[3]?.unit || 'Lbs/kg'}</td>
                  </tr>
                  <tr>
                  <td>Engine 1 Fuel Used</td>
                  <td>${reportData.report_data_s2[4]?.param_value || ''}</td>
                  <td>${reportData.report_data_s2[4]?.unit || 'Lbs/kg'}</td>
                </tr>
                <tr>
                <td>Engine 2 Fuel Used</td>
                <td>${reportData.report_data_s2[5]?.param_value}</td>
                <td>${reportData.report_data_s2[5]?.unit || 'Lbs/kg'}</td>
              </tr>
              <tr>
              <td>Trip Fuel </td>
              <td>${reportData.report_data_s2[6]?.param_value || ''}</td>
              <td>${reportData.report_data_s2[6]?.unit || 'Lbs/kg'}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </body>
      </html>`
    }

    else if(rName==="Engine Condition"){
      FlightSafetyEngineeringOrMaintenanceReport=
      `<!DOCTYPE html>
      <html>
      <head>
        <title>End Of Flight Report Summary</title>
        <style type="text/css">
              body {
                  font-family: Arial, sans-serif;
              }
      
              .heading {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  background-color: #f2f2f2;
                  padding: 20px;
                  text-align: center;
                  margin: 0 auto;
                  max-width: 960px;
              }
      
              .logo {
                  max-height: 220px;
                  max-width: 220px;
                  margin-right: 20px;
              }
      
              .box {
                  border: 1px solid black;
                  padding: 10px;
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                  align-items: center;
                  background-color: #f0f0f0;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  margin: 20px;
              }
      
              .box p {
                  margin: 0;
                  flex-basis: 100%;
              }
      
              .box .left,
              .box .right {
                  flex-basis: 50%;
                  display: flex;
                  flex-wrap: wrap;
                  align-items: center;
                  justify-content: flex-start;
              }
      
              .box .left p,
              .box .right p {
                  margin-right: 10px;
              }
      
              .gap {
                  flex-basis: 100%;
                  height: 10px;
              }
      
              table {
                  border-collapse: collapse;
                  width: 100%;
              }
      
              th,
              td {
                font-size:0.7rem;
                  padding: 8px;
                  text-align: left;
                  border-bottom: 1px solid #ddd;
              }
      
              tr:nth-child(even) {
                  background-color: #f2f2f2;
              }
      </style>
      
      </head>
      <body>
        <div class="heading">
          <h1>End Of Flight Summary Report ${rName || ''}</h1>
          <img src="data:image/jpeg;base64,${logoData}" alt="Logo" class="logo">
        </div>
        <div class="box">
        <div class="left">
            <p>Aircraft Type:${ reportData.report_data_s1?.reg_no || ''}</p>
            <p>Aircraft Reg. No.:${reportData.report_data_s1?.aircraft_reg_no || ''}</p>
            <p>Origin:${ reportData.report_data_s1?.origin || ''}</p>
            <p>Taxi Out Time:${ reportData.report_data_s1?.taxi_out_time || ''}</p>
            <p>Taxi Off Time :${ reportData.report_data_s1?.taxi_off_time || ''}</p>
        </div>
        <div class="right">
            <p>Date:${reportData.report_data_s1?.Date || ''}</p>
            <p>Flight ID/Call Sign:${reportData.report_data_s1?.flightID || ''}</p>
            <p>Destination:${reportData.report_data_s1?.destination || ''}</p>
            <p>Gate In Time:${reportData.report_data_s1?.gate_in_time || ''}</p>
            <p>Landing Time:${reportData.report_data_s1?.landing_Time || ''}</p>
        </div>
      </div>      
        <div class="box">
          <table>
          <tr>
          <th>ECM Parameters</th>
          <th>Actual Value TakeOff</th>
          <th>Actual Value Cruise</th>
          <th>Units</th>
          </tr>
          <tbody>
          ${reportData.report_data_s2?.map(item => `
            <tr>
              <td>${item.ecmParams || ''}</td>
              <td>${item.actualValue_takeoff || ''}</td>
              <td>${item.actualValue_Cruise || ''}</td>
              <td>${item.unit || 'Lbs/kg'}</td>
            </tr>
          `).join('') || ''}
        </tbody>
        </table>
      </div>
      </body>
      </html>`
    }

    else if(rName==="Flight Operations"){
      FlightSafetyEngineeringOrMaintenanceReport=
      `<!DOCTYPE html>
      <html>
      <head>
        <title>End Of Flight Report Summary</title>
        <style type="text/css">
              body {
                  font-family: Arial, sans-serif;
              }
      
              .heading {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  background-color: #f2f2f2;
                  padding: 20px;
                  text-align: center;
                  margin: 0 auto;
                  max-width: 960px;
              }
      
              .logo {
                  max-height: 220px;
                  max-width: 220px;
                  margin-right: 20px;
              }
      
              .box {
                  border: 1px solid black;
                  padding: 10px;
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                  align-items: center;
                  background-color: #f0f0f0;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  margin: 20px;
              }
      
              .box p {
                  margin: 0;
                  flex-basis: 100%;
              }
      
              .box .left,
              .box .right {
                  flex-basis: 50%;
                  display: flex;
                  flex-wrap: wrap;
                  align-items: center;
                  justify-content: flex-start;
              }
      
              .box .left p,
              .box .right p {
                  margin-right: 10px;
              }
      
              .gap {
                  flex-basis: 100%;
                  height: 10px;
              }
      
              table {
                  border-collapse: collapse;
                  width: 100%;
              }
      
              th,
              td {
                font-size:0.7rem;
                  padding: 8px;
                  text-align: left;
                  border-bottom: 1px solid #ddd;
                  border-right: 1px solid #ddd;
              }
      
              tr:nth-child(even) {
                  background-color: #f2f2f2;
              }

      .flight-phase {
        font-weight: bold;
      }

      .boxPhase {
        width: 20px;
        height: 20px;
        display: inline-block;
        border: 1px solid black;
        margin: 2px;
      }

      .boxPhase-red {
        background-color: red;
      }

      .boxPhase-yellow {
        background-color: yellow;
      }

      .boxPhase-green {
        background-color: green;
      }
      </style>
      </head>
      <body>
        <div class="heading">
          <h1>End Of Flight Summary Report ${rName}</h1>
          <img src="data:image/jpeg;base64,${logoData}" alt="Logo" class="logo">
        </div>
        <div class="box">
        <div class="left">
            <p>Aircraft Type:${reportData.report_data_s1?.aircraft_type || ''}</p>
            <p>Aircraft Reg. No.:${reportData.report_data_s1?.aircraft_reg_no || ''}</p>
            <p>Origin:${reportData.report_data_s1?.origin || ''}</p>
            <p>Taxi Out Time:${reportData.report_data_s1?.taxi_out_time || ''}</p>
            <p>Taxi Off Time :${reportData.report_data_s1?.taxi_off_time || ''}</p>
        </div>
        <div class="right">
            <p>Date:${reportData.report_data_s1?.Date || ''}</p>
            <p>Flight ID/Call Sign:${reportData.report_data_s1?.flightID || ''}</p>
            <p>Destination:${reportData.report_data_s1?.destination || ''}</p>
            <p>Gate In Time:${reportData.report_data_s1?.gate_in_time || ''}</p>
            <p>Landing Time:${reportData.report_data_s1?.landing_Time || ''}</p>
        </div>
      </div>      
        <div class="box">
          <table>
            <tbody>
                      
                        <tr>
                          <td>Take Off Gross Weight </td>
                          <td>${reportData.report_data_s2[0]?.param_value || ''}</td>
                          <td>${reportData.report_data_s2[0]?.unit || 'LBS/KG'}</td>
                        </tr>
                        <tr>
                        <td>Zero Fuel Weight </td>
                        <td>${reportData.report_data_s2[1]?.param_value || ''}</td>
                        <td>${reportData.report_data_s2[1]?.unit || 'LBS/KG'}</td>
                      </tr>
                      <tr>
                      <td>Fuel Quantity-Fuel on Board at Take-off </td>
                      <td>${reportData.report_data_s2[2]?.param_value || ''}</td>
                      <td>${reportData.report_data_s2[2]?.unit || 'LBS/KG'}</td>
                    </tr>
                    <tr>
                    <td>Fuel Quantity-Fuel on Board at Landing</td>
                    <td>${reportData.report_data_s2[3]?.param_value || ''}</td>
                    <td>${reportData.report_data_s2[3]?.unit || 'LBS/KG'}</td>
                  </tr>
              <tr>
              <td>Cruise Altitude </td>
              <td>${reportData.report_data_s2[6]?.param_value || ''}</td>
              <td>${reportData.report_data_s2[6]?.unit || 'Feet/Meters'}</td>
            </tr>
            <tr>
            <td>Cruise Mach Number </td>
            <td>${reportData.report_data_s2[7]?.param_value || ''}</td>
            <td>${reportData.report_data_s2[7]?.unit || 'Mach'}</td>
          </tr>
          <tr>
          <td> Cruise Speed/IAS</td>
          <td>${reportData.report_data_s2[8]?.param_value || ''}</td>
          <td>${reportData.report_data_s2[8]?.unit || 'Knots'}</td>
        </tr>
        </tbody>
        </table>
      </div>
      <h2>Fuel Consumption Summary</h>
      <br>
      <br>
      <table>
      <thead>
        <tr>
          <th>Flight Phase</th>
          <th>Elapsed Time</th>
          <th>Actual Burn Off</th>
          <th>APU Usage/Gnd Air</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="flight-phase">Engine Start</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="flight-phase">Taxi-Out</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="flight-phase">Take-Off</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="flight-phase">Climb</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="flight-phase">Cruise</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="flight-phase">Descent/Approach</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="flight-phase">Landing</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="flight-phase">Taxi-In</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="flight-phase">Engine Stop</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
      </body>
      </html>`
    }

    else if(rName==="MOQA" || rName==="FOQA"){
    
     FlightSafetyEngineeringOrMaintenanceReport = 
     `<!DOCTYPE html>
     <html>
     <head>
       <title>End Of Flight Report Summary</title>
       <style type="text/css">
             body {
                 font-family: Arial, sans-serif;
             }
     
             .heading {
                 display: flex;
                 align-items: center;
                 justify-content: space-between;
                 background-color: #f2f2f2;
                 padding: 20px;
                 text-align: center;
                 margin: 0 auto;
                 max-width: 960px;
             }
     
             .logo {
                 max-height: 220px;
                 max-width: 220px;
                 margin-right: 20px;
             }
     
             .box {
                 border: 1px solid black;
                 padding: 10px;
                 display: flex;
                 flex-wrap: wrap;
                 justify-content: space-between;
                 align-items: center;
                 background-color: #f0f0f0;
                 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                 margin: 20px;
                 page-break-inside: avoid;
             }
     
             .box p {
                 margin: 0;
                 flex-basis: 100%;
             }
     
             .box .left,
             .box .right {
                 flex-basis: 50%;
                 display: flex;
                 flex-wrap: wrap;
                 align-items: center;
                 justify-content: flex-start;
             }
     
             .box .left p,
             .box .right p {
                 margin-right: 10px;
             }
     
             .gap {
                 flex-basis: 100%;
                 height: 10px;
             }
     
             table {
                 border-collapse: collapse;
                 width: 100%;
                 page-break-inside: avoid;
             }
     
             th,
             td {
               font-size:0.7rem;
                 padding: 8px;
                 text-align: left;
                 border-bottom: 1px solid #ddd;
                 border-right: 1px solid #ddd;
             }
     
             tr:nth-child(even) {
                 background-color: #f2f2f2;
             }

     .flight-phase {
       font-weight: bold;
     }

     .boxPhase {
       width: 20px;
       height: 20px;
       display: inline-block;
       border: 1px solid black;
       margin: 2px;
     }

     .boxPhase-red {
       background-color: red;
     }

     .boxPhase-yellow {
       background-color: yellow;
     }

     .boxPhase-green {
       background-color: green;
     }
     </style>
     </head>
     <body>
       <div class="heading">
         <h1>End Of Flight Summary Report ${rName}</h1>
         <img src="data:image/jpeg;base64,${logoData}" alt="Logo" class="logo">
       </div>
       <div class="box">
       <div class="left">
           <p>Aircraft Type: ${reportData.report_data_s1?.aircraft_type || ''}</p>
           <p>Aircraft Reg. No.: ${reportData.report_data_s1?.aircraft_reg_no || ''}</p>
           <p>Origin: ${reportData.report_data_s1?.origin || ''}</p>
           <p>Taxi Out Time: ${reportData.report_data_s1?.taxi_out_time || ''}</p>
           <p>Taxi Off Time : ${reportData.report_data_s1?.taxi_off_time || ''}</p>
       </div>
       <div class="right">
           <p>Date: ${reportData.report_data_s1?.Date || 'NA'}</p>
           <p>Flight ID/Call Sign: ${reportData.report_data_s1?.flightID || ''}</p>
           <p>Destination: ${reportData.report_data_s1?.destination || ''}</p>
           <p>Gate In Time: ${reportData.report_data_s1?.gate_in_time || ''}</p>
           <p>Landing Time: ${reportData.report_data_s1?.landing_Time || ''}</p>
       </div>
     </div>   
     <div class="box">
     <h2 style="text-align:center">GENERAL ${rName} IF INDIVIDUAL PARAMETERS EXCEEDS</h2>
    <table>
      <tr>
        <th>Parameters</th>
        <th>Exceedence - Yes/No</th>
        <th>Value Exceeded</th>
      </tr>
      ${reportData.report_data_s2_moqa_1?.map(item => `
      <tr>
        <td>${item.label || 'Exceedance name'}</td>
        <td>${item.param_value || 'isExceeded?'}</td>
        <td>N/A</td>
      </tr>
      `).join('')}
    </table>
     </div>  
     <div class="box">
     <h2 style="text-align:center">Taxi-Out</h2>
    <table>
      <tr>
        <th>Parameters</th>
        <th>Exceedence - Yes/No</th>
        <th>Value Exceeded</th>
      </tr>
      ${reportData.report_data_s2_moqa_2?.map(item => `
      <tr>
        <td>${item.label || 'Exceedance name'}</td>
        <td>${item.param_value || 'isExceeded?'}</td>
        <td>N/A</td>
      </tr>
      `).join('')}
    </table>
     </div>  
     <div class="box">
     <h2 style="text-align:center">Take Off</h2>
    <table>
      <tr>
        <th>Parameters</th>
        <th>Exceedence - Yes/No</th>
        <th>Value Exceeded</th>
      </tr>
      ${reportData.report_data_s2_moqa_3?.map(item => `
      <tr>
        <td>${item.label || 'Exceedance name'}</td>
        <td>${item.param_value || 'isExceeded?'}</td>
        <td>N/A</td>
      </tr>
      `).join('')}
    </table>
     </div>

     <div class="box">
     <h2 style="text-align:center">Climb</h2>
    <table>
      <tr>
        <th>Parameters</th>
        <th>Exceedence - Yes/No</th>
        <th>Value Exceeded</th>
      </tr>
      ${reportData.report_data_s2_moqa_4?.map(item => `
      <tr>
        <td>${item.label || 'Exceedance name'}</td>
        <td>${item.param_value || 'isExceeded?'}</td>
        <td>N/A</td>
      </tr>
      `).join('')}
    </table>
     </div>

     <div class="box">
     <h2 style="text-align:center">Cruise</h2>
    <table>
      <tr>
        <th>Parameters</th>
        <th>Exceedence - Yes/No</th>
        <th>Value Exceeded</th>
      </tr>
      ${reportData.report_data_s2_moqa_5?.map(item => `
      <tr>
        <td>${item.label || 'Exceedance name'}</td>
        <td>${item.param_value || 'isExceeded?'}</td>
        <td>N/A</td>
      </tr>
      `).join('')}
    </table>
     </div>

     <div class="box">
     <h2 style="text-align:center">Descent</h2>
    <table>
      <tr>
        <th>Parameters</th>
        <th>Exceedence - Yes/No</th>
        <th>Value Exceeded</th>
      </tr>
      ${reportData.report_data_s2_moqa_6?.map(item => `
      <tr>
        <td>${item.label || 'Exceedance name'}</td>
        <td>${item.param_value || 'isExceeded?'}</td>
        <td>N/A</td>
      </tr>
      `).join('')}
    </table>
     </div>
     ${reportData.report_data_s2_moqa_7 && reportData.report_data_s2_moqa_7.length > 0 ?`
     <div class="box">
     <h2 style="text-align:center">Approach , Go Around And Landing </h2>
    <table>
      <tr>
        <th>Parameters</th>
        <th>Exceedence - Yes/No</th>
        <th>Value Exceeded</th>
      </tr>
      ${reportData.report_data_s2_moqa_7?.map(item => `
      <tr>
        <td>${item.label || 'Exceedance name'}</td>
        <td>${item.param_value || 'isExceeded?'}</td>
        <td>N/A</td>
      </tr>
      `).join('')}
    </table>
     </div>`:''}

     ${reportData.report_data_s2_moqa_8 && reportData.report_data_s2_moqa_8.length > 0 ?`
     <div class="box">
     <h2 style="text-align:center">Taxi-In</h2>
    <table>
      <tr>
        <th>Parameters</th>
        <th>Exceedence - Yes/No</th>
        <th>Value Exceeded</th>
      </tr>
      ${reportData.report_data_s2_moqa_8?.map(item => `
      <tr>
        <td>${item.label || 'Exceedance name'}</td>
        <td>${item.param_value || 'isExceeded?'}</td>
        <td>N/A</td>
      </tr>
      `).join('')}
    </table>
     </div>`:''}
     </body>
     </html>`
    }
    else{
      FlightSafetyEngineeringOrMaintenanceReport=
      `<html>
            <p style="text-align:center">No reports for report Name ${rName}</p>
      </html>`
    }
    await page.setContent(FlightSafetyEngineeringOrMaintenanceReport);
    const pdfBuffer = await page.pdf({width:'14in',height: '10in'});
    await browser.close();
    return pdfBuffer;
  }
  













module.exports = {
  getEventNotificationDropdown,
  getGeoLocation,
  getEventForLatestFlight,
  getFlightGraphData,
	getSummaryCountData, 
        getFlightsForAssetBasedOnChoice,
	getLatestFlightAndData,
	getEventListFilter,
    graphDropdown,
    getEvents,
    getEventType,
    getEventParams,
    getFlights,
    getFlightsForAsset,
    getLatestNFlights,
    getFlightDetails,
    saveGeoFenceData,
    getOtherGridIdsByAGridId,
    // Report API methods
    getAllPDFReport,
    getReport
}
