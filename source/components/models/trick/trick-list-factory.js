'use strict';

svgCircus.factory('TrickListFctr', ['ListFctr', 'TrickFctr', function (ListFctr, TrickFctr) {
  var TrickList=function() {
    ListFctr.apply(this, []);
  };

  TrickList.prototype = new ListFctr();

  TrickList.prototype.addItem = function () {
    var newId=this.generateId('trick');
    var newName=this.generateName('Trick');
    var itemObj=new TrickFctr(newId, newName);
    ListFctr.prototype.addItem.apply(this, [itemObj]);
    return itemObj;
  };

  TrickList.prototype.duplicateItem = function (item) {
    var itemObj=angular.copy(item);
    var newId=this.generateId('trick');
    var newName=this.findNextName(item.name);
    itemObj.id=newId;
    itemObj.name=newName;
    ListFctr.prototype.addItem.apply(this, [itemObj]);
    return itemObj;
  };

  return TrickList;
}]);