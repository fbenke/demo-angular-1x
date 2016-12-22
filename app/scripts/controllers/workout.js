'use strict';
 
angular.module('myWorkout.workout', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/workout', {
        templateUrl: 'views/workout.html',
        controller: 'WorkoutCtrl'
    });
}])


.controller('WorkoutCtrl', ['$location', 'auth', 'session', '$scope', '$firebaseObject', function($location, auth, session, $scope, $firebaseObject) {

  if(!auth.isLoggedIn()){
 
    $location.path('/login');

  }else{
 
    var ref = firebase.database().ref('Profiles/' + session.getUser().uid);

    $scope.profile = $firebaseObject(ref);

    $scope.profile.$loaded().then(function(){

      if ($scope.profile.isComplete === undefined || $scope.profile.isComplete === false){
        $location.path('/profile');
      }
    });

  }

    
}]); 