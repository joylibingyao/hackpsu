// Home controller
//Scope: home.html
//       createClass.html


appointments.controller('HomeController', function( $window,$rootScope,$scope, $http, $routeParams, $location, ProfileFactory){
	//
	$window.Stripe.setPublishableKey('pk_test_PUgDq8XdrH18XX0RQV2dfnHR');

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
	$scope.stripeCallback = function (code, result) {
		console.log('in call back');
    if (result.error) {
        window.alert('it failed! error: ' + result.error.message);
    } else {
        window.alert('success! token: ' + result.id);
				var chargeInfo = {
					token:result
				}
				var token = result.id;
				$window.Stripe.charges.create({
	  			amount: 1,
	  			currency: "usd",
	  			description: "Example charge",
	  			source: token,
				}, function(err, charge) {
	  			// asynchronously called
					if (error) {
						console.log(err);
					}else{
						console.log(charge);
					}
				});
				ProfileFactory.charge(chargeInfo);
    }
};

});
