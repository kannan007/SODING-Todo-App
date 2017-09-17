(function(){
	'use strict';
	//Angular Module Initialization
	var app=angular.module('TodoApp',[])
	//Controller Initialization
	.controller('MainController',['$scope','$http',function($scope,$http) {
		$scope.TaskName="";
		$scope.TaskDescription="";
		$scope.CurrentDateAndTime;
		$scope.TaskListItems=[];
		$scope.GetId=function() {
			if (typeof(Storage) !== "undefined") {
			    $scope.TaskId=localStorage.getItem("ID");
			    if(!$scope.TaskId) {
			    	$scope.TaskId=1;
			    }
			}
			else {
			    alert("Local Storage is not supporting please update your browser");
			}
		};
		$scope.GetId();
		$scope.AddTask = function() {
	  		$http({
		        url: "http://localhost:3000/getlists",
		        method: "POST",
		        data: {"name": $scope.TaskName, "description":$scope.TaskDescription, "id": $scope.TaskId }
		    })
		    .then(function(response) {
		    	$scope.CurrentDateAndTime=new Date();
		    	$scope.TaskListItems.push({"name": $scope.TaskName, "description":$scope.TaskDescription, "id": $scope.TaskId, "createdAt": $scope.CurrentDateAndTime, "updatedAt": $scope.CurrentDateAndTime});
		    	$scope.TaskName="";
				$scope.TaskDescription="";
				$scope.TaskForm.$setPristine();
		    	$scope.TaskId=parseInt($scope.TaskId);
		    	$scope.TaskId+=1;
		    	localStorage.setItem("ID",$scope.TaskId);
		    },
		    function(response) { // optional
		    	alert("Error while Adding " + response.status);
		    });
		};
		$scope.GetTasks=function() {
			$http.get(" http://localhost:3000/getlists").then(function(response) {
				$scope.TaskListItems=response.data;
			},function(response) {
	        	//Second function handles error
	        	//$scope.TaskListItems = "Something went wrong";
	        	alert("Error "+ response.status);
	    	});
		};
		$scope.GetTasks();
		$scope.EditTask=function(event,index) {
			$(event.target).closest("tr").toggleClass('editing');
		};
		$scope.UpdateTask=function(event,index,data) {
			$(event.target).closest("tr").removeClass('editing');
			$http({
		        url: "http://localhost:3000/getlists/"+event.target.id,
		        method: "PUT",
		        data: {"name": data.name, "description": data.description}
		    })
		    .then(function(response) {
		    	$scope.TaskListItems[index].name=data.name;
		    	$scope.TaskListItems[index].description=data.description;
		    	$scope.CurrentDateAndTime=new Date();
		    	$scope.TaskListItems[index].updatedAt=$scope.CurrentDateAndTime;
		    	//$scope.GetTasks();
		    },
		    function(response) { // optional
		    	alert("Error while Udating the task " + response.status);
		    });
		};
		$scope.CancelEdit=function() {
			$(event.target).closest("tr").removeClass('editing');
		}
		$scope.DeleteTask=function(event,index) {
			$http({
		        url: "http://localhost:3000/getlists/"+event.target.id,
		        method: "DELETE"
		    })
		    .then(function(response) {
		    	$scope.TaskListItems.splice(index, 1);
		    },
		    function(response) { // optional
		    	alert("Error while Deleting the task " + response.status);
		    });
		};
	}])
})();