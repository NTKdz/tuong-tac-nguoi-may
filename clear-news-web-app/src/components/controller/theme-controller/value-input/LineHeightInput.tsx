import { CSSObject, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function LineHeightInput({
  onChange,
  style,
  type,
  placeholder,
  initValue,
}: {
  onChange?: (e: string) => void;
  style?: CSSObject;
  type?: string;
  placeholder?: string;
  initValue: string;
}) {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    console.log(initValue)
    setValue(initValue);
  }, [initValue]);

  useEffect(() => {
    const valueTimeOut = setTimeout(() => {
      if (parseInt(value) !== 0 && parseInt(value) > 100)
        onChange && onChange(value);
    }, 500);
    return () => clearTimeout(valueTimeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <TextField
      onChange={(e) => {
        if (Number(e.target.value) <= 600 && Number(e.target.value) >= 0) {
          setValue(e.target.value);
        }
      }}
      sx={{ ...style }}
      type={type}
      placeholder={placeholder}
      value={value}
    />
  );
}
