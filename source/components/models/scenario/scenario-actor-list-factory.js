'use strict';

svgCircus.factory('ScenarioActorListFctr', ['SimpleListFctr', 'ScenarioActorFctr', function (SimpleListFctr, ScenarioActorFctr) {
  var ScenarioActorList=function() {
    SimpleListFctr.apply(this, []);
  };

  ScenarioActorList.prototype = new SimpleListFctr();

  ScenarioActorList.prototype.addItem = function (actor) {
    var newId=this.generateId('scenarioactor');
    var itemObj=new ScenarioActorFctr(newId, actor);
    SimpleListFctr.prototype.addItem.apply(this, [itemObj]);
  };

  ScenarioActorList.prototype.removeItemsByActor = function (actor) {
    for(var j=this._items.length-1;j>=0;j--) {
      if(this._items[j].actor===actor) {
        this._items.splice(j,1);
      }
    }
  };

  return ScenarioActorList;


}]);