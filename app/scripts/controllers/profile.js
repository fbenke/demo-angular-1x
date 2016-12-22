'use strict';

angular.module('myWorkout.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'views/profile.html',
    controller: 'ProfileCtrl'
  });
}])


.controller('ProfileCtrl', ['$location', 'auth', 'session', '$scope', '$firebaseObject', function($location, auth, session, $scope, $firebaseObject) {

  var isExerciseChosen = function(){

    var exercises = ['burpees', 'situps', 'pushups', 'pullups', 'jjacks', 'dips'];

    for (var i in exercises) {
      if ($scope.profile[exercises[i]] === true){
        return true;
      }
    }
    return false;

  };

  var isDifficultyChosen = function(){

    return $scope.profile.difficulty !== undefined;
      
  };


  var isComplete = function(){

    if (isDifficultyChosen() && isExerciseChosen()){
      return true;
    }

    return false;
  };


  if(!auth.isLoggedIn()){

    $location.path('/login');

  }else{

    var ref = firebase.database().ref('Profiles/' + session.getUser().uid );
    $scope.profile = $firebaseObject(ref);
  }

  $scope.updateDifficulty = function(value){

    $scope.profile.difficulty = value;
    $scope.profile.isComplete = isComplete();
    $scope.profile.$save();

  };

  $scope.updateSelectedExercises = function(value){

    if ($scope.profile[value] === undefined || $scope.profile[value] === false){
      $scope.profile[value] = true;
    }else{
      $scope.profile[value] = false;
    }

    $scope.profile.isComplete = isComplete();
    $scope.profile.$save();

  };

  $scope.completeProfile = function(){

    if (isComplete() === true){
      $location.path('/workout');
    }else{
      $scope.noExerciseChosenError = !isExerciseChosen();
      $scope.noDifficultyError = !isDifficultyChosen();
    }

  };

}]);