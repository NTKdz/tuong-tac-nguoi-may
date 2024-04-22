import { Container } from "@mui/material";
import TrendingTab from "../../components/homepage/trending-tab/TrendingTab";
import LatestTab from "../../components/homepage/latest-tab/LatestTab";
import NewsByCategory from "../../components/homepage/news-by-category/NewsByCategory";

export default function HomePage() {
  return (
    <Container maxWidth={false} sx={{ padding: "32px 32px 32px 32px" }}>
      <TrendingTab />
      <LatestTab />
      <NewsByCategory />
    </Container>
  );
}
