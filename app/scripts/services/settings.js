'use strict';

app.service('settings', ['$firebaseAuth', '$firebaseObject', function($firebaseAuth, $firebaseObject){

  this._exercises = ['burpees', 'situps', 'pushups', 'pullups', 'jjacks', 'dips'];

  this.getSettings = function(userId){
    var ref = firebase.database().ref('Profiles/' + userId + '/settings');
    return $firebaseObject(ref);
  };

  this.isDifficultyChosen = function(settings){
    return settings.difficulty !== undefined;     
  };


  this.isExerciseChosen = function(settings){
    for (var i in this._exercises) {
      if (settings[this._exercises[i]] === true){
        return true;
      }
    }
    return false;
  };

  this.isComplete = function(settings){
    if (this.isDifficultyChosen(settings) && this.isExerciseChosen(settings)){
      return true;
    }
    return false;
  };



}]);