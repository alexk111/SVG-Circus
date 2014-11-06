'use strict';

svgCircus.service('helpersSrvc', [function() {
  this.isRGBLight=function(rgb){
    rgb = [].slice.call(arguments).join(",").replace(/rgb\(|\)|rgba\(|\)|\s/gi, '').split(',');

    var o = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) /1000);

    return (o > 125);
  };
}]);