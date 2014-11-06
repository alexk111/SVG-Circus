x=function (t) {
  var s = 1.70158;
  if ((t/=1/2) < 1) return 1/2*(t*t*(((s*=(1.525))+1)*t - s));
  return 1/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2);
};