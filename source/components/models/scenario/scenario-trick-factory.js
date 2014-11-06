'use strict';

svgCircus.factory('ScenarioTrickFctr', ['SimpleListItemFctr', function (SimpleListItemFctr) {
  var ScenarioTrick=function(id, trick) {
    SimpleListItemFctr.apply(this, []);
    this.id=id;
    this.trick=trick;
    this.start=0;
    this.end=1;
  };

  ScenarioTrick.prototype = new SimpleListItemFctr();

  return ScenarioTrick;
}]);