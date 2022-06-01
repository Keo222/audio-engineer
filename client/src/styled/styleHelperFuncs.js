export const handleColorType = (color) => {
  switch (color) {
    case "1":
      return "#57D2DB";
    case "2":
      return "#9381FF";
    case "3":
      return "#FFAD05";
    default:
      return "#57D2DB";
  }
};
export const handleGlowType = (color) => {
  switch (color) {
    case "1":
      return "rgba(87, 210, 219, 0.8)";
    case "2":
      return "rgba(147, 129, 255, 0.8)";
    case "3":
      return "rgba(255, 173, 5, 0.8)";
    default:
      return "#57D2DB";
  }
};
