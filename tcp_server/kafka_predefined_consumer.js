const db = require('./db')

module.exports = function(){

  // import the `Kafka` instance from the kafkajs library
  const { Kafka } = require("kafkajs")

  // the client ID lets kafka know who's producing the messages
  const clientId = "star-app"

  // we can define the list of brokers in the cluster
  const brokers = ["127.0.0.1:9092"]

  // this is the topic to which we want to write messages
  const TOPIC_HB = "star_msgs_hb"
  const TOPIC_TWP = "star_msgs_twp"
  const TOPIC_PRE_AP = "star_msgs_predefined_alerts"
  const TOPIC_ALARM_AP = "star_msgs_alarm_alerts"

  // initialize a new kafka client and initialize a producer from it
  const kafka = new Kafka({ clientId, brokers })

  const consumerVar = kafka.consumer({ groupId: 'predefined-group' })

  // we define an async function that writes a new message each second
  /*this.consumer = async ( received_data ) => {
        console.log("RECEIVED DATA", received_data)

	await consumer.connect()
	await consumer.subscribe({ topic: TOPIC_PRE_AP, fromBeginning: false })
	let i = 0

	await consumer.run({
		eachMessage: async({topic, partition, message}) => {
			//console.log({partition, offset: message.offset, value: message.value.toString()})
			saveData( message.value.toString() );
		}
	});

  };*/

  this.consumer = async() => {
     await consumerVar.connect()
     console.log("Connected......")
     await consumerVar.subscribe({ topic: TOPIC_PRE_AP, fromBeginning: false })
     await consumerVar.run({
       eachMessage: async({topic, partition, message}) => {
            console.log('Received message',{topic, partition, offset: message.offset, value: message.value.toString()})
            saveData( message.value.toString() );
       }
     });
  };

  /*run().catch(e => console.error(`[star_msgs_predefined_alerts] ${e.message}`, e))

  const errorTypes = ['unhandledRejection', 'uncaughtException']
  const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

  errorTypes.map(type => {
     process.on(type, async e => {
       try {
          console.log(`process.on ${type}`)
          console.error(e)
          await consumer.disconnect()
       }catch (_) {
       }
     })
  })

  signalTraps.map(type => {
     process.once(type, async () => {
         try {
            await consumer.disconnect()
         } finally {
           process.kill(process.pid, type)
         }
     })
  })*/


}

function saveData( message ){
   if ( message != null && message != 'undefined' ){
      console.log(message);

      db.saveDataToPSql( message );
      //db.checkAndSaveGeoDataToPSql( message );
   }
}
