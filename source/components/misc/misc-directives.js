'use strict';

svgCircus
  .directive('buttonFilePicker', function() {
      return {
          restrict: 'E',
          transclude: true,
          template: '<button class="btn btn-file"><span ng-transclude></span> <input type="file" data-ng-attr-accept="{{fileAccept}}"></button>',
          scope: {
            'fileAccept': '@',
            'onFilePick': '&filePick'
          },
          replace: true,
          link: function(scope, element, attr, ctrl) {
              var onChange = function(e) {
                  var file=e.currentTarget.files[0];
                  scope.$apply(scope.onFilePick({file: file, $event: e}));
                  element.find('input').replaceWith( element.find('input').clone( true ) );
              };
              element.find('input').bind('change', onChange);
          }
      };
  })
  .directive('selectTextOnClick', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.on('click', function () {
          this.select();
        });
      }
    };
  })
  .directive('svgViewbox', function() {
    return {
      link: function(scope, element, attrs) {
        attrs.$observe('svgViewbox', function(value) {
          element.attr('viewBox', value);
        })
      }
    };
  })
  .directive('jsExecutor', function() {
    return {
      restrict: "E",
      scope: {
        scripts: "="
      },
      link: function(scope,element) {
        scope.$watch("scripts", function (scripts) {
          element.empty();
          angular.forEach(scripts, function (source, key) {
            var scriptTag = angular.element(document.createElement("script"));
            source = "//@ sourceURL=" + key + "\n" + source;
            scriptTag.text(source)
            element.append(scriptTag);
          });
        });
      }
    };
  })
  .directive('script', function() {
    return {
      restrict: 'E',
      scope: false,
      link: function(scope, elem, attr) {
        if (attr.type === 'text/svgcircus-script') {
          var code = elem.text();
          var f = new Function(code);
          setTimeout(f,1000);
        }
      }
    };
  });