x=function(actor, progress) {
  /*
  var __timing1=0.1, __timing2=0.9, __fnEasing=easingFunctions.easeInOutQuad;
  */
  progress=__fnEasing(progress)%1;
  progress=progress<0?1+progress:progress;
  var node=actor.node;

  if(progress<=__timing1) {
    node.setAttribute("opacity",actor.opacity-progress*(actor.opacity/__timing1));
  } else if(progress>=__timing2) {
    node.setAttribute("opacity",(progress-__timing2)*(actor.opacity/(1-__timing2)));
  } else {
    node.setAttribute("opacity",0);
  }
};