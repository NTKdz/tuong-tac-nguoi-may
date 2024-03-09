import React from "react";
import Button from "@mui/material/Button";
import "./styles.css";

export function MyButton({
  onClick,
  style,
  content,
  className,
  id,
  name,
}: {
  onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: React.CSSProperties;
  content: string;
  className?: string;
  id?: string;
  name?: string;
}) {
  return <Button variant="text">Text</Button>;
}
