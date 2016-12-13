'use strict';
 
angular.module('myWorkout.profile', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
      templateUrl: 'profile/profile.html',
      controller: 'ProfileCtrl'
  });
}])


.controller('ProfileCtrl', ['$location', 'auth', function($location, auth) {

  if(!auth.isLoggedIn()){
    $location.path('/login');
  }

}]); 

