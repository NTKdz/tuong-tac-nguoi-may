import { Box, Paper, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import ImageHolder from "../image-holder/ImageHolder";
import { Variant } from "@mui/material/styles/createTypography";

export default function NewsCardHori({
  title,
  pictureUrl,
  dateTime,
  style,
  pictureStyle,
  elevation,
  fontSize,
  maxLine,
}: {
  title: string;
  pictureUrl?: string;
  dateTime?: { date: string; time: string };
  style?: SxProps<Theme> | undefined;
  pictureStyle?: SxProps<Theme> | undefined;
  elevation?: number;
  fontSize?: string;
  maxLine?: string;
}) {
  return (
    <Paper
      sx={style ? style : { display: "flex", borderRadius: "8px" }}
      elevation={elevation || elevation == 0 ? elevation : 1}
    >
      {pictureUrl && (
        <Box
          sx={
            pictureStyle
              ? pictureStyle
              : { flex: "1", height: "240px", width: "500px" }
          }
        >
          <ImageHolder
            src={pictureUrl}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "8px 0px 0px 8px",
            }}
          />
        </Box>
      )}

      <Box sx={{ paddingLeft: "8px", paddingRight: "8px", flex: "1" }}>
        <Typography variant="body1">
          {dateTime && dateTime.date + " " + dateTime.time}
        </Typography>
        <Typography
          variant={fontSize ? (fontSize as Variant) : "h5"}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: maxLine ? maxLine : "6",
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Paper>
  );
}
