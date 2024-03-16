import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import NewsCardVert from "../news-card/NewsCardVert";
import NewsCardHori from "../news-card/NewsCardHori";
import mockData from "../../mockdata/data3.json";

export default function MainSection() {
  const data = mockData.articles.results;
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        // justifyContent: "space-between",
        marginLeft: "24px",
        marginRight: "24px",
      }}
    >
      <Box
        sx={{
          flex: "6",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4">Trending</Typography>
        <NewsCardVert
          title={data[0].title}
          pictureUrl={data[0].image ? data[0].image : ""}
          elevation={0}
          style={{
            marginRight: "24px",
            borderRadius: "8px",
          }}
          pictureStyle={{ height: "400px", margin: "8px" }}
        />
        {data.slice(1, 9).map((news, index) => {
          return (
            <NewsCardHori
              title={news.title}
              pictureUrl={news.image ? news.image : ""}
              elevation={0}
              style={{
                display: "flex",
                marginRight: "24px",
                padding: "8px 0px 8px 8px",
                borderRadius: "8px",
                borderTop: `2px solid ${theme.palette.background.default}`,
              }}
              pictureStyle={{ flex: "0.5", height: "120px" }}
              fontSize="h6"
            />
          );
        })}
      </Box>
      <Box sx={{ flex: "5" }}>
        <Typography variant="h4">Latest</Typography>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              marginRight: "12px",
            }}
          >
            <NewsCardVert
              title={data[0].title}
              pictureUrl={data[0].image ? data[0].image : ""}
              elevation={0}
              pictureStyle={{ margin: "8px" }}
            />
            {data.slice(1, 9).map((news, index) => {
              return (
                <NewsCardHori
                  title={news.title}
                  // pictureUrl={news.image ? news.image : ""}
                  elevation={0}
                  style={{
                    display: "flex",
                    paddingBottom: "16px",
                    paddingTop: "16px",
                    borderRadius: "8px",
                    borderTop: `2px solid ${theme.palette.background.default}`,
                  }}
                  fontSize="h6"
                />
              );
            })}
          </Box>
          <Box
            sx={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              marginLeft: "12px",
            }}
          >
            <NewsCardVert
              title={data[0].title}
              pictureUrl={data[0].image ? data[0].image : ""}
              elevation={0}
              pictureStyle={{ margin: "8px" }}
            />
            {data.slice(1, 9).map((news, index) => {
              return (
                <NewsCardHori
                  title={news.title}
                  // pictureUrl={news.image ? news.image : ""}
                  elevation={0}
                  style={{
                    display: "flex",
                    paddingBottom: "16px",
                    paddingTop: "16px",
                    borderRadius: "8px",
                    borderTop: `2px solid ${theme.palette.background.default}`,
                  }}
                  fontSize="h6"
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
