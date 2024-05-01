import { CSSObject, TextField } from "@mui/material";
import { useEffect, useState } from "react";
export default function ValueInput({
  onChange,
  style,
  type,
  placeholder,
  initValue,
}: {
  onChange?: (e: number) => void;
  style?: CSSObject;
  type?: string;
  placeholder?: string;
  initValue: number;
}) {
  const [value, setValue] = useState(initValue);
  
  useEffect(() => {
    setValue(initValue); 
  }, [initValue]);

  useEffect(() => {
    const valueTimeOut = setTimeout(() => {
      if (value !== 0 && value > 3) onChange && onChange(value);
    }, 500);
    return () => clearTimeout(valueTimeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <TextField
      onChange={(e) => {
        if (Number(e.target.value) <= 30 && Number(e.target.value) >= 0) {
          setValue(Number(e.target.value));
          console.log("dfasfa");
        }
      }}
      sx={{ ...style }}
      type={type}
      placeholder={placeholder}
      value={value}
    />
  );
}
