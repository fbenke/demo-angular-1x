'use strict';

app.factory('localStorage', ['$window', function localStorageServiceFactory($window){
  if($window.localStorage){
    return $window.localStorage;
  }
  throw new Error('Local storage support is needed');
}]);
