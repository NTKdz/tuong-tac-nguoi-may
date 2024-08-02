import { Container } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AdditionalSection from "../../components/news-by-category/AdditionalSection";
import MainSection from "../../components/news-by-category/MainSection";
import NewsHooks from "../../redux/hooks/NewsHooks";

export default function NewsList() {
  const { category } = useParams();
  const { getNewsByCategory } = NewsHooks();
  useEffect(() => {
    category && getNewsByCategory(category);
  }, [category]);
  return (
    <Container
      maxWidth={false}
      sx={{
        padding: "32px 32px 32px 32px",
      }}
    >
      <MainSection />
      <AdditionalSection />
    </Container>
  );
}
