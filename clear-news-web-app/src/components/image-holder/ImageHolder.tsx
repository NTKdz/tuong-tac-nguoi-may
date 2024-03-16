import { Box, SxProps, Theme } from "@mui/material";
import React from "react";

export default function ImageHolder({
  src,
  style = {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius:"8px"
  },
}: {
  src: string;
  style?: SxProps<Theme>;
}) {
  return <Box component="img" src={src} sx={style} />;
}
