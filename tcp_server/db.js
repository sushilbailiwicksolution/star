const turf = require('@turf/turf');
var Pool = require('pg').Pool
var nodemailer = require('nodemailer');

const user='star.info@nmstech.in';
const pass='qwfxexwyprftbrll';


//Configuration for stardb database 
const db_username = 'star'
const db_password = 'Admin@123'
const db_host     = '127.0.0.1'
const db_port     = 5432
const db_name     = 'stardb'


//Configuration for starapi database
const starapi_username='star';
const starapi_password='Admin@123';
const starapi_host='127.0.0.1';
// const starapi_host='103.10.234.244';
const  starapi_port=5432;
const starapi_dbname='starapi';

const starapiPool= new Pool({
        user: starapi_username,
        host: starapi_host,
        database: starapi_dbname,
        password: starapi_password,
        port: starapi_port
})

const pool = new Pool({
    user: db_username,
    host: db_host,
    database: db_name,
    password: db_password,
    port: db_port
})



/**
 * Insert simulated data of asset into database.
 * @param {object} data - Asset data being passed for each simulated instance.
 * @example Lets say we have asset 161 for which data is being simulated then for each packet received for asset it is passed as data in this function 
 * @returns {} 
 */

const saveDataToPSql = async( data )=>{

    //console.log( data );


    //24699|H|2019-04-16 19:31:08|16|1|43.7348|79.6499|11000.0000|45.0000|35.9901|2019-04-16 19:31:08|2019-04-16 19:31:08
    //|7|1107|310.0000|10107110074|43.7348|10107190075|79.6499|10107 270076|45.0000|10107800085|35.9901|10103920100|11000.0000|510|1681.0000\n
    //ID|PacketType|Data/Time|AircraftID|EventID|GPS_Lat|GPS_Long|Altitude|Speed|Heading|StartTime|StopTime|ParamCount|ParamID|ParamValue

    var EVENT_TABLE = 'event_details';
    var EVENT_PARAMS_DETAIL = 'event_params_detail';

    var id;
    var packetType;
    var dateTime;
    var aircraftId;
    var eventId;
    var gpsLat;
    var gpsLong;
    var altitude;
    var speed;
    var heading;
    var startTime;
    var stopTime;
    var paramCount;
    var paramId;
    var paramValue;

    var dataArray = data.split("|");
   
    if( dataArray != null && dataArray != 'undefined' ){
       id         = dataArray[0];
       packetType = dataArray[1];
       dateTime   = dataArray[2];
       aircraftId = dataArray[3];
       eventId    = dataArray[4];
       gpsLat     = dataArray[5];
       gpsLong    = dataArray[6];
       altitude   = dataArray[7];
       speed      = dataArray[8];
       heading    = dataArray[9];
       startTime  = dataArray[10];
       stopTime   = dataArray[11];
       paramCount = dataArray[12];
    }

    var eventInserted = false;

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = ("0" + date_ob.getHours()).slice(-2);
    let minutes = ("0" + date_ob.getMinutes()).slice(-2);
    let seconds = ("0" + date_ob.getSeconds()).slice(-2);
    var currentDate = year+"-"+month+"-"+date+" "+hours+":"+minutes+":"+seconds;

    var query = "INSERT INTO "+EVENT_TABLE+" (id, data_insert_date_time, packet_type, date_time, aircraftid, eventid, gps_lat, gps_long, altitude, speed, heading, start_time, stop_time, param_count) VALUES ("+id+", '"+currentDate+"', '"+packetType+"', '"+dateTime+"', '"+aircraftId+"', '"+eventId+"', '"+gpsLat+"', '"+gpsLong+"', '"+altitude+"', '"+speed+"', '"+heading+"', '"+startTime+"', '"+stopTime+"', '"+paramCount+"')";
    //console.log("["+Date(Date.now()).toString()+"] Query is [%s]", query);


    const client = await pool.connect()
    try{

       const results = await client.query(query)
      
       if (gpsLat !== '0' && gpsLong !== '0') {
        await checkGeoFence(packetType, gpsLong, gpsLat, aircraftId, eventId);
      }
       
      if(packetType=='A' || packetType=='P'){
       await processEventNotification(aircraftId, eventId)
      }
       console.log("["+Date(Date.now()).toString()+"] Number of records inserted into "+EVENT_TABLE+" table ["+results.rowCount+"]");
       //1107|310.0000|10107110074|43.7348|10107190075|79.6499|10107 270076|45.0000|10107800085|35.9901|10103920100|11000.0000|510|1681.0000
       for( var i = 13; i < dataArray.length; i++ ){
           var paramId    = dataArray[i]; //13 15 17 19 21 23
           //console.log("Value of i ["+i+"] "+paramId)
           var paramValue = dataArray[++i]; //14 16 18 20 22 24
           //console.log("AFI Value of i ["+i+"] "+paramValue)
           var eventParamQuery = "INSERT INTO "+EVENT_PARAMS_DETAIL+" (id, param_insert_date_time, packet_type, param_id, param_value) VALUES("+id+", '"+currentDate+"', '"+packetType+"', '"+paramId+"', '"+paramValue+"' )"
           //console.log("["+Date(Date.now()).toString()+"] Query For Event Params Insertion is [%s]", eventParamQuery);

           const paramResults = await client.query(eventParamQuery)

           //console.log("["+Date(Date.now()).toString()+"] i is ["+i+"] Number of records inserted into "+EVENT_PARAMS_DETAIL+" table ["+paramResults.rowCount+"]");
           if( paramResults.rowCount > 0 && i == 14 && ( eventId == 2001 || eventId == 2002 ) ){
                const isFlightDataInserted = await saveFlightData( client, packetType, currentDate, aircraftId, eventId, startTime, stopTime, year+"-"+month+"-"+date+"-"+hours );
                if( isFlightDataInserted ){
                   console.log("["+Date(Date.now()).toString()+"] Flight Data Saved Successfully For ["+year+"-"+month+"-"+date+"-"+hours+"]")
                }else{
                   console.log("["+Date(Date.now()).toString()+"] Flight Data Not Saved ["+year+"-"+month+"-"+date+"-"+hours+"]")
                }
           }
           
        

           eventInserted = true;
       }

       
    }catch( error ) {
         console.log("["+Date(Date.now()).toString()+"] Error: "+error.code)
         console.log("["+Date(Date.now()).toString()+"] Error: "+error)
         eventInserted = false;
    }finally{
       client.release()
    }
    return;
}


/**
 * This function is being used to insert flight data of asset.
 * @param {object} client - Database connection information.
 * @param {string} packetType - Contains packet type from (H,T,P,A) 
 * @returns {boolean} A boolean is returned representing a flight data being stored. 
 */

async function saveFlightData( client, packetType, currentDate, aircraftId, eventId, startTime, stopTime, flightDate ){
  var FLIGHT_DETAILS_TABLE = 'flight_details';
  var retVal = false;

  var flightId = aircraftId+"-"+flightDate;

  var query = "";

  query = "INSERT INTO " + FLIGHT_DETAILS_TABLE + "(data_insert_date_time,aircraftid,asset_id,eventid,start_event_time,stop_event_time,current_status) VALUES('"+currentDate+"', '"+flightId+"', '"+aircraftId+"', '"+eventId+"', '"+startTime+"', '"+stopTime+"', 'IN-AIR')";

  if( packetType == 'P' && eventId == 2001 ){//INSERT
     await client.query(query)
     .then( results => {
         console.log("["+Date(Date.now()).toString()+"] Number of records inserted into "+FLIGHT_DETAILS_TABLE+" table ["+results.rowCount+"]. Going to return true");
         retVal = true;
     })
     .catch( error => {
         console.log("["+Date(Date.now()).toString()+"] Flight Details Error: "+error.code)
         console.log("["+Date(Date.now()).toString()+"] Flight Details Error: "+error)
         retVal = false;
     })
  }else if( packetType == 'P' && eventId == 2002 ){
     var selQuery = "SELECT aircraftid FROM " + FLIGHT_DETAILS_TABLE + " WHERE asset_id = '"+aircraftId+"' AND current_status = 'IN-AIR'";
     const results = await client.query(selQuery)
     if( results.rowCount > 0 ){
           const data = results.rows;
           flightId = data[0].aircraftid;
           query = "UPDATE "+FLIGHT_DETAILS_TABLE+" SET stop_event_time = '"+stopTime+"', current_status='ON-GROUND' WHERE aircraftid='"+flightId+"'";
           //console.log("["+Date(Date.now()).toString()+"] Flight Update Query["+query+"]");

           const updateResults = await client.query(query)
           if( updateResults.rowCount > 0 ){
              console.log("["+Date(Date.now()).toString()+"] Flight Data For Flight Id["+flightId+"] Has Been Updated. Going to return true");
              retVal = true;
              
           }else{
              retVal = false;
           }
     }else{
          retVal = false;
     }
  }

  return retVal;

}



/**
 * This function checks if the geofence is configured for the asset and if it is then if it is  triggered then calls another function to send email alert.
 * @param {string}packetType - packet type obtained from simulated data .
 * @param {string}longitude -longitude obtained from simulated data.
 * @param {string} latitude - latitude obtained from simulated data.
 * @param {number} asset_id - asset_id obtained from simulated data.
 * @param {number} eventId - event id obtained from simulated data.
 * @example Lets say we have asset 161 for which data is being simulated then for each packet received for asset checkGeofence is called and checks if a geofence is setup and if it is triggered. 
 * @returns {object} matched record is returned. 
 */

async function checkGeoFence(packetType, longitude, latitude, asset_id, eventId) {
  const client = await starapiPool.connect();
  let matchedRecords = [];
  let updatedGeofenceIds = [];
  let isMatched = false;
  try {
    const query = `SELECT 
      t.id,
      t.name,
      t.notify,
      (SELECT json_agg(l) FROM layers l WHERE l.id = t.g_layer_id) AS layer,
      (SELECT json_agg(lm) FROM landmark lm WHERE lm.id = t.g_landmark_id) AS landmark,
      (SELECT json_agg(a) FROM (
        SELECT 
          ga.*,
          (SELECT json_agg(ast) FROM asset ast WHERE ast.id = ga.asset_id) AS asset
        FROM geofence_assets ga 
        WHERE ga.geofence_id = t.id
          AND EXISTS (
            SELECT * FROM asset ast WHERE ast.id = ga.asset_id AND ast.name = '${asset_id}'
          )
      ) a) AS assets,
      (SELECT json_agg(n) FROM (
        SELECT 
          gn.*,
          (SELECT json_agg(nt) FROM notification nt WHERE nt.id = gn.notification_id) AS notification,
          (SELECT json_agg(ne.email) FROM notification_emails ne WHERE ne.notification_id = gn.notification_id) AS email
        FROM geofence_notifications gn
        WHERE gn.geofence_id = t.id
      ) n) AS notifications
    FROM 
      geofence t
    WHERE EXISTS (
      SELECT * FROM geofence_assets ga
      JOIN asset ast ON ast.id = ga.asset_id
      WHERE ga.geofence_id = t.id AND ast.name = '${asset_id}'
    )`;
    const result = await client.query(query);
    for (const row of result.rows) {
      const landmarkGeoJson = row.landmark && row.landmark.length > 0 ? JSON.parse(row.landmark[0].geojsonobject) : null;
      if (!landmarkGeoJson) {
        console.log(`Landmark and geojsonobject not found for geofence ${row.id}`);
        continue;
      }
      const emailAddresses = row.notifications && row.notifications.length > 0 ? row.notifications[0].email : null;
      const emailSubject = `Geofence Triggered for ${asset_id}`;
      const coordinates = landmarkGeoJson.map(coord => [coord.Longitude, coord.Latitude]);

      const customerId = row.assets && row.assets.length > 0 ? row.assets[0]?.asset[0]?.customerId : '';
      console.log(customerId);

      const point = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
      const polygon = {
        type: 'Polygon',
        coordinates: [coordinates],
      };
      const isInside = turf.booleanPointInPolygon(point, polygon);
      const geofenceStatus = await getGeofenceStatus(asset_id, row.id); // Function to get the geofence status for the asset
      if (row.notify === 'INSIDE' && isInside && !geofenceStatus.entered) {
        const emailMessage = `Asset ${asset_id} has entered landmark ${row.landmark[0]?.name} at (${latitude}, ${longitude}).
          This mail was triggered by geofence ${row.name}`;
        console.log(emailMessage);
        const notify = row.notify;
        // await insertNotification(packetType, asset_id, longitude, latitude, eventId, notify, customerId, emailAddresses, landmarkGeoJson, 'sent');
        await sendEmailAlert(emailSubject, emailMessage, emailAddresses);
        isMatched = true;
        matchedRecords.push(row);
        await updateGeofenceStatus(asset_id, row.id, true, false); // Function to update the geofence status for the asset
        updatedGeofenceIds.push(row.id); 
      } else if (row.notify === 'OUTSIDE' && !isInside && !geofenceStatus.exited) {
        const emailMessage = `Asset ${asset_id} has exited landmark ${row.landmark[0]?.name} at (${latitude}, ${longitude}).
          This mail was triggered by geofence ${row.name}`;
        console.log(emailMessage);
        const notify = row.notify;
        // await insertNotification(packetType, asset_id, longitude, latitude, eventId, notify, customerId, emailAddresses, landmarkGeoJson, 'sent');
        await sendEmailAlert(emailSubject, emailMessage, emailAddresses);
        isMatched = true;
        matchedRecords.push(row);
        await updateGeofenceStatus(asset_id, row.id, false, true); 
        updatedGeofenceIds.push(row.id); 
      } 

//       //When flight ends reset the entered exit 
//        if (eventId === 2002) {
//            await updateGeofenceStatus(asset_id, row.id, false, false);
//                  await deleteGeofenceRecords(asset_id);
//        }

    }
    if (!isMatched) {
      console.log('No matching geofence records found');
    }
  } catch (error) {
    console.log(`Error: ${error.code}`);
    console.log(`Error: ${error}`);
  } finally {
    client.release();
  }
  return matchedRecords;
}


/**
 * This function is used to check the current geofence status.
 * @param {number} assetId - Asset id which is obtained from simulated data like 161,162 etc.
 * @param {number} geofenceId - Geofence id is obtained from geofence stored in database. 
 * @returns {object} Boolean value for entered and exited  
 */
async function getGeofenceStatus(assetId, geofenceId) {
  const client = await starapiPool.connect();
  try {
    const query = `SELECT entered, exited FROM geofence_status WHERE asset_id = '${assetId}' AND geofence_id = ${geofenceId}`;
    const result = await client.query(query);
    if (result.rowCount > 0) {
      return {
        entered: result.rows[0].entered,
        exited: result.rows[0].exited,
      };
    } else {
      // If no status found, assume it has neither entered nor exited
      return {
        entered: false,
        exited: false,
      };
    }
  } catch (error) {
    console.log(`Error: ${error.code}`);
    console.log(`Error: ${error}`);
    throw error;
  } finally {
    client.release();
  }
}


/**
 * This function is used to check the current geofence status.
 * @param {number} assetId - Asset id which is obtained from simulated data like 161,162 etc.
 * @param {number} geofenceId - Geofence id is obtained from geofence stored in database. 
 * @param {boolean} entered - Boolean value representing if asset has entered the geofence landmark.
 * @param {boolean}  exited - Boolean value representing if asset has exited the geofence landmark.
 */
async function updateGeofenceStatus(assetId, geofenceId, entered, exited) {
  const client = await starapiPool.connect();
  try {
    const query = `INSERT INTO geofence_status (asset_id, geofence_id, entered, exited)
                   VALUES ('${assetId}', ${geofenceId}, ${entered}, ${exited})
                   ON CONFLICT (asset_id, geofence_id)
                   DO UPDATE SET entered = ${entered}, exited = ${exited}`;
    await client.query(query);
  } catch (error) {
    console.log(`Error: ${error.code}`);
    console.log(`Error: ${error}`);
    throw error;
  } finally {
    client.release();
  }
}


//Delete when flight ends 
async function deleteGeofenceRecords(assetId) {
  const client = await starapiPool.connect();
  try {
    const query = `DELETE FROM geofence_status WHERE asset_id = '${assetId}'`;
    await client.query(query);
    console.log('Records deleted successfully');
  } catch (error) {
    console.log(`Error: ${error.code}`);
    console.log(`Error: ${error}`);
    throw error;
  } finally {
    client.release();
  }
}


async function insertNotification(packetType, asset_id, longitude, latitude, eventId , notify, customerId, email_addr ,landmark,status) {
  const now = new Date();
  const timestamp = now.toUTCString().slice(0, -4);
 const client= await pool.connect();
 const landmarkJson = JSON.stringify(landmark);
  const query = `INSERT INTO NOTIFICATION_TABLE (
    packet_type, 
    asset_id, 
    event_id, 
    notify, 
    longitude, 
    latitude, 
    customerid, 
    email_addr, 
    landmark, 
    notification_date, 
    status
)
VALUES (
    '${packetType}', 
    '${asset_id}', 
    '${eventId}', 
    '${notify}', 
    '${longitude}', 
    '${latitude}', 
    '${customerId}', 
    '${email_addr}', 
    '${landmarkJson}', 
    '${timestamp}',
    '${status}'
);
`
  await client.query(query);
}



/**
 * This function is used to check the Event Notification is set for assetId and then calls email function to send mail.
 * @param {number} assetId - Asset id which is obtained from simulated data like 161,162 etc.
 * @param {number} eventId - Event id obtained from simulated data.
 */

async function processEventNotification(assetId, eventId) {
  const client = await starapiPool.connect();

  try {
    const query = `
      SELECT eventname, email
      FROM event_based_notification t
      LEFT JOIN events_notifications_list n ON t.id = n.event_id
      LEFT JOIN notification ON n.notification_id = notification.id
      LEFT JOIN event_assets a ON t.id = a.event_id
      LEFT JOIN asset ON a.asset_id = asset.id
      LEFT JOIN notification_emails ne ON ne.notification_id = n.id
      WHERE t.status = 'ACTIVE'
        AND asset.name = '${assetId}'
        AND t.eventid = '${eventId}';
    `;

    const { rows } = await client.query(query);

    if (rows.length > 0) {
       const {eventname} =rows[0];
      const emailAddresses = rows.map((row) => row.email);
      const emailSubject = `Event Notification for Asset ${assetId}`;
      const emailMessage = `This is event notification for Asset ${assetId} and for Event ${eventname}.`;
      console.log(`Message sent succesfully for event notification ${eventname}`);
      await sendEmailAlert(emailSubject, emailMessage, emailAddresses);
    } else {
      console.log('No matching event-based notifications found.');
    }
  } catch (error) {
    console.error('Error executing the query:', error);
  }
  finally {
    client.release();
  } 
}




/**
 * This function is used to send email alert to email list obtained from functions which are calling sendEmailAlert.
 * @param {string} subject - subject for which email needs to be sent.
 * @param {string} message - Message which needs to be sent.
 * @param {Array} emailList - Contains list of email address for which mail need to be sent   
 */
async function sendEmailAlert(subject, message, emailList) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${user}`,
      pass: `${pass}`
    },
  });

  const mailOptions = {
    from: `${user}`,
    to: emailList,
    subject: subject,
    text: message,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(`[${Date(Date.now()).toString()}] Error sending email alert: ${error}`);
    } else {
      console.log(`[${Date(Date.now()).toString()}] Info: Email alert sent to ${emailList}`);
    }
  });
}



module.exports = {
    saveDataToPSql
}
