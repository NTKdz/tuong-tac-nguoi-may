import { Box, Container, Pagination, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import mockData from "../../mockdata/data3.json";
import NewsCardHori from "../../components/news-card/NewsCardHori";
import SearchBar from "../../components/searchbar/SearchBar";
import { formatDateTime } from "../../utils/dateFormater";

export default function SearchPage() {
  const data = mockData.articles.results;
  const [paginationCount, changePaginationCount] = useState(
    mockData.articles.count / 10
  );

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "32px",
        paddingBottom: "16px",
      }}
    >
      <SearchBar style={{ marginBottom: "32px", width: "100%" }} />
      {data &&
        data.slice(0, 10).map((article) => {
          return (
            <Box sx={{ marginBottom: "16px" }}>
              <NewsCardHori
                pictureUrl={article.image}
                title={article.title}
                pictureStyle={{ flex: "0.5", height: "150px" }}
                dateTime={formatDateTime(article.dateTime)}
              />
            </Box>
          );
        })}
      <Pagination count={paginationCount} size={"large"} />
    </Container>
  );
}
