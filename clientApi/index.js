var express = require('express')
var app     = express()
var bodyParser = require('body-parser')
const port  = 3378
const db    = require('./db')
const fs =  require('fs');
const cors  = require('cors');


/*app.use(cors({
    origin: '*'
}));*/

app.use('/docs',express.static('docs'))
app.use(cors({
    methods: ['GET']
}));


/**
 * @method help 
 * @description Handles get request of /help consist of json data about list of apis in this nodejs app
 */
app.get('/help', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    app.set('json spaces', 20);
    res.json({message:"Possible APIs", apis:[{api:'/getEvents',params:'/ptype', use:'To get all events of particular type. If parameter value is all then it will return all type of events'},{api:'/getEventParams', params:'/pid', use: 'To get all the params related to the event. User has to pass packet id to get the params values. packet id will be retrived from /getEvents API'},{api:'/getFlights',params:'/type/paramValue',use:'To get all the flights Id using start|end date time or using asset id. User has to pass type (asset or date) and paramValue (166 or 04-02-2022 10|04-02-2022 14)'},{api:'/getFlightsForAsset',params:'/assetid/start_date|end_date',use:'To get all the flights Id using asset id and start|end date time. User has to pass asset_id(166) and start_end dates(04-02-2022 10|04-02-2022 14)'},{api:'/getLatestNFlights',params:'/assetid/number_of_required_records',use:'To get the latest N flights Id for an asset id. User has to pass asset_id(166) and number of required records(0/1/2/3/N)'},{api:'/getFlightDetails',params:'/flightid',use:'To get all events detail using flightid. User has to pass flight(166-2022-02-09-17)'},{api:'/help',params:'',use:'To get information about all available APIs'}]})
    //res.json({message:"Possible APIs", apis:[{api:'/getEvents',params:'/ptype', use:'To get all events of particular type. If parameter value is all then it will return all type of events'},{api:'/getEventParams', params:'/pid', use: 'To get all the params related to the event. User has to pass packet id to get the params values. packet id will be retrived from /getEvents API'},{api:'/getFlights',params:'/type/paramValue',use:'To get all the flights Id using start|end date time or using asset id. User has to pass type (asset or date) and paramValue (166 or 04-02-2022 10|04-02-2022 14)'},{api:'/getGridMapping',params:'/CIRCLE/GRID_TYPE/GRIDS-COMMA SEPARATED',use:'To get associated 1KM, 100M, and 20M grid ids'},{api:'/help',params:'',use:'To get information about all available APIs'}]})
})


/**
 * @method getEvents
 * @description Handles get request for getEvents based on packet type 
 * @example /getEvents/All
 */
app.get( '/getEvents/:ptype', db.getEvents )


/**
 * @method getEventParams
 * @description Handles get request for getEventParams based on pid passed.
 * @example /getEventParams/166
 */
app.get( '/getEventParams/:pid', db.getEventParams )

/**
 * @method getGridMapping
 * @description Get Associated Grids for 20M, 100M, 1KM
*/
app.get('/getGridMapping/:circle/:type/:gridids', db.getOtherGridIdsByAGridId)


//Get Flight IDs
//getFlights/date/03-02-2022|04-02-2022
//getFlights/asset/166
/**
 * @method getFlights/:type/:paramValue
 * @description handles get request for getFlights
 * @example getFlights/asset/166 | getFlights/date/03-02-2022|04-02-2022
 */
app.get('/getFlights/:type/:paramValue', db.getFlights)


//Get Flight IDs
//getFlightsForAsset/161/03-02-2022|04-02-2022
/**
 * @method getFlightForAsset
 * @description Handles get request for getFlightForAsset/:assetid/:dates
 * @example getFlightsForAsset/161/03-02-2022|04-02-2022
 */
app.get('/getFlightsForAsset/:assetid/:dates', db.getFlightsForAsset)


/**
 * @method getLatestNFlights
 * @description Handles get request for getLatestNflights based on assetid and limit.
 */
app.get('/getLatestNFlights/:assetid/:limit', db.getLatestNFlights)


/**
 * @method getFlightDetails
 * @var {string} flightid
 * @description This method handles get request for getFlightDetails/:flightid based on flightid and returns the query result matched.
 */
app.get('/getFlightDetails/:flightid', db.getFlightDetails)



/**
 * @method saveGeoFence
 * @description This method saves geofence data in database.
 * handles post request for geofence data.
 */
app.use(bodyParser.json());
app.post('/saveGeoFence', db.saveGeoFenceData)




//event_type using database 

app.get('/eventTypes', db.getEventType)



//API for severity level Dropdown 
const severityLevels = [
  'low',
  'high',
  'medium',
  'Alarm 3',
  'Alarm 4',
  'Alarm 5',
  'Alarm 6',
  'Alarm 7',
  'Alarm 8',
  'Alarm 9',
  'Alarm 10',
  'Alarm 11',
  'Alarm 12',
  'Alarm 13',
  'Alarm 14',
  'Alarm 15'
];

// Define the route that returns the JSON object for the dropdown menu
app.get('/severity', (req, res) => {
  res.json(severityLevels.map((severityLevel, index) => ({
    id: index + 1,
    severity_level: severityLevel
  })));
});



//Event API filtered data based on request by GUI 

/*app.post('/getEventList', (req, res) => {
    const aircraft = req.body.aircraft;
    const eventTypes = req.body.eventType || [];
    const severities = req.body.severity || [];
  
    // Filter the data based on the specified conditions
    const filteredData = data.filter((data) => {
        console.log(eventTypes.includes(data.type))
      return (
        (!aircraft || data.Aircraft === aircraft) &&
        (eventTypes.length === 0 || eventTypes.includes(data.type)) &&
        (severities.length === 0 || severities.includes(data.Severity))
      );
    });
  
    res.json(filteredData);
  });
  */

//Added eventlist based on aircraft and ptype 


//Added eventList dynamic
app.post('/getEventList', db.getEventListFilter)


//Created graphDropdown date 11-03


app.get('/graph/dropdown', db.graphDropdown)

// app.get( '/getEventForAircraft/:ptype/:aircraft', db.getEventForAircraft )

/**
 * @var server 
 * @description Contains the port at which nodejs API is running  
 */
var server = app.listen({port: port, host: '0.0.0.0'}, function(){
    var host = server.address().address
    var port = server.address().port || 3344
    console.log("PostgresSQL API App Listening On Port at http://%s:%s", host, port)
})
