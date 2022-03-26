export const getViews = (views) =>
  views > 1000000
    ? (views / 1000000).toFixed(1) + "M+"
    : views > 1000
    ? (views / 1000).toFixed(1) + "K+"
    : views;
