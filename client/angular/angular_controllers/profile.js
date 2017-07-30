// Profile controller
appointments.controller('ProfileController', function($rootScope,$scope, $http, $routeParams, $location, ProfileFactory){
	$scope.allClasses=[]
	// $rootScope.currentUser={
	// 	"email":"123@123.com",
	// 	"displayName":"123",
	// 	"uid":"zy3VESBnikhVxS0YsVCqy9y0gUr1"
	// }
	// $rootScope.currentClass = "CMPSC473"
	// if ($scope.allClasses.length ==0) {
	// 	ProfileFactory.get_all_classes(function(data){
	// 		$scope.allClasses = data;
	// 		// console.log("all class ",$scope.allClasses);
	// 	});
	// }
	$scope.register = function () {
		var userinfo =$scope.new_friend;
		// userinfo.card = $scope.card;
		console.log("exdate ",$scope.new_friend.exp_date);
		ProfileFactory.user_register(userinfo,function(data){
			$scope.all_users = allusers;
				$scope.new_friend = "";
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
});




