var express = require("express")
var app = express();
app.use(express.static(__dirname + "/public"))
var pg_caller = require("./postgres_caller");
var csv_reader = require("./csv_reader");
var path = require('path')

var kafka = require('kafka-node'),
     Producer = kafka.Producer,
     client = new kafka.Client('localhost:2181'),
     producer = new Producer(client);
     

app.post("/upload", function (req, res) {
    console.log(req.query)
})

app.get("/read_csv", function (req, res) {
    console.log("yay")
    console.log(req.query)
    handleResponseFromCsv = function(csv_result){
    	console.log("now we can print result")

    	console.log(csv_result)
    	//Send to kafka
    	payloads = [
    		{ topic: 'test', messages: JSON.stringify(csv_result), partition: 0 },
     	];
     	// producer.on('ready', function(){
	    producer.send(payloads, function(err, data){
	        console.log(data)
	    });
		// });
    }
    csv_reader.read_csv("my.csv", handleResponseFromCsv);

    
});


// app.get("/get_realtime_traffic", function (req, res) {
//     var pos = {
//         lon: '18.0349011',
//         lat: '59.3060295',
//         name: 'Argångsgatan'
//     }
//     var pos = {
//         lon: '18.0470606',
//         lat: '59.3300086',
//         name: 'kungsholmen'
//     }
//     var pos = {
//         lon: '18.106394', 
//         lat: '59.295279',
//         name: 'item'
//     }
//     var handleResponse = function(responseData){
//         console.log("inside trafiklab handle response");
//         //console.log(JSON.stringify(responseData))
//         var statusCode = responseData.StatusCode;
//         console.log("kod: " + statusCode)
        
//         if(parseInt(statusCode) > 1000 || parseInt(statusCode) < 1008 ){ //check if an ERRROR was returned by trafiklab
//             res.json({
//                 success: false,
//                 message: "somthing went wrong :/",
//                 data: responseData
//             });
//         }else{
//             res.json({
//                 success: true,
//                 message: "Got data =)",
//                 data: responseData
//             });
//         }
//     }   
//     trafiklab_dist_vars.calcDistVars(pos,handleResponse);
// });


// app.get("/get_apartments", function (req,res) {
//     var reqData = req.query;
//     var query = reqData.query;

// 	console.log("inne i get_apartments")
// 	var handleResponse = function(rows){
//         console.log("inside apartments handle response");
//         //console.log(rows)
//         //console.log(JSON.stringify(rows))


        
//         if(rows.db_success == false){ //check if an ERRROR was returned by trafiklab
//             console.log('server sad =(')
//             res.json({
//                 success: false,
//                 message: "somthing went wrong :/",
//                 data: rows.data
//             });
//         }else{ 
//             console.log('server happy =)')
//             //console.log(rows)
//             res.json({
//                 success: true,
//                 message: "Got data =)",
//                 data: rows.data
//             });
//         }
//     } 
//     pg_caller.runQuery(query, handleResponse)

	
// });
	

// app.get("/get_distance_central", function (req, res) {
//     var query = query = {
//         "siteId":1595,
//         "timeWindow":60
//     }
//     var handleResponse = function(responseData){
//         console.log("inside trafiklab handle response");
//         //console.log(JSON.stringify(responseData))
//         var statusCode = responseData.StatusCode;
        
//         if(statusCode != '0'){ //check if an ERRROR was returned by trafiklab
//             res.json({
//                 success: false,
//                 message: "somthing went wrong :/",
//                 data: responseData
//             });
//         }else{ 

//             res.json({
//                 success: true,
//                 message: "Got data =)",
//                 data: responseData
//             });
//         }
//     }   
//     trafiklab_caller.getTraficlab(query,handleResponse)
// });


// app.get('/busmap',function(req,res){
       
//      res.sendFile(path.join(__dirname+'/public/views/busmap.html'));

// });



app.listen(8080);

console.log("Apartments is running as port 8080")
