'use strict';

svgCircus.directive('scOptionsScenario', ['svgCircusSrvc', function(svgCircusSrvc) {
  return {
    restrict: 'E',
    templateUrl: 'options/scenario/scenario-directive.html',
    scope: {
      'model': '='
    },
    link: function(scope, element) {
      scope.svgCircusSrvc=svgCircusSrvc;

      scope.addActor=null;
      scope.addTrick=null;

      scope.actorChange=function(actorItem) {
        if(actorItem.actor===null) {
          scope.model.actors.removeItem(actorItem);
        }
      };

      scope.trickChange=function(trickItem, idx) {
        if(trickItem.trick===null) {
          scope.model.tricks.removeItem(trickItem);
        }
      };

      scope.$watch('addActor',function(value){
        if(!!value) {
          scope.model.actors.addItem(scope.addActor);
          scope.addActor=null;
        }
      });

      scope.$watch('addTrick',function(value){
        if(!!value) {
          scope.model.tricks.addItem(scope.addTrick);
          scope.addTrick=null;
        }
      });
    }
  };
}]);