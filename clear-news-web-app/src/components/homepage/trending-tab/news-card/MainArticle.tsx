import { Box, Button, Paper, Typography } from "@mui/material";
import "./styles.css";
import ImageHolder from "../../../image-holder/ImageHolder";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HeadLine from "../../../headline/HeadLine";

export default function MainArticle({
  title,
  pictureUrl,
  dateTime,
}: {
  title: string;
  pictureUrl: string;
  dateTime: { date: string; time: string };
}) {

  return (
    <Paper
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16px",
        borderRadius: "8px",
      }}
      elevation={1 }
    >
      <HeadLine content="Trending" />

      <Typography variant="h4">{title}</Typography>
      <Typography
        variant="caption"
        sx={{ marginTop: "4px", marginBottom: "4px" }}
      >
        {dateTime.date + " " + dateTime.time}
      </Typography>
      <Button
        variant="contained"
        sx={{
          width: "146px",
          height: "36px",
          fontSize: "12px",
          borderRadius: "24px",
          marginLeft: "4px",
          marginTop: "4px",
          marginBottom: "4px",
        }}
      >
        read article
        <ArrowForwardIcon sx={{ marginLeft: "2px", width: "20px" }} />
      </Button>
      <Box sx={{ height: "70%", paddingTop: "8px" }}>
        <ImageHolder src={pictureUrl} />
      </Box>
    </Paper>
  );
}
