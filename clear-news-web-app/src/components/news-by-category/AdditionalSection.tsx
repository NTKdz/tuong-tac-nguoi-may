import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import NewsCard from "../homepage/trending-tab/news-card/NewsCard";
import mockData from "../../mockdata/data4.json";
import { formatDateTime } from "../../utils/dateFormater";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function AdditionalSection() {
  const { newsByQuery } = useSelector((state: RootState) => state.news);
  // const data = mockData.articles.results;
  const data = newsByQuery?.articles?.results || [];

  const filteredData = data?.slice(34)?.filter((article) => article.videos[0]);

  useEffect(() => {
    console.log(filteredData);
  }, []);
  return (
    <Box sx={{ marginTop: "24px", marginLeft: "24px", marginRight: "24px" }}>
      <Typography variant="h4" sx={{ marginBottom: "16px" }}>
        You May Be Interested In
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {data?.slice(21, 33)?.map((article, index) => (
          <Box key={index} sx={{ flex: "1", minWidth: "360px" }}>
            <NewsCard
              id={article.uri}
              title={article.title}
              dateTime={formatDateTime(article.dateTime)}
              pictureUrl={article.image || ""}
              pictureStyle={{ height: "240px" }}
              fontSize="h6"
            />
          </Box>
        ))}
      </Box>

      <Typography variant="h4" sx={{ marginTop: "24px", marginBottom: "16px" }}>
        You May Want To Watch
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {filteredData?.slice(0, 12).map((article, index) => (
          <Box key={index} sx={{ flex: "1", minWidth: "360px" }}>
            <NewsCard
              id={article.uri}
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
