import React from "react";
import "./styles.css";
export default function Input({
  onchange,
  style,
  type,
  placeholder,
}: {
  onchange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  type?: string;
  placeholder?: string;
}) {
  return (
    <input
      className="input-style"
      onChange={onchange}
      style={style}
      type={type}
      placeholder={placeholder}
    />
  );
}
