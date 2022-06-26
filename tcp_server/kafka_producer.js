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

  const producer = kafka.producer()

  // we define an async function that writes a new message each second
  this.produce = async ( received_data ) => {
        console.log("RECEIVED DATA", received_data)

	await producer.connect()
	let i = 0
        let topic = "star_msgs"

        if( received_data.indexOf("|") != -1 && received_data.split("|") != null ){

           if( received_data.split("|")[1] != null && received_data.split("|")[1].trim() === "H" ){
              topic = TOPIC_HB
              console.log("In H :",topic)
           }else if( received_data.split("|")[1] != null && received_data.split("|")[1].trim() === "T" ){
              topic = TOPIC_TWP
              console.log("In T :",topic)
           }else if( received_data.split("|")[1] != null && received_data.split("|")[1].trim() === "P" ){
              topic = TOPIC_PRE_AP
              console.log("In P :",topic)
           }else if( received_data.split("|")[1] != null && received_data.split("|")[1].trim() === "A" ){
              topic = TOPIC_ALARM_AP
              console.log("In A :",topic)
           }

           //console.log("Packet Type:["+received_data.split("|")[1].trim()+"] Topic to insert data into :", topic)

	    // after the produce has connected, we start an interval timer
	    //setInterval(async () => {
		try {
			// send a message to the configured topic with
			// the key and value formed from the current value of `i`
			await producer.send({
				topic,
				messages: [
					{
						key: String(i),
						value: received_data,
					},
				],
			})

			// if the message is written successfully, log it and increment `i`
			console.log("writes: ", i)
			i++
		} catch (err) {
			console.error("could not write message " + err)
		}
	    //}, 1000)
        }else{
           console.log("Data not received in proper format :", received_data )
        }
  };

}
