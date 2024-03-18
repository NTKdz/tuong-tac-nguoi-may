import { Box, SxProps, Typography } from "@mui/material";
import React from "react";
import "./styles.css";
import ImageHolder from "../../../image-holder/ImageHolder";
import { Variant } from "@mui/material/styles/createTypography";
export default function NewsCard({
  title,
  pictureUrl,
  dateTime,
  pictureStyle,
  fontSize,
}: {
  title: string;
  pictureUrl: string;
  dateTime: { date: string; time: string };
  pictureStyle?: SxProps;
  fontSize?: Variant;
}) {
  return (
    <Box>
      <Box sx={pictureStyle ? pictureStyle : { height: "152px" }}>
        <ImageHolder src={pictureUrl} />
      </Box>

      <Box sx={{ paddingLeft: "8px", paddingRight: "8px" }}>
        <Typography variant="caption">
          {dateTime.date + " " + dateTime.time}
        </Typography>
        <Typography
          variant={fontSize ? fontSize : "body1"}
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
