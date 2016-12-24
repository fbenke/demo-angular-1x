'use strict';
 
angular.module('myWorkout.workout', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/workout', {
        templateUrl: 'views/workout.html',
        controller: 'WorkoutCtrl'
    });
}])


.controller('WorkoutCtrl', ['$location', 'auth', 'session', '$scope', 'coach', function($location, auth, session, $scope, coach) {

  if(!auth.isLoggedIn()){
 
    $location.path('/login');

  }

  $scope.getWorkout = function(){
    coach.startWorkoutDay();
  };

    
}]); 