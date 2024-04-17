import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import ThemeController from "../components/controller/theme-controller/ThemeController";
import { Box } from "@mui/material";

export default function LayOut() {
  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <ThemeController />
      <NavBar />
      <Outlet />
      <Footer />
    </Box>
  );
}
