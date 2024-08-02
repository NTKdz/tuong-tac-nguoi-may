import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import NewsCardHori from "../news-card/NewsCardHori";
import NewsCardVert from "../news-card/NewsCardVert";
export default function MainSection() {
  const { newsByQuery } = useSelector((state: RootState) => state.news);
  const data = newsByQuery?.articles?.results;
  // const data = mockData.articles.results;
  const theme = useTheme();

  useEffect(() => {
    if (newsByQuery && newsByQuery.articles) {
      console.log(newsByQuery.articles.results);
    }
  }, [newsByQuery]);

  return (
    <Box>
      {data && (
        <Box
          sx={{
            display: {lg:"flex"},
            flexDirection: "row",
            marginLeft: "24px",
            marginRight: "24px",
          }}
        >
          <Box sx={{ flex: "6", display: "flex", flexDirection: "column" }}>
            <Typography variant="h4">Trending</Typography>
            <NewsCardVert
              id={data[0].uri}
              title={data[0].title}
              pictureUrl={data[0].image ? data[0].image : ""}
              elevation={0}
              style={{
                marginRight: "24px",
                borderRadius: "8px",
              }}
              pictureStyle={{ height: "480px", margin: "8px" }}
              typoVariant="h3"
            />
            {data.slice(1, 9).map((news, index) => (
              <NewsCardHori
                key={index}
                id={news.uri}
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
            ))}
          </Box>
          <Box sx={{ flex: "5" }}>
            <Typography variant="h4">Latest</Typography>
            <Box sx={{ display: {sm:"flex"} }}>
              <Box
                sx={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "12px",
                }}
              >
                <NewsCardVert
                  id={data[10].uri}
                  title={data[10].title}
                  pictureUrl={data[10].image ? data[10].image : ""}
                  elevation={0}
                  pictureStyle={{ margin: "8px" }}
                />
                {data.slice(11, 20).map((news, index) => (
                  <NewsCardHori
                    key={index}
                    id={news.uri}
                    title={news.title}
                    elevation={0}
                    style={{
                      display: "flex",
                      paddingBottom: "16px",
                      paddingTop: "16px",
                      borderRadius: "8px",
                      borderTop: `2px solid ${theme.palette.background.default}`,
                    }}
                    fontSize="body1"
                    showImage={false}
                  />
                ))}
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
                  id={data[20].uri}
                  title={data[20].title}
                  pictureUrl={data[20].image ? data[20].image : ""}
                  elevation={0}
                  pictureStyle={{ margin: "8px" }}
                />
                {data.slice(21, 30).map((news, index) => (
                  <NewsCardHori
                    key={index}
                    id={news.uri}
                    title={news.title}
                    elevation={0}
                    style={{
                      display: "flex",
                      paddingBottom: "16px",
                      paddingTop: "16px",
                      borderRadius: "8px",
                      borderTop: `2px solid ${theme.palette.background.default}`,
                    }}
                    fontSize="body1"
                    showImage={false}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
