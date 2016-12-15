'use strict';

app.service('auth', ['$location', 'session', '$firebaseAuth', function($location, session, $firebaseAuth){

  this.isLoggedIn = function(){
    return session.getUser() !== null;
  };

  this.logIn = function(){

    var auth = $firebaseAuth();

    auth.$signInWithPopup("facebook").then(function(firebaseUser) {
      session.setAccessToken(firebaseUser.credential.accessToken);
      session.setUser(firebaseUser.user);

      $location.path('/profile');
    }).catch(function(error) {
      console.log("Authentication failed:", error);
    });
  };

  this.logOut = function(){
    session.destroy();
    $location.path('/welcome');
  };

}]);