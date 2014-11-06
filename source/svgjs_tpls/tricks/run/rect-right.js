x=function(actor, progress) {
  /*
  var __rectX=80, __rectY=50, __loops=2, __direction=-1, __fnEasing=easingFunctions.easeInOutQuad;
  */
  progress=__fnEasing(progress)%1;
  progress=(progress*__loops)%1;
  progress=progress<0?1+progress:progress;

  var node=actor.node, cx, cy;
  if(progress<0.125) {
    cx=0;
    cy=(progress*8)*(__rectY/2)*__direction;
  } else if(progress<0.375) {
    cx=-(progress-0.125)*4*__rectX;
    cy=(__rectY/2)*__direction;
  } else if(progress<0.625) {
    cx=-__rectX;
    cy=((__rectY/2)-(progress-0.375)*4*__rectY)*__direction;
  } else if(progress<0.875) {
    cx=-(__rectX-(progress-0.625)*4*__rectX);
    cy=-(__rectY/2)*__direction;
  } else {
    cx=0;
    cy=-(__rectY/2-(progress-0.875)*8*(__rectY/2))*__direction;
  }
  actor._tMatrix[4]+=cx;
  actor._tMatrix[5]+=cy;
};
