import { RGBColor } from "react-color";

export const colorToRGBA = (c: RGBColor) =>
  `rgba(${c.r},${c.g},${c.b},${c.a ? c.a : 1})`;
