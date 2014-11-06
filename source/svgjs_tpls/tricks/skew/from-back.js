x=function(actor, progress) {
  /*
  var __skewX=90, __skewY=90, __fnEasing=easingFunctions.easeInOutQuad;
  */
  progress=__fnEasing(progress)%1;
  progress=progress<0?1+progress:progress;

  var angleX, angleY;

  if(progress<=__timing1) {
    angleX=__skewX-progress*(__skewX/__timing1);
    angleY=__skewY-progress*(__skewY/__timing1);
  } else if(progress>=__timing2) {
    angleX=(progress-__timing2)*(__skewX/(1-__timing2));
    angleY=(progress-__timing2)*(__skewY/(1-__timing2));
  } else {
    angleX=0;
    angleY=0;
  }

  angleX*=Math.PI / 180;
  angleY*=Math.PI / 180;


  var sM=actor._tMatrix,
      mM1=Math.tan(angleY),
      mM2=Math.tan(angleX),
      mM4=-actor.cy*Math.tan(angleX),
      mM5=-actor.cx*Math.tan(angleY),
      M0=sM[0]+sM[2]*mM1,
      M1=sM[1]+sM[3]*mM1,
      M2=sM[0]*mM2+sM[2],
      M3=sM[1]*mM2+sM[3],
      M4=sM[0]*mM4+sM[2]*mM5+sM[4],
      M5=sM[1]*mM4+sM[3]*mM5+sM[5];

  actor._tMatrix[0]=M0;
  actor._tMatrix[1]=M1;
  actor._tMatrix[2]=M2;
  actor._tMatrix[3]=M3;
  actor._tMatrix[4]=M4;
  actor._tMatrix[5]=M5;
};