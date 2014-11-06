'use strict';

svgCircus.factory('ArenaFctr', [function () {
  var Arena=function() {
    this.width='100';
    this.height='100';
    this.previewSize='Auto';
    this.previewBG='rgb(238,238,238)';

    this.helpers={
      'grid1': false,
      'grid2': false,
      'grid3': false,
      'grid4': false
    };
  };

  return Arena;
}]);