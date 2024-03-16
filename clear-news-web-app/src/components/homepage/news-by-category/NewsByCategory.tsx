import { Box, Grid, useTheme } from "@mui/material";
import React from "react";
import HeadLine from "../../headline/HeadLine";
import mockData from "../../../mockdata/data2.json";
import CategorySelector from "./category-selector/CategorySelector";
import NewsCardHori from "../../news-card/NewsCardHori";
import { formatDateTime } from "../../../utils/dateFormater";

export default function NewsByCategory() {
  const theme = useTheme();
  const data = mockData.articles.results;
  return (
    <Box sx={{ marginTop: "36px" }}>
      <HeadLine
        content="Latest News"
        background={`linear-gradient(90deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 30%)`}
      />
      <CategorySelector />
      <Grid
          container
          spacing={4}
          sx={{
            backgroundColor: theme.palette.secondary.main,
            marginTop: "8px",
            paddingBottom: "16px",
          }}
          // rowSpacing={1}
          // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {data.slice(0, 10).map((item, index: number) => {
            return (
              <Grid item xs={6} key={index}>
                <NewsCardHori
                  title={item.title}
                  pictureUrl={item.image}
                  pictureStyle={{ flex: "1", height: "240px", width: "500px",borderRadius:"0px" }}
                  dateTime={formatDateTime(item.dateTime)}
                />
              </Grid>
            );
          })}
        </Grid>
    </Box>
  );
}
