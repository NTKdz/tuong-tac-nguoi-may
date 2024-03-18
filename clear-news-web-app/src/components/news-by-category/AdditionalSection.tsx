import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import NewsCardVert from "../news-card/NewsCardVert";
import NewsCardHori from "../news-card/NewsCardHori";
import mockData from "../../mockdata/data4.json";
import NewsCard from "../homepage/trending-tab/news-card/NewsCard";
import { formatDateTime } from "../../utils/dateFormater";

export default function AdditionalSection() {
  const data = mockData.articles.results;
  const theme = useTheme();

  const filteredData = data
    .slice(31)
    .filter((article) =>
      article.videos && article.image ? article.videos : false
    );

  useEffect(() => {
    console.log(data);
  }, [filteredData]);
  return (
    <Box sx={{ marginTop: "16px", marginLeft: "24px", marginRight: "24px" }}>
      <Typography variant="h4" sx={{ marginBottom: "16px" }}>
        You May Be Interested In
      </Typography>
      <Box sx={{ display: "flex" }}>
        {data &&
          data.slice(21, 25).map((article) => {
            return (
              <Box sx={{ flex: "1", marginRight: "16px" }}>
                <NewsCard
                  title={article.title}
                  dateTime={formatDateTime(article.dateTime)}
                  pictureUrl={article.image ? article.image : ""}
                  pictureStyle={{ height: "240px" }}
                  fontSize={"h6"}
                />
              </Box>
            );
          })}
      </Box>
      <Box sx={{ display: "flex", marginTop: "16px" }}>
        {data &&
          data.slice(26, 30).map((article) => {
            return (
              <Box sx={{ flex: "1", marginRight: "16px" }}>
                <NewsCard
                  title={article.title}
                  dateTime={formatDateTime(article.dateTime)}
                  pictureUrl={article.image ? article.image : ""}
                  pictureStyle={{ height: "240px" }}
                  fontSize={"h6"}
                />
              </Box>
            );
          })}
      </Box>

      <Typography variant="h4" sx={{ marginTop: "16px", marginBottom: "16px" }}>
        You May Be Want To Watch
      </Typography>
      <Box sx={{ display: "flex" }}>
        {filteredData &&
          filteredData.slice(0, 5).map((article) => {
            console.log(article.image);
            return article.image ? (
              <Box sx={{ flex: "1", marginRight: "16px" }}>
                <NewsCard
                  title={article.title}
                  dateTime={formatDateTime(article.dateTime)}
                  pictureUrl={article.image ? article.image : ""}
                  pictureStyle={{ height: "240px" }}
                  fontSize={"h6"}
                />
              </Box>
            ) : (
              <></>
            );
          })}
      </Box>
    </Box>
  );
}
