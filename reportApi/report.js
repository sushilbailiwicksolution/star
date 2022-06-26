var express = require('express')
var app     = express()
const port  = 8082
const db    = require('./db')

const cors  = require('cors');


/*app.use(cors({
    origin: '*'
}));*/

app.use(cors({
    methods: ['GET']
}));


app.set('json spaces', 20);

//Get List Of Available APIs
app.get('/help', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.json({message:"Possible APIs", apis:[{api:'/getEvents',params:'/ptype', use:'To get all events of particular type. If parameter value is all then it will return all type of events'},{api:'/getEventParams', params:'/pid', use: 'To get all the params related to the event. User has to pass packet id to get the params values. packet id will be retrived from /getEvents API'},{api:'/getFlights',params:'/type/paramValue',use:'To get all the flights Id using start|end date time or using asset id. User has to pass type (asset or date) and paramValue (166 or 04-02-2022 10|04-02-2022 14)'},{api:'/getFlightsForAsset',params:'/assetid/start_date|end_date',use:'To get all the flights Id using asset id and start|end date time. User has to pass asset_id(166) and start_end dates(04-02-2022 10|04-02-2022 14)'},{api:'/getLatestNFlights',params:'/assetid/number_of_required_records',use:'To get the latest N flights Id for an asset id. User has to pass asset_id(166) and number of required records(0/1/2/3/N)'},{api:'/getFlightDetails',params:'/flightid',use:'To get all events detail using flightid. User has to pass flight(166-2022-02-09-17)'},{api:'/help',params:'',use:'To get information about all available APIs'}]})
    //res.json({message:"Possible APIs", apis:[{api:'/getEvents',params:'/ptype', use:'To get all events of particular type. If parameter value is all then it will return all type of events'},{api:'/getEventParams', params:'/pid', use: 'To get all the params related to the event. User has to pass packet id to get the params values. packet id will be retrived from /getEvents API'},{api:'/getFlights',params:'/type/paramValue',use:'To get all the flights Id using start|end date time or using asset id. User has to pass type (asset or date) and paramValue (166 or 04-02-2022 10|04-02-2022 14)'},{api:'/getGridMapping',params:'/CIRCLE/GRID_TYPE/GRIDS-COMMA SEPARATED',use:'To get associated 1KM, 100M, and 20M grid ids'},{api:'/help',params:'',use:'To get information about all available APIs'}]})
})


//Get Report
app.get( '/getReport/:rType/:fid', db.getReport )


var server = app.listen({port: port, host: '0.0.0.0'}, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("PostgresSQL API App Listening On Port at http://%s:%s", host, port)
})
