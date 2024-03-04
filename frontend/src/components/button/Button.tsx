import React from "react";
import "./styles.css";
export function Button({
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
  return (
    <button
      onClick={onClick}
      className={`button-style ${className ? className : ""}`}
      id={id}
      type="button"
      style={style}
      name={name}
    >
      {content}
    </button>
  );
}
