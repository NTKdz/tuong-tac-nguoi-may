import { Box, Grid, useTheme } from "@mui/material";
import React, { useState } from "react";
import HeadLine from "../../headline/HeadLine";
import mockData from "../../../mockdata/data3.json";
import CategorySelector from "./category-selector/CategorySelector";
import NewsCardHori from "../../news-card/NewsCardHori";
import { formatDateTime } from "../../../utils/dateFormater";

export default function NewsByCategory() {
  const [selectedCategory, changeSelectedCategory] = useState<string>("all");
  const theme = useTheme();
  const data = mockData.articles.results;
  const filteredData = data.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.categories[0]?.label.toLowerCase().includes(selectedCategory);
  });

  function changeCategory(newCategory: string) {
    changeSelectedCategory(newCategory);
  }
  return (
    <Box sx={{ marginTop: "36px" }}>
      <HeadLine
        content="News By Category"
        background={`linear-gradient(90deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 30%)`}
      />
      <CategorySelector changeCategory={changeCategory} />
      <Grid
        container
        spacing={4}
        sx={{
          // backgroundColor: theme.palette.secondary.main,
          marginTop: "8px",
          paddingBottom: "16px",
        }}
        // rowSpacing={1}
        // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {filteredData.slice(0, 10).map((item, index: number) => {
          return (
            <Grid item xs={6} key={index}>
              <NewsCardHori
                id={item.uri}
                title={item.title}
                pictureUrl={item.image ? item.image : undefined}
                pictureStyle={{
                  flex: "1",
                  height: "200px",
                  width: "1000px",
                  borderRadius: "0px",
                }}
                dateTime={formatDateTime(item.dateTime)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
