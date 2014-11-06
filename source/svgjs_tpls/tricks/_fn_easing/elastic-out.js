x=function (t) {
  var s=1.70158;var p=0;var a=1;
  if (t==0) return 0;  if (t==1) return 1;  if (!p) p=.3;
  if (a < Math.abs(1)) { a=1; var s=p/4; }
  else var s = p/(2*Math.PI) * Math.asin (1/a);
  return a*Math.pow(2,-10*t) * Math.sin( (t-s)*(2*Math.PI)/p ) + 1;
};