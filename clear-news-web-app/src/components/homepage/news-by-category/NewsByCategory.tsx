import { Box, Grid, useTheme } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { formatDateTime } from "../../../utils/dateFormater";
import HeadLine from "../../headline/HeadLine";
import NewsCardHori from "../../news-card/NewsCardHori";
import CategorySelector from "./category-selector/CategorySelector";
export default function NewsByCategory() {
  const [selectedCategory, changeSelectedCategory] = useState<string>("all");
  const theme = useTheme();
  const { trendingNews } = useSelector((state: RootState) => state.news);
  const data = trendingNews?.articles?.results || [];
  // const data = mockData.articles.results;
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
        {filteredData.slice(0, 24).map((item, index: number) => {
          return (
            <Grid item xs={12} md={6} lg={4} key={index}>
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
