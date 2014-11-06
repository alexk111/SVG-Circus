'use strict';

svgCircus.factory('ActorListFctr', ['ListFctr', 'ActorFctr', function (ListFctr, ActorFctr) {
  var ActorList=function() {
    ListFctr.apply(this, []);
  };

  ActorList.prototype = new ListFctr();

  ActorList.prototype.addItem = function () { };

  ActorList.prototype.addActor = function () {
    var newId=this.generateId('actor');
    var newName=this.generateName('Actor');
    var itemObj=new ActorFctr(newId, newName);
    ListFctr.prototype.addItem.apply(this, [itemObj]);
    return itemObj;
  };

  ActorList.prototype.duplicateActor = function (actor) {
    var itemObj=angular.copy(actor);
    var newId=this.generateId('actor');
    var newName=this.findNextName(actor.name);
    itemObj.id=newId;
    itemObj.name=newName;
    ListFctr.prototype.addItem.apply(this, [itemObj]);
    return itemObj;
  };

  return ActorList;
}]);