import { Box, Container, Pagination, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import mockData from "../../mockdata/data3.json";
import NewsCardHori from "../../components/news-card/NewsCardHori";
import SearchBar from "../../components/searchbar/SearchBar";
import { formatDateTime } from "../../utils/dateFormater";

export default function SearchPage() {
  const data = mockData.articles.results;
  const [paginationCount, changePaginationCount] = useState(
    mockData.articles.count / 20
  );

  const filterData = data.filter((article) => {
    return article.image != null;
  });
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
      {filterData &&
        filterData.slice(0, 20).map((article) => {
          return (
            <Box sx={{ marginBottom: "16px", width: "100%", }}>
              <NewsCardHori
                pictureUrl={article.image ?? undefined}
                title={article.title}
                pictureStyle={{ flex: "0.5", height: "160px" }}
                dateTime={formatDateTime(article.dateTime)}
              />
            </Box>
          );
        })}
      <Pagination count={paginationCount} size={"large"} />
    </Container>
  );
}
