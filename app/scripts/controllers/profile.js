'use strict';

angular.module('myWorkout.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'views/profile.html',
    controller: 'ProfileCtrl'
  });
}])


.controller('ProfileCtrl', ['$location', 'auth', 'session', '$scope', '$firebaseObject', function($location, auth, session, $scope, $firebaseObject) {

  if(!auth.isLoggedIn()){

    $location.path('/login');

  }else{

    var ref = firebase.database().ref('Profiles/' + session.getUser().uid );
    $scope.profile = $firebaseObject(ref);

 }

  $scope.updateDifficulty = function(value){
    $scope.profile.difficulty = value;
    $scope.profile.$save();
  };

  $scope.updateSelectedExercises = function(value){

    if ($scope.profile[value] === undefined || $scope.profile[value] === false){
      $scope.profile[value] = true;
    }else{
      $scope.profile[value] = false;
    }
    $scope.profile.$save();

  };


}]);