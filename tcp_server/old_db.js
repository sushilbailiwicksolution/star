var Pool = require('pg').Pool
var nodemailer = require('nodemailer');

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

       if( packetType == 'A' ){
	  console.log("["+Date(Date.now()).toString()+"] Going to check and save alert")
	  const isAlertGeneratedAndSave = await checkAndSaveIfEventInAlertRange( packetType, gpsLong, gpsLat, aircraftId, eventId )
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

async function checkAndSaveIfEventInAlertRange( packet_type, longitude, latitude, asset_id, event_id ){
        var NOTIFICATION_TABLE = 'notification_details';
        var GEOFENCE_CONFIG_TABLE = 'geofence_details_v2';

        var queryToCheck = "";
        var customerid   = "";
        var email_id     = "";
        var email_addr   = "";
        var landmark     = "";
        var layerid      = "";

	var needToSendOutAlert = false;
	var needToUpdateInStatus = false;


        const client = await pool.connect()
        try{

		needToSendOutAlert = await checkIsAlertConfiguredForOut( packet_type, longitude, latitude, asset_id, event_id, client );

		if( needToSendOutAlert ){
                	queryToCheck = "SELECT customerid, emails_id, emails_email, landmark, layerid, event_on, in_status FROM "+GEOFENCE_CONFIG_TABLE+" AS geo_conf WHERE asset_id='"+asset_id+"' and in_status = 'sent'";
			needToUpdateInStatus = false;
		}else{
                	queryToCheck = "SELECT customerid, emails_id, emails_email, landmark, layerid, event_on, in_status FROM "+GEOFENCE_CONFIG_TABLE+" AS geo_conf WHERE ST_Contains(landmark, ST_GeomFromText('POINT('||"+longitude+"||' '||"+latitude+"||')', 4326)) and asset_id='"+asset_id+"'";
			needToUpdateInStatus = true;
		}

		console.log("["+Date(Date.now()).toString()+"] Query to check data from geo table ["+queryToCheck+"]")
                const results = await client.query(queryToCheck)
                if( results.rowCount > 0 ){
                        const data = results.rows;
                        for ( var i = 0; i < data.length; i++ ){
                                let date_ob     = new Date();
                                let date        = ("0" + date_ob.getDate()).slice(-2);
                                let month       = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                                let year        = date_ob.getFullYear();
                                let hours       = ("0" + date_ob.getHours()).slice(-2);
                                let minutes     = ("0" + date_ob.getMinutes()).slice(-2);
                                let seconds     = ("0" + date_ob.getSeconds()).slice(-2);
                                var currentDate = year+"-"+month+"-"+date+" "+hours+":"+minutes+":"+seconds;

				var in_status = data[i].in_status;
				var event_on  = data[i].event_on;
				if( ( event_on == 1 && in_status == 'sent' ) || event_on == 0 ){

                                	var alertQuery = "INSERT INTO "+NOTIFICATION_TABLE+" (packet_type,asset_id,event_id,longitude,latitude,customerid,email_addr,landmark,notification_date,status) VALUES('"+packet_type+"', '"+asset_id+"', '"+event_id+"', '"+longitude+"', '"+latitude+"', '"+data[i].customerid+"', '"+data[i].emails_email+"', '"+data[i].landmark+"', '"+currentDate+"', 'P')";
					console.log("["+Date(Date.now()).toString()+"] Query to insert alert data ["+alertQuery+"]")
                                	const isDataSavedResult = await client.query(alertQuery)
                                	if( isDataSavedResult.rowCount > 0 ){
                                        	console.log("["+Date(Date.now()).toString()+"] Notification Saved Successfully")
						//Send Email For Alert
						sendEmailAlert( '', '', data[i].emails_email, asset_id, longitude, latitude )
                	                }
					console.log("["+Date(Date.now()).toString()+"] Notification Sent For Event ["+event_on+"] Flight Status")

					await updateStatus( GEOFENCE_CONFIG_TABLE, asset_id, 'completed', client )

				}else if( event_on == 1 && in_status == 'pending' ){
					await updateStatus( GEOFENCE_CONFIG_TABLE, asset_id, 'sent', client )
				}else{
					console.log("["+Date(Date.now()).toString()+"] Notification Sent For \"Out\" Flight Status")
				}
                        }
                }
        }catch( error ){
                console.error("["+Date(Date.now()).toString()+"] Error: "+error.code)
                console.error("["+Date(Date.now()).toString()+"] Error: "+error)
        }finally{
                client.release()
        }
        return;
}

async function updateStatus( GEOFENCE_CONFIG_TABLE, asset_id, statusToUpdate ){

	const client = await pool.connect()

	var updateQuery = "UPDATE "+GEOFENCE_CONFIG_TABLE+" SET in_status = '"+statusToUpdate+"' WHERE asset_id='"+asset_id+"'";
	try{
		const updateResults = await client.query(updateQuery);
		if( updateResults.rowCount > 0 ){
			console.log("["+Date(Date.now()).toString()+"] Notification in_status='"+statusToUpdate+"' for Asset Id ["+asset_id+"] Has Been Updated.");
		}else{
			console.log("["+Date(Date.now()).toString()+"] Notification in_status='"+statusToUpdate+"' for Asset Id ["+asset_id+"] Has Not Been Updated. Chances Of Multiple Alerts. Kindly Check");
		}
	}catch( error ){
		console.error("["+Date(Date.now()).toString()+"] Error: "+error.code)
		console.error("["+Date(Date.now()).toString()+"] Error: "+error)
	}finally{
		client.release()
	}
}

async function checkIsAlertConfiguredForOut( packet_type, longitude, latitude, asset_id, event_id ){
        var NOTIFICATION_TABLE = 'notification_details';
        var GEOFENCE_CONFIG_TABLE = 'geofence_details_v2';

	var needToSendOutAlert = false;

	const client = await pool.connect()
	
        try{
                queryToCheck = "SELECT customerid, emails_id, emails_email, landmark, layerid, event_on, in_status FROM "+GEOFENCE_CONFIG_TABLE+" AS geo_conf WHERE ST_Contains(landmark, ST_GeomFromText('POINT('||"+longitude+"||' '||"+latitude+"||')', 4326)) and asset_id='"+asset_id+"'";
		console.log("["+Date(Date.now()).toString()+"] Query to check in and out type of alert from geo table ["+queryToCheck+"]")
                const results = await client.query(queryToCheck)
                if( results.rowCount > 0 ){
                        const data = results.rows;
                        for ( var i = 0; i < data.length; i++ ){

				if( data[i].event_on == 1 && data[i].in_status == "pending" ){
					needToSendOutAlert = false;
				}else if( data[i].event_on == 1 && data[i].in_status == "sent" ){
					needToSendOutAlert = true;
				}else if( data[i].event_on == 0 ){
					needToSendOutAlert = false;
				}

                        }
                }
        }catch( error ){
                console.log("["+Date(Date.now()).toString()+"] Error: "+error.code)
                console.log("["+Date(Date.now()).toString()+"] Error: "+error)
        }finally{
                client.release()
        }
	console.log("["+Date(Date.now()).toString()+"] Info: Going to send status for needToSendOutAlert "+needToSendOutAlert)
        return needToSendOutAlert;

}


function sendEmailAlert( emailSubject, emailMessage, emailAddress, assetId, longitude, latitude ){
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth:{
			//user: 'tanuj@bailiwicksolution.com',
			//pass: 'kumar80@Wish'
			user: 'crsiwal@gmail.com',
			pass: 'ryqlobjpwqpowvcn'
		}
	});

	var mailOptions = {
		from: 'tanuj@bailiwicksolution.com',
		to: 'manish.mishra@bailiwicksolution.com',
		subject: 'Alert',
		text: 'Message: '+assetId+' has enterted geofencing for (Longitude, Latitude)'+longitude+', '+latitude+'\\n'+'Device: '+assetId+'()'+'\\n'+'Time: '+'<time>'+'\\n'+'Location: '+'<Location>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if( error ){
			console.error("["+Date(Date.now()).toString()+"] Error: Email Not Sent ["+error+"]")
		}else{
			console.log("["+Date(Date.now()).toString()+"] Success: Email Sent ["+info.response+"]")
		}
	});
	return;
}





module.exports = {
    saveDataToPSql
}