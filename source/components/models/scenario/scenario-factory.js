'use strict';

svgCircus.factory('ScenarioFctr', ['ListItemFctr', 'ScenarioActorListFctr', 'ScenarioTrickListFctr', function (ListItemFctr, ScenarioActorListFctr, ScenarioTrickListFctr) {
  var Scenario=function(id, name) {
    ListItemFctr.apply(this, []);
    this.id=id;
    this.name=name;

    this.actors=new ScenarioActorListFctr();
    this.tricks=new ScenarioTrickListFctr();

    this.startAfter='0';
    this.duration='1';

    this.repeat='0';
    this.repeatDelay='0';

    this.actorDelay='0';
  };

  Scenario.prototype = new ListItemFctr();

  return Scenario;
}]);