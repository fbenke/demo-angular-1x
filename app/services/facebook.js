'use strict';

// Following this tutotial: https://blog.brunoscopelliti.com/facebook-authentication-in-your-angularjs-web-app/

app.run(['$rootScope', '$window', 'srvAuth', function($rootScope, $window, sAuth) {

    $rootScope.user = {};

    $window.fbAsyncInit = function(){

        FB.init({
          appId: '153960288417821',
          channelUrl: 'app/channel.html',
          version: 'v2.8',
          cookie: true,
          xfbml: true,
          status: true
        });

        sAuth.watchLoginChange();

    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

}]);


app.factory('srvAuth', function($rootScope){

    var srvAuth = {
        watchLoginChange: function() {
            var _self = this;
            FB.Event.subscribe('auth.authResponseChange', function(response) {

                if (response.status === 'connected') {
                    console.log('Logged in');
                    _self.getUserInfo();
                } else {
                    console.log('Logged out');
                }
            });
        },
        getUserInfo: function() {
            var _self = this;
            FB.api('/me', function(response){
                $rootScope.$apply(function() {
                    $rootScope.user = _self.user = response;
                });
            });
        },
        logout: function() {
            var _self = this;
            FB.logout(function(response) {
                $rootScope.$apply(function() {
                    $rootScope.user = _self.user = {};
                });
            });
        }
    };
    return srvAuth;
});