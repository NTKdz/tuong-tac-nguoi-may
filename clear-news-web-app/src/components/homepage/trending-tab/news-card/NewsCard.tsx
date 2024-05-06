import { Box, SxProps, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import ImageHolder from "../../../image-holder/ImageHolder";
import "./styles.css";
import { useNavigate } from "react-router-dom";

export default function NewsCard({
  id,
  title,
  pictureUrl,
  dateTime,
  pictureStyle,
  fontSize,
}: {
  id: string;
  title: string;
  pictureUrl: string;
  dateTime: { date: string; time: string };
  pictureStyle?: SxProps;
  fontSize?: Variant;
}) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ "&:hover": { cursor: "pointer" } }}
      onClick={() => {
        navigate("/news/" + id);
      }}
    >
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
