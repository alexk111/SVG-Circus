'use strict';

svgCircus.directive('scOptionsActor', ['svgCircusSrvc', 'helpersSrvc', function(svgCircusSrvc, helpersSrvc) {
  return {
    restrict: 'E',
    templateUrl: 'options/actor/actor-directive.html',
    scope: {
      'model': '='
    },
    link: function(scope, element) {
      scope.svgCircusSrvc=svgCircusSrvc;
      scope.helpersSrvc=helpersSrvc;
    }
  };
}]);