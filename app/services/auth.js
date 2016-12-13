'use strict';

app.service('auth', ['session', 'Facebook', function(session, Facebook){

  this.isLoggedIn = function isLoggedIn(){
    return session.getUser() !== null;
  };

  this.logIn = function(){
    Facebook.getLoginStatus(function(response) {
      if (response.status == 'connected') {
        session.setAccessToken(response.authResponse.accessToken);
        Facebook.api('/me', function(response) {
          session.setUser(response.name);
        });
      } else {

        Facebook.login(function(response){
          if (response.status == 'connected') { 
            session.setAccessToken(response.authResponse.accessToken);
            Facebook.api('/me', function(response) {
              session.setUser(response.name);
            });
          }
        });
      }
    });
  };

  this.logOut = function(){
    Facebook.logout(function(response) {
      session.destroy();
    });

  };

  this.ready = function(){
    return Facebook.isReady();
  };

}]);