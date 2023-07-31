const { Parser, transforms: { unwind } } = require('json2csv');


//notifications, notifications.Landmark

json_parse = function( jsonMessage, fields, transform ){

        const transforms = [unwind({ paths: transform})]

        var json2csv = new Parser({ fields, transforms });
        //console.log("JSON PARSED", json2csv)
        const csv = json2csv.parse(jsonMessage)
        //console.log("notifications", csv)
        return csv
};



module.exports = {
    json_parse
}
