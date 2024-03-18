import { Box, Container, Paper, Typography } from "@mui/material";
import React from "react";
import mockData from "../../mockdata/data1.json";
import ImageHolder from "../../components/image-holder/ImageHolder";
export default function NewsDetail() {
  const data = mockData;
  const bodyLines = data[8032858371].info.body.split("\n");
  return (
    <Container maxWidth="md" sx={{ marginTop: "32px", marginBottom: "32px" }}>
      <Paper sx={{ padding: "32px" }}>
        <Box sx={{ marginBottom: "16px" }}>
          <Typography variant="h4" sx={{ marginBottom: "16px" }}>
            {data[8032858371].info.title}
          </Typography>
          <ImageHolder src={data[8032858371].info.image} />
        </Box>

        {bodyLines.map((line, index) => {
          if (index === 1)
            return (
              <Box>
                <ImageHolder src={data[8032858371].info.image} />
                <Typography key={index} variant="body1" paragraph>
                  {line}
                </Typography>
              </Box>
            );
          return (
            <Typography key={index} variant="body1" paragraph>
              {line}
            </Typography>
          );
        })}
      </Paper>
    </Container>
  );
}
