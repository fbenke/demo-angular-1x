'use strict';
 
angular.module('myWorkout.home', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
    });
}])


.controller('HomeCtrl', ['auth', '$location', function(auth, $location) {

  if(auth.isLoggedIn()){
    $location.path('/workout');
  }
    
}]); 