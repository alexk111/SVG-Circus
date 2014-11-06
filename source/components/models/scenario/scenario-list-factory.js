'use strict';

svgCircus.factory('ScenarioListFctr', ['ListFctr', 'ScenarioFctr', function (ListFctr, ScenarioFctr) {
  var ScenarioList=function() {
    ListFctr.apply(this, []);
  };

  ScenarioList.prototype = new ListFctr();

  ScenarioList.prototype.addItem = function () {
    var newId=this.generateId('scenario');
    var newName=this.generateName('Scenario');
    var itemObj=new ScenarioFctr(newId, newName);
    ListFctr.prototype.addItem.apply(this, [itemObj]);
    return itemObj;
  };

  ScenarioList.prototype.duplicateItem = function (item) {
    var itemObj=angular.copy(item);
    var newId=this.generateId('scenario');
    var newName=this.findNextName(item.name);

    itemObj.id=newId;
    itemObj.name=newName;

    var actorItems=itemObj.actors.getItems();
    var origActorItems=item.actors.getItems();
    var trickItems=itemObj.tricks.getItems();
    var origTrickItems=item.tricks.getItems();
    var i, len;
    for(i=0, len=actorItems.length;i<len;i++) {
      actorItems[i].actor=origActorItems[i].actor;
    }
    for(i=0, len=trickItems.length;i<len;i++) {
      trickItems[i].trick=origTrickItems[i].trick;
    }

    ListFctr.prototype.addItem.apply(this, [itemObj]);
    return itemObj;
  };

  ScenarioList.prototype.removeActor = function (actor) {
    for(var i=0, len=this._items.length;i<len;i++) {
      this._items[i].actors.removeItemsByActor(actor);
    }
  };

  ScenarioList.prototype.removeTrick = function (trick) {
    for(var i=0, len=this._items.length;i<len;i++) {
      this._items[i].tricks.removeItemsByTrick(trick);
    }
  };


  return ScenarioList;
}]);