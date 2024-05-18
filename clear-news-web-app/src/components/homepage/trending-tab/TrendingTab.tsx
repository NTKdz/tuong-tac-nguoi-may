import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import NewsHooks from "../../../redux/hooks/NewsHooks";
import { RootState } from "../../../redux/store";
import { formatDateTime } from "../../../utils/dateFormater";
import MainArticle from "./news-card/MainArticle";
import NewsCard from "./news-card/NewsCard";
import { useNavigate } from "react-router-dom";
import mockData from "../../../mockdata/data2.json";
export default function TrendingTab() {
  const navigate = useNavigate();
  const { trendingNews } = useSelector((state: RootState) => state.news);
  const { getTrendingNews } = NewsHooks();

  useEffect(() => {
    getTrendingNews();
  }, []);

  const mainArticle = trendingNews?.articles?.results?.[0];
  const otherArticles = trendingNews?.articles?.results?.slice(1, 7) || [];

  // const mainArticle = mockData?.articles?.results?.[0];
  // const otherArticles = mockData?.articles?.results?.slice(1, 7) || [];

  return (
    <Box>
      <Box
        sx={{
          display: { sm: "block", md: "flex" },
          flexDirection: "row",
          gap: "32px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{ flex: "3", ":hover": { cursor: "pointer" } }}
          onClick={() => navigate("/news/" + mainArticle?.uri)}
        >
          <MainArticle
            title={mainArticle?.title}
            pictureUrl={mainArticle?.image}
            dateTime={formatDateTime(mainArticle?.dateTime)}
          />
        </Box>
        <Grid
          container
          spacing={2}
          sx={{
            flex: "4",
            paddingTop: "16px",
            paddingBottom: "16px",
          }}
        >
          {otherArticles.map((item, index: number) => (
            <Grid
              item
              xs={6}
              md={6}
              key={index}
              sx={{ ":hover": { cursor: "pointer" } }}
              onClick={() => navigate("/news/" + item?.uri)}
            >
              <NewsCard
                id={item.uri}
                title={item?.title}
                pictureUrl={item?.image}
                dateTime={formatDateTime(item?.dateTime)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
