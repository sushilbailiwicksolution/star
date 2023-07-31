Uses of getFlightDetails :-

* request flight details from database based on aircraftId provided.
  example - http://103.10.234.248:8081/getFlightDetails/167-2022-07-05-17
   api=http://103.10.234.248:8081/getFlightDetails/
   aircraftid= 167-2022-07-05-17
   For this api request , In flight_details Table in stardb  row 22 , id 30 is being used .
* It communicate with two tables in database(stardb).
   1. event_details :-This is child  table , data Maps to foreign key of flight_details table. 
   2. flight_details:- This is main table which contains id as primary key  to fetch data from event_details.

* Table event_details contains following fields 
   * id :- PrimaryGenerated id
   * data_insert_date_time :-Time at which data is inserted in database
   * packet_type :- Type of packet {Single alphabet Uppercase}
   * date_time :- contains date as field 
   * aircraftid :- contains aircraft id without date
      {note api uses aircraftId as well date when calling getFlightDetails}
   * eventid :- contains id of event {numeric value}
   * gps_lat :- contains  latitude location in string format
   * gps_long :- contains longitude location in string format
   * altitude :- contains altitude  in decimal precision
   * speed :- contains the flight speed in string 
   * heading :- contains the location to which flight is headed towards 
   * start_time :- contains the start time of current flight
   * stop_time :- contains stop time of current flight
   * param_count :- contains param value in  integer
   
* Table flight_details contain following fields 
  * id:- PrimaryGenerated id 
  * data_insert_date_time: stores time at which data is inserted in database
  * aircraftid :- contains the aircraftid included with date 
     {Note: This aircraft matches and filters the data for getFlightDetails api request}
  * asset_id :- stores id of asset 
  * eventid:- stores event id
  * start_event_time :- stores info of event start time
  * stop_event_time:- stores info of event stop time 
  * current_status:- is flight in air or ground 


* API request processing of getFlightDetails 
  * Once the getFlightDetails/${aircraftid} api is called it matches aircraftid in url to aircraftid of table flight_details 
  * When it found a match of aircraftid the query from nodejs selects data for requested aircraftid and sends back to api request 
  * All the events related to that aircraftId is sent to api 

* Output when a succesful match found for getFlightDetails api request 
  A sample output in JSON is shown below 
{
  "flightid": "167-2022-07-05-17",
  "packet_type": "P",
  "date_time": "2022-07-05 16:42:32",
  "aircraftid": "167",
  "eventid": "2001",
  "gps_lat": "35.5562",
  "gps_long": "139.769",
  "altitude": "-106",
  "speed": "9.75",
  "heading": "-46.6136",
  },
* If match not found a error of status code 404 is sent back to api request




 #      Below is the code for getFlightDetails API 
 

 const getFlightDetails = async( req, res ) => {
  var FLIGHT_DETAILS_TABLE = 'flight_details';
  var FLIGHT_EVENTS_DETAIL = 'event_details'
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

  var query = "SELECT a.aircraftid AS flightid, b.packet_type, b.date_time, b.aircraftid, b.eventid, b.gps_lat, b.gps_long, b.altitude, b.speed, b.heading  from "
  +FLIGHT_DETAILS_TABLE+" a, "+FLIGHT_EVENTS_DETAIL+" b where a.aircraftid='"+flightid+"' and a.asset_id=b.aircraftid and b.date_time >= a.start_event_time and b.date_time <= a.stop_event_time order by b.id"

  
//   console.log("["+Date(Date.now()).toString()+"] Query is [%s]", query);
      
       pool.query(query, (error, results)=>{
         if( error ){
           console.log("["+Date(Date.now()).toString()+"] "+error.code+" Flight Details Error Message ["+error+"]")
           res.status(400).json({"status":error.code, "message": "Data not found"})
         }else{
           var returnVal = [];
           if( results.rowCount > 0 ){
              returnVal = results.rows;
              //returnVal = results.rows.map(row => {return {aircraftid: row.aircraftid, start: row.start, end: row.end}});
            //   console.log("["+Date(Date.now()).toString()+"] Returning JSON as "+JSON.stringify(Object.assign({}, returnVal)));
              res.status(200).end(JSON.stringify(Object.assign({},returnVal)))
           }else{
              console.log("["+Date(Date.now()).toString()+"] No data found for the request")
              res.status(200).json({"status":"404", "message":"No data found for the given request"})
           }
         }
       })
      //  console.log(results);
}

