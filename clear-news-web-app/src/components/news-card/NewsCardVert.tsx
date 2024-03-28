import { Box, Paper, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import ImageHolder from "../image-holder/ImageHolder";

export default function NewsCardVert({
  title,
  pictureUrl,
  dateTime,
  style,
  pictureStyle,
  elevation,
}: {
  title: string;
  pictureUrl?: string;
  dateTime?: { date: string; time: string };
  style?: SxProps<Theme> | undefined;
  pictureStyle?: SxProps<Theme> | undefined;
  elevation?: number;
}) {
  return (
    <Paper
      sx={{
        ...style,
      }}
      elevation={elevation || elevation == 0 ? elevation : 1}
    >
      {pictureUrl && (
        <Box sx={pictureStyle ? pictureStyle : { height: "240px" }}>
          <ImageHolder src={pictureUrl} />
        </Box>
      )}

      <Box sx={{ paddingLeft: "8px", paddingRight: "8px" }}>
        <Typography variant="caption">
          {dateTime && dateTime.date + " " + dateTime.time}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Paper>
  );
}
