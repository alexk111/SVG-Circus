'use strict';

svgCircus
  .directive('sanitizeInput', ['$parse', function($parse) {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) return;

        switch(attrs.sanitizeInput) {
          case 'integer':
            ngModel.$parsers.unshift(function(viewValue) {
              var val=parseInt(viewValue,10);
              if(isNaN(val)) {
                val=ngModel.$modelValue;
              }
              return val.toString();
            });
            break;
          case 'float':
            ngModel.$parsers.unshift(function(viewValue) {
              var val=parseFloat(viewValue);
              if(isNaN(val)) {
                val=ngModel.$modelValue;
              }
              return val.toString();
            });
            break;
        }
      }
    };
  }]);

