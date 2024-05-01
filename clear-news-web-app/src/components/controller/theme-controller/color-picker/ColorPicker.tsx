import { CSSObject, useTheme } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import React, { useEffect, useRef, useState } from "react";

export default function ColorPicker({
  color,
  onColorChange,
  style,
  disabled = false,
}: {
  color: string;
  onColorChange: (color: string) => void;
  style?: CSSObject;
  disabled?: boolean;
}) {
  const theme = useTheme();
  const [value, setValue] = useState(color);
  const prevMode = useRef(theme.palette.mode);

  useEffect(() => {
    if (prevMode.current === "dark") {
      setValue(color);
    }
    prevMode.current = theme.palette.mode;
  
  }, [color, theme.palette.mode]);

  useEffect(() => {
    const colorTimeout = setTimeout(() => {
      onColorChange(value);
    }, 500);

    return () => clearTimeout(colorTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <MuiColorInput
      disabled={disabled}
      className="color-picker"
      format="hex"
      value={value}
      sx={{
        width: "100%",
        "&.color-picker .MuiColorInput-Popover": {
          zIndex: 100,
        },
        "&.color-picker .MuiColorInput-Button": {
          width: "100px !important",
          height: "40px",
        },
        ...style,
      }}
      onChange={(newValue) => {
        setValue(newValue);
      }}
    />
  );
}
