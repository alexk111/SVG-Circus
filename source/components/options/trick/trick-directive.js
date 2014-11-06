'use strict';

svgCircus.directive('scOptionsTrick', ['svgCircusSrvc', function(svgCircusSrvc) {
  return {
    restrict: 'E',
    templateUrl: 'options/trick/trick-directive.html',
    scope: {
      'model': '='
    },
    link: function(scope, element) {
      scope.svgCircusSrvc=svgCircusSrvc;
    }
  };
}]);