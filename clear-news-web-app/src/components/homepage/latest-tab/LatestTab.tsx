import { Box, Grid, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import NewsHooks from "../../../redux/hooks/NewsHooks";
import { RootState } from "../../../redux/store";
import { formatDateTime } from "../../../utils/dateFormater";
import HeadLine from "../../headline/HeadLine";
import NewsCardVert from "../../news-card/NewsCardVert";
import mockData from "../../../mockdata/data2.json";
export default function LatestTab() {
  console.log(mockData)
  const theme = useTheme();
  const { latestNews } = useSelector((state: RootState) => state.news);
  const { getLatestNews } = NewsHooks();

  useEffect(() => {
    getLatestNews();
  }, []);

  const articles = latestNews?.articles?.results || [];

  // const articles = mockData.articles.results;
  return (
    <Box sx={{ marginTop: "36px" }}>
      <HeadLine
        content="Latest News"
        background={`linear-gradient(90deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 30%)`}
      />

      <Grid container spacing={3}>
        {articles.slice(0, 24).map((news) => (
          <Grid key={news.uri} item xs={12} sm={6} md={4} lg={3} xl={2}>
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
        ))}
      </Grid>
    </Box>
  );
}
