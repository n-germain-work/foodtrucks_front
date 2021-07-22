function convertRad(input) {
  return (Math.PI * input) / 180;
}

function distance(latA, lonA, latB, lonB) {
  const R = 6378000;

  const radLatA = convertRad(latA);
  const radLonA = convertRad(lonA);
  const radLatB = convertRad(latB);
  const radLonB = convertRad(lonB);

  const d =
    R *
    (Math.PI / 2 -
      Math.asin(
        Math.sin(radLatB) * Math.sin(radLatA) +
          Math.cos(radLonB - radLonA) * Math.cos(radLatB) * Math.cos(radLatA)
      ));
  return Math.floor(d);
}

export default distance;
