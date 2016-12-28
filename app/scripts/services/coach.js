'use strict';

app.service('coach', ['$firebaseAuth', '$firebaseArray', '$firebaseObject', '$q', function($firebaseAuth, $firebaseArray, $firebaseObject, $q){

  this._getWorkout = function(){
    return [
      {id: 1, name: 'Burpees', number : 20, completed: false},
      {id: 2, name: 'Situps',  number: 20, completed: false},
      {id: 3, name: 'Burpees', number: 20, completed: false}];
  };

  this.getWorkouts = function(userId){

    var defer = $q.defer();
    
    var ref = firebase.database().ref('Profiles/' + userId + '/workouts');
    var workouts = $firebaseArray(ref).$loaded().then(function(workouts){
      return defer.resolve(workouts);
    });

    return defer.promise;

  };

  this.getCurrentWorkout = function(workouts){
    var lastKey = workouts.$keyAt(workouts.length-1);
    return workouts.$getRecord(lastKey);
  };

  this.startNewWorkout = function(userId){

    var defer = $q.defer();
    var ref = firebase.database().ref('Profiles/' + userId + '/workouts');
    var workouts = $firebaseArray(ref);

    workouts.$add(this._getWorkout()).then(function(ref){
      var workout = workouts.$getRecord(ref.key);
      return defer.resolve(workout);
    });

    return defer.promise;

  };

  this.workoutCompleted = function(workout){
    for (var i = 0; i  < workout.length; i++) {
      if(workout[i].completed === false){
        return false;
      }
    }

    return true;
  };


}]);