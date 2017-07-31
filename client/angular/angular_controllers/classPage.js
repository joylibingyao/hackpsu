appointments.controller('ClassPageController', function($rootScope,$scope, $http, $routeParams, $location, ProfileFactory){
	// console.log("$rootScope.currentClass  ",$rootScope.currentClass);
	ProfileFactory.get_class_by_name($rootScope.currentClass,function(data){
			$rootScope.currentClass = data;
			// console.log("got name currentClass : ",$rootScope.currentClass);
			ProfileFactory.get_all_links_by_class($rootScope.currentClass.id,function(links){
				$rootScope.currentClass.links = links;
				console.log("all links",links);
			});
		});
	$scope.upload_link = function(){
			$scope.link.username= $rootScope.currentUser.displayName;
			$scope.link._user= $rootScope.currentUser.uid;
			$scope.link.cname=$rootScope.currentClass.cname;
			$scope.link._class=$rootScope.currentClass.id;
			ProfileFactory.upload_link($scope.link,function(data){
				console.log("link added");
				ProfileFactory.get_all_links_by_class($rootScope.currentClass.id,function(links){
					$rootScope.currentClass.links = links;
					$scope.link="";
					console.log("all links",links);
				});
			});
	}
});
	