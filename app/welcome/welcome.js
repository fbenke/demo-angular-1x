'use strict';
 
angular.module('workout.welcome', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
    });
}])


.controller('WelcomeCtrl', [function() {

}]); 