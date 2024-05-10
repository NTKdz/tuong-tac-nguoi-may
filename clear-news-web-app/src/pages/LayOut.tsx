import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import ThemeController from "../components/controller/theme-controller/ThemeController";
import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/NavBar";
import { RootState } from "../redux/store";
import LoadingScreen from "../components/loading/LoadingScreen";
import VoiceController from "../components/controller/voice-controller/VoiceController";

export default function LayOut() {
  const { loading } = useSelector((state: RootState) => state.loading);

  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <VoiceController></VoiceController>
      <Box
        sx={{
          display: loading ? "block" : "none",
          position: "fixed",
          zIndex: 100000,
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
        }}
      >
        <LoadingScreen />
      </Box>
      <ThemeController />
      <NavBar />
      <Box sx={{ width: "100%", height: "64px" }}></Box>
      <Outlet />
      <Footer />
    </Box>
  );
}
