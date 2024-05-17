import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

interface MouseEventWithPage extends MouseEvent {
  pageX: number;
  pageY: number;
}

export default function GlowCursor() {
  const [xp, setXp] = useState(0);
  const [yp, setYp] = useState(0);

  const theme = useTheme();
  useEffect(() => {
    document.addEventListener("mousemove", (e: MouseEventWithPage) => {
      setTimeout(() => {
        setXp(e.pageX);
        setYp(e.pageY);
      }, 100);
    });
  }, []);

  return (
    <Box
      className="cursor-element"
      sx={{
        position: "absolute",
        top: yp,
        left: xp,
        width: 4,
        height: 4,
        backgroundColor: theme.palette.primary.main,
        transform: "translate(-50%, -50%)",
        zIndex: 100000,
        pointerEvents: "none",
        borderRadius: "50%",
        boxShadow: `0 0 20px 16px ${theme.palette.primary.main}`,
      }}
    ></Box>
  );
}
