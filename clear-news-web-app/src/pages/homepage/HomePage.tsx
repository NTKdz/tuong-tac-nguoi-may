import { Box, Container, Typography } from "@mui/material";
import React from "react";

export default function HomePage() {
  return (
    <Container maxWidth={false}>
      <Box>
        <Typography>trending</Typography>
      </Box>
      <Box>
        <Typography>latest</Typography>
        
      </Box>
    </Container>
  );
}
