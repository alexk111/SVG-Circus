x=function (t) {
  if (t==0) return 0;
  if (t==1) return 1;
  if ((t/=1/2) < 1) return 1/2 * Math.pow(2, 10 * (t - 1));
  return 1/2 * (-Math.pow(2, -10 * --t) + 2);
};