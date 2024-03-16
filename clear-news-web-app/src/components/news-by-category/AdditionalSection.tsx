import { Box, Typography } from "@mui/material";
import React from "react";
import NewsCardVert from "../news-card/NewsCardVert";
import NewsCardHori from "../news-card/NewsCardHori";
import mockData from "../../mockdata/data3.json";

export default function AdditionalSection() {
  const data = mockData.articles.results;
  return (
    <Box sx={{marginTop:"16px"}}>
      <Typography variant="h4">You May Be Interested In</Typography>
      
    </Box>
  );
}
