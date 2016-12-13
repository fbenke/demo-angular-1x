'use strict';

app.service('session', ['$log', 'localStorage', function($log, localStorage){

  this._user = JSON.parse(localStorage.getItem('session.user'));
  this._accessToken = JSON.parse(localStorage.getItem('session.accessToken'));

  this.getUser = function(){
    return this._user;
  };

  this.setUser = function(user){
    this._user = user;
    localStorage.setItem('session.user', JSON.stringify(user));
    return this;
  };

  this.getAccessToken = function(){
    return this._accessToken;
  };

  this.setAccessToken = function(token){
    this._accessToken = token;
    localStorage.setItem('session.accessToken', token);
    return this;
  };

  this.destroy = function destroy(){
    this.setUser(null);
    this.setAccessToken(null);
  };

}]);
