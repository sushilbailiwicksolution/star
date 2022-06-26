require('./util_internal')();
const nh = require('./notification_handler');

const json_to_parse = '{"asset_id":0,"name":"string","event_on":0,"bufferDistance":0,"description":"string","minAltitude":0,"maxAltitude":0,"minVelocity":0,"maxVelocity":0,"eventSeverity":"low","scheduleStartTime":"string","scheduleEndTime":"string","customerId":0,"emails":"tanuj@bailiwicksolution.com;sushil@bailiwicksolution.com","Landmark":"123.12345 321.12; 123.12346 321.12; 123.12347 321.12; 123.12348 321.12; 123.12345 321.12","layerId":0}'

//var csv = nh.json_parse( JSON.parse(json_to_parse), ['asset_id', 'event_on', 'eventSeverity', 'Landmark', 'emails'] )

var csv = JSON.parse( json_to_parse )



console.log(csv.Landmark)

var csvData = csv.split('\n')

var query = ''

for( var i = 1; i < csvData.length; i++ ){
   var csvDataArr = csvData[i].split(",")
   query = "INSERT INTO geofence_details (asset_id, event_on, eventseverity, landmark, emails) values ("+csvDataArr[0]+", "+csvDataArr[1]+", '"+csvDataArr[2].replace(/"/g,'')+"', '"+csvDataArr[3].replace(/;/g,',')+"', '"+csvDataArr[4]+"')";
   console.log("Query", query)
}
