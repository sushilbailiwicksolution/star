#7311 row is working getFlightDetails
flight details -> row 22 id 30 for http://103.10.234.158:9001/getFlightDetails/167-2022-07-05-17 this api call

{
  "fuel": "67",
  "airSpeed": "55",
  "groundSpeed": "290",
  "flightData": [
    {
      <!-- "flightid": "167-2022-12-12-16", -->
      <!-- "packet_type": "H", -->
      <!-- "date_time": "2022-12-12 16:08:22", -->
      <!-- "aircraftid": "167", -->
      <!-- "eventid": "1", -->
      <!-- "gps_lat": "35.5576", -->
      <!-- "gps_long": "139.759", -->
      <!-- "altitude": "-312", -->
      <!-- "speed": "0", -->
      <!-- "heading": "61.7084" -->
    },
    {
      "flightid": "167-2022-12-12-16",
      "packet_type": "T",
      "date_time": "2022-12-12 16:08:23",
      "aircraftid": "167",
      "eventid": "2",
      "gps_lat": "35.5576",
      "gps_long": "139.759",
      "altitude": "-312",
      "speed": "0",
      "heading": "61.7084"
    }
  ]
}



INSERT INTO event_details (id,data_insert_date_time,packet_type,date_time,aircraftid,eventid,gps_lat,gps_long,altitude, speed,heading, start_time,stop_time,param_count,fuel,air_speed, ground_speed)

VALUES (3,'2023-01-12 12:00:23',"T",'2023-01-12 12:00:23',"167",3,"35.5576", "139.759","-312","0","61.7084","2023-01-12 12:05:45","2023-01-12 12:10:45", 23,67,55,290);