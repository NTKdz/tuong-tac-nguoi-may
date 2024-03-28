import { Box, Typography } from "@mui/material";
import React from "react";
import NewsCard from "../homepage/trending-tab/news-card/NewsCard";
import mockData from "../../mockdata/data4.json";
import { formatDateTime } from "../../utils/dateFormater";


export default function AdditionalSection() {
  const data = mockData.articles.results;

  const filteredData = data
    .slice(31)
    .filter((article) => article.videos && article.image);

  return (
    <Box sx={{ marginTop: "16px", marginLeft: "24px", marginRight: "24px" }}>
      <Typography variant="h4" sx={{ marginBottom: "16px" }}>
        You May Be Interested In
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {data.slice(21, 29).map((article, index) => (
          <Box key={index} sx={{ flex: "1", minWidth: "300px" }}>
            <NewsCard
              title={article.title}
              dateTime={formatDateTime(article.dateTime)}
              pictureUrl={article.image || ""}
              pictureStyle={{ height: "240px" }}
              fontSize="h6"
            />
          </Box>
        ))}
      </Box>

      <Typography variant="h4" sx={{ marginTop: "16px", marginBottom: "16px" }}>
        You May Want To Watch
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {filteredData.slice(0, 4).map((article, index) => (
          <Box key={index} sx={{ flex: "1", minWidth: "300px" }}>
            <NewsCard
              title={article.title}
              dateTime={formatDateTime(article.dateTime)}
              pictureUrl={article.image || ""}
              pictureStyle={{ height: "240px" }}
              fontSize="h6"
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
