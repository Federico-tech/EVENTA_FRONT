export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 10000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return num;
  }
};

export const formatShortNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    const result = (num / 1000).toFixed(1);
    if (result >= 1000) {
      return (result / 1000).toFixed(1) + 'M';
    } else {
      return result + 'K';
    }
  } else {
    return num;
  }
};
