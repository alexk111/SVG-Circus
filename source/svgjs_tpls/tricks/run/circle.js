x=function(actor, progress) {
  /*
  var __startAngle=-90, __circleR=30, __loops=3, __direction=1, __fnEasing=easingFunctions.easeInOutQuad;
  */
  progress=__fnEasing(progress)%1;
  progress=(progress*__loops)%1;
  progress=progress<0?1+progress:progress;
  var node=actor.node;

  var cx = -__circleR * Math.cos(__startAngle * Math.PI / 180);
  var cy = __circleR * Math.sin(__startAngle * Math.PI / 180);
  cx = cx + __circleR * Math.cos((__startAngle-360*progress*__direction) * Math.PI / 180);
  cy = cy - __circleR * Math.sin((__startAngle-360*progress*__direction) * Math.PI / 180);

  actor._tMatrix[4]+=cx;
  actor._tMatrix[5]+=cy;
};