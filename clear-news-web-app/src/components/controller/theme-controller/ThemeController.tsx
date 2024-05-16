import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ThemeHooks, ThemeState } from "../../../redux/hooks/ThemeHooks";
import { RootState } from "../../../redux/store";
import { fontFamilies } from "../../../theme";
import ColorPicker from "./color-picker/ColorPicker";
import LineHeightInput from "./value-input/LineHeightInput";
import ValueInput from "./value-input/ValueInput";
import { getTheme } from "./getTheme";

export default function ThemeController() {
  const location = useLocation();
  const [isOpen, setOpen] = useState(false);
  const [attribute, setAttribute] = useState({
    top: "80px",
    right: "0",
    width: "500px",
  });
  const myTheme = useTheme();
  const { lineHeight, theme, mode, current, themeName } = useSelector(
    (state: RootState) => state.theme
  );

  const {
    changeCurrent,
    changeFontSize,
    changeTextColor,
    changeTheme,
    changePrimary,
    changeDefaultBackgroundColor,
    changePaperBackgroundColor,
    changeMode,
    changeFontFamily,
    changeLineHeight,
  } = ThemeHooks();

  useEffect(() => {
    if (location.pathname.includes("/news")) {
      changeCurrent("reading");
      changeMode(JSON.parse(localStorage.getItem("read-theme")!).mode);
    } else {
      changeCurrent("default");
      changeMode(JSON.parse(localStorage.getItem("theme")!).mode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  function onColorChange(type: string, color: string) {
    switch (type) {
      case "text":
        changeTextColor(color);
        break;
      case "default":
        console.log("change default");
        changeDefaultBackgroundColor(color);
        break;
      case "paper":
        console.log("change");
        changePaperBackgroundColor(color);
        break;
      case "primary-main":
        changePrimary(color, myTheme.palette.primary.contrastText);
        break;
      case "primary-contrast":
        changePrimary(myTheme.palette.primary.main, color);
        break;
    }
  }

  function onResetting(type: string) {
    const theme = getTheme(
      JSON.parse(
        localStorage.getItem(current === "reading" ? "read-theme" : "theme")!
      ).themeName
    ) as ThemeState;
    switch (type) {
      case "text":
        changeTextColor(theme.theme.text.primary);
        break;
      case "default":
        console.log("change default");
        changeDefaultBackgroundColor(theme.theme.background.default);
        break;
      case "paper":
        console.log("change");
        changePaperBackgroundColor(theme.theme.background.paper);
        break;
      case "primary-main":
        changePrimary(
          theme.theme.primary.main,
          myTheme.palette.primary.contrastText
        );
        break;
      case "primary-contrast":
        changePrimary(
          myTheme.palette.primary.main,
          theme.theme.primary.contrastText
        );
        break;
    }
  }

  const themeSettings = [
    { name: "Theme", setting: "theme", component: <Box></Box> },
    {
      name: "Text",
      setting: "text",
      component: (
        <Box>
          <Typography>Font Size</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <Box sx={{ marginRight: "8px" }}>
              <ValueInput
                style={{ width: "100px" }}
                initValue={myTheme.typography.fontSize}
                onChange={(e: number) => {
                  changeFontSize(e);
                }}
              />
            </Box>
            <Button
              sx={{ width: "50%" }}
              onClick={() => {
                changeFontSize(myTheme.typography.fontSize + 1);
              }}
            >
              <AddIcon />
            </Button>
            <Button
              sx={{ width: "50%" }}
              onClick={() => {
                changeFontSize(myTheme.typography.fontSize - 1);
              }}
            >
              <RemoveIcon />
            </Button>
          </Box>

          <Typography>Line Height</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <Box sx={{ marginRight: "8px" }}>
              <LineHeightInput
                style={{ width: "100px" }}
                initValue={lineHeight}
                onChange={(e: string) => {
                  changeLineHeight(e);
                }}
              />
            </Box>
            <Button
              sx={{ width: "50%" }}
              onClick={() => {
                changeLineHeight((parseInt(lineHeight) + 100).toString());
              }}
            >
              <AddIcon />
            </Button>
            <Button
              sx={{ width: "50%" }}
              onClick={() => {
                changeLineHeight((parseInt(lineHeight) - 100).toString());
              }}
            >
              <RemoveIcon />
            </Button>
          </Box>

          <Typography>Font Family</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <FormControl fullWidth>
              <Select
                value={myTheme.typography.fontFamily}
                onChange={(e) => {
                  changeFontFamily(e.target.value);
                  console.log(myTheme.typography.fontFamily);
                }}
              >
                {fontFamilies.map((fontFamily, index) => {
                  return (
                    <MenuItem key={index} value={fontFamily}>
                      {fontFamily}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>

          <Typography>
            Color {myTheme.palette.mode === "dark" && "(disabled)"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <Box sx={{ marginRight: "8px", width: "80%" }}>
              <ColorPicker
                color={myTheme.palette.text.primary}
                onColorChange={(color: string) => {
                  console.log("change text");
                  onColorChange("text", color);
                }}
                disabled={myTheme.palette.mode === "dark" ? true : false}
              />
            </Box>
            <Button onClick={() => onResetting("text")}>Reset</Button>
          </Box>
        </Box>
      ),
    },
    {
      name: "BackgroundColor",
      setting: "background",
      component: (
        <Box>
          <Typography>
            Default {myTheme.palette.mode === "dark" && "(disabled)"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <Box sx={{ marginRight: "8px", width: "80%" }}>
              <ColorPicker
                color={myTheme.palette.background.default}
                onColorChange={(color: string) => {
                  onColorChange("default", color);
                }}
                disabled={myTheme.palette.mode === "dark" ? true : false}
              />
            </Box>
            <Button onClick={() => onResetting("default")}>Reset</Button>
          </Box>

          <Typography>
            Paper {myTheme.palette.mode === "dark" && "(disabled)"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <Box sx={{ marginRight: "8px", width: "80%" }}>
              <ColorPicker
                color={myTheme.palette.background.paper}
                onColorChange={(color: string) => {
                  onColorChange("paper", color);
                }}
                disabled={myTheme.palette.mode === "dark" ? true : false}
              />
            </Box>
            <Button onClick={() => onResetting("paper")}>Reset</Button>
          </Box>
        </Box>
      ),
    },
    {
      name: "Primary",
      setting: "primary",
      component: (
        <>
          <Typography>
            Main {myTheme.palette.mode === "dark" && "(disabled)"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <Box sx={{ marginRight: "8px", width: "80%" }}>
              <ColorPicker
                color={myTheme.palette.primary.main}
                onColorChange={(color: string) => {
                  onColorChange("primary-main", color);
                }}
                disabled={myTheme.palette.mode === "dark" ? true : false}
              />
            </Box>
            <Button onClick={() => onResetting("primary-main")}>Reset</Button>
          </Box>

          <Typography>
            Contrast Text {myTheme.palette.mode === "dark" && "(disabled)"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <Box sx={{ marginRight: "8px", width: "80%" }}>
              <ColorPicker
                color={myTheme.palette.primary.contrastText}
                onColorChange={(color: string) => {
                  onColorChange("primary-contrast", color);
                }}
                disabled={myTheme.palette.mode === "dark" ? true : false}
              />
            </Box>
            <Button onClick={() => onResetting("primary-contrast")}>
              Reset
            </Button>
          </Box>
        </>
      ),
    },
    // {
    //   name: "Secondary",
    //   setting: "secondary",
    //   component: (
    //     <>
    //       <Typography>
    //         Main {myTheme.palette.mode === "dark" && "(disabled)"}
    //       </Typography>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           alignItems: "center",
    //           marginBottom: "16px",
    //         }}
    //       >
    //         <Box sx={{ marginRight: "8px", width: "80%" }}>
    //           <ColorPicker
    //             color={myTheme.palette.secondary.main}
    //             onColorChange={(color: string) => {
    //               onColorChange("secondary-main", color);
    //             }}
    //             disabled={myTheme.palette.mode === "dark" ? true : false}
    //           />
    //         </Box>
    //         <Button>Reset</Button>
    //       </Box>

    //       <Typography>
    //         Contrast Text {myTheme.palette.mode === "dark" && "(disabled)"}
    //       </Typography>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           alignItems: "center",
    //           marginBottom: "16px",
    //         }}
    //       >
    //         <Box sx={{ marginRight: "8px", width: "80%" }}>
    //           <ColorPicker
    //             color={myTheme.palette.secondary.contrastText}
    //             onColorChange={(color: string) => {
    //               onColorChange("secondary-contrast", color);
    //             }}
    //             disabled={myTheme.palette.mode === "dark" ? true : false}
    //           />
    //         </Box>
    //         <Button>Reset</Button>
    //       </Box>
    //     </>
    //   ),
    // },
  ];

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
          setAttribute({ top: "100px", right: "0px", width: "500px" });
        }}
      >
        <ArrowBackIosIcon sx={{ margin: "auto" }} />
      </Box>
      <Box
        sx={{
          position: "fixed",
          top: attribute.top,
          right: isOpen ? attribute.right : -1000,
          // display: isOpen ? "block" : "none",
          zIndex: 1000,
          transition: "all 0.5s",
          opacity: isOpen ? 1 : 0,
          backgroundColor: myTheme.palette.background.paper,
          width: attribute.width,
          maxHeight: "640px",
          padding: "16px",
          borderRadius: "8px 0px 0px 8px",
          overflowY: "auto", // or "scroll"
        }}
      >
        <Box sx={{ marginBottom: "8px" }}>
          <Button
            sx={{ float: "right" }}
            onClick={() => {
              const readStyle = current === "reading" ? "read-theme" : "theme";
              const currentTheme = localStorage.getItem(readStyle);
              currentTheme && changeTheme(JSON.parse(currentTheme));
              setOpen(!isOpen);
            }}
            color="error"
          >
            Close
          </Button>
          <Button
            sx={{ marginRight: "8px" }}
            onClick={() => {
              if (attribute.right !== "10%") {
                setAttribute({ top: "100px", right: "10%", width: "80%" });
              } else {
                setAttribute({ top: "100px", right: "0px", width: "500px" });
              }
            }}
          >
            Expand
          </Button>
          <Button
            onClick={() => {
              const readStyle = current === "reading" ? "read-theme" : "theme";
              localStorage.setItem(
                readStyle,
                JSON.stringify({
                  mode: mode,
                  theme: theme,
                  lineHeight: lineHeight,
                  themeName: themeName,
                })
              );
            }}
          >
            Apply
          </Button>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          marginBottom={"8px"}
        >
          <Box display={"flex"} alignItems={"center"}>
            <Typography>Dark mode</Typography>
            <Switch
              checked={myTheme.palette.mode === "dark"}
              onChange={(_, checked) => {
                changeMode(checked ? "dark" : "light");
              }}
            />
          </Box>
          <Button
            onClick={() => {
              changeTheme(
                getTheme(
                  JSON.parse(
                    localStorage.getItem(
                      current === "reading" ? "read-theme" : "theme"
                    )!
                  ).themeName
                ) as ThemeState
              );
            }}
          >
            Reset
          </Button>
        </Box>

        <Grid container spacing={2}>
          {themeSettings.map((item, index) => {
            return (
              <Grid key={index} item xs={attribute.right === "10%" ? 6 : 12}>
                <Accordion sx={{ width: "100%" }} key={item.name}>
                  <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography>{item.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>{item.component}</AccordionDetails>
                </Accordion>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
