
This is readme for nodejs flightApi at port 8081.
Database used for following API's :- stardb 
This node api handles following get request :- 

1- 8081/getEvents/:ptype

  Explaination:- It communicate with 'event_details' table 
  :ptype- Is packet type passed to params.

  Query is conditional based on if :ptype is 
  packetType=='All'.
  if( packetType.toUpperCase() == 'ALL' ){
        query = "SELECT id, packet_type, date_time, aircraftid, eventid, gps_lat, gps_long, altitude, speed, heading, start_time, stop_time, param_count FROM "+EVENT_DETAILS;
    }else{
        query = "SELECT id, packet_type, date_time, aircraftid, eventid, gps_lat, gps_long, altitude, speed, heading, start_time, stop_time, param_count FROM "+EVENT_DETAILS+" WHERE packet_type = '"+packetType+"'";
    }

   Usecase:- getEvents/:ptype for given request query returns with   all the row matched as json object .

    2. getEventParams/:pid 
    
    Explaination:It communicates with table event_params_detail .
    Query Used:-  'SELECT ogc_fid, id, param_insert_date_time, packet_type, param_id, param_value FROM '+EVENT_PARAMS_DETAIL;
  
    Usecase:- If data found for provided pid all the rows found is returned as json response.

    
    3. getFlights/:type/:paramValue 
    Communicates with table flight_details 
    Usecase:- It takes type and paramValue and runs query based on it in flightdetails table returns with all the rows matched for following query. 
    Query used :-
     conditional query based on {reqType==type} and paramValue.
    If reqType=="asset"
    query = "SELECT DISTINCT(aircraftid) FROM " + FLIGHT_DETAILS_TABLE  WHERE WHERE asset_id='"+paramValue+"'";
    if reqType == "date"
     "SELECT DISTINCT(aircraftid) FROM " + FLIGHT_DETAILS_TABLE WHERE to_timestamp(start_event_time, 'YYYY-MM-DD HH24')::timestamp >= to_timestamp('"+paramValueArr[0]+"', 'DD-MM-YYYY HH24')::timestamp and to_timestamp(stop_event_time, 'YYYY-MM-DD HH24')::timestamp <= to_timestamp('"+paramValueArr[1]+"', 'DD-MM-YYYY HH24')::timestamp"

    4. getFlightsForAsset/:assetid/:dates
    Communicates with flight_details table in stardb .
    Usecase:- Takes assetId and dates from request and return a response based on matching data from following query. 
    Query used :-
    Conditional Query used based on 
    if dates.indexOf("|") != -1 
    query = "SELECT DISTINCT(aircraftid) FROM " + FLIGHT_DETAILS_TABLE  WHERE asset_id='"+assetid+"' AND to_timestamp(start_event_time, 'YYYY-MM-DD HH24')::timestamp >= to_timestamp('"+paramValueArr[0]+"', 'DD-MM-YYYY HH24')::timestamp and to_timestamp(stop_event_time, 'YYYY-MM-DD HH24')::timestamp <= to_timestamp('"+paramValueArr[1]+"', 'DD-MM-YYYY HH24')::timestamp";

    5. getFlightDetails/:flightid
    Communicates with flight_details and event_details table in database.
    takes flightId passed in request and runs the following query based on it .

     Usecase:- Returns all the row matched for given flightId= a.aircraftid in  flight_details table .

    "SELECT a.aircraftid AS flightid, b.packet_type, b.date_time, b.aircraftid, b.eventid, b.gps_lat, b.gps_long, b.altitude, b.speed, b.heading  from "
  +FLIGHT_DETAILS_TABLE+" a, "+FLIGHT_EVENTS_DETAIL+" b where a.aircraftid='"+flightid+"' and a.asset_id=b.aircraftid and b.date_time >= a.start_event_time and b.date_time <= a.stop_event_time order by b.id"

 {
 What i have done ? 
  updated fuel, airspeed,groundspeed in event_details table :- As existing event_details table already had speed , altitude so updated api response with new fields fuel,airspeed,groundspeed.
 My confusion :-
 But if for a given flightid = aircraftid  {fuel,airspeed, groundspeed} should be returned only once it should be uniquely matched with aircraftid in flight_details table and not in event_details }


6. 8081/saveGeofence
   Communicates with geofence_details_v2 table in databse 
   Runs insert query for the post request with provided data in geofence_details_v2 . 
   Query :- "INSERT INTO "+GEO_FENCE_TABLE+" (asset_id, event_on, eventseverity, landmark, emails_email) values ("+asset_id+", "+event_on+", '"+eventSeverity+"', ST_GeomFromText('POLYGON(("+landmark+"))', 4326), '"+emails"'

