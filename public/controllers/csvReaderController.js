myApp.controller('csvUploadController', ['$scope', '$http','Upload', function($scope, $http, Upload) {
    console.log("Hello World from CSV controller");

	$scope.submit = function() {
		console.log("HEEEEEEEEEEJ")
      if ($scope.form.file.$valid && $scope.file) {
        $scope.upload($scope.file);
      }
    };
 
    // upload on file select or drop 
    $scope.upload = function (file) {
    	console.log("HEEEEEJ")
    	console.log(file)
        Upload.upload({
            url: 'upload',
            data: {file: file, 'username': $scope.username}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
   

$scope.read_csv = function(){
	console.log('getTrafik is running');
	reqData = {text:"data that is sent"}
	$http.get('/read_csv',{params: reqData}).success(function(response){
		//error handling
		if (response.success){
			console.log(response)
			// var tripList = response.data.tripList
			// console.log(response.data)
			// allSubTrips = []
			// $scope.Trips = tripList
			
			// for (var i in tripList){
			// 	for (var j in tripList[i].subTrips){
			// 		allSubTrips.push(tripList[i].subTrips[j])
			// 	}
			// }
			
			// $scope.subTrips = allSubTrips
			// $scope.positionVariables = response.data.variables

		}else{
			console.log(response)
		}
	});	
};




}])


