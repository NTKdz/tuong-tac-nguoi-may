import { Box, Paper, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";

const pageRoutes = [
  { name: "All", route: "all" },
  { name: "Art", route: "art" },
  { name: "Business", route: "art" },
  { name: "Computers", route: "art" },
  { name: "Health", route: "art" },
  { name: "Home", route: "art" },
  { name: "Science", route: "art" },
  { name: "Sports", route: "art" },
  { name: "Weather", route: "art" },
];

export default function CategorySelector() {
  const theme = useTheme();
  const [selectedTab, changeSelectedTab] = useState<number>(0);

  function handleCategorySelect(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) {
    changeSelectedTab(index);
  }

  return (
    <Paper
      sx={{
        width: "100%",
        height: "64px",
        display: "flex",
        alignItems: "center",
        borderRadius: "16px",
      }}
      elevation={4}
    >
      {pageRoutes.map((route, index) => {
        console.log(index);
        return (
          <Box
            sx={{
              flex: "1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              backgroundColor:
                selectedTab === index ? theme.palette.background.default : "",
              borderRadius:
                index === 0
                  ? "16px 0px 0px 16px"
                  : index === 8
                  ? "0px 16px 16px 0px"
                  : "",
              "&:hover": {
                backgroundColor: theme.palette.background.default,
              },
            }}
            key={index}
            onClick={(e) => handleCategorySelect(e, index)}
          >
            <Typography
              className={selectedTab === index ? "selected" : ""}
              key={index}
            >
              {route.name}
            </Typography>
          </Box>
        );
      })}
    </Paper>
  );
}
