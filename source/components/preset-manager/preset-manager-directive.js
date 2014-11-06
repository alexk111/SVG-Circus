svgCircus.directive('scPresetManager', ['svgCircusSrvc', '$timeout', 'analyticsSrvc', function(svgCircusSrvc, $timeout, analyticsSrvc) {
  return {
    restrict: 'E',
    templateUrl: 'preset-manager/preset-manager-directive.html',
    link: function(scope, element) {
      scope.currentPreset=1;

      var defStroke='rgba(166,3,17,1)',
          defFill='rgba(242,162,12,1)',
          defDx=10;

      var createDefActors=function(num, name, type, dx, cx, cy, stroke, strokeWidth, fill) {
        var actor=svgCircusSrvc.addActor();
        actor.name=name+' 1';
        actor.type=type;
        actor.dx=dx;
        actor.cx=cx;
        actor.cy=cy;
        actor.stroke=stroke;
        actor.strokeWidth=strokeWidth;
        actor.fill=fill;
        for (var i=2;i<=num;i++) {
          actor=svgCircusSrvc.duplicateActor(actor);
          actor.name=name+' '+i;
        }
      };

      var createDefTrickRunCircle=function(name, direction, loops, diameter, startAngle, easing) {
        var trick=svgCircusSrvc.addTrick();
        trick.name=name;
        if(typeof easing === typeof '') {
          trick.easing=easing;
        }
        trick.run.path='circle';
        trick.run.direction=direction;
        trick.run.loops=loops;
        trick.run.circle.diameter=diameter;
        trick.run.circle.startAngle=startAngle;
      };

      var createDefTrickRunLine=function(name, startPoint, loops, distance, angle, easing) {
        var trick=svgCircusSrvc.addTrick();
        trick.name=name;
        if(typeof easing === typeof '') {
          trick.easing=easing;
        }

        trick.run.path='line';
        trick.run.loops=loops;
        trick.run.line.startPoint=startPoint;
        trick.run.line.angle=angle;
        trick.run.line.distance=distance;
      };

      var createDefTrickFade=function(name, fade, timing1, timing2, easing) {
        var trick=svgCircusSrvc.addTrick();
        trick.name=name;
        if(typeof easing === typeof '') {
          trick.easing=easing;
        }
        trick.type='fade';
        trick.fade.timing1=timing1;
        trick.fade.timing2=timing2;
        trick.fade.fade=fade;
      };

      var createDefTrickScale=function(name, scale, factor, timing1, timing2, easing) {
        var trick=svgCircusSrvc.addTrick();
        trick.name=name;
        if(typeof easing === typeof '') {
          trick.easing=easing;
        }
        trick.type='scale';
        trick.scale.factor=factor;
        trick.scale.timing1=timing1;
        trick.scale.timing2=timing2;
        trick.scale.scale=scale;
      };

      var createDefTrickSkew=function(name, skew, skewX, skewY, timing1, timing2, easing) {
        var trick=svgCircusSrvc.addTrick();
        trick.name=name;
        if(typeof easing === typeof '') {
          trick.easing=easing;
        }
        trick.type='skew';
        trick.skew.skewX=skewX;
        trick.skew.skewY=skewY;
        trick.skew.timing1=timing1;
        trick.skew.timing2=timing2;
        trick.skew.skew=skew;
      };

      var createDefTrickRotate=function(name, direction, loops, easing) {
        var trick=svgCircusSrvc.addTrick();
        trick.name=name;
        if(typeof easing === typeof '') {
          trick.easing=easing;
        }
        trick.type='rotate';
        trick.rotate.direction=direction;
        trick.rotate.loops=loops;
      };

      var createDefScenario=function(name, duration, repeatDelay, actorDelay, arrActorIdx, arrTrickIdx) {
        var actors=svgCircusSrvc.getActors();
        var tricks=svgCircusSrvc.getTricks();

        var item=svgCircusSrvc.addScenarioItem();
        item.name=name;
        item.duration=duration;
        item.repeatDelay=repeatDelay;
        item.actorDelay=actorDelay;

        var i, len;
        for(i=0,len=arrActorIdx.length;i<len;i++) {
          item.actors.addItem(actors[arrActorIdx[i]]);
        }
        for(i=0,len=arrTrickIdx.length;i<len;i++) {
          item.tricks.addItem(tricks[arrTrickIdx[i]]);
        }
      };

      var resetSelectedItems=function() {
        var actors=svgCircusSrvc.getActors();
        var tricks=svgCircusSrvc.getTricks();
        var scenarios=svgCircusSrvc.getScenarioItems();

        svgCircusSrvc.setSelectedActor(actors[0]);
        svgCircusSrvc.setSelectedTrick(tricks[0]);
        svgCircusSrvc.setSelectedScenarioItem(scenarios[0]);
      };

      var clearLists=function() {
        svgCircusSrvc.clearScenarioItems();
        svgCircusSrvc.clearTricks();
        svgCircusSrvc.clearActors();
      };

      scope.$watch('currentPreset',function(val){
        val=parseInt(val,10);
        switch(val) {
          case 0:
            clearLists();
            break;
          case 1:
            clearLists();
            createDefActors(3,'Circle','circle','10','50','75','rgba(166,3,17,1)','1','rgba(242,162,12,1)');
            createDefTrickRunCircle('Running','1','4','50','-90');
            createDefTrickFade('Fading','in-out','0.1','0.9');
            createDefScenario('Running in Circles','6','1','0.3',[0,1,2],[0,1]);
            resetSelectedItems();
            break;
          case 2:
            clearLists();
            createDefActors(4,'Ball','circle','10','50','75','rgba(166,3,17,1)','1','rgba(242,162,12,1)');
            createDefTrickRunCircle('Juggling','1','1','50','-90','quad-in-out');
            createDefScenario('Juggling Balls','2','0','0.5',[0,1,2,3],[0]);
            resetSelectedItems();
            break;
          case 3:
            clearLists();
            createDefActors(8,'Square','square','10','50','75','rgba(166,3,17,1)','1','rgba(242,162,12,1)');
            var actors=svgCircusSrvc.getActors();
            actors[0].cx='35'; actors[0].cy='35';
            actors[1].cx='50'; actors[1].cy='35';
            actors[2].cx='65'; actors[2].cy='35';
            actors[3].cx='65'; actors[3].cy='50';
            actors[4].cx='65'; actors[4].cy='65';
            actors[5].cx='50'; actors[5].cy='65';
            actors[6].cx='35'; actors[6].cy='65';
            actors[7].cx='35'; actors[7].cy='50';

            createDefTrickFade('Fading','in-out','0.2','0.8','circ-out');
            createDefScenario('Square of Squares','0.8','0','0.1',[0,1,2,3,4,5,6,7],[0]);
            resetSelectedItems();
            break;
          case 4:
            clearLists();
            createDefActors(5,'Conic','circle','10','50','60','rgba(166,3,17,1)','2','rgba(0,0,0,0)');
            var actors=svgCircusSrvc.getActors();
            actors[0].dx='30'; actors[0].stroke='rgba(166,3,17,1)';
            actors[1].dx='40'; actors[1].stroke='rgba(166,3,17,0.8)';
            actors[2].dx='50'; actors[2].stroke='rgba(166,3,17,0.6)';
            actors[3].dx='60'; actors[3].stroke='rgba(166,3,17,0.4)';
            actors[4].dx='70'; actors[4].stroke='rgba(166,3,17,0.2)';

            createDefTrickRunCircle('Floating','1','1','20','-90','back-out');
            createDefScenario('Floating Conics','1.5','0','0.03',[0,1,2,3,4],[0]);
            resetSelectedItems();
            break;
          case 5:
            clearLists();
            createDefActors(6,'Square','square','10','50','50','rgba(166,3,17,1)','2','rgba(0,0,0,0)');
            var actors=svgCircusSrvc.getActors();
            actors[0].dx='1';
            actors[1].dx='10';
            actors[2].dx='20';
            actors[3].dx='30';
            actors[4].dx='40';
            actors[5].dx='50';

            createDefTrickFade('Fading','in-out','0.6','0.9','expo-out');
            createDefScenario('Tunnel','1','0','0.2',[0,1,2,3,4,5],[0]);
            resetSelectedItems();
            break;
          case 6:
            clearLists();
            createDefActors(5,'Square','square','10','50','50','rgba(166,3,17,1)','1','rgba(242,162,12,1)');
            var actors=svgCircusSrvc.getActors();
            actors[0].cx='20';
            actors[1].cx='35';
            actors[2].cx='50';
            actors[3].cx='65';
            actors[4].cx='80';

            createDefTrickFade('Fading','out-in','0.75','0.9','quad-in-out');
            createDefScenario('Runway','1.4','0','0.1',[0,1,2,3,4],[0]);
            resetSelectedItems();
            break;
          case 7:
            clearLists();
            createDefActors(4,'Circle','circle','14','50','38','rgba(166,3,17,1)','1','rgba(242,162,12,1)');
            var actors=svgCircusSrvc.getActors();
            actors[0].dx='14';
            actors[1].dx='7';
            actors[2].dx='14';
            actors[3].dx='7';

            createDefTrickRunCircle('Main path','1','1','50','90','linear');
            createDefTrickRunCircle('Path modifier','-1','3','25','-90','linear');
            createDefScenario('Running in Arcs','2','0','0.5',[0,1,2,3],[0,1]);
            resetSelectedItems();
            break;
          case 8:
            clearLists();
            createDefActors(2,'Spinner','circle','14','50','50','rgba(166,3,17,1)','7','rgba(0,0,0,0)');
            var actors=svgCircusSrvc.getActors();
            actors[0].dx='25'; actors[0].strokeDashSize='13'; actors[0].strokeDashGaps='13';
            actors[1].dx='50'; actors[1].strokeDashSize='22'; actors[1].strokeDashGaps='30';

            createDefTrickRotate('Spin Clockwise','1','1','linear');
            createDefTrickRotate('Spin Counterclockwise','-1','1','linear');
            createDefScenario('Spin 1','1','0','0',[0],[1]);
            createDefScenario('Spin 2','1','0','0',[1],[0]);
            resetSelectedItems();
            break;
          case 9:
            clearLists();
            createDefActors(7,'Element','polygon','15','50','50','rgba(166,3,17,1)','0','rgba(242,162,12,1)');
            var actors=svgCircusSrvc.getActors();
            actors[0].sides='6'; actors[0].angle='90';
            actors[1].sides='6'; actors[1].angle='90'; actors[1].cx='36';
            actors[2].sides='6'; actors[2].angle='90'; actors[2].cx='64';
            actors[3].sides='6'; actors[3].angle='90'; actors[3].cx='43'; actors[3].cy='62';
            actors[4].sides='6'; actors[4].angle='90'; actors[4].cx='57'; actors[4].cy='62';
            actors[5].sides='6'; actors[5].angle='90'; actors[5].cx='43'; actors[5].cy='38';
            actors[6].sides='6'; actors[6].angle='90'; actors[6].cx='57'; actors[6].cy='38';

            createDefTrickScale('Scaling','to-back','0.8','0.5','0.5','sine-in-out');
            createDefScenario('Living Matter','0.7','0','0.23',[0,1,2,3,4,5,6],[0]);
            resetSelectedItems();
            break;
          case 10:
            clearLists();
            createDefActors(4,'Box','square','15','50','50','rgba(166,3,17,1)','2','rgba(242,162,12,1)');
            var actors=svgCircusSrvc.getActors();
            actors[0].cx='35'; actors[0].cy='65';
            actors[1].cx='65'; actors[1].cy='35';
            actors[2].cx='65'; actors[2].cy='65';
            actors[3].cx='35'; actors[3].cy='35';

            createDefTrickSkew('Pinch NESW','to-back','-15','-15','0.5','0.5','quad-in-out');
            createDefTrickSkew('Pinch NWSE','to-back','15','15','0.5','0.5','quad-in-out');

            createDefTrickRunLine('Move NE', 'middle', '1', '15', '45', 'quad-in-out');
            createDefTrickRunLine('Move SW', 'middle', '1', '15', '225', 'quad-in-out');
            createDefTrickRunLine('Move SE', 'middle', '1', '15', '315', 'quad-in-out');
            createDefTrickRunLine('Move NW', 'middle', '1', '15', '135', 'quad-in-out');

            createDefScenario('Pinching Box 1','0.8','0','0',[0],[0,3]);
            createDefScenario('Pinching Box 2','0.8','0','0',[1],[0,2]);
            createDefScenario('Pinching Box 3','0.8','0','0',[2],[1,4]);
            createDefScenario('Pinching Box 4','0.8','0','0',[3],[1,5]);

            var scenarioItems=svgCircusSrvc.getScenarioItems();
            scenarioItems[0].startAfter='0'; scenarioItems[0].tricks.getItems()[0].end='0.6';
            scenarioItems[1].startAfter='0.2'; scenarioItems[1].tricks.getItems()[0].end='0.6';
            scenarioItems[2].startAfter='0.4'; scenarioItems[2].tricks.getItems()[0].end='0.6';
            scenarioItems[3].startAfter='0.6'; scenarioItems[3].tricks.getItems()[0].end='0.6';

            resetSelectedItems();
            break;
        }

        analyticsSrvc.triggerEvent('preset',scope.currentPreset);

        scope.currentPreset='';
      });

    }
  }
}]);