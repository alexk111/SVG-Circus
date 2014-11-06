'use strict';

svgCircus.directive('scNav', ['navSrvc', 'svgCircusSrvc', function(scNavService, svgCircusSrvc) {
  return {
    restrict: 'E',
    templateUrl: 'nav/nav-directive.html',
    link: function(scope, element) {
      scope.navService=scNavService;
      scope.svgCircusSrvc=svgCircusSrvc;

      scope.dragActorListeners = {
          accept: function (sourceItemHandleScope, destSortableScope) {return true},
          dragEnd: function(event) {},
          itemMoved: function (event) {},
          orderChanged: function(event) {},
          containment: '#scNav_sub_actors'
      };

      scope.dragTrickListeners = {
          accept: function (sourceItemHandleScope, destSortableScope) {return true},
          dragEnd: function(event) {},
          itemMoved: function (event) {},
          orderChanged: function(event) {},
          containment: '#scNav_sub_tricks'
      };

      scope.dragScenarioListeners = {
          accept: function (sourceItemHandleScope, destSortableScope) {return true},
          dragEnd: function(event) {},
          itemMoved: function (event) {},
          orderChanged: function(event) {},
          containment: '#scNav_sub_scenarios'
      };
    }
  };
}]);