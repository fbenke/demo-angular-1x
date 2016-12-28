'use strict';

app.service('coach', ['$firebaseAuth', '$firebaseArray', '$firebaseObject', '$q', 'settings', function($firebaseAuth, $firebaseArray, $firebaseObject, $q, settings_service){

  this._getWorkout = function(settings){

    var defer = $q.defer();

    settings.$loaded().then(function(){
      
      const NUMBER_EXERCISES = {amateur: 3, medium: 4, pro: 5};
      const MAX_NUMBER_REPETITIONS = {amateur: 10, medium: 30, pro: 50};

      var newWorkout = [];
      var exercises = settings_service.getExercises(settings);

      for (var i = 0; i  < NUMBER_EXERCISES[settings.difficulty]; i++) {
        var reps = Math.floor((Math.random() * MAX_NUMBER_REPETITIONS[settings.difficulty]) + 1);
        var exercise = exercises[Math.floor((Math.random() * exercises.length))];
        newWorkout.push({id: i+1, name: exercise, number: reps, completed: false});
      }
      return defer.resolve(newWorkout);

    });

    return defer.promise;
  };

  this.getWorkouts = function(userId){
    var defer = $q.defer();  
    var ref = firebase.database().ref('Profiles/' + userId + '/workouts');
    var workouts = $firebaseArray(ref).$loaded().then(function(workouts){
      return defer.resolve(workouts);
    });

    return defer.promise;

  };

  this.getCurrentWorkout = function(workouts, settings){
    var lastKey = workouts.$keyAt(workouts.length-1);
    return workouts.$getRecord(lastKey);
  };

  this.startNewWorkout = function(userId){

    var defer = $q.defer();
    var workouts = $firebaseArray(firebase.database().ref('Profiles/' + userId + '/workouts'));
    var settings = $firebaseObject(firebase.database().ref('Profiles/' + userId + '/settings'));

    this._getWorkout(settings).then(function(newWorkout){
      workouts.$add(newWorkout).then(function(ref){
        var workout = workouts.$getRecord(ref.key);
        return defer.resolve(workout);
      });
    });

    return defer.promise;

  };

  this.workoutCompleted = function(workout){
    if (workout === null){
      return false;
    }

    for (var i = 0; i  < workout.length; i++) {
      if(workout[i].completed === false){
        return false;
      }
    }

    return true;
  };


}]);