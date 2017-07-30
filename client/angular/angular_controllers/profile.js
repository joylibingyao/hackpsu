// Profile controller
appointments.controller('ProfileController', function($rootScope,$rootScope,$scope, $http, $routeParams, $location, ProfileFactory){
	$scope.allClasses=[]
	// $rootScope.currentUser={
	// 	"email":"123@123.com",
	// 	"username":"123",
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
	$scope.logout = function(){
		$location.path('/');
		$rootScope.currentUser = "";
	}
	$scope.create_class= function(){
		ProfileFactory.create_class($scope.nclass,function(cname){
			console.log("yeah ",cname);
			$rootScope.currentClass = cname;
			$location.path('/classPage/'+cname);

		});
	}
	$scope.upload_link = function(){
		var classinfo = {
			cname:$rootScope.currentClass
		}
		ProfileFactory.get_class_by_name(classinfo,function(data){
			$rootScope.currentClass = data;
			console.log("got name currentClass : ",$rootScope.currentClass);
			$scope.link.username= $rootScope.currentUser.displayName;
			$scope.link._user= $rootScope.currentUser.uid;
			$scope.link.cname=$rootScope.currentClass.cname;
			$scope.link._class=$rootScope.currentClass.id;
			ProfileFactory.upload_link($scope.link,function(data){
				console.log("link added");
			})
		})
		// console.log("currentclass iunfo ",$rootScope.currentClass);	
	}
	// $scope.get_class_detail = function(tclass){
	// 	console.log('tclass ',tclass);
	// 	$location.path('/classPage/'+tclass._id);
	// 	ProfileFactory.get_all_links_by_class(tclass._id,function(data){
	// 		$rootScope.currentClass = data;
	// 		console.log("currentClass : ",$rootScope.currentClass);
	// 	})
	// }
});




