'use strict';

app.service('auth', ['$location', 'session', 'Facebook', function($location, session, Facebook){

  this.isLoggedIn = function(){
    return session.getUser() !== null;
  };

  this.logIn = function(){
    Facebook.getLoginStatus(function(response) {
      if (response.status == 'connected') {
        session.setAccessToken(response.authResponse.accessToken);
        Facebook.api('/me', function(response) {
          session.setUser({'name': response.name, 'id': response.id});
          $location.path('/profile');
        });
      } else {

        Facebook.login(function(response){
          if (response.status == 'connected') { 
            session.setAccessToken(response.authResponse.accessToken);
            Facebook.api('/me', function(response) {
              session.setUser({'name': response.name, 'id': response.id});
              $location.path('/profile');
            });
          }
        });
      }
    });
  };

  this.logOut = function(){
    Facebook.logout(function(response) {
      session.destroy();
      $location.path('/welcome');
    });

  };

  this.ready = function(){
    return Facebook.isReady();
  };

}]);