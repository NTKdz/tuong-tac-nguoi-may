import { Box, Paper, SxProps, Theme, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ImageHolder from "../image-holder/ImageHolder";
import { Variant } from "@mui/material/styles/createTypography";
import { useNavigate } from "react-router-dom";

export default function NewsCardHori({
  id,
  title,
  pictureUrl,
  dateTime,
  style,
  pictureStyle,
  elevation,
  fontSize,
  maxLine,
  showImage = true,
}: {
  id: string;
  title: string;
  pictureUrl?: string;
  dateTime?: { date: string; time: string };
  style?: SxProps<Theme> | undefined;
  pictureStyle?: SxProps<Theme> | undefined;
  elevation?: number;
  fontSize?: string;
  maxLine?: string;
  showImage?: boolean;
}) {
  const boxRef = useRef(null);
  const navigate = useNavigate();

  const [currentMaxLine, changeCurrentMaxLine] = useState(
    maxLine ? maxLine : "6"
  );

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (boxRef && boxRef.current) {
        if (
          (boxRef.current as HTMLElement).clientHeight > 200 &&
          Number(currentMaxLine) > 0
        )
          changeCurrentMaxLine((current: string) => {
            return String(Number(current) - 1);
          });
      }
    });

    if (boxRef.current) {
      resizeObserver.observe(boxRef.current);
    }

    return () => resizeObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMaxLine]);

  return (
    <Paper
      sx={
        style
          ? {
              ...style,
              ":hover": { cursor: "pointer" },
            }
          : {
              display: "flex",
              borderRadius: "8px",

              ":hover": { cursor: "pointer" },
            }
      }
      elevation={elevation || elevation == 0 ? elevation : 1}
      onClick={() => navigate("/news/" + id)}
    >
      {showImage && (
        <Box
          sx={
            pictureStyle
              ? pictureStyle
              : { flex: "1", minHeight: "240px", width: "500px" }
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

      <Box
        sx={{
          paddingLeft: "8px",
          paddingRight: "8px",
          flex: "1",
          // ":hover": {
          //   scale: "1.1",
          //   transition: "scale 0.5s",
          //   zIndex: "1000",
          //   backgroundColor: "white",
          // },
        }}
      >
        <Box ref={boxRef} sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption">
            {dateTime && dateTime.date + " " + dateTime.time}
          </Typography>
          <Typography
            variant={fontSize ? (fontSize as Variant) : "h5"}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: currentMaxLine,
              WebkitBoxOrient: "vertical",
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
