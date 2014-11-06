'use strict';

svgCircus.factory('ListFctr', ['SimpleListFctr', function (SimpleListFctr) {
  var List=function() {
    SimpleListFctr.apply(this, []);
    this._selectedItem=null;
  };

  List.prototype = new SimpleListFctr();

  List.prototype.addItem = function (listItemObj) {
    SimpleListFctr.prototype.addItem.apply(this, [listItemObj]);
    this._selectedItem=listItemObj;
  };

  List.prototype.generateName=function(prefix) {
    var num=1, name;
    while(true) {
      name=prefix+' '+num;
      if(this.getItemByName(name)===null) {
        return name;
      }
      num++;
    }
  };

  List.prototype.findNextName=function(name) {
    var initPart,lastPart;
    name=name.trim();
    var lastSpaceIdx=name.lastIndexOf(' ');
    if(lastSpaceIdx>-1) {
      initPart=name.substring(0, lastSpaceIdx+1);
      lastPart=name.substring(lastSpaceIdx);
    } else {
      initPart='';
      lastPart=name;
    }
    lastPart=parseInt(lastPart,10);
    if(!isNaN(lastPart)) {
      var newName;
      while(true) {
        lastPart++;
        newName=initPart+lastPart;
        if(this.getItemByName(newName)===null) {
          return newName;
        }
      }
    } else {
      return this.generateName(name);
    }
  };

  List.prototype.getItemByName=function(name) {
    var res=null;
    for(var i=0, len=this.itemsCount();i<len;i++) {
      if(this._items[i].name===name) {
        res=this._items[i];
        break;
      }
    }
    return res;
  };

  List.prototype.getSelectedItem = function() {
    return this._selectedItem;
  };

  List.prototype.setSelectedItem = function(item) {
    if(this.findItemIdx(item)>-1) {
      this._selectedItem=item;
    }
  };

  List.prototype.removeItem=function(item) {
    var idx=SimpleListFctr.prototype.removeItem.apply(this, [item]);
    if(idx>-1) {
      if(item===this._selectedItem) {
        var selectedItemIdx=Math.min(idx,this._items.length-1);
        this._selectedItem=(selectedItemIdx>-1?this._items[selectedItemIdx]:null);
      }
    }
  };

  List.prototype.clear=function() {
    SimpleListFctr.prototype.clear.apply(this, []);
    this._selectedItem=null;
  };

  return List;

}]);