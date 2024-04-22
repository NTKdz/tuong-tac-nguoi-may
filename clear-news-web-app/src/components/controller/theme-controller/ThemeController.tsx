import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ThemeHooks } from "../../../redux/hooks/ThemeHooks";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const themeSettings = [
  { setting: "Text", component: <></> },
  { setting: "BackgroundColor", component: <></> },
];
export default function ThemeController() {
  const [isOpen, setOpen] = useState(false);
  const myTheme = useTheme();
  const { theme } = useSelector((state: RootState) => state);
  const { changeFontSize } = ThemeHooks();
  function increaseFontSize() {
    if (theme.theme.typography.fontSize < 30)
      changeFontSize(theme.theme.typography.fontSize + 10);
  }
  return (
    <Box>
      <Box
        sx={{
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "56px",
          height: "56px",
          borderRadius: "8px 0px 0px 8px",
          top: "100px",
          right: "0px",
          // display: isOpen ? "block" : "none",
          zIndex: 10001,
          transition: "all 0.5s",
          opacity: isOpen ? 0 : 1,
          "&:hover": {
            cursor: "pointer",
          },
          backgroundColor: myTheme.palette.background.paper,
        }}
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        <ArrowBackIosIcon sx={{ margin: "auto" }} />
      </Box>
      <Box
        sx={{
          position: "fixed",
          top: "100px",
          right: isOpen ? "0px" : "-300px",
          // display: isOpen ? "block" : "none",
          zIndex: 10000,
          transition: "all 0.5s",
          opacity: isOpen ? 1 : 0,
          backgroundColor: myTheme.palette.background.paper,
          width: "500px",
          padding: "16px",
          borderRadius: "8px 0px 0px 8px",
        }}
      >
        {themeSettings.map((item) => {
          return (
            <Accordion sx={{ width: "100%" }}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>{item.setting}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {item.component}
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
                <Button variant="contained">heell</Button>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Box>
  );
}
