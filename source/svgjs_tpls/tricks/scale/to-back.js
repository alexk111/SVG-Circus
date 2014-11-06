x=function(actor, progress) {
  /*
  var __factor=2, __fnEasing=easingFunctions.easeInOutQuad;
  */
  progress=__fnEasing(progress)%1;
  progress=progress<0?1+progress:progress;

  var ratio;

  if(progress<=__timing1) {
    ratio=1+((__factor-1)/__timing1)*progress;
  } else if(progress>=__timing2) {
    ratio=__factor-(progress-__timing2)*((__factor-1)/(1-__timing2));
  } else {
    ratio=__factor;
  }

  var sM=actor._tMatrix,
      mM4=-actor.cx*ratio+actor.cx,
      mM5=-actor.cy*ratio+actor.cy,
      M0=sM[0]*ratio,
      M1=sM[1]*ratio,
      M2=sM[2]*ratio,
      M3=sM[3]*ratio,
      M4=sM[0]*mM4+sM[2]*mM5+sM[4],
      M5=sM[1]*mM4+sM[3]*mM5+sM[5];

  actor._tMatrix[0]=M0;
  actor._tMatrix[1]=M1;
  actor._tMatrix[2]=M2;
  actor._tMatrix[3]=M3;
  actor._tMatrix[4]=M4;
  actor._tMatrix[5]=M5;

};