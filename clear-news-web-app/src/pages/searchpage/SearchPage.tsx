import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Button, Container, Pagination, Paper } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewsCardHori from "../../components/news-card/NewsCardHori";
import FilterButton from "../../components/search-page/FilterButton";
import SearchBar from "../../components/searchbar/SearchBar";
import NewsHooks from "../../redux/hooks/NewsHooks";
import { RootState } from "../../redux/store";
import { formatDateTime } from "../../utils/dateFormater";

export default function SearchPage() {
  const { getNewsBySearch } = NewsHooks();
  const { newsByQuery } = useSelector((state: RootState) => state.news);
  const navigate = useNavigate();
  // const data = mockData.articles.results;
  const data = newsByQuery?.articles?.results || [];
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState({
    topic: "",
    category: [""],
    date: {
      startDate: formatDateTime(dayjs().subtract(1, "month").toString()).date,
      endDate: formatDateTime(dayjs().toString()).date,
    },
    location: [""],
    sort: "date",
  });

  const [page, setPage] = useState(1);

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.search]
  );

  useEffect(() => {
    if (queryParams) {
      const dateParam = queryParams.get("date");
      const [startDate, endDate] = (dateParam && dateParam.split(",")) || [];
      const category = queryParams.get("category");
      const date = { startDate: startDate, endDate: endDate };
      const locationParam = queryParams.get("location");
      const sort = queryParams.get("sort");
      const topic = queryParams.get("topic");
      console.log("Category:", category);
      console.log("Date:", date);
      console.log("Location:", locationParam);
      console.log("Sort:", sort);
      console.log("Topic:", topic);
      getNewsBySearch(
        locationParam ? locationParam.split(",") : [""],
        date ? date : { startDate: "", endDate: "" },
        category ? category.split(",") : [""],
        sort ? sort : "date",
        topic ? topic : ""
      );

      setFilter({
        topic: topic ? topic : "",
        category: [""],
        date: { startDate: "", endDate: "" },
        location: [""],
        sort: "date",
      });

      setPage(1);
    }
  }, [queryParams]);

  const filterData = data.filter((article) => {
    return article.image != null;
  });

  const applyFilters = () => {
    setFilterOpen(false);
    const query = new URLSearchParams();
    filter.category[0] && query.set("category", filter.category.join(","));
    const formattedDate = `${filter.date.startDate},${filter.date.endDate}`;
    formattedDate !== "," && query.set("date", formattedDate);
    filter.location[0] && query.set("location", filter.location.join(","));
    filter.sort && query.set("sort", filter.sort);
    filter.topic && query.set("topic", filter.topic);
    navigate(`/search/param?${query.toString()}`);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event)
    setPage(value);
  };
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "32px",
        paddingBottom: "16px",
        minHeight: "600px",
      }}
    >
      <SearchBar
        searchValue={filter.topic}
        style={{ marginBottom: "32px", width: "100%" }}
        onSearch={(keyword: string) => {
          setFilter({ ...filter, topic: keyword });
          navigate(`/search/param?topic=${keyword}`);
        }}
        onChangeValue={(keyword: string) => {
          setFilter({ ...filter, topic: keyword });
        }}
      />
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
                onApplyFilter={(value: string[]) => {
                  setFilter({ ...filter, sort: value[0] });
                  console.log(value);
                }}
              />
              <FilterButton
                content={"Locations"}
                boxTitle="Locations"
                description="Specify the locations where the events described in the articles occurred "
                onApplyFilter={(value: string[]) => {
                  setFilter({ ...filter, location: [...value] });
                }}
              />
              <FilterButton
                content={"Date"}
                boxTitle="Date"
                description="What is the publication date of the articles you are interested in?"
                onApplyFilter={(value: string[]) => {
                  setFilter({
                    ...filter,
                    date: { startDate: value[0], endDate: value[1] },
                  });
                  console.log(value);
                }}
              />
              <FilterButton
                content={"Categories"}
                boxTitle="Categories"
                description="Limit the news articles to only those that are on a particular topic 
              \n Arts - Business - Computers - Health \n Home - Science - Sports - Weather"
                onApplyFilter={(value: string[]) => {
                  setFilter({ ...filter, category: [...value] });
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
                  applyFilters();
                }}
              >
                Apply
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
      {filterData &&
        filterData
          .slice(0 + (page - 1) * 20, 20 + (page - 1) * 20)
          .map((article) => {
            return (
              <Box
                key={article.uri}
                sx={{ marginBottom: "16px", width: "100%" }}
              >
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
      <Pagination
        count={Math.ceil(newsByQuery?.articles?.count / 20)}
        size={"large"}
        page={page}
        onChange={handleChange}
      />
    </Container>
  );
}
