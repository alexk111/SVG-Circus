'use strict';

svgCircus.service('analyticsSrvc', ['$window', function($window) {
  var triggerEvent=function(category, action, label, value) {
    if($window.ga) {
      $window.ga('send', 'event', category, action, label, value);
    }
  };

  this.triggerEvent=function(category, action, label, value) {
    triggerEvent(category, action, label, value);
  };
}]);