/*************************************************************
                CIRCUS BEGINS
**************************************************************/

var _reqAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;

var fnTick=function(timePassed) {
  var iActor, lenActors, actor,
      iTrick, lenTricks,
      scenario,
      sKey, aKey,
      sTimePassed, sProgress,
      iterationDuration,
      trickInfo, tProgress;

  for(aKey in actors) {
    actors[aKey]._tMatrix=[1,0,0,1,0,0];
  }

  for(sKey in scenarios) {
    scenario=scenarios[sKey];

    // Find progress within Scenario
    sTimePassed=timePassed-scenario.startAfter; // Time Passed since Scenario's start

    // Process Actors
    for(iActor=0,lenActors=scenario.actors.length;iActor<lenActors;iActor++) {
      actor=actors[scenario.actors[iActor]];
      if(!!actor && !!actor.node && !!actor._tMatrix) {
        // Turn Scenario's Time Passed into Scenario's progress (0<=X<=1)
        sProgress=0;
        if(sTimePassed>=0) {
          iterationDuration=scenario.duration+scenario.repeatDelay;
          if(scenario.repeat>0 && sTimePassed>iterationDuration*scenario.repeat) {
            sProgress=1;
          }
          sProgress+=(sTimePassed % iterationDuration)/scenario.duration;
        }

        // Apply tricks
        for(iTrick=0, lenTricks=scenario.tricks.length;iTrick<lenTricks;iTrick++) {
          trickInfo=scenario.tricks[iTrick];
          // Calculate Trick's progress (0<=X<=1)
          tProgress=(sProgress-trickInfo.start)*(1/(trickInfo.end-trickInfo.start));

          // Apply Trick to Actor
          if(tricks[trickInfo.trick]) {
            tricks[trickInfo.trick](actor,Math.max(0,Math.min(1,tProgress)));
          }
        }
      }

      // Apply Delay for the next actor
      sTimePassed-=scenario.actorDelay;
    }
  }

  for(aKey in actors) {
    actor=actors[aKey];
    if(!!actor && !!actor.node && !!actor._tMatrix) {
      actor.node.setAttribute('transform','matrix('+actor._tMatrix.join()+')');
    }
  }

  _reqAnimFrame(fnTick);
}
_reqAnimFrame(fnTick);

console.log("SVG Circus Handler was launched!");
