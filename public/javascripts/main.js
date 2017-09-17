(function(){
	'use strict';
	//Angular Module Initialization
	var app=angular.module('TodoApp',[])
	//Controller Initialization
	.controller('MainController',['$scope','$http',function($scope,$http) {
		$scope.TaskName="";
		$scope.TaskDescription="";
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
			let temp={"name": $scope.TaskName, "description":$scope.TaskDescription, "id": $scope.TaskId }
	  		$http({
		        url: "http://localhost:3000/getlists",
		        method: "POST",
		        data: temp
		    })
		    .then(function(response) {
		    	$scope.GetTasks();
		    	$scope.TaskId=parseInt($scope.TaskId);
		    	$scope.TaskId+=1;
		    	localStorage.setItem("ID",$scope.TaskId);
		    },
		    function(response) { // optional
		    	alert("Error while Adding");
		    });
		};
		$scope.GetTasks=function() {
			$http.get(" http://localhost:3000/getlists").then(function(response) {
			$scope.TaskListItems=response.data;
			},function(response) {
	        	//Second function handles error
	        	$scope.listitems = "Something went wrong";
	    	});
		};
		$scope.GetTasks();
		$scope.EditTask=function(event,index) {
			$(event.target).closest("tr").toggleClass('editing');
		};
		$scope.UpdateTask=function(event,data) {
			$(event.target).closest("tr").removeClass('editing');
			$http({
		        url: "http://localhost:3000/getlists/"+event.target.id,
		        method: "PUT",
		        data: {"name": data.name, "description": data.description}
		    })
		    .then(function(response) {
		    	$scope.GetTasks();
		    },
		    function(response) { // optional
		    	alert("Error while Adding");
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
		    	alert("Error while Deleting the task");
		    });
		};
	}])
})();