// Home controller
//Scope: home.html
//       createClass.html


appointments.controller('HomeController', function($rootScope,$scope, $http, $routeParams, $location, ProfileFactory){
	// 

// 	$scope.allClasses = get_all_classes();
// 	console.log("all  ",$scope.allClasses);
	$scope.logout = function(){
		$location.path('/');
		$rootScope.currentUser = "";
	}
	$scope.create_class= function(){
		ProfileFactory.create_class($scope.nclass,function(cname){
			$rootScope.currentClass = cname;
			$location.path('/classPage/'+cname);
		});
	}
	ProfileFactory.get_all_classes(function(allClasses){
		$scope.allClasses = allClasses;
		// console.log("allClasses ",allClasses);
	});
	$scope.get_class_detail = function(tclass){
		console.log('tclass ',tclass);
		$location.path('/classPage/'+tclass.cname);
		$rootScope.currentClass = tclass.cname;
	}

});




