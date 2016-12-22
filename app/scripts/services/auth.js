'use strict';

app.service('auth', ['$location', 'session', '$firebaseAuth', '$firebaseObject', function($location, session, $firebaseAuth, $firebaseObject){

  this.isLoggedIn = function(){
    return session.getUser() !== null;
  };

  this.logIn = function(){

    var auth = $firebaseAuth();

    auth.$signInWithPopup("facebook").then(function(firebaseUser) {

      session.setAccessToken(firebaseUser.credential.accessToken);
      session.setUser(firebaseUser.user);
      $location.path('/workout');

    }).catch(function(error) {

      // TODO: add logging
      // console.log("Authentication failed:", error);

      $location.path('/error');
    });
  };

  this.logOut = function(){
    session.destroy();
    $location.path('/home');
  };

}]);