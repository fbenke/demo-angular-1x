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
  }else{
    coach.getWorkouts(session.getUser().uid).then(function(workouts){
      $scope.workouts = workouts;
      $scope.workout = coach.getCurrentWorkout(workouts);
      $scope.complete = coach.workoutCompleted($scope.workout)
    });
  }

  $scope.startNewWorkout = function(){
    $scope.complete = false;
    coach.startNewWorkout(session.getUser().uid).then(function(workout){
      $scope.workout = workout;
    });
  };


  $scope.completeExercise = function(exerciseId){
    $scope.workout[exerciseId-1].completed = true;
    var lastIndex = $scope.workouts.length-1;
    $scope.workouts[lastIndex] = $scope.workout;
    $scope.workouts.$save(lastIndex).then(function(ref){
      $scope.complete = coach.workoutCompleted($scope.workout);
    });
  };
   
}]); 