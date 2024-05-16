import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageHolder from "../../components/image-holder/ImageHolder";
import { DeleteBookmark, GetAllBookmarks } from "../../firebase/apiFunctions";
import CancelIcon from "@mui/icons-material/Cancel";

export default function BookMarks() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [bookmarks, setBookmarks] = useState([
    {
      articleId: "string",
      title: "string",
      imageUrl: "string",
      createdAt: "string",
    },
  ]);

  useEffect(() => {
    const onBookmarks = async () => {
      try {
        const data: {
          articleId: string;
          title: string;
          imageUrl: string;
          createdAt: string;
        }[] = await GetAllBookmarks();
        setBookmarks(data);
        console.log(data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    onBookmarks();
  }, []);

  return (
    <Grid container spacing={3}>
      {bookmarks &&
        bookmarks[0] &&
        bookmarks.map(
          (bookmark: {
            articleId: string;
            title: string;
            imageUrl: string;
            createdAt: string;
          }) => {
            return (
              <Grid
                key={bookmark.articleId}
                item
                xs={6}
                sm={4}
                position={"relative"}
                sx={{
                  position: "relative",
                  width: 280,
                  borderRadius: "4px",
                }}
              >
                <CancelIcon
                  sx={{
                    position: "absolute",
                    right: -10,
                    top: 10,
                    width: 30,
                    height: 30,
                    zIndex: 100,
                    ":hover": { cursor: "pointer" },
                  }}
                  color="error"
                  onClick={() => {
                    DeleteBookmark(
                      JSON.parse(localStorage.getItem("user")!).uid,
                      bookmark.articleId
                    );
                  }}
                ></CancelIcon>
                <Box
                  onClick={() => {
                    navigate("/news/" + bookmark.articleId);
                  }}
                  sx={{ ":hover": { cursor: "pointer" } }}
                >
                  <Box>
                    <ImageHolder src={bookmark.imageUrl} />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      top: 0,
                      backgroundColor: theme.palette.background.paper,
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                    }}
                  >
                    <Typography variant="caption">
                      {bookmark.createdAt}
                    </Typography>
                    <Typography
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                      }}
                    >
                      {bookmark.title}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          }
        )}
    </Grid>
  );
}
