import {
  Box,
  Button,
  Menu,
  MenuItem,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

const categories = [
  { name: "All", category: "all" },
  { name: "Art", category: "art" },
  { name: "Business", category: "business" },
  { name: "Computers", category: "computers" },
  { name: "Health", category: "health" },
  { name: "Home", category: "home" },
  { name: "Science", category: "science" },
  { name: "Sports", category: "sports" },
  { name: "Weather", category: "weather" },
];

export default function CategorySelector({
  changeCategory,
}: {
  changeCategory: (category: string) => void;
}) {
  const theme = useTheme();
  const [selectedTab, changeSelectedTab] = useState<number>(0);
  const [currentTab, changeCurrentTab] = useState("ALL");
  const [isSxOpen, changeSxOpen] = useState(false);

  function handleCategorySelect(index: number, category: string) {
    changeSelectedTab(index);
    changeCategory(category);
    changeCurrentTab(category);
  }

  return (
    <Box>
      <Paper
        sx={{
          width: "100%",
          height: "64px",
          display: { md: "flex", xs: "none" },
          alignItems: "center",
          borderRadius: "16px",
        }}
        elevation={4}
      >
        {categories.map((category, index) => {
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
              onClick={() => handleCategorySelect(index, category.category)}
            >
              <Typography
                className={selectedTab === index ? "selected" : ""}
                key={index}
              >
                {category.name}
              </Typography>
            </Box>
          );
        })}
      </Paper>
      <Box
        sx={{
          display: { md: "none", xs: "block" },
          width: "100%",
          marginTop: "16px",
        }}
      >
        <Button
          sx={{ width: "100%" }}
          onClick={() => {
            changeSxOpen(!isSxOpen);
          }}
        >
          {currentTab}
        </Button>
        <Box
          sx={{ display: isSxOpen ? "block" : "none", transition: "all 0.5s" }}
        >
          {categories.map((category, index) => {
            return (
              <Box
                sx={{
                  flex: "1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "42px",
                  backgroundColor:
                    selectedTab === index
                      ? theme.palette.background.default
                      : "",
                  borderRadius:
                    index === 0
                      ? "16px 0px 0px 16px"
                      : index === 8
                      ? "0px 16px 16px 0px"
                      : "",
                  "&:hover": {
                    backgroundColor: theme.palette.background.default,
                    cursor: "pointer",
                  },
                }}
                key={index}
                onClick={() => {
                  handleCategorySelect(index, category.category);
                  changeSxOpen(false);
                }}
              >
                <Typography>{category.name}</Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
