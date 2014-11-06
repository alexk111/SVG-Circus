var fnTick2=function() {
  for(var actorId in actors) {
    actors[actorId].node=document.getElementById("previewSVG").getElementById(actorId);
  }
  _reqAnimFrame(fnTick2);
}
_reqAnimFrame(fnTick2);

console.log('SVG Circus Refresher was launched!');
