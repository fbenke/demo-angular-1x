'use strict';

var app = angular.module('myWorkout', [
  'ngRoute',
  'facebook',
  'myWorkout.welcome',
  'myWorkout.login',
  'myWorkout.profile',
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/welcome'});
}])
.config(function(FacebookProvider) {
  FacebookProvider.init('153960288417821');
})
.run(['$rootScope', 'auth', 'session', function($rootScope, auth, session){
  $rootScope.auth = auth;
  $rootScope.session = session;	
}]);
