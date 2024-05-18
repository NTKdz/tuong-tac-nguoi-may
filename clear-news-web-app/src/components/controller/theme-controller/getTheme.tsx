import {
  charcoalStyles,
  coolBlueStyles,
  deepSeaStyles,
  defaultStyles,
  greenStyles,
  midnightStyles,
  orangeStyles,
  pastelPurpleStyles,
  pinkBlissTheme,
  slateStyles,
} from "../../../theme";
export function getTheme(name: string) {
  switch (name) {
    case "default":
      return defaultStyles;
    case "pinkBliss":
      return pinkBlissTheme;
    case "green":
      return greenStyles;
    case "orange":
      return orangeStyles;
    case "blue":
      return coolBlueStyles;
    case "purple":
      return pastelPurpleStyles;
    case "deepSea":
      return deepSeaStyles;
    case "charcoal":
      return charcoalStyles;
    case "slate":
      return slateStyles;
    case "midnight":
      return midnightStyles;
  }
}
