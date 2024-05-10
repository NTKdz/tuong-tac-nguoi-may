import {
  Box,
  Paper,
  SxProps,
  Theme,
  Typography,
  TypographyVariant
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageHolder from "../image-holder/ImageHolder";

export default function NewsCardVert({
  id,
  title,
  pictureUrl,
  dateTime,
  style,
  pictureStyle,
  elevation,
  showImage = true,
  typoVariant = "body1",
}: {
  id: string;
  title: string;
  pictureUrl?: string;
  dateTime?: { date: string; time: string };
  style?: SxProps<Theme> | undefined;
  pictureStyle?: SxProps<Theme> | undefined;
  elevation?: number;
  showImage?: boolean;
  typoVariant?: TypographyVariant;
}) {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        ...style,
        ":hover": { cursor: "pointer" },
      }}
      elevation={elevation || elevation == 0 ? elevation : 1}
      onClick={() => navigate("/news/" + id)}
    >
      {showImage && (
        <Box sx={pictureStyle ? pictureStyle : { height: "240px" }}>
          <ImageHolder src={pictureUrl} />
        </Box>
      )}

      <Box sx={{ paddingLeft: "8px", paddingRight: "8px" }}>
        <Typography variant="caption">
          {dateTime && dateTime.date + " " + dateTime.time}
        </Typography>
        <Typography
          variant={typoVariant}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "4",
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Paper>
  );
}
