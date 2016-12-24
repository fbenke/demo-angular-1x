'use strict';

angular.module('myWorkout.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'views/profile.html',
    controller: 'ProfileCtrl'
  });
}])


.controller('ProfileCtrl', ['$location', 'auth', 'session', '$scope', 'settings', function($location, auth, session, $scope, settings) {

  if(!auth.isLoggedIn()){

    $location.path('/login');

  }else{
    $scope.settings = settings.getSettings(session.getUser().uid);
  }

  $scope.updateDifficulty = function(value){
    $scope.settings.difficulty = value;
    $scope.settings.$save();
  };

  $scope.updateSelectedExercises = function(value){
    if ($scope.settings[value] === undefined || $scope.settings[value] === false){
      $scope.settings[value] = true;
    }else{
      $scope.settings[value] = false;
    }
    $scope.settings.$save();
  };

  $scope.completeProfile = function(){
    if (settings.isComplete($scope.settings) === true){
      $location.path('/workout');
    }else{
      $scope.noExerciseChosenError = !settings.isExerciseChosen($scope.settings);
      $scope.noDifficultyError = !settings.isDifficultyChosen($scope.settings);
    }
  };

}]);