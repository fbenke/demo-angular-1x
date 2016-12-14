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

  $scope.profileName = session.getUser().name;


  $scope.edit = function() {

    var fb = firebase.database().ref('Profiles/');

    fb.push({
      name: $scope.profileName,
      id: session.getUser().id,
      age: $scope.profileAge,
      '.priority': session.getUser().id
    }).then(function(ref) {
      $location.path('/welcome');
    }, function(error) {
      console.log("Error:", error);
    });
  };

}]);