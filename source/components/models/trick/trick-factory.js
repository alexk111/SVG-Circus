'use strict';

svgCircus.factory('TrickFctr', ['ListItemFctr', function (ListItemFctr) {
  var Trick=function(id, name) {
    ListItemFctr.apply(this, []);
    this.id=id;
    this.name=name;
    this.type='run';

    this.easing='quad-in-out';

    this.run={
      path: 'rect',
      direction: '1',
      loops: '1',
      rect: {
        rectX: '30',
        rectY: '30',
        startPoint: 'bottom',
        rotate: false
      },
      circle: {
        diameter: '60',
        startAngle: '-90'
      },
      line: {
        startPoint: 'middle',
        angle: '90',
        distance: '30'
      }
    };

    this.fade={
      fade: 'in-out',
      timing1: '0.1',
      timing2: '0.9'
    };

    this.scale={
      factor: '2',
      scale: 'to-back',
      timing1: '0.1',
      timing2: '0.9'
    };

    this.rotate={
      direction: '1',
      loops: '1'
    };

    this.skew={
      skewX:'10',
      skewY:'10',
      skew: 'to-back',
      timing1: '0.1',
      timing2: '0.9'
    }
  };

  Trick.prototype = new ListItemFctr();

  return Trick;
}]);