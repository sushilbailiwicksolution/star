var Pool = require('pg').Pool

const db_username = 'star'
const db_password = 'Admin@321'
const db_host     = '127.0.0.1'
const db_port     = 5432
const db_name     = 'stardb'


const pool = new Pool({
    user: db_username,
    host: db_host,
    database: db_name,
    password: db_password,
    port: db_port
})


var circle_to_table = [];
circle_to_table['WB'] = 'wb';


const getEvents = async ( req, res )=>{

    var EVENT_DETAILS = 'event_details';
    var EVENT_PARAMS_DETAIL = 'event_params_detail';

    var packetType = 'all';

    if( req.params.ptype && req.params.ptype != 'undefined' ){
       packetType = req.params.ptype;
       packetType = packetType.toUpperCase();
    }

    var query = '';
    var paramQuery = '';

    if( packetType.toUpperCase() == 'ALL' ){
        query = "SELECT id, packet_type, date_time, aircraftid, eventid, gps_lat, gps_long, altitude, speed, heading, start_time, stop_time, param_count FROM "+EVENT_DETAILS;
    }else{
        query = "SELECT id, packet_type, date_time, aircraftid, eventid, gps_lat, gps_long, altitude, speed, heading, start_time, stop_time, param_count FROM "+EVENT_DETAILS+" WHERE packet_type = '"+packetType+"'";
    }

    console.log("["+Date(Date.now()).toString()+"] Query is [%s]", query);


    pool.query(query, (error, results)=>{
         if( error ){
             console.log("["+Date(Date.now()).toString()+"] "+error.code+" Error Message ["+error+"]")
             if( error.code == '42P01' ){
               res.status(400).json({"status":error.code, "message": "Table not found"})
             }
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
    })
}


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

const getFlights = async( req, res ) => {
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
         query = query + " WHERE to_timestamp(start_event_time, 'DD-MM-YYYY HH24')::timestamp >= to_timestamp('"+paramValueArr[0]+"', 'DD-MM-YYYY HH24')::timestamp and to_timestamp(stop_event_time, 'DD-MM-YYYY HH24')::timestamp <= to_timestamp('"+paramValueArr[1]+"', 'DD-MM-YYYY HH24')::timestamp"
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



const getFlightsForAsset = async( req, res ) => {
  var FLIGHT_DETAILS_TABLE = 'flight_details';

  var assetid       = '';
  var dates         = '';
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
      query = query + " WHERE asset_id='"+assetid+"' AND to_timestamp(start_event_time, 'DD-MM-YYYY HH24')::timestamp >= to_timestamp('"+paramValueArr[0]+"', 'DD-MM-YYYY HH24')::timestamp and to_timestamp(stop_event_time, 'DD-MM-YYYY HH24')::timestamp <= to_timestamp('"+paramValueArr[1]+"', 'DD-MM-YYYY HH24')::timestamp"
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

const getFlightDetails = async( req, res ) => {
  var FLIGHT_DETAILS_TABLE = 'flight_details';
  var FLIGHT_EVENTS_DETAIL = 'event_details'

  var flightid      = '';
  var limit         = '';
  var paramValueArr = [];

  if( req.params.flightid && req.params.flightid != 'undefined' ){
     flightid = req.params.flightid;
  }else{
     console.log("["+Date(Date.now()).toString()+"] Required Parameters Not Found In Request")
     res.status(200).json({"status":"404", "message":"flightid is missing in request"})
  }

  var query = "SELECT a.aircraftid AS flightid, b.packet_type, b.date_time, b.aircraftid, b.eventid, b.gps_lat, b.gps_long, b.altitude, b.speed, b.heading from "+FLIGHT_DETAILS_TABLE+" a, "+FLIGHT_EVENTS_DETAIL+" b where a.aircraftid='"+flightid+"' and a.asset_id=b.aircraftid and b.date_time >= a.start_event_time and b.date_time <= a.stop_event_time order by b.id"

  console.log("["+Date(Date.now()).toString()+"] Query is [%s]", query);
  pool.query(query, (error, results)=>{
     if( error ){
       console.log("["+Date(Date.now()).toString()+"] "+error.code+" Flight Details Error Message ["+error+"]")
       res.status(400).json({"status":error.code, "message": "Data not found"})
     }else{
       var returnVal = [];
       if( results.rowCount > 0 ){
          returnVal = results.rows;
          //returnVal = results.rows.map(row => {return {aircraftid: row.aircraftid, start: row.start, end: row.end}});
          console.log("["+Date(Date.now()).toString()+"] Returning JSON as "+JSON.stringify(Object.assign({}, returnVal)));
          res.status(200).end(JSON.stringify(Object.assign({}, returnVal)))
       }else{
          console.log("["+Date(Date.now()).toString()+"] No data found for the request")
          res.status(200).json({"status":"404", "message":"No data found for the given request"})
       }
     }
   });
}


const getParamDetails = async ( eventId ) => {
   var EVENT_PARAMS_DETAIL = 'event_params_detail';
   paramQuery = "SELECT param_id, param_value FROM "+EVENT_PARAMS_DETAIL+" WHERE id="+eventId;
   const { paramDetails } = await pool.query(paramQuery);
   console.table( paramDetails );
   return paramDetails;
};


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



module.exports = {
    getEvents,
    getEventParams,
    getFlights,
    getFlightsForAsset,
    getLatestNFlights,
    getFlightDetails,
    getOtherGridIdsByAGridId
}
