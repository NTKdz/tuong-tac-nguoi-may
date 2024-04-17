import { Box, Grid, useTheme } from "@mui/material";
import React from "react";
import HeadLine from "../../headline/HeadLine";
import mockData from "../../../mockdata/data2.json";
import { formatDateTime } from "../../../utils/dateFormater";
import NewsCardVert from "../../news-card/NewsCardVert";
export default function LatestTab() {
  const theme = useTheme();
  const data = mockData.articles.results;
  return (
    <Box sx={{ marginTop: "36px" }}>
      <HeadLine
        content="Latest News"
        background={`linear-gradient(90deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 30%)`}
      />

      <Grid container spacing={4}>
        {data &&
          data.slice(0, 12).map((news) => {
            return (
              <Grid item xs={3}>
                <NewsCardVert
                  id={news.uri}
                  title={news.title}
                  pictureUrl={news.image}
                  dateTime={formatDateTime(news.dateTime)}
                  style={{
                    minHeight: "400px",
                    padding: "12px",
                    borderRadius: "16px",
                  }}
                />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
