'use strict';

svgCircus.service('jsBuilderSrvc', ['svgCircusSrvc', '$templateCache', function(svgCircusSrvc, $templateCache) {
  var prepareFunction=function(fn) {
    fn=fn.trim();
    return '('+fn.substr(2,fn.length-3)+')';
  };

  this.generateInit=function() {
    return 'var actors={}; var tricks={}; var scenarios={};';
  };

  this.generateActors=function(svgID, isExport) {
    var js=(isExport?'var ':'')+'actors={};';
    var aNode;
    angular.forEach(svgCircusSrvc.getActors(),function(actor){
      aNode='document.getElementById("'+svgID+'").getElementById("'+actor.id+'")';
      js+='actors.'+actor.id+'='+'{'+
            'node:'+aNode+','+
            'type:"'+actor.type+'",'+
            'cx:'+actor.cx+','+
            'cy:'+actor.cy+','+
            'dx:'+actor.dx+','+
            'dy:'+actor.dy+','+
            'opacity:'+actor.opacity+
          '};';
      //js+='console.log(document.getElementById("previewSVG").getElementById("'+actor.id+'"));';
    });
    return js;
  };

  this.generateTricks=function(isExport) {
    var js=(isExport?'var ':'')+'tricks={};';
    var trickFunction, easingFunction, trickFile;
    angular.forEach(svgCircusSrvc.getTricks(),function(trick){
      easingFunction=prepareFunction($templateCache.get('svgjs_tpls/tricks/_fn_easing/'+trick.easing+'.js'));
      switch(trick.type) {
        case 'fade':
          trickFunction=prepareFunction($templateCache.get('svgjs_tpls/tricks/fade/'+trick.fade.fade+'.js'))
                                      .replace(new RegExp('__fnEasing', 'g'), easingFunction)
                                      .replace(new RegExp('__timing1', 'g'), trick.fade.timing1)
                                      .replace(new RegExp('__timing2', 'g'), trick.fade.timing2);
          break;
        case 'scale':
          trickFunction=prepareFunction($templateCache.get('svgjs_tpls/tricks/scale/'+trick.scale.scale+'.js'))
                                      .replace(new RegExp('__factor', 'g'), trick.scale.factor)
                                      .replace(new RegExp('__fnEasing', 'g'), easingFunction)
                                      .replace(new RegExp('__timing1', 'g'), trick.scale.timing1)
                                      .replace(new RegExp('__timing2', 'g'), trick.scale.timing2);
          break;
        case 'skew':
          trickFunction=prepareFunction($templateCache.get('svgjs_tpls/tricks/skew/'+trick.skew.skew+'.js'))
                                      .replace(new RegExp('__skewX', 'g'), trick.skew.skewX)
                                      .replace(new RegExp('__skewY', 'g'), trick.skew.skewY)
                                      .replace(new RegExp('__fnEasing', 'g'), easingFunction)
                                      .replace(new RegExp('__timing1', 'g'), trick.skew.timing1)
                                      .replace(new RegExp('__timing2', 'g'), trick.skew.timing2);
          break;
        case 'rotate':
          trickFunction=prepareFunction($templateCache.get('svgjs_tpls/tricks/rotate/rotate.js'))
                                      .replace(new RegExp('__fnEasing', 'g'), easingFunction)
                                      .replace(new RegExp('__loops', 'g'), trick.rotate.loops)
                                      .replace(new RegExp('__direction', 'g'), trick.rotate.direction);
          break;
        case 'run':
          switch(trick.run.path) {
            case 'rect':
              trickFile='rect-'+trick.run.rect.startPoint;
              break;
            case 'line':
              trickFile='line-'+trick.run.line.startPoint;
              break;
            default:
              trickFile=trick.run.path;
              break;
          }
          trickFunction=prepareFunction($templateCache.get('svgjs_tpls/tricks/run/'+trickFile+'.js'))
                                      .replace(new RegExp('__fnEasing', 'g'), easingFunction)
                                      .replace(new RegExp('__loops', 'g'), trick.run.loops)
                                      .replace(new RegExp('__direction', 'g'), trick.run.direction);
          switch(trick.run.path) {
            case 'rect':
              trickFunction=trickFunction.replace(new RegExp('__rectX', 'g'), trick.run.rect.rectX)
                                         .replace(new RegExp('__rectY', 'g'), trick.run.rect.rectY);
              break;
            case 'circle':
              trickFunction=trickFunction.replace(new RegExp('__circleR', 'g'), parseInt(trick.run.circle.diameter,10)/2)
                                         .replace(new RegExp('__startAngle', 'g'), trick.run.circle.startAngle);
              break;
            case 'line':
              trickFunction=trickFunction.replace(new RegExp('__distance', 'g'), parseInt(trick.run.line.distance,10))
                                         .replace(new RegExp('__angle', 'g'), trick.run.line.angle);
              break;
          }
          break;
        default:
          trickFunction='';
          break;
      }
      if(trickFunction!=='') {
        js+='tricks.'+trick.id+'='+trickFunction+';';
      }
    });
    return js;
  };

  this.generateScenarios=function(isExport) {
    var js=(isExport?'var ':'')+'scenarios={};';
    var jsActors, jsTricks;
    angular.forEach(svgCircusSrvc.getScenarioItems(),function(item){
      jsActors=[];
      jsTricks=[];
      angular.forEach(item.actors.getItems(),function(item){
        jsActors.push('"'+item.actor.id+'"');
      });
      angular.forEach(item.tricks.getItems(),function(item){
        jsTricks.push('{trick: "'+item.trick.id+'",start:'+item.start+',end:'+item.end+'}');
      });
      js+='scenarios.'+item.id+'='+'{'+
            'actors: ['+jsActors.join()+'],'+
            'tricks: ['+jsTricks.join()+'],'+
            'startAfter:'+item.startAfter*1000+','+
            'duration:'+item.duration*1000+','+
            'actorDelay:'+item.actorDelay*1000+','+
            'repeat:'+item.repeat+','+
            'repeatDelay:'+item.repeatDelay*1000+
          '};';
    });
    return js;
  };

  this.generateSVGCircus=function(isExport) {
    var res=$templateCache.get('svgjs_tpls/svgcircus.js');
    return res;
  };

  this.generateActorsNodeRefresher=function() {
    return $templateCache.get('svgjs_tpls/actorsNodeRefresher.js');
  };

  this.generateActorsNodeValuesResetter=function() {
    return $templateCache.get('svgjs_tpls/actorsNodeValuesResetter.js');
  };

  this.generateActorsNodeValuesResetterCall=function() {
    return 'resetActorNodeValues();';
  };


  this.generateExport=function(svgID) {
    return '<![CDATA['+
            '(function(){'+
            this.generateActors(svgID,true)+this.generateTricks(true)+this.generateScenarios(true)+this.generateSVGCircus(true)+
            '})()]]>';
  };

}]);