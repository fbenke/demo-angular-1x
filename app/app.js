'use strict';

var app = angular.module('workout', [
  'ngRoute',
  'workout.welcome',
  'workout.login'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/welcome'});
}]);