var net = require('net');
const fs = require('fs');
require('./util_internal')();
require('./kafka_producer')();


var server = net.createServer();    

var PORT = 9000;
var HOST = '0.0.0.0';
var FILE_PATH = '/home/star/nodejs/tcp_server/logs/';
var FILE_PREFIX = 'tcp_received_data_';

server.on('connection', handleConnection);

server.listen(PORT, HOST, function() {    
	console.log('server listening to %j', server.address());  
});

function handleConnection(conn) {
	var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;  
	console.log('new client connection from %s', remoteAddress);
	conn.on('data', onConnData);  
	conn.once('close', onConnClose);  
	conn.on('error', onConnError);

        let received_data = ""

	function onConnData(d) {  
		console.log('connection data from %s: %s', remoteAddress, d);
		var datetime = getCurrentDateTimeHour('_');
		var FILE_POSTFIX = datetime+'.txt';
		/*fs.writeFile(FILE_PATH+FILE_PREFIX+FILE_POSTFIX, d, { flag: 'a+' }, err => {
			if( err ){
				console.error(err)
				return
			}
		});*/

                received_data = d.toString();

                produce( received_data );
		conn.write(d);
                received_data = ""
	}

	function onConnClose() {  
		console.log('connection from %s closed', remoteAddress);  
	}

	function onConnError(err) {  
		console.log('Connection %s error: %s', remoteAddress, err.message);  
	}  
}
