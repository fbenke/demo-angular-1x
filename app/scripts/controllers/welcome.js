'use strict';
 
angular.module('myWorkout.welcome', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'views/welcome.html',
        controller: 'WelcomeCtrl'
    });
}])


.controller('WelcomeCtrl', [function() {
	
}]); 