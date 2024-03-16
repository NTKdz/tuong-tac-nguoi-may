import { Box, Typography } from "@mui/material";
import React from "react";
import "./styles.css";
import ImageHolder from "../../../image-holder/ImageHolder";
export default function NewsCard({
  title,
  pictureUrl,
  dateTime,
}: {
  title: string;
  pictureUrl: string;
  dateTime: { date: string; time: string };
}) {
  return (
    <Box>
      <Box sx={{ height: "152px" }}>
        <ImageHolder src={pictureUrl} />
      </Box>

      <Box sx={{ paddingLeft: "8px", paddingRight: "8px" }}>
        <Typography variant="caption">
          {dateTime.date + " " + dateTime.time}
        </Typography>
        <Typography
          variant="body1"
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
    </Box>
  );
}
