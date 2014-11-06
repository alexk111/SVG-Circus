'use strict';

svgCircus.factory('ScenarioActorFctr', ['SimpleListItemFctr', function (SimpleListItemFctr) {
  var ScenarioActor=function(id, actor) {
    SimpleListItemFctr.apply(this, []);
    this.id=id;
    this.actor=actor;
  };

  ScenarioActor.prototype = new SimpleListItemFctr();

  return ScenarioActor;
}]);