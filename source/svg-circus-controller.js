'use strict';

svgCircus.controller('svgCircusCtrl', ['$scope', '$rootScope', '$compile', 'svgCircusSrvc', '$modal', 'svgBuilderSrvc', 'analyticsSrvc', function($scope, $rootScope, $compile, svgCircusSrvc, $modal, svgBuilderSrvc, analyticsSrvc) {


  $scope.exportSVG=function() {
    $modal.open({
      windowClass: 'modal-exportSVG',
      size: 'lg',
      controller: function ($scope, $modalInstance, svg) {
        $scope.svg=svg.svg;
      },
      resolve: {
        svg: function () {
          return {
            svg:  svgBuilderSrvc.generateExport()
          };
        }
      },
      templateUrl: 'modals/export-svg.html'
    });

    analyticsSrvc.triggerEvent('export','open');

  };

  $scope.appLoaded=true;

}]);
