'use strict';

svgCircus.factory('ListItemFctr', ['SimpleListItemFctr', function (SimpleListItemFctr) {
  var ListItem=function() {
    SimpleListItemFctr.apply(this, []);
    this.type="ListItem";
    this.name='Item';
  };

  ListItem.prototype = new SimpleListItemFctr();

  return ListItem;
}]);