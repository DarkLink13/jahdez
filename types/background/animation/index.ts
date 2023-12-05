export type IBackgroundAnimation = {
  [key in number]: IBackgroundAnimationValue;
} & {
  0: Omit<IBackgroundAnimationValue, "fill"> & {
    fill: BackgroundAnimationValueFill;
  };
} & {
  100: Omit<IBackgroundAnimationValue, "fill"> & {
    fill: BackgroundAnimationValueFill;
  };
};
