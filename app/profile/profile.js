'use strict';

angular.module('myWorkout.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'profile/profile.html',
    controller: 'ProfileCtrl'
  });
}])


.controller('ProfileCtrl', ['$location', 'auth', 'session', '$scope', function($location, auth, session, $scope) {

  if(!auth.isLoggedIn()){
    $location.path('/login');
  }

  $scope.user = session.getUser();
  $scope.profileName = session.getUser().displayName;

  $scope.edit = function() {

    var fb = firebase.database().ref('Profiles/');

    fb.push({
      uid: $scope.user.uid,
      name: $scope.user.displayName,
      photoURL: $scope.user.photoURL,
      email: $scope.user.email,
      age: $scope.profileAge,
      '.priority': $scope.user.uid
    }).then(function(ref) {
      $location.path('/welcome');
    }, function(error) {
      console.log("Error:", error);
    });
  };

}]);