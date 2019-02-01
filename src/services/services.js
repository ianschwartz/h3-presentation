import h3 from "h3-js";

export const getColor = (val, resolution) => {
  const num = val / (16 - resolution) * 3;
  if (num > 24) return '#FAC9AA';
  if (num > 20) return '#F6C988';
  if (num > 16) return '#F1D466';
  if (num > 14) return '#ECE944';
  if (num > 12) return '#C3E522';
  if (num > 10) return '#8EDD00';
  if (num > 8) return '#4CB400';
  if (num > 6) return '#1A8900';
  if (num > 4) return '#005D00';
  if (num >= 2) return '#113300';
  return '#010';
};

export const bucketLights = (data, resolution) => data.reduce((obj, item) => {
  const hex = h3.geoToH3(item.latlng[0], item.latlng[1], resolution);
  if (obj[hex]) {
    obj[hex].push(item);
  } else {
    obj[hex] = [item];
  }
  return obj;
}, {});
