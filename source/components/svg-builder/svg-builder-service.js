'use strict';

svgCircus.service('svgBuilderSrvc', ['svgCircusSrvc', 'jsBuilderSrvc', '$filter', function(svgCircusSrvc, jsBuilderSrvc, $filter) {
  var toRadians=function(degs) { return Math.PI*degs/180; };
  var isOdd=function(n) { return (n%2 === 1); };
  var that=this;

  var guid = (function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
                 .toString(16)
                 .substring(1);
    }
    return function() {
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
             s4() + '-' + s4() + s4() + s4();
    };
  })();

  // cx - center x
  // cy - center y
  // r - radius
  // n - number of sides
  // sDeg - start degree
  this.generatePolygonPoints=function(cx,cy,r,n,sDeg) {
    var res='';
    cx=parseInt(cx,10); cy=parseInt(cy,10); r=parseInt(r,10); n=parseInt(n,10); sDeg=parseInt(sDeg,10);
    if(!isNaN(cx) && !isNaN(cy) && !isNaN(r) && !isNaN(n) && !isNaN(sDeg) && n>2 && r>0) {
      var centerAng = 2*Math.PI / n;
      var startAng = toRadians(sDeg);
      var vertex = new Array();
      var ang,vx,vy;
      for(var i=0 ; i<n ; i++) {
        ang = startAng + (i*centerAng);
        vx = (cx + r*Math.cos(ang)).toFixed(2);
        vy = (cy - r*Math.sin(ang)).toFixed(2);
        vertex.push( vx+','+vy );
      }
      res=vertex.join(' ');
    }
    return res;
  };

  this.generateActors=function(isExport) {
    var svg='', svgActor, svgActorCommon;
    angular.forEach($filter('reverse')(svgCircusSrvc.getActors()),function(actor){
      svgActor='';
      svgActorCommon ='opacity="'+actor.opacity+'" '+
                      'fill="'+actor.fill+'" fill-opacity="'+actor.fillOpacity+'" '+
                      'stroke="'+actor.stroke+'" stroke-width="'+actor.strokeWidth+'" stroke-opacity="'+actor.strokeOpacity+'" stroke-dasharray="'+((parseInt(actor.strokeDashSize,10)!==0 && parseInt(actor.strokeDashGaps,10)!==0) ? (actor.strokeDashSize+' '+actor.strokeDashGaps) : '')+'"';
      switch(actor.type) {
        case 'square':
          svgActor+='<rect id="'+actor.id+'" '+
                    'x="'+(actor.cx-actor.dx/2)+'" y="'+(actor.cy-actor.dx/2)+'" '+
                    'width="'+actor.dx+'" height="'+actor.dx+'" '+
                    svgActorCommon+'></rect>';
          break;
        case 'circle':
          svgActor+='<circle id="'+actor.id+'" '+
                    'cx="'+actor.cx+'" cy="'+actor.cy+'" '+
                    'r="'+(actor.dx/2)+'" '+
                    svgActorCommon+'></circle>';
          break;
        case 'polygon':
          svgActor+='<polygon id="'+actor.id+'" '+
                    'points="'+that.generatePolygonPoints(actor.cx,actor.cy,actor.dx/2,actor.sides,actor.angle)+'" '+
                    svgActorCommon+'></polygon>';
          break;
      }
      svg+=svgActor;
    });

    return svg;
  };

  this.generateExport=function() {
    var SVGID='SVG-Circus-'+guid();
    var svgJS=jsBuilderSrvc.generateExport(SVGID);
    var svg="<?xml version=\"1.0\" standalone=\"no\"?>\n"+
            "<!-- Generator: SVG Circus (http://svgcircus.com) -->\n"+
            "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n"+
            "<svg id=\""+SVGID+"\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 "+svgCircusSrvc.getArena().width+" "+svgCircusSrvc.getArena().height+"\" preserveAspectRatio=\"xMidYMid meet\">"+
            this.generateActors(true)+
            "<script type=\"text/ecmascript\">"+
            svgJS+
            "</script>"+
            "</svg>";
    return svg;
  };

}]);