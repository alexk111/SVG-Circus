x=function(actor, progress) {
  /*
  var __loops=2, __direction=-1, __fnEasing=easingFunctions.easeInOutQuad;
  */
  progress=__fnEasing(progress)%1;
  progress=(progress*__loops)%1;
  progress=progress<0?1+progress:progress;

  var angle=progress*__direction*360 * Math.PI / 180;

  var sM=actor._tMatrix,
      mM0=Math.cos(angle),
      mM1=Math.sin(angle),
      mM2=-Math.sin(angle),
      mM3=Math.cos(angle),
      mM4=-actor.cx*Math.cos(angle)+actor.cy*Math.sin(angle)+actor.cx,
      mM5=-actor.cx*Math.sin(angle)-actor.cy*Math.cos(angle)+actor.cy,
      M0=sM[0]*mM0+sM[2]*mM1,
      M1=sM[1]*mM0+sM[3]*mM1,
      M2=sM[0]*mM2+sM[2]*mM3,
      M3=sM[1]*mM2+sM[3]*mM3,
      M4=sM[0]*mM4+sM[2]*mM5+sM[4],
      M5=sM[1]*mM4+sM[3]*mM5+sM[5];

  actor._tMatrix[0]=M0;
  actor._tMatrix[1]=M1;
  actor._tMatrix[2]=M2;
  actor._tMatrix[3]=M3;
  actor._tMatrix[4]=M4;
  actor._tMatrix[5]=M5;

};