import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppWrapper from "./App.tsx";
import VoiceController from "./components/controller/voice-controller/VoiceController.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <AppWrapper /> */}
    <VoiceController />
  </React.StrictMode>
);
