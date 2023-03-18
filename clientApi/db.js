var Pool = require('pg').Pool
var bodyParser = require('body-parser')


/**
 * @constant db_username 
 * @description Contains username
 * @type {string}
 */
const db_username = process.env.DATABASE_USERNAME;
/**
 * @constant db_password 
 * @description Contains password
 * @type {string}
 */
const db_password = process.env.DATABASE_PASSWORD;
/**
 * @constant db_host 
 * @description Contains host
 * @type {string}
 */
const db_host     = process.env.DATABASE_HOST;
// const db_host = '127.0.0.1'
/**
 * @constant db_port
 * @description Contains port number
 * @type {number}
 */
const db_port     = process.env.DATABASE_PORT;
/**
 * @constant db_name
 * @description Contains name of the database
 * @type {string}
 */
const db_name     = process.env.DBNAME;

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


var circle_to_table = [];
circle_to_table['WB'] = 'wb';

/**
 * @constant getEvents
 * @description This function handles request of getEvents request
 * Communicates with event_details table in database
 * returns a response based on query executed
 * 
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
 * @description This function handles the request of getEventParams api request 
 * @typedef {*} string
 */

/**
 * 
 * @param {string} req 
 * @param {json} res 
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
 * @description This function handles the response of getFlights API request 
 * @param {string} req 
 * @param {json} res
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
 * @description Handles APi request related to getFlightForAsset
 * @param {*} req 
 * @param {*} res 
 * @returns query result matched for given api request
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
 * @description Handles api request related to getLatestNFlights
 * @param {string} req 
 * @param {json} res 
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
 * @description Handles api request related to getFlightDetails
 * @param {*} req 
 * @param {*} res 
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

  var query ="SELECT a.aircraftid AS flightid, b.packet_type, b.date_time, b.aircraftid, b.eventid, b.gps_lat, b.gps_long, b.altitude, b.speed, b.heading from "+FLIGHT_DETAILS_TABLE+" a, "+FLIGHT_EVENTS_DETAIL+" b where a.aircraftid='"+flightid+"' and a.asset_id=b.aircraftid and b.date_time >= a.start_event_time and b.date_time <= a.stop_event_time order by b.id";
  //Takeoff id is 2007
  //Landing Id is 2012
//   Cruise id is 2009
  var flightQuery =  
		`SELECT CASE WHEN c.param_id = '10110930037' THEN 'fuel'
   WHEN c.param_id = '10107270076' THEN 'ground_speed'
   WHEN c.param_id = '10104160103' THEN 'air_speed'
     WHEN c.param_id = '10103920100' THEN 'maxAltitude' 
     WHEN c.param_id = '10104300106' THEN 'totalAirTemperature'
      WHEN c.param_id = '10110980043' THEN 'eng1_fuel_used' 
      WHEN c.param_id = '10110980044' THEN 'eng2_fuel_used' 
      WHEN c.param_id = '10110810020' THEN 'eng1_oil_temp'
       WHEN c.param_id = '10110810021' THEN 'eng2_oil_temp' 
       WHEN c.param_id = '10100670051' THEN 'takeoff_gross_weight'
       END AS param_type, 
       c.param_value FROM ${EVENT_PARAM_DETAILS_TABLE} c 
       INNER JOIN ( SELECT b.id, b.eventid FROM ${FLIGHT_DETAILS_TABLE} a, ${FLIGHT_EVENTS_DETAIL} b 
         WHERE a.aircraftid = '${flightid}' AND a.asset_id = b.aircraftid 
         AND b.date_time >= a.start_event_time AND b.date_time <= a.stop_event_time ORDER BY b.id ) 
         AS b_subquery ON c.param_id IN ( '10110930037', '10107270076', '10104160103','10103920100', '10104300106', '10110980043', '10110980044', '10110810020', '10110810021' ,'10100670051') AND c.id = b_subquery.id`;
var flightQueryData=[];
       const resFuel = await pool.query(flightQuery)
      try
       {
          flightQueryData =resFuel.rows.reduce((acc, curr) => {
            acc[curr.param_type] = curr.param_value;
            return acc;
            }, [])
         }
         catch(err){
                return err
         }
      //const flightQueryData={"ground_speed":"9","maxAltitude":"-72","eng1_oil_temp":"92","eng2_oil_temp":"91","takeoff_gross_weight":"236400","fuel":"18520","totalAirTemperature":"23.125"}
        
	pool.query(query, (error, results)=>{
         if( error ){
           console.log("["+Date(Date.now()).toString()+"] "+error.code+" Flight Details Error Message ["+error+"]")
           res.status(400).json({"status":error.code, "message": "Data not found"})
         }else{
           var returnVal = [];
           if( results.rowCount > 0 ){
              returnVal = results.rows;
       //       console.log(flightQueryData);
              const sendData= {"data":Object.assign({},flightQueryData), "flightData":returnVal}
              //returnVal = results.rows.map(row => {return {aircraftid: row.aircraftid, start: row.start, end: row.end}});
            //   console.log("["+Date(Date.now()).toString()+"] Returning JSON as "+JSON.stringify(Object.assign({}, returnVal)));
              res.status(200).end(JSON.stringify(Object.assign({},sendData)))
           }else{
              console.log("["+Date(Date.now()).toString()+"] No data found for the request")
              res.status(200).json({"status":"404", "message":"No data found for the given request"})
           }
         }
       })
      //  console.log(results);
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
 * @param {string} eventId 
 * @returns {json}
 * @description returns the query data as response
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
 * @param {string} req 
 * @param {json} res 
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


//function to obtain event list from database 
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

//Added Event List on view click
/*

const getEventListFilter = async (req, res) => {
   const { fromDate, toDate, aircraft, eventTypes } = req.body;

   // Check if fromDate and toDate are in YYYY-MM-DD format
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

   const query = {
     text: `SELECT aircraftid, date_time AS time, event_name AS type, gps_lat, gps_long, heading,
     speed AS Velocity
     FROM event_details
     WHERE aircraftid = ANY($1::text[]) AND (($2 = ARRAY[]::text[]) OR (event_name = ANY($2))) AND date_time >= $3 AND date_time <= $4
     `,
     values: [aircraftArray, eventTypes, fromDateString, toDateString],
   };

   try {
     const { rows } = await pool.query(query);
     res.json(rows);
   } catch (err) {
     console.error(err);
     res.status(500).json({ error: 'An error occurred' });
   }
};
*/


