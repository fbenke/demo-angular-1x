'use strict';
 
angular.module('myWorkout.error', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/error', {
        templateUrl: 'views/error.html',
        controller: 'ErrorCtrl'
    });
}])


.controller('ErrorCtrl', [function() {
	
}]); 