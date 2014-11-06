'use strict';

svgCircus.factory('ActorFctr', ['ListItemFctr', function (ListItemFctr) {
  var Actor=function(id, name) {
    ListItemFctr.apply(this, []);
    this.id=id;
    this.name=name;
    switch(Math.floor(Math.random() * 30)%3) {
      case 0:
        this.type='circle';
        break;
      case 1:
        this.type='square';
        break;
      case 2:
        this.type='polygon';
        break;
    }
    this.dx=Math.floor((Math.random() * 30) + 5);
    this.dy=Math.floor((Math.random() * 30) + 5);
    this.cx=Math.floor(this.dx/2 + 1 + Math.random() * (100-1-this.dx));
    this.cy=Math.floor(this.dx/2 + 1 + Math.random() * (100-1-this.dx));

    this.sides=Math.floor((Math.random() * 6) + 3);
    this.angle='90';

    this.rotation={
      value: '0',
      originX: '0',
      originY: '0'
    };

    this.opacity='1';

    this.stroke='rgba('+Math.floor(Math.random() * 255)+','+Math.floor(Math.random() * 255)+','+Math.floor(Math.random() * 255)+',1)';
    this.strokeOpacity='1';
    this.strokeWidth=''+Math.floor(Math.random() * 5);
    this.strokeDashSize='0';
    this.strokeDashGaps='0';

    this.fill='rgba('+Math.floor(Math.random() * 255)+','+Math.floor(Math.random() * 255)+','+Math.floor(Math.random() * 255)+',1)';
    this.fillOpacity='1';
  };

  Actor.prototype = new ListItemFctr();

  return Actor;
}]);