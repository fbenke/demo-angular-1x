'use strict';

var app = angular.module('myWorkout', [
  'ngRoute',
  'firebase',
  'myWorkout.home',
  'myWorkout.profile',
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/home'});
}])
.run(function(){
    var config = {
      apiKey: "AIzaSyDCgvKiWSLIIRQNi56jWAux7QCYqMAqQUg",
      authDomain: "myworkout-dc599.firebaseapp.com",
      databaseURL: "https://myworkout-dc599.firebaseio.com",
      storageBucket: "myworkout-dc599.appspot.com",
      messagingSenderId: "624819308134"
    };
    firebase.initializeApp(config);
  }
)
.run(['$rootScope', 'auth', 'session', function($rootScope, auth, session){
  $rootScope.auth = auth;
  $rootScope.session = session; 
}]);
