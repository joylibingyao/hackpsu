 var appointments = angular.module('appointments',['angularPayments','ngRoute']).filter("toArray", function() {
        return function(input) {
            if(!input) return;

            if (input instanceof Array) {
                return input;
            }

            return $.map(input, function(val) {
                return val;
            });
        };
    });;
appointments.config(function($routeProvider){

  // $window.Stripe.setPublishableKey('pk_test_PUgDq8XdrH18XX0RQV2dfnHR');

	$routeProvider
	.when('/',{ templateUrl: 'partials/header.html' })
	.when('/login',{ templateUrl: 'partials/login.html' })
	.when('/register',{ templateUrl: 'partials/register.html' })
	.when('/home',{ templateUrl: 'partials/home.html' })
	.when('/mypage',{ templateUrl: 'partials/mypage.html' })
	.when('/create_class',{ templateUrl: 'partials/createClass.html' })
	.when('/classPage/:id',{templateUrl:'partials/classPage.html'})
	.otherwise( { redirectTo: "/" });
});
