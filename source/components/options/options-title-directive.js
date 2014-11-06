'use strict';

svgCircus.directive('scOptionsTitle', ['$timeout', function($timeout) {
  return {
    restrict: 'E',
    templateUrl: 'options/options-title-directive.html',
    scope: {
      'model': '='
    },
    link: function(scope, element) {
      scope.isEditTitle=false;
      scope.doEditTitle=function(e) {
        scope.isEditTitle=true;
        console.log(e);
        $timeout(function(){
          var inputNode=e.target.nextElementSibling;
          inputNode.focus();
          inputNode.select();
        });
      };
      scope.endEditTitle=function() {
        scope.isEditTitle=false;
      };
    }
  };
}]);