import { Box, Container, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Settings from "./Settings";
import BookMarks from "./BookMarks";
import { useLocation } from "react-router-dom";

const tabs = ["settings", "bookmarks"];
export default function Account() {
  const location = useLocation();
  const theme = useTheme();
  const [selectedTab, changeSelectedTab] = useState(
    location.pathname.includes("bookmark") ? 1 : 0
  );

  useEffect(() => {
    location.pathname.includes("bookmark")
      ? changeSelectedTab(1)
      : changeSelectedTab(0);
  }, [location.pathname]);

  return (
    <Container maxWidth="md" sx={{ minHeight: "300px", marginBottom: "32px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          marginTop: "32px",
          marginBottom: "32px",
          height: "72px",
        }}
      >
        {tabs.map((tab, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "200px",
                height: selectedTab === index ? "72px" : "56px",
                marginRight: "1px",
                borderRadius: "8px 8px 0px 0px",
                backgroundColor:
                  selectedTab === index ? theme.palette.background.paper : "",
                transition: "all 0.5s",
              }}
              onClick={() => {
                changeSelectedTab(index);
              }}
            >
              <Typography key={index}>{tab}</Typography>
            </Box>
          );
        })}
      </Box>
      <Box sx={{ width: "90%", margin: "auto" }}>
        {selectedTab == 0 ? (
          <Box sx={{ transition: "all 0.5s" }}>
            <Settings />
          </Box>
        ) : (
          <Box sx={{ transition: "all 0.5s" }}>
            <BookMarks />
          </Box>
        )}
      </Box>
    </Container>
  );
}
