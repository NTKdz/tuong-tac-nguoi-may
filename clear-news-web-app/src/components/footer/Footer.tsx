import React from "react";
import { Box, Container, Typography, Link, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const categories = [
  "Art",
  "Business",
  "Computers",
  "Health",
  "Home",
  "Science",
  "Sports",
  "Weather",
];

const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-evenly">
          <Grid item xs={6} sm={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              News Website
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bringing you the latest news and updates.
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Sections
            </Typography>
            {categories.map((category) => (
              <Link
                sx={{ "&:hover": { cursor: "pointer" } }}
                variant="body2"
                color="text.secondary"
                display="block"
                onClick={() => navigate(`/category/${category}`)}
              >
                {category}
              </Link>
            ))}
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Resources
            </Typography>
            <Link
              href="#"
              variant="body2"
              color="text.secondary"
              display="block"
            >
              About Us
            </Link>
            <Link
              href="#"
              variant="body2"
              color="text.secondary"
              display="block"
            >
              Contact
            </Link>
            <Link
              href="#"
              variant="body2"
              color="text.secondary"
              display="block"
            >
              Privacy Policy
            </Link>
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            {"Copyright © "} News Website {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
