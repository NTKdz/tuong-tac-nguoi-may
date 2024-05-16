import { defaultStyles } from "../../../theme";
export function getTheme(name: string) {
  console.log(name);
  switch (name) {
    case "default":
      return defaultStyles;
    // case "pinkBliss":
    //   return pinkBlissTheme;
  }
}
