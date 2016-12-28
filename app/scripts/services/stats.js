'use strict';

app.service('stats', [function(){

  this.getWorkoutSummaryText = function(workout){

    var aggregatedSummary = {};
    var numberEntries = 0;

    for (var i=0; i < workout.length; i++){

      if(aggregatedSummary[workout[i].name] !== undefined){
        aggregatedSummary[workout[i].name] += workout[i].number;
      }else{
        aggregatedSummary[workout[i].name] = workout[i].number;
        numberEntries++;
      }
    }

    var summary = 'I have done: ';
    var j = 0;

    for (i in aggregatedSummary){
      if(j < numberEntries-1){
        summary += aggregatedSummary[i] + ' ' + i + ', ' ;
      }else{
        summary += 'and ' + aggregatedSummary[i] + ' ' + i + '!';
      }
      j++;
    }

    return summary;
  };

}]);