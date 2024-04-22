export function getContrastColor(color: string) {
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r / 255, g / 255, b / 255]; 
  };

  const rgb = hexToRgb(color);
  const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  console.log(luminance);
  return luminance > 0.5 ? "dark" : "light";
}
