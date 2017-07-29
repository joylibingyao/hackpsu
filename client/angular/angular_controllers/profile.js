// Profile controller
appointments.controller('ProfileController', function($rootScope,$rootScope,$scope, $http, $routeParams, $location, ProfileFactory){
	$scope.allClasses=[]
	if ($scope.allClasses.length ==0) {
		ProfileFactory.get_all_classes(function(data){
			$scope.allClasses = data;
			// console.log("all class ",$scope.allClasses);
		});
	}
	$scope.register = function () {
		var userinfo =$scope.new_friend;
		// userinfo.card = $scope.card;
		console.log("exdate ",$scope.new_friend.exp_date);
		ProfileFactory.user_register(userinfo,function(data){
			$scope.all_users = allusers;
				$scope.new_friend = "";
				// $scope.card = "";
				$location.path('/home');
		});
	}
	$scope.login = function () {
		var userinfo =$scope.old_friend;
		ProfileFactory.login(userinfo,function(data){
			if (data) {
				$rootScope.currentUser = data;
				$location.path('/home');
			}
		});
		// ProfileFactory.get_user_by_name(userinfo.username,function(data){
		// 	if (data && data.password == userinfo.password) {
		// 		$rootScope.currentUser = data;
		// 		$location.path('/home');
		// 	}else{
		// 		$scope.loginM = "Invalid uername or password";
		// 	}
		// 	$scope.login_databack = data;
		// });
	}
	$scope.logout = function(){
		$location.path('/');
		$rootScope.currentUser = "";
	}
	$scope.create_class= function(){
		ProfileFactory.create_class($scope.nclass,function(data){
			console.log("yeah ",data);
			$rootScope.currentClass = data;
			$location.path('/classPage/'+data.cname);
		});
	}
	$scope.upload_link = function(){
		console.log("currentclass iunfo ",$rootScope.currentClass);
		$scope.link.user_name= $rootScope.currentUser.username;
		$scope.link._user= $rootScope.currentUser._id;
		$scope.link.class_name=$rootScope.currentClass.cname;
		$scope.link._class=$rootScope.currentClass._id;	

		ProfileFactory.upload_link($scope.link,function(data){
			console.log("link added");
		})
	}
	$scope.get_class_detail = function(tclass){
		console.log('tclass ',tclass);
		$location.path('/classPage/'+tclass._id);
		ProfileFactory.get_all_links_by_class(tclass._id,function(data){
			$rootScope.currentClass = data;
			console.log("currentClass : ",$rootScope.currentClass);
		})
	}
});




