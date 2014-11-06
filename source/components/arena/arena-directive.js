svgCircus.directive('scArena', ['svgCircusSrvc', 'navSrvc', 'jsBuilderSrvc', '$timeout', 'helpersSrvc', 'svgBuilderSrvc', function(svgCircusSrvc, navSrvc, jsBuilderSrvc, $timeout, helpersSrvc, svgBuilderSrvc) {
  return {
    restrict: 'E',
    templateUrl: 'arena/arena-directive.html',
    link: function(scope, element) {
      var previewSVG=document.getElementById('previewSVG');
      scope.svgCircusSrvc=svgCircusSrvc;
      scope.navSrvc=navSrvc;
      scope.svgBuilderSrvc=svgBuilderSrvc;

      scope.sizeOptions=['Auto',300,150,64,32,16];
      scope.sizeOptionWidth=100/scope.sizeOptions.length+'%';

      scope.bgOptions=['rgb(255,255,255)',
                       'rgb(238,238,238)',
                       'rgb(189,189,174)',
                       'rgb(121,121,106)',
                       'rgb(19,19,4)',
                       'rgb(166,3,17)',
                       'rgb(242,162,12)',
                       'rgb(255,255,38)',
                       'rgb(35,140,35)',
                       'rgb(156,206,217)',
                       'rgb(34,54,217)',
                       'rgb(191,22,255)'];
      scope.bgOptionWidth=100/scope.bgOptions.length+'%';
      scope.helpers=svgCircusSrvc.getArena().helpers;
      scope.helpersSrvc=helpersSrvc;

      scope.genPreviewStyle=function() {
        var size=(svgCircusSrvc.getArena().previewSize==='Auto'?'':svgCircusSrvc.getArena().previewSize);
        if(size==='') {
          return {};
        } else {
          size=parseInt(size,10);
          return {
            'width': size+'px',
            'height': size+'px',
            'margin-top': -size/2+'px',
            'margin-left': -size/2+'px'
          }
        }
      };

      scope.buildAttrStrokeDashArray=function(actor){
        var size=parseInt(actor.strokeDashSize,10),
            gaps=parseInt(actor.strokeDashGaps,10)
        if(size!==0 && gaps!==0) {
          return actor.strokeDashSize+' '+actor.strokeDashGaps;
        } else {
          return '';
        }
      }

      scope.rewind=function() {
        previewSVG.setCurrentTime(0);
      };

      scope.pausePlay=function() {
        if(previewSVG.animationsPaused()) {
          previewSVG.unpauseAnimations();
        } else {
          previewSVG.pauseAnimations();
        }
      };

      scope.isPaused=function() {
        return previewSVG.animationsPaused();
      }


      $timeout(function(){
        scope.svgScriptsInit={
          'init': jsBuilderSrvc.generateInit()
        }

        scope.$watch('svgCircusSrvc.getActors()',function(){
          scope.svgScriptsActors={
            'actors': jsBuilderSrvc.generateActors('previewSVG', false)
          }
        }, true);

        scope.$watch('svgCircusSrvc.getTricks()',function(){
          scope.svgScriptsTricks={
            'tricks': jsBuilderSrvc.generateTricks()
          }

          scope.svgScriptsActorsNodeValuesResetterCall={
            'actorsNodeValuesResetterCall': jsBuilderSrvc.generateActorsNodeValuesResetterCall()
          }
        }, true);

        scope.$watch('svgCircusSrvc.getScenarioItems()',function(newval, oldval){
          scope.svgScriptsScenarios={
            'scenarios': jsBuilderSrvc.generateScenarios()
          }

          scope.svgScriptsActorsNodeValuesResetterCall={
            'actorsNodeValuesResetterCall': jsBuilderSrvc.generateActorsNodeValuesResetterCall()
          }
        }, true);

        scope.svgScriptsCircus={
          'circus': jsBuilderSrvc.generateSVGCircus(false)
        };

        scope.svgScriptsActorsNodeRefresher={
          'actorsRefresher': jsBuilderSrvc.generateActorsNodeRefresher()
        };

        scope.svgScriptsActorsNodeValuesResetter={
          'actorsNodeValuesResetter': jsBuilderSrvc.generateActorsNodeValuesResetter()
        }
      });
    }
  }
}]);