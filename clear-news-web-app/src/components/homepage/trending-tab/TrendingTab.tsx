import { Box, Grid, useTheme } from "@mui/material";
import React from "react";
import MainArticle from "./news-card/MainArticle";
import mockArticle from "../../../mockdata/data2.json";
import NewsCard from "./news-card/NewsCard";
import { formatDateTime } from "../../../utils/dateFormater";
import { useNavigate } from "react-router-dom";
export default function TrendingTab() {
  const data = mockArticle.articles.results;
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "32px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{ flex: "3", ":hover": { cursor: "pointer" } }}
          onClick={() => navigate("/" + data[0].uri)}
        >
          <MainArticle
            title={data[0].title}
            pictureUrl={data[0].image}
            dateTime={formatDateTime(data[0].dateTime)}
          />
        </Box>
        <Grid
          container
          spacing={2}
          sx={{
            flex: "4",
            // backgroundColor: theme.palette.secondary.main,
            paddingTop: "16px",
            paddingBottom: "16px",
          }}
          // rowSpacing={1}
          // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {data.slice(1, 7).map((item, index: number) => {
            return (
              <Grid
                item
                xs={6}
                key={index}
                sx={{ ":hover": { cursor: "pointer" } }}
                onClick={() => navigate("/" + item.uri)}
              >
                <NewsCard
                  title={item.title}
                  pictureUrl={item.image}
                  dateTime={formatDateTime(item.dateTime)}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
