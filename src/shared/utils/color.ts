export const getColor = (hue: number, saturation: number = 100, lightness: number = 40, opacity: number = 1): string => {
  const hueRange = 360;

  return `hsla(${hue % hueRange}, ${saturation}%, ${lightness}%, ${opacity})`;
};