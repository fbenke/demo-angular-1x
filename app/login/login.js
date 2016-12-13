'use strict';
 
angular.module('myWorkout.login', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
      templateUrl: 'login/login.html',
      controller: 'LoginCtrl'
  });
}])


.controller('LoginCtrl', ['auth', '$location', function(auth, $location) {
  if(auth.isLoggedIn()){
    $location.path('/profile');
  }   

}]); 

