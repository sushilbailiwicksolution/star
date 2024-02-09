var express = require('express')
var app     = express()
var bodyParser = require('body-parser')
const port  = 3378
const db    = require('./db')
const fs =  require('fs');
const cors  = require('cors');
const axios = require('axios');
var https = require('https');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const multer = require('multer');
const XLSX = require('xlsx');
const path = require('path');

const { v4: uuidv4 } = require('uuid');

app.use(cors());


//multer for file upload

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/home/star/eventsExcel/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: multer.memoryStorage() });

// Function to check the format of XLSX file
function validateXLSXContent(sheet) {
  // Modify this function to check the specific columns or format you require.
  // For example, check if eventType, eventName, asset, and eventId columns exist.

  const requiredColumns = ['etype', 'ename', 'asset', 'eid'];

  // Convert the sheet to an array of objects
  const data = XLSX.utils.sheet_to_json(sheet);

  for (const row of data) {
    for (const col of requiredColumns) {
      if (!row[col]) {
        return false;
      }
    }
  }

  return true;
}






// Handle file uploads
app.post('/asset/events/upload/:assetId', upload.single('file'), async (req, res) => {
  // The uploaded file is available in req.file
  console.log(`File Location: ${req.file.path}`);
  console.log(`Uploaded file: ${req.file.originalname}`);
  console.log(req.file.buffer, 'buffer');
  const assetId=req.params.assetId;
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
   
    const timestamp = Date.now(); 

// Extract the file extension from the original filename
const originalFileName = req.file.originalname;
const fileExtension = originalFileName.slice(((originalFileName.lastIndexOf(".") - 1) >>> 0) + 2);

const fileNameWithoutExtension = originalFileName.replace(`.${fileExtension}`, "");

// Create the new filename with a clear structure
const generatedFileName = `${fileNameWithoutExtension}_${assetId}_${timestamp}.${fileExtension}`;

    // const filePath = `/home/star/eventsExcel/${req.file.originalname}`;
    const filePath = `/home/star/eventsExcel/${generatedFileName}`;
    fs.writeFileSync(filePath, req.file.buffer);

    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    if (!validateXLSXContent(sheet)) {
      return res.status(400).json({ error: 'Invalid XLSX file format.' });
    }

    const data = XLSX.utils.sheet_to_json(sheet);
    console.log(`Excel data:- ${data}`);

    await db.deleteAssetEvents(assetId)
    for (const row of data) {
      console.log('Row:', row);
      const { etype, ename, asset, eid } = row;
      await db.insertEventData(etype, ename, asset, eid);
    }
  } catch (error) {
    console.error('Error reading Excel file:', error);
    return res.status(500).send('Error reading Excel file.');
  }

  res.status(200).send('File uploaded successfully.');
});



//Providing file download option 

app.get('/asset/events/download/:assetId', async(req, res) => {
	// console.log('This api is called');
  try {
    const assetId = req.params.assetId;

    // Get the list of files in the eventsExcel directory
    const files = fs.readdirSync('/home/star/eventsExcel/');

    // Search for the file that contains the assetId
    const matchingFile = files.find((file) => file.includes(`_${assetId}_`));
    console.log('file matched',matchingFile);
    if (!matchingFile) {
      return res.status(404).send('File not found.');
    }

    const filePath = path.join('/home/star/eventsExcel/', matchingFile);

    // Set the appropriate headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${matchingFile}"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    // Create a readable stream from the file and pipe it to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).send('Error downloading file.');
  }
});



app.use('/docs',express.static('docs'))

app.use('/swagger/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//app.use(cors({ methods: ['GET']}));


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


app.post('/getEventList', db.getEventListFilter)

app.get('/summaryCount', db.getSummaryCountData)

app.get('/graph/dropdown', db.graphDropdown)

app.get('/getLatestAssetData', db.getLatestFlightAndData)


app.post('/getLatestFlightsForAssetDateOrLimit' , db.getFlightsForAssetBasedOnChoice)


app.get('/getFlightGraphData/:flightid' , db.getFlightGraphData)

app.get('/getEventForLatestFlight/:flightid' , db.getEventForLatestFlight);

app.get('/getLocation/:address',db.getGeoLocation);

app.get("/eventNotification/dropdown" , db.getEventNotificationDropdown);





//Report API


//Get Report
app.get( '/getReport/:rType/:fid', db.getReport );

//To handle pdf report name based on request in parameters 

app.get('/getReport/:rType/:fid/:rName/pdf', async (req, res) => {
  const { rType, fid , rName } = req.params;
  // const reportUrl = `http://18.188.115.98:3379/getReport/${rType}/${fid}`;
  const reportUrl = `https://star-ads-app.com:3378/getReport/${rType}/${fid}`;

	const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
                const response = await axios.get(reportUrl , { httpsAgent });
	//const response = await axios.get(reportUrl);
	
  const reportData = response.data;
  const pdfBuffer = await db.getAllPDFReport(reportData ,rName);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${rName}-${fid}.pdf`);
  res.send(pdfBuffer);
});


// Existing route for retrieving events data
app.post('/asset/events', async (req, res) => {
  const assetId = req.body.assetIds;
  
  try {
    const eventData = await db.eventsBasedOnSelectedAsset(assetId);
    // Send the retrieved eventData as JSON
    res.json(eventData);
  } catch (error) {
    console.error('Error retrieving events data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// New route for downloading events as an Excel sheet
app.get('/download-events', async (req, res) => {
  try {
    const assetIds = req.query.assetId; 

    if (!assetIds) {
      return res.status(400).json({ error: 'Missing assetId parameter.' });
    }

    const eventData = await db.eventsBasedOnSelectedAsset(assetIds); 

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(eventData)


    XLSX.utils.book_append_sheet(workbook, worksheet, 'Events');

const range = XLSX.utils.decode_range(worksheet['!ref']);
const colWidths = [];

for (let C = range.s.c; C <= range.e.c; ++C) {
  let maxColWidth = 0;

  for (let R = range.s.r; R <= range.e.r; ++R) {
    const cell = worksheet[XLSX.utils.encode_cell({ r: R, c: C })];
    if (cell && cell.v) {
      const cellText = cell.v.toString();
      const cellWidth = cellText.length;
      if (cellWidth > maxColWidth) {
        maxColWidth = cellWidth;
      }
    }
  }

  colWidths.push(maxColWidth + 2); // Add some padding
}

worksheet['!cols'] = colWidths.map((width) => ({ wch: width }));


   
    const filePath = '/home/star/api/tmpExcel/events.xlsx';

    // Write the workbook to a file
    XLSX.writeFile(workbook, filePath);

    // Send the file as a downloadable attachment
    res.download(filePath, 'events.xlsx', (err) => {
      // Delete the temporary file after sending it
      fs.unlinkSync(filePath);

      if (err) {
        console.error('Error sending Excel file:', err);
        return res.status(500).send('Error sending Excel file.');
      }
    });
  } catch (error) {
    console.error('Error generating Excel file:', error);
    return res.status(500).send('Error generating Excel file.');
  }
});




app.post('/update-events', async (req, res) => {
  try {
    const { assetId, selectedEvents } = req.body;

    if (!assetId || !Array.isArray(selectedEvents) || selectedEvents.length === 0) {
      return res.status(400).json({ error: 'Invalid request data.' });
    }

    // Update the asset events based on the selected event ids
    await db.updateAssetEvents(assetId, selectedEvents);

    return res.status(200).json({ message: 'Database updated successfully.' });
  } catch (error) {
    console.error('Error updating database:', error);
    return res.status(500).json({ error: 'Failed to update the database.' });
  }
});




//Selected customer logo 

const customers = [
  { id: 1, name: 'DEMO', logo: 'demo.jpeg', PostLogoText:'This is testing customer for star-nav' },
  { id: 2, name: 'Welcome to the Al Atheer Star ADS Tracking Page', logo: 'aat.png', PostLogoText:'Access to this site is restricted. Sharing or distribution of login accounts to entities or individuals is strictly prohibited.For assistance please contact Star Navigation' },
];

// Set up a static route to serve logo images
app.use('/logos', express.static('/home/star/logos'));

app.get('/logo/customers/:id', (req, res) => {
  const customerId = parseInt(req.params.id);
  const customer = customers.find((c) => c.id === customerId);

  if (customer) {
    // Send both image file and customer name as JSON
    res.json({
      name: customer.name,
      logoUrl: `/logos/${customer.logo}`,
      PostLogoText:customer.PostLogoText,
    });
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});


//Handling logo upload 



// Multer for logo upload for customers
const logoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/home/star/logos/');
  },
  filename: function (req, file, cb) {
    // Use the original filename
    const fileName = `${req.query.name}_${file.originalname}`;
    cb(null, fileName);
  },
});

const logoUpload = multer({ storage: logoStorage });

// Logo upload endpoint
app.post('/customer/uploadLogo', logoUpload.single('logo'), (req, res) => {
  try {
    // Retrieve the file details
    const file = req.file;

    // Move the file to the desired location
    const destinationPath = `/home/star/logos/${file.filename}`;
    fs.renameSync(file.path, destinationPath);

    // Return the file URL
    const fileUrl = `/uploads/${file.filename}`;
    res.json({ success: true, fileUrl: fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

//Obtain logo from database 

app.get('/customer/getLogo/:customerId', db.getLogoFile);

app.get( '/report/OOOI/:fid', db.oooiReports );


app.get('/report/OOOI/:fid/:rName/pdf', async (req, res) => {
  const { rType, fid , rName } = req.params;
  // const reportUrl = `http://18.188.115.98:3379/getReport/${rType}/${fid}`;
  const reportUrl = `https://star-ads-app.com:3378/report/OOOI/${fid}`;

	const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
                const response = await axios.get(reportUrl , { httpsAgent });
	//const response = await axios.get(reportUrl);
	const reportName='OOOI';
  const reportData = response.data;
  const pdfBuffer = await db.getAllPDFReport(reportData ,reportName);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${rName}-${fid}.pdf`);
  res.send(pdfBuffer);
});



/**
 * @var server 
 * @description Contains the port at which nodejs API is running  
 */

/*
var server = app.listen({port: port, host: '0.0.0.0'}, function(){
    var host = server.address().address
    var port = server.address().port || 3344
    console.log("PostgresSQL API App Listening On Port at http://%s:%s", host, port)
})


*/

// Running over https 

var server = https.createServer(
  {
    key: fs.readFileSync('/home/ssl_cert/star-ads-app/new-private-key.txt', 'utf8'),
    cert: fs.readFileSync('/home/ssl_cert/star-ads-app/8254c3b042470198.crt'),
  },
  app
);

// Start the HTTPS server
server.listen(port, function () {
 // var host = server.address().address;
    var host = 'star-ads-app.com';
    var port = server.address().port || 3344;
  console.log("PostgresSQL API App Listening On Port at https://%s:%s", host, port);
});
