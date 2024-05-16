import React, { useEffect, useState } from "react";
import { GetAllBookmarks } from "../../firebase/apiFunctions";
import NewsCardHori from "../../components/news-card/NewsCardHori";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import ImageHolder from "../../components/image-holder/ImageHolder";
import { useNavigate } from "react-router-dom";

export default function BookMarks() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [bookmarks, setBookmarks] = useState([]);

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
                item
                xs={6}
                sm={4}
                position={"relative"}
                sx={{
                  width: 280,
                  borderRadius: "4px",
                  ":hover": { cursor: "pointer" },
                }}
                onClick={() => {
                  navigate("/news/" + bookmark.articleId);
                }}
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
              </Grid>
            );
          }
        )}
    </Grid>
  );
}
