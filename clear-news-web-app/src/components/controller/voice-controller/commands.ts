/* eslint-disable @typescript-eslint/no-explicit-any */
const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || false;
if (!SpeechRecognition) {
  console.log("not allowed");
}
export const recognition = new SpeechRecognition();

recognition.lang = "vi-VN";

export function executeCommand(command: string) {
  if (command.includes("lên")) {
    window.scrollBy({ top: -100, left: 0, behavior: "smooth" });
  }
  if (command.includes("xuống")) {
    window.scrollBy({ top: 100, left: 0, behavior: "smooth" });
  }
}

export const textToSpeech = window.speechSynthesis || null;

export function colorToHex(colorName: string): string | null {
  console.log(colorName);
  const colorMap: Record<string, string> = {
    // ... (previous colors)

    xanh: "#ADD8E6", // Light Blue
    "xanh cô ban": "#00FFFF", // Cyan
    "xanh ngọc bích": "#007FFF", // Deep Sky Blue
    "lam nhạt": "#9400D3", // Dark Violet
    "tím hoa sim": "#C39797", // Pale Violet Red

    đỏ: "#800000", // Maroon
    "đỏ burgundy": "#800020", // Burgundy
    "san hô": "#FF7F50", // Coral
    đào: "#FFB6C1", // Light Pink
    "mận chín": "#660066", // Purple

    "vàng mơ": "#FFEFD5", // Papaya Whip
    "vàng chanh": "#FFF8DC", // Cornsilk
    "vàng đồng": "#B87333", // Copper
    "vàng đất": "#DAA520", // Goldenrod

    "tím oải hương": "#B57EDC", // Lavender Blush
    "tím lavender": "#E6E6FA", // Lavender
    tím: "#483D8B", // Dark Slate Blue
    "tím than": "#2F4F4F", // Dark Slate Gray

    "xanh bạc hà": "#98FB98", // Pale Green
    "xanh lục": "#32CD32", // Lime Green
    "xanh chuối": "#80FF00", // Chartreuse
    "xanh rêu đậm": "#6B8E23", // Olive Drab

    nâu: "#6F4E37", // Coffee
    "nâu hạt dẻ": "#8B4513", // Saddle Brown
    "nâu sô cô la": "#7B3F00", // Chocolate
    "nâu xám": "#A9A9A9", // Dark Gray

    kem: "#FFFDD0", // Cream
    ngà: "#F8F8FF", // Ghost White

    hồng: "#FFC0CB", // Pink (hồng cơ bản)
    "hồng phấn": "#FFB6C1", // Light Pink (hồng phấn)
    "hồng đào": "#FFDAB9", // Peach Puff (hồng đào)
    "hồng san hô": "#F08080", // Light Coral (hồng san hô)
    "hồng đậm": "#FF1493", // Deep Pink (hồng đậm)
    "hồng neon": "#FF69B4", // Hot Pink (hồng neon)
    "hồng fuchsia": "#FF00FF", // Fuchsia (hồng fuchsia)
    "hồng cánh sen": "#DE3163", // Cerise (hồng cánh sen)
    "hồng rose": "#FF007F", // Rose (hồng rose)

    // ... (and many more!)
  };

  const normalizedColorName = colorName.toLowerCase().trim(); // Normalize for lookup

  const hexCode = colorMap[normalizedColorName];

  if (hexCode) {
    return hexCode;
  } else {
    // Handle unknown colors
    console.warn(`Unknown color: ${colorName}`);
    return null; // Or a default color like "#000000"
  }
}
