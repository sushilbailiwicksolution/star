var Pool = require('pg').Pool

const db_username = 'star'
const db_password = 'Admin@321'
const db_host     = '127.0.0.1'
const db_port     = 5432
const db_name     = 'stardb'


const pool = new Pool({
    user: db_username,
    host: db_host,
    database: db_name,
    password: db_password,
    port: db_port
})


//report_events_eofsr_em
const getReport = async ( req, res )=>{

    var EVENT_DETAILS          = 'event_details';
    var EVENT_PARAMS_DETAIL    = 'event_params_detail';
    var FLIGHT_DETAILS         = 'flight_details';
    var REPORT_P_DETAILS_TABLE = 'report_events_eofsr_em';
    var REPORT_ENGI_COND_MONI_DETAILS_TABLE = 'report_events_eofsr_engi_cond_moni';
    var REPORT_FINA_ADMI_DETAILS_TABLE = 'report_events_eofsr_fina_admi';
	var REPORT_FLIG_OPER_DETAILS_TABLE = 'report_events_eofsr_flig_oper';
	var REPORT_FLIG_SAFE_DETAILS_TABLE = 'report_events_eofsr_flig_safe';
	var REPORT_MOQA_DETAILS_TABLE = 'report_events_eofsr_moqa';
	var REPORT_FOQA_DETAILS_TABLE = 'report_events_eofsr_foqa';
    var report_conf_table      = '';

    var packetType = '';
    var flightId   = '';
    var reportType = '';

    var report_object = '';
    

    if( req.params.rType && req.params.rType != 'undefined' ){
       reportType = req.params.rType;
       reportType = reportType.toUpperCase();
    }

    if( req.params.fid && req.params.fid != 'undefined' ){
       flightId = req.params.fid;
       flightId = flightId.toUpperCase();
    }

    if( reportType == 'EOFSR_EM' ){
       packetType = 'P';
       report_conf_table = REPORT_P_DETAILS_TABLE;
       report_object = { label: '', eventid: '', param_id: '', param_value: '', unit: ''};
    }

    if( reportType == 'EOFSR_ENGI_COND_MONI' ){
       packetType = 'P';
       report_conf_table = REPORT_ENGI_COND_MONI_DETAILS_TABLE;
       report_object = { label: '', eventid: '', param_id: '', param_value: '', unit: ''};
    }
    if( reportType == 'EOFSR_FINA_ADMI' ){
       packetType = 'P';
       report_conf_table = REPORT_FINA_ADMI_DETAILS_TABLE;
       report_object = { label: '', eventid: '', param_id: '', param_value: '', unit: ''};
    }
    if( reportType == 'EOFSR_FLIG_OPER' ){
       packetType = 'P';
       report_conf_table = REPORT_FLIG_OPER_DETAILS_TABLE;
       report_object = { label: '', eventid: '', param_id: '', param_value: '', unit: ''};
    }
    if( reportType == 'EOFSR_FLIG_SAFE' ){
       packetType = 'P';
       report_conf_table = REPORT_FLIG_SAFE_DETAILS_TABLE;
       report_object = { label: '', eventid: '', param_id: '', param_value: '', unit: ''};
    }
    if( reportType == 'EOFSR_MOQA' ){
       packetType = 'P';
       report_conf_table = REPORT_MOQA_DETAILS_TABLE;
       report_object = { label: '', eventid: '', param_id: '', param_value: '', unit: ''};
    }
	if( reportType == 'EOFSR_FOQA' ){
       packetType = 'P';
       report_conf_table = REPORT_FOQA_DETAILS_TABLE;
       report_object = { label: '', eventid: '', param_id: '', param_value: '', unit: ''};
    }	
    //1. get start_event_time, stop_event_time, asset_id from flight_details table based on input flight_id
    //2. get event_id, event_name, report_label, param_id, unit_label from report_events_eofsr_em where
      // event_status = 'a' and order by priority
    //3. get id, eventid, aircraftid as asset_id, packet_type, aircraftid as flight_id, a.data_insert_date_time from event_details and flight_details as b where
      // b.aircraftidis equals to input flight_id
      // eventid IN event_id received from point 2
      // and a.start_time >= b.start_event_time
      // and a.stop_time <= b.stop_event_time
      // and a.packet_type='P'; 
    //4. get param_id and param_value from event_params_detail where 
      // packet_type='P'
      // and id is equals to the id from point 3
      // and param_id is equals to param_id received from point 3
    //5. Prepare output with
      // report_label (received from report_events_eofsr_em)
      // (event_id, param_id) received from report_events_eofsr_em
      // unit_label received from report_events_eofsr_em
      // param_value received from point 4

    var report_conf_data_query      = "select event_id, event_name, report_label, param_id, unit_label, priority, section, block_priority from "+report_conf_table+" where event_status='a' order by block_priority, priority";
    var flight_and_event_data_query = '';
    var param_value_query           = '';

    console.log("["+Date(Date.now()).toString()+"] Report Configuration Query [%s]", report_conf_data_query);

    const client = await pool.connect()

    try{
        var eventId            = '';
        var event_name         = '';
        var report_label       = '';
        var param_id           = '';
        var unit_label         = '';
        var messageId          = '';
	var param_section      = '';
        var param_value        = '';
	var block_priority     = '';
	var old_block_priority = '';
	var priority           = '';
	
	var report_data_first_str = '';
	var report_data_third_str = '';

        report_data_first  = [];
        report_data_second = [];
        report_data_second_2 = [];
        report_data_second_moqa_1 = [];
        report_data_second_moqa_2 = [];
        report_data_second_moqa_3 = [];
        report_data_second_moqa_4 = [];
        report_data_second_moqa_5 = [];
        report_data_second_moqa_6 = [];
        report_data_second_moqa_7 = [];
        report_data_second_moqa_8 = [];
        report_data_second_combined = [];
        report_data_third  = [];

        const results = await client.query(report_conf_data_query)
        if( results.rowCount > 0 ){
             const data = results.rows;
             for( var i = 0; i < data.length; i++ ){
                eventId        = data[i].event_id;
                event_name     = data[i].event_name;
                report_label   = data[i].report_label;
                param_id       = data[i].param_id;
                block_priority = data[i].block_priority;
                priority       = data[i].priority;
		param_section  = data[i].section;
                unit_label     = data[i].unit_label;

                if( eventId != 0 || eventId != '0' ){

                   //flight_and_event_data_query = "select a.id as mid, a.eventid, a.aircraftid as asset_id, a.packet_type, b.aircraftid as flight_id, a.data_insert_date_time from "+EVENT_DETAILS+" as a, "+FLIGHT_DETAILS+" as b where b.aircraftid='"+flightId+"' and a.eventid = '"+eventId+"' and a.data_insert_date_time >= b.start_event_time and a.data_insert_date_time <= b.stop_event_time and a.packet_type='"+packetType+"'";
                   flight_and_event_data_query = "select a.id as mid, a.eventid, a.aircraftid as asset_id, a.packet_type, b.aircraftid as flight_id, a.data_insert_date_time, a.start_time from "+EVENT_DETAILS+" as a, "+FLIGHT_DETAILS+" as b where b.aircraftid='"+flightId+"' and a.eventid = '"+eventId+"' and a.data_insert_date_time >= b.start_event_time and a.data_insert_date_time <= to_char((to_timestamp(b.stop_event_time,'YYYY-MM-DD HH24:MI:SS' )+ INTERVAL '1 hours'),'YYYY-MM-DD HH24:MI:SS') and a.packet_type='"+packetType+"'";
                   //flight_and_event_data_query = "select a.id as mid, a.eventid, a.aircraftid as asset_id, a.packet_type, b.aircraftid as flight_id, a.data_insert_date_time, a.start_time from "+EVENT_DETAILS+" as a, "+FLIGHT_DETAILS+" as b where b.aircraftid='"+flightId+"' and a.eventid = '"+eventId+"' and a.data_insert_date_time >= b.start_event_time and a.data_insert_date_time <= b.stop_event_time and a.packet_type='"+packetType+"'";
                   console.log("["+Date(Date.now()).toString()+"] Query To Get Flight Data [%s]", flight_and_event_data_query);
                   const flight_result = await client.query(flight_and_event_data_query);
                   if( flight_result.rowCount > 0 ){
                      const flight_data = flight_result.rows;
                      for( var j = 0; j < flight_data.length; j++ ){
                         messageId = flight_data[j].mid;
			 if( param_id == 'DIRECT' ){
                            param_value = flight_data[j].start_time;
                         }else{
                           param_value_query = "select param_id, param_value from "+EVENT_PARAMS_DETAIL+" where packet_type='"+packetType+"' and id = "+messageId+" and param_id = '"+param_id+"'";
                           console.log("["+Date(Date.now()).toString()+"] Query To Get Param Values [%s]", param_value_query);
                           const param_value_data = await client.query(param_value_query);
                           if( param_value_data.rowCount > 0 ){
                               const param_data = param_value_data.rows;
                               param_value = param_data[0].param_value;
                           }else{
                               param_value = '';
                           }
			 }
                      }
                   }else{
                      param_value = '';
                   }
                   //console.log("["+Date(Date.now()).toString()+"] resp %s | (%s, %s) | %s | %s", report_label, eventId, param_id, param_value, unit_label );
                }else{
                   eventId     = 'N';
                   param_id    = '-A';
                   param_value = '';
                   //console.log("["+Date(Date.now()).toString()+"] resp %s | (%s%s) | %s | %s", report_label, eventId, param_id, param_value, unit_label );
                }
		     console.log("["+Date(Date.now()).toString()+"] Section Value second_moqa_1 "+param_section);
		if ( param_section == 'first' ){
                    //report_data_first.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: param_value, unit: unit_label, priority: priority } );
                    //report_data_first.push( { [report_label]: param_value } );
                    report_data_first_str = report_data_first_str + ",\"" + report_label + "\":\"" + param_value + "\"";
                }else if( param_section == 'second' ){
                    report_data_second.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: param_value, unit: unit_label, priority: priority } );
                }else if( param_section == 'second_2' ){
                    report_data_second_2.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: param_value, unit: unit_label, priority: priority } );
                }else if( param_section == 'second_moqa_1' ){
			console.log("["+Date(Date.now()).toString()+"] Param Value second_moqa_1 <"+param_value.toString().length+">");
			if(param_value.toString().length == 0 ){
                    		report_data_second_moqa_1.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'No', unit: 'N/A', priority: priority } );
			}
                        else {
				report_data_second_moqa_1.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'Yes', unit: param_value, priority: priority } );
			}
                }else if( param_section == 'second_moqa_2' ){
                        console.log("["+Date(Date.now()).toString()+"] Param Value second_moqa_2 <"+param_value.toString().length+">");
                        if(param_value.toString().length == 0 ){
                                report_data_second_moqa_2.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'No', unit: 'N/A', priority: priority } );
			}else {
				report_data_second_moqa_2.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'Yes', unit: param_value, priority: priority } );
			}
                        }else if( param_section == 'second_moqa_3' ){
                        console.log("["+Date(Date.now()).toString()+"] Param Value second_moqa_3 <"+param_value.toString().length+">");
                        if(param_value.toString().length == 0 ){
                                report_data_second_moqa_3.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'No', unit: 'N/A', priority: priority } );
                        }else {
                                report_data_second_moqa_3.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'Yes', unit: param_value, priority: priority } );
                        }
                        }else if( param_section == 'second_moqa_4' ){
                        console.log("["+Date(Date.now()).toString()+"] Param Value second_moqa_4 <"+param_value.toString().length+">");
                        if(param_value.toString().length == 0 ){
                                report_data_second_moqa_4.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'No', unit: 'N/A', priority: priority } );
                        }else {
                                report_data_second_moqa_4.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'Yes', unit: param_value, priority: priority } );
                        }
                        }else if( param_section == 'second_moqa_5' ){
                        console.log("["+Date(Date.now()).toString()+"] Param Value second_moqa_5 <"+param_value.toString().length+">");
                        if(param_value.toString().length == 0 ){
                                report_data_second_moqa_5.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'No', unit: 'N/A', priority: priority } );
                        }else {
                                report_data_second_moqa_5.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'Yes', unit: param_value, priority: priority } );
                        }
                        }else if( param_section == 'second_moqa_6' ){
                        console.log("["+Date(Date.now()).toString()+"] Param Value second_moqa_5 <"+param_value.toString().length+">");
                        if(param_value.toString().length == 0 ){
                                report_data_second_moqa_6.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'No', unit: 'N/A', priority: priority } );
                        }else {
                                report_data_second_moqa_6.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'Yes', unit: param_value, priority: priority } );
                        }
			}else if( param_section == 'second_moqa_7' ){
                        console.log("["+Date(Date.now()).toString()+"] Param Value second_moqa_5 <"+param_value.toString().length+">");
                        if(param_value.toString().length == 0 ){
                                report_data_second_moqa_7.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'No', unit: 'N/A', priority: priority } );
                        }else {
                                report_data_second_moqa_7.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'Yes', unit: param_value, priority: priority } );
                        }
                        }else if( param_section == 'second_moqa_8' ){
                        console.log("["+Date(Date.now()).toString()+"] Param Value second_moqa_5 <"+param_value.toString().length+">");
                        if(param_value.toString().length == 0 ){
                                report_data_second_moqa_8.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'No', unit: 'N/A', priority: priority } );
                        }else {
                                report_data_second_moqa_8.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: 'Yes', unit: param_value, priority: priority } );
                        }
                        }else if( param_section == 'third' ){
                    //report_data_third.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: param_value, unit: unit_label, priority:priority } );
	            if( block_priority != old_block_priority ){
                       report_data_third_str = report_data_third_str + "},{\"startFlight\":\""+event_name+"\",\"" + report_label + "\":\"" + param_value + "\"";
                    }else{
                       report_data_third_str = report_data_third_str + ",\"" + report_label + "\":\"" + param_value + "\"";
                    }
                    old_block_priority = block_priority;
                }
                //report_data.push( { section: param_section, label: report_label, eventid: eventId, param_id: param_id, param_value: param_value, unit: unit_label} );
             }
             report_data_first_str = "{"+(report_data_first_str.substring(1, report_data_first_str.length))+"}";
		console.log(" -- Test1 --");
             console.log(" -- Test1 --["+Date(Date.now()).toString()+"] " + report_data_first_str);
             report_data_first_str = JSON.parse(report_data_first_str);
		console.log(" -- Test2 --");
             report_data_third_str = "[{"+(report_data_third_str.substring(3, report_data_third_str.length))+"}]";
             console.log(" -- Test3 --["+Date(Date.now()).toString()+"] " + report_data_third_str);
             report_data_third_str = JSON.parse(report_data_third_str);
             //report_data_first.push(report_data_first_str);
             //console.log("["+Date(Date.now()).toString()+"] JSON is "+JSON.stringify(report_data));
             //res.status(200).json({"status":"200", "report_data_s1":report_data_first, "report_data_s2":report_data_second, "report_data_s3": report_data_third});
		if ( reportType == 'EOFSR_EM' ){

             res.status(200).json({"status":"200", "report_data_s1":report_data_first_str, "report_data_s2":report_data_second, "report_data_s3": report_data_third_str});
             return;
		} else if( reportType == 'EOFSR_ENGI_COND_MONI' ){
			let i = 0;
			console.log(" -- EOFSR_ENGI_COND_MONI --");
		     //report_data_second_2.push( { label: report_label, eventid: eventId, param_id: param_id, param_value: param_value, unit: unit_label, priority: priority }
			while (i < report_data_second.length) {
				console.log(" -- EOFSR_ENGI_COND_MONI --"+i+report_data_second[i].label);
 				 report_data_second_combined.push({ecmParams:report_data_second[i].label,actualValue_takeoff:report_data_second[i].param_value,actualValue_Cruise:report_data_second_2[i].param_value,unit:report_data_second[i].unit,priority:report_data_second[i].priority});
  				i++;
			}
			console.log(" -- report_data_second_combined_str --["+Date(Date.now()).toString()+"] "  );
		//	report_data_second_combined_str = JSON.parse(report_data_second_combined);
			console.log(" -- Test3 --["+Date(Date.now()).toString()+"] "  );
			//res.status(200).json({"status":"200", "report_data_s1":report_data_first_str, "report_data_s2_1":report_data_second, "report_data_s2_2": report_data_second_2});
			res.status(200).json({"status":"200", "report_data_s1":report_data_first_str, "report_data_s2":report_data_second_combined});
			return;
		}else if ( reportType == 'EOFSR_FINA_ADMI' ){

             res.status(200).json({"status":"200", "report_data_s1":report_data_first_str, "report_data_s2":report_data_second});
             return;
                }else if ( reportType == 'EOFSR_FLIG_OPER' ){

             res.status(200).json({"status":"200", "report_data_s1":report_data_first_str, "report_data_s2":report_data_second});
             return;
                }else if ( reportType == 'EOFSR_FLIG_SAFE' ){

             res.status(200).json({"status":"200", "report_data_s1":report_data_first_str, "report_data_s2":report_data_second, "report_data_s3": report_data_third_str});
             return;
                }else if ( reportType == 'EOFSR_MOQA' ){

             res.status(200).json({"status":"200", "report_data_s1":report_data_first_str, "report_data_s2_moqa_1":report_data_second_moqa_1,"report_data_s2_moqa_2":report_data_second_moqa_2,"report_data_s2_moqa_3":report_data_second_moqa_3,"report_data_s2_moqa_4":report_data_second_moqa_4,"report_data_s2_moqa_5":report_data_second_moqa_5,"report_data_s2_moqa_6":report_data_second_moqa_6,"report_data_s2_moqa_7":report_data_second_moqa_7,"report_data_s2_moqa_8":report_data_second_moqa_8});
             return;
                }else if ( reportType == 'EOFSR_FOQA' ){
//In Thius first section is not there. So 2nd is mapped to 1, 3rd is mapped to 2 so on
             res.status(200).json({"status":"200", "report_data_s1":report_data_first_str, "report_data_s2_moqa_1":report_data_second_moqa_2,"report_data_s2_moqa_2":report_data_second_moqa_3,"report_data_s2_moqa_3":report_data_second_moqa_4,"report_data_s2_moqa_4":report_data_second_moqa_5,"report_data_s2_moqa_5":report_data_second_moqa_6,"report_data_s2_moqa_6":report_data_second_moqa_7,"report_data_s2_moqa_7":report_data_second_moqa_8});
             return;
                }else {
			console.log(" -- Report Not Defined -- ");
		}

        }else{
           res.status(200).json({"status":"404", "message":"Report not configured for report type "+reportType})
           return;
        }
    }catch( error ) {
      console.log("["+Date(Date.now()).toString()+"] Error: "+error.code)
      console.log("["+Date(Date.now()).toString()+"] Error: "+error)
      res.status(200).json({"status":"404", "message":"Unable to get report data for report type "+reportType})
    }finally{
      client.release()
    }
}


module.exports = {
    getReport
}
