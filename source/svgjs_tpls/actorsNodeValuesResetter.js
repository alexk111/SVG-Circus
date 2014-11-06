var resetActorNodeValues=function() {
  var node, actor;
  var cx, cy, opacity;
  for(var actorId in actors) {
    actor=actors[actorId];
    node=document.getElementById("previewSVG").getElementById(actorId);
    if(!!node) {
      cx=actor.cx;
      cy=actor.cy;
      opacity=actor.opacity;

      node.setAttribute("opacity",opacity);
      node.setAttribute("transform","");
      switch(actor.type) {
        case 'circle':
          node.setAttribute("cx",cx);
          node.setAttribute("cy",cy);
          break;
        case 'square':
          node.setAttribute("x",cx-actor.dx/2);
          node.setAttribute("y",cy-actor.dx/2);
          break;
      }
    }
  }
}

console.log('SVG Circus Node Values Resetter was launched!');
