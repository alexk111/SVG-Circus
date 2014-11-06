'use strict';

svgCircus.service('svgCircusSrvc', ['ActorListFctr', 'TrickListFctr', 'ScenarioListFctr', 'ArenaFctr', function(ActorListFctr, TrickListFctr, ScenarioListFctr, ArenaFctr) {
  var arena=new ArenaFctr();
  var actorList=new ActorListFctr();
  var trickList=new TrickListFctr();
  var scenarioList=new ScenarioListFctr();

  /* ARENA */

  this.getArena=function() {
    return arena;
  };

  /* ACTORS */

  this.getSelectedActor=function() {
    return actorList.getSelectedItem();
  };

  this.setSelectedActor=function(actor) {
    actorList.setSelectedItem(actor);
  };

  this.getActors=function() {
    return actorList.getItems();
  };

  this.getActorList=function() {
    return actorList;
  };

  this.addActor=function() {
    return actorList.addActor();
  };

  this.duplicateActor=function(actor) {
    return actorList.duplicateActor(actor);
  };

  this.removeActor=function(actor) {
    scenarioList.removeActor(actor);
    return actorList.removeItem(actor);
  };

  this.clearActors=function() {
    actorList.clear();
  };

  /* TRICKS */

  this.getSelectedTrick=function() {
    return trickList.getSelectedItem();
  };

  this.setSelectedTrick=function(trick) {
    trickList.setSelectedItem(trick);
  };

  this.getTricks=function() {
    return trickList.getItems();
  };

  this.getTrickList=function() {
    return trickList;
  };

  this.addTrick=function() {
    return trickList.addItem();
  };

  this.duplicateTrick=function(trick) {
    return trickList.duplicateItem(trick);
  };

  this.removeTrick=function(trick) {
    scenarioList.removeTrick(trick);
    return trickList.removeItem(trick);
  };

  this.clearTricks=function() {
    trickList.clear();
  };

  /* SCENARIO */

  this.getSelectedScenarioItem=function() {
    return scenarioList.getSelectedItem();
  };

  this.setSelectedScenarioItem=function(item) {
    scenarioList.setSelectedItem(item);
  };

  this.getScenarioItems=function() {
    return scenarioList.getItems();
  };

  this.getScenarioList=function() {
    return scenarioList;
  };

  this.addScenarioItem=function() {
    return scenarioList.addItem();
  };

  this.duplicateScenarioItem=function(item) {
    return scenarioList.duplicateItem(item);
  };

  this.removeScenarioItem=function(item) {
    return scenarioList.removeItem(item);
  };

  this.clearScenarioItems=function() {
    scenarioList.clear();
  };

}]);