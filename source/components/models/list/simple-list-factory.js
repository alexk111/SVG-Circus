'use strict';

svgCircus.factory('SimpleListFctr', [function () {
  var SimpleList=function() {
    this._items=[];
  };

  SimpleList.prototype.itemsCount = function() {
    return this._items.length;
  };

  SimpleList.prototype.addItem = function (listItemObj) {
    this._items.push(listItemObj);
  };

  SimpleList.prototype.getItems = function () {
    return this._items;
  };

  SimpleList.prototype.findItemIdx = function(item) {
    var res=-1;
    for(var i=0, len=this.itemsCount();i<len;i++) {
      if(this._items[i]===item) {
        res=i;
        break;
      }
    }
    return res;
  };

  SimpleList.prototype.generateId=function(prefix) {
    var num=1, id;
    while(true) {
      id=prefix+'_'+num;
      if(this.getItemById(id)===null) {
        return id;
      }
      num++;
    }
  };

  SimpleList.prototype.getItemById=function(id) {
    var res=null;
    for(var i=0, len=this.itemsCount();i<len;i++) {
      if(this._items[i].id===id) {
        res=this._items[i];
        break;
      }
    }
    return res;
  };

  SimpleList.prototype.getItemByIdx = function (idx) {
    return idx>-1 && idx<this._items.length ? this._items[idx] : null;
  };

  SimpleList.prototype.removeItem=function(item) {
    var idx=this.findItemIdx(item);
    if(idx>-1) {
      this._items.splice(idx,1);
    }
    return idx;
  };

  SimpleList.prototype.clear=function() {
    this._items=[];
  };

  return SimpleList;
}]);