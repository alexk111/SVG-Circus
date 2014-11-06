(function() {
  var MODULE_NAME, SLIDER_TAG, angularize, gap, halfWidth, hide, inputEvents, module, offset, offsetLeft, pixelize, qualifiedDirectiveDefinition, roundStep, show, sliderDirective, width;

  MODULE_NAME = 'ui.slider';

  SLIDER_TAG = 'slider';

  angularize = function(element) {
    return angular.element(element);
  };

  pixelize = function(position) {
    return "" + position + "px";
  };

  hide = function(element) {
    return element.css({
      opacity: 0
    });
  };

  show = function(element) {
    return element.css({
      opacity: 1
    });
  };

  offset = function(element, position) {
    return element.css({
      left: position
    });
  };

  halfWidth = function(element) {
    return element[0].offsetWidth / 2;
  };

  offsetLeft = function(element) {
    return element[0].offsetLeft;
  };

  width = function(element) {
    return element[0].offsetWidth;
  };

  gap = function(element1, element2) {
    return offsetLeft(element2) - offsetLeft(element1) - width(element1);
  };

  roundStep = function(value, precision, step, floor) {
    var decimals, remainder, roundedValue, steppedValue;
    if (floor == null) {
      floor = 0;
    }
    if (step == null) {
      step = 1 / Math.pow(10, precision);
    }
    remainder = (value - floor) % step;
    steppedValue = remainder > (step / 2) ? value + step - remainder : value - remainder;
    decimals = Math.pow(10, precision);
    roundedValue = steppedValue * decimals / decimals;
    return roundedValue.toFixed(precision);
  };

  inputEvents = {
    mouse: {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup'
    },
    touch: {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend'
    }
  };

  sliderDirective = function($timeout) {
    return {
      restrict: 'E',
      scope: {
        floor: '@',
        ceiling: '@',
        values: '=?',
        range: '@',
        step: '@',
        highlight: '@',
        precision: '@',
        buffer: '@',
        dragstop: '@',
        ngModel: '=?',
        ngModelLow: '=?',
        ngModelHigh: '=?'
      },
      template: '<div class="bar"><div class="selection"></div></div>\n<div class="handle low"></div><div class="handle high"></div>\n<div class="bubble limit low">{{ values.length ? ( values[floor || 0] || floor ) : floor }}</div>\n<div class="bubble limit high">{{ values.length ? ( values[ceiling || values.length - 1] || ceiling ) : ceiling }}</div>\n<div class="bubble value low">{{ values.length ? ( values[local.ngModelLow || local.ngModel] || local.ngModelLow || local.ngModel ) : local.ngModelLow || local.ngModel}}</div>\n<div class="bubble value high">{{ values.length ? ( values[local.ngModelHigh] || local.ngModelHigh ) : local.ngModelHigh }}</div>',
      link: function(scope, element, attributes) {
        var bar, ceilBub, e, flrBub, high, highBub, low, lowBub, maxPtr, minPtr, range, selection, watchables, _i, _len, _ref, _ref1;
        range = (attributes.ngModel == null) && (attributes.ngModelLow != null) && (attributes.ngModelHigh != null);
        low = range ? 'ngModelLow' : 'ngModel';
        high = 'ngModelHigh';
        watchables = ['floor', 'ceiling', 'values', low];
        if (range) {
          watchables.push(high);
        }

        var _ref = (function() {
          var _i, _len, _ref, _results;
          _ref = element.children();
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            e = _ref[_i];
            _results.push(angularize(e));
          }
          return _results;
        })();
        bar = _ref[0],
        minPtr = _ref[1],
        maxPtr = _ref[2],
        flrBub = _ref[3],
        ceilBub = _ref[4],
        lowBub = _ref[5],
        highBub = _ref[6],
        selection = angularize(bar.children()[0]);

        if (!range) {
          _ref1 = [maxPtr, highBub];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            var elem = _ref1[_i];
            elem.remove();
          }
          if (!attributes.highlight) {
            selection.remove();
          }
        }


        var barWidth, boundToInputs, dimensions, handleHalfWidth, maxOffset, maxValue, minOffset, minValue, ngDocument, offsetRange, updateDOM, valueRange, w, _j, _len1;
        scope.local = {};
        scope.local[low] = scope[low];
        scope.local[high] = scope[high];
        boundToInputs = false;
        ngDocument = angularize(document);
        handleHalfWidth = barWidth = minOffset = maxOffset = minValue = maxValue = valueRange = offsetRange = void 0;
        dimensions = function() {
          var value, _j, _len1, _ref2;
          if (scope.step == null) {
            scope.step = 1;
          }
          if (scope.floor == null) {
            scope.floor = 0;
          }
          if (scope.precision == null) {
            scope.precision = 0;
          }
          if (!range) {
            scope.ngModelLow = scope.ngModel;
          }
          if ((_ref2 = scope.values) != null ? _ref2.length : void 0) {
            if (scope.ceiling == null) {
              scope.ceiling = scope.values.length - 1;
            }
          }
          scope.local[low] = scope[low];
          scope.local[high] = scope[high];
          for (_j = 0, _len1 = watchables.length; _j < _len1; _j++) {
            value = watchables[_j];
            if (typeof value === 'number') {
              scope[value] = roundStep(parseFloat(scope[value]), parseInt(scope.precision), parseFloat(scope.step), parseFloat(scope.floor));
            }
          }
          handleHalfWidth = halfWidth(minPtr);
          barWidth = width(bar);
          minOffset = 0;
          maxOffset = barWidth - width(minPtr);
          minValue = parseFloat(scope.floor);
          maxValue = parseFloat(scope.ceiling);
          valueRange = maxValue - minValue;
          return offsetRange = maxOffset - minOffset;
        };
        updateDOM = function() {
          var bindToInputEvents, fitToBar, percentOffset, percentToOffset, percentValue, setBindings, setPointers;
          dimensions();
          percentOffset = function(offset) {
            return ((offset - minOffset) / offsetRange) * 100;
          };
          percentValue = function(value) {
            return ((value - minValue) / valueRange) * 100;
          };
          percentToOffset = function(percent) {
            return pixelize(percent * offsetRange / 100);
          };
          fitToBar = function(element) {
            return offset(element, pixelize(Math.min(Math.max(0, offsetLeft(element)), barWidth - width(element))));
          };
          setPointers = function() {
            var newHighValue, newLowValue;
            offset(ceilBub, pixelize(barWidth - width(ceilBub)));
            newLowValue = percentValue(scope.local[low]);
            offset(minPtr, percentToOffset(newLowValue));
            offset(lowBub, pixelize(offsetLeft(minPtr) - (halfWidth(lowBub)) + handleHalfWidth));
            offset(selection, pixelize(offsetLeft(minPtr) + handleHalfWidth));
            switch (true) {
              case range:
                newHighValue = percentValue(scope.local[high]);
                offset(maxPtr, percentToOffset(newHighValue));
                offset(highBub, pixelize(offsetLeft(maxPtr) - (halfWidth(highBub)) + handleHalfWidth));
                return selection.css({
                  width: percentToOffset(newHighValue - newLowValue)
                });
              case attributes.highlight === 'right':
                return selection.css({
                  width: percentToOffset(110 - newLowValue)
                });
              case attributes.highlight === 'left':
                selection.css({
                  width: percentToOffset(newLowValue)
                });
                return offset(selection, 0);
            }
          };
          bindToInputEvents = function(handle, bubble, ref, events) {
            var currentRef, onEnd, onMove, onStart;
            currentRef = ref;
            onEnd = function() {
              bubble.removeClass('active');
              handle.removeClass('active');
              ngDocument.unbind(events.move);
              ngDocument.unbind(events.end);
              if (scope.dragstop) {
                scope[high] = scope.local[high];
                scope[low] = scope.local[low];
              }
              return currentRef = ref;
            };
            onMove = function(event) {
              var eventX, newOffset, newPercent, newValue;
              eventX = event.clientX || event.touches[0].clientX;
              newOffset = eventX - element[0].getBoundingClientRect().left - handleHalfWidth;
              newOffset = Math.max(Math.min(newOffset, maxOffset), minOffset);
              newPercent = percentOffset(newOffset);
              newValue = minValue + (valueRange * newPercent / 100.0);
              if (range) {
                switch (currentRef) {
                  case low:
                    if (newValue > scope.local[high]) {
                      currentRef = high;
                      minPtr.removeClass('active');
                      lowBub.removeClass('active');
                      maxPtr.addClass('active');
                      highBub.addClass('active');
                      setPointers();
                    } else if (scope.buffer > 0) {
                      newValue = Math.min(newValue, scope.local[high] - scope.buffer);
                    }
                    break;
                  case high:
                    if (newValue < scope.local[low]) {
                      currentRef = low;
                      maxPtr.removeClass('active');
                      highBub.removeClass('active');
                      minPtr.addClass('active');
                      lowBub.addClass('active');
                      setPointers();
                    } else if (scope.buffer > 0) {
                      newValue = Math.max(newValue, parseInt(scope.local[low]) + parseInt(scope.buffer));
                    }
                }
              }
              newValue = roundStep(newValue, parseInt(scope.precision), parseFloat(scope.step), parseFloat(scope.floor));
              scope.local[currentRef] = newValue;
              if (!scope.dragstop) {
                scope[currentRef] = newValue;
              }
              setPointers();
              return scope.$apply();
            };
            onStart = function(event) {
              dimensions();
              bubble.addClass('active');
              handle.addClass('active');
              setPointers();
              event.stopPropagation();
              event.preventDefault();
              ngDocument.bind(events.move, onMove);
              return ngDocument.bind(events.end, onEnd);
            };
            return handle.bind(events.start, onStart);
          };
          setBindings = function() {
            var bind, inputMethod, _j, _len1, _ref2, _results;
            boundToInputs = true;
            bind = function(method) {
              bindToInputEvents(minPtr, lowBub, low, inputEvents[method]);
              return bindToInputEvents(maxPtr, highBub, high, inputEvents[method]);
            };
            _ref2 = ['touch', 'mouse'];
            _results = [];
            for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
              inputMethod = _ref2[_j];
              _results.push(bind(inputMethod));
            }
            return _results;
          };
          if (!boundToInputs) {
            setBindings();
          }
          return setPointers();
        };
        $timeout(updateDOM);
        for (_j = 0, _len1 = watchables.length; _j < _len1; _j++) {
          w = watchables[_j];
          scope.$watch(w, updateDOM, true);
        }
        return window.addEventListener("resize", updateDOM);
      }
    };
  };

  qualifiedDirectiveDefinition = ['$timeout', sliderDirective];

  module = function(window, angular) {
    return angular.module(MODULE_NAME, []).directive(SLIDER_TAG, qualifiedDirectiveDefinition);
  };

  module(window, window.angular);

}).call(this);