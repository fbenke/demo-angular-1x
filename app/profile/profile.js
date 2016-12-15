'use strict';

angular.module('myWorkout.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'profile/profile.html',
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

  $scope.edit = function() {

    $scope.profile.name = session.getUser().displayName;
    $scope.profile.photoURL = session.getUser().photoURL;
    $scope.profile.email = session.getUser().email;

    $scope.profile.$save().then(function(ref) {
      $location.path('/welcome');
    }, function(error) {
      console.log("Error:", error);
    });
  };

}]);