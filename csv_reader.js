


function read_csv(csv, callback) {
	console.log("inpar:")
	console.log(String(csv));
    const fs = require('fs');
	var csv = require("fast-csv");
	var stream = fs.createReadStream("my.csv");
	output_array = [];
	keys = []
	headers = true;
	var csvStream = csv()
	    .on("data", function(data){
	        row = String(data).split(",");
	        entry = {};
	        console.log("---------")
	        for (var i = 0; i < row.length; i++) {
	        	if (headers){
	        		keys.push(row[i])
	        	}else{
	        		entry[keys[i]] = row[i]	
	        	}
	        };
	        
	        if (!headers){
	        	output_array.push(entry);	
	        }
	        headers = false;
	    })
	    .on("end", function(){
	        console.log("done");
	        callback(output_array)
	    });
	stream.pipe(csvStream);
}


// //or

// var csvStream = csv
//     .parse()
//     .on("data", function(data){
//          console.log(data);
//     })
//     .on("end", function(){
//          console.log("done");
//     });

// stream.pipe(csvStream);

function read_csv_array(csv, callback) {
	console.log("inpar:")
	console.log(String(csv));
    const fs = require('fs');
	var csv = require("fast-csv");
	var stream = fs.createReadStream("my.csv");
	output_array = [];
	keys = ["col1","col2"]
	var csvStream = csv()
	    .on("data", function(data){
	        row = String(data).split(";");
	        for (var i = 0; i < row.length; i++) {
	        	if(!output_array[i]){
	        		output_array[i] = [];
	        	}else{
	        		output_array[i].push(row[i])	
	        	}
	        };
	        //output_array.push(entry);
	    })
	    .on("end", function(){
	        entry = {};
	        for (var i = 0; i < output_array.length; i++) {
	        	entry[keys[i]] = output_array[i];
	        }
	        
	        console.log("done");
	        callback(entry)
	    });
	stream.pipe(csvStream);
}


module.exports = {
  read_csv: read_csv
};
