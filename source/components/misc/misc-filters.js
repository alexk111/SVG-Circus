'use strict';

svgCircus
  .filter('invertRGBA', function() {
    return function(rgb){
      rgb = [].slice.call(arguments).join(",").replace(/rgb\(|\)|rgba\(|\)|\s/gi, '').split(',');
      for (var i = 0; i < rgb.length; i++) rgb[i] = (i === 3 ? 1 : 255 - rgb[i]);
      return rgb.join(", ");
    };
  })
  .filter('reverse', function() {
    return function(items) {
      return items.slice().reverse();
    };
  });