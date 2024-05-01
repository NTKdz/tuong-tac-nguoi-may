import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import ThemeController from "../components/controller/theme-controller/ThemeController";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";

export default function LayOut() {
  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <ThemeController />
      <NavBar />
      <Box sx={{ width: "100%", height: "64px" }}></Box>
      <Outlet />
      <Footer />
    </Box>
  );
}