const getEventListFilter = async (req, res) => {
  const { fromDate, toDate, aircraft, eventTypes } = req.body;

  // Check if fromDate and toDate are in YYYY-MM-DD format
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
    text: `SELECT aircraftid, date_time AS time, event_name AS type, gps_lat, gps_long, heading,
    speed AS Velocity
    FROM event_details
    WHERE (($1 = ARRAY[]::text[]) OR (aircraftid = ANY($1::text[]))) AND (($2 = ARRAY[]::text[]) OR (event_name = ANY($2))) AND date_time >= $3 AND date_time <= $4
    `,
    values: [aircraftArray, eventTypes, fromDateString, toDateString],
  };

  // If an empty array is passed for aircraft, retrieve data for all aircraft
  if (aircraftArray.length === 0) {
    query = {
      text: `SELECT aircraftid, date_time AS time, event_name AS type, gps_lat, gps_long, heading,
      speed AS Velocity
      FROM event_details
      WHERE (($1 = ARRAY[]::text[]) OR (event_name = ANY($1))) AND date_time >= $2 AND date_time <= $3
      `,
      values: [eventTypes, fromDateString, toDateString],
    };
  }

  // console.log('query:', query);
  // console.log('pool:', pool);

  try {
    const { rows } = await pool.query(query);
    console.log('rows:', rows);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
};


 const graphDropdown= async (req, res) => {
   try {
     // Query the information_schema.columns table to retrieve column names
     const query = `
     SELECT column_name
     FROM information_schema.columns
     WHERE table_name = 'event_details'
     AND column_name IN ('altitude', 'speed','date_time' ,'heading')
   `;
     const result = await pool.query(query);

     // Construct the response data using custom labels
     const data = result.rows.map((row, index) => {
       let label = '';
       switch (row.column_name) {
         case 'altitude':
           label = 'Altitude (m)';
           break;
         case 'speed':
           label = 'Speed (KTS)';
           break;
         case 'date_time':
           label = 'Date and Time';
           break;
         case 'heading':
            label='Heading';
            break;
         default:
           label = row.column_name;
           break;
       }
       return {
         id: index + 1,
         label: label,
         key: row.column_name,
       };
     });

     // Return the response data as JSON
     res.json(data);
   } catch (err) {
     console.error(err);
     res.status(500).send('Internal server error');
   }
 };



module.exports = {
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
    getOtherGridIdsByAGridId
}
