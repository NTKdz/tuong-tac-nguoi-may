import { Box, Button, Container, Pagination, Paper } from "@mui/material";
import NewsCardHori from "../../components/news-card/NewsCardHori";
import SearchBar from "../../components/searchbar/SearchBar";
import mockData from "../../mockdata/data3.json";
import { formatDateTime } from "../../utils/dateFormater";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import FilterButton from "../../components/search-page/FilterButton";

export default function SearchPage() {
  const data = mockData.articles.results;
  const [isFilterOpen, setFilterOpen] = useState(false);
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
      <Box sx={{ width: "100%", marginBottom: "40px" }}>
        <Button
          onClick={() => {
            setFilterOpen(!isFilterOpen);
          }}
        >
          Filter{" "}
          {isFilterOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </Button>

        {isFilterOpen && (
          <Paper sx={{ padding: "16px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <FilterButton
                content={"Sort by"}
                boxTitle="Sort by"
                onApplyFilter={() => {
                  setFilterOpen(!isFilterOpen);
                }}
              />
              <FilterButton
                content={"Locations"}
                boxTitle="Locations"
                description="Specify the locations where the events described in the articles occurred "
                onApplyFilter={() => {
                  setFilterOpen(!isFilterOpen);
                }}
              />
              <FilterButton
                content={"Date"}
                boxTitle="Date"
                description="What is the publication date of the articles you are interested in?"
                onApplyFilter={() => {
                  setFilterOpen(!isFilterOpen);
                }}
              />
              <FilterButton
                content={"Categories"}
                boxTitle="Categories"
                description="Limit the news articles to only those that are on a particular topic 
              \n Arts - Business - Computers - Health \n Home - Science - Sports - Weather"
                onApplyFilter={() => {
                  setFilterOpen(!isFilterOpen);
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginRight: "16px",
                marginTop: "16px",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                color="error"
                sx={{ width: "49.5%" }}
                onClick={() => {
                  setFilterOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ width: "49.5%" }}
                onClick={() => {
                  setFilterOpen(false);
                }}
              >
                Apply
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
      {filterData &&
        filterData.slice(0, 20).map((article) => {
          return (
            <Box sx={{ marginBottom: "16px", width: "100%" }}>
              <NewsCardHori
                id={article.uri}
                pictureUrl={article.image ?? undefined}
                title={article.title}
                pictureStyle={{ flex: "0.5", height: "160px" }}
                dateTime={formatDateTime(article.dateTime)}
              />
            </Box>
          );
        })}
      <Pagination count={mockData.articles.count / 20} size={"large"} />
    </Container>
  );
}
