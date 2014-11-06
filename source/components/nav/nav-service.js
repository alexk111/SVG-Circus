'use strict';

svgCircus.service('navSrvc', ['analyticsSrvc', function(analyticsSrvc) {
  var navSelectedIdx;
  var navItems=[{
    'title': 'Actors',
    'id': 'actors'
  },{
    'title': 'Tricks',
    'id': 'tricks'
  },{
    'title': 'Scenario',
    'id': 'scenario'
  }];

  this.getNavItems=function(){
    return navItems;
  };

  this.getNavSelected=function() {
    return navItems[navSelectedIdx];
  };

  this.getNavSelectedId=function() {
    return navItems[navSelectedIdx].id;
  };

  this.getNavSelectedIdx=function() {
    return navSelectedIdx;
  };
  this.setNavSelectedIdx=function(newval) {
    navSelectedIdx=newval;
    analyticsSrvc.triggerEvent('nav',navItems[navSelectedIdx].id);
  };

  this.setNavSelectedIdx(0);
}]);