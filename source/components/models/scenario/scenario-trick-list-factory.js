'use strict';

svgCircus.factory('ScenarioTrickListFctr', ['ListFctr', 'ScenarioTrickFctr', function (SimpleListFctr, ScenarioTrickFctr) {
  var ScenarioTrickList=function() {
    SimpleListFctr.apply(this, []);
  };

  ScenarioTrickList.prototype = new SimpleListFctr();

  ScenarioTrickList.prototype.addItem = function (trick) {
    var newId=this.generateId('scenariotrick');
    var itemObj=new ScenarioTrickFctr(newId, trick);
    SimpleListFctr.prototype.addItem.apply(this, [itemObj]);
  };

  ScenarioTrickList.prototype.removeItemsByTrick = function (trick) {
    for(var j=this._items.length-1;j>=0;j--) {
      if(this._items[j].trick===trick) {
        this._items.splice(j,1);
      }
    }
  };

  return ScenarioTrickList;
}]);