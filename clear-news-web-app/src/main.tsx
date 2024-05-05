import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppWrapper from "./App.tsx";
import { defaultStyles } from "./theme.tsx";

{
  if (!localStorage.getItem("read-theme"))
    localStorage.setItem(
      "read-theme",
      JSON.stringify({
        mode: defaultStyles.mode,
        current: defaultStyles.current,
        lineHeight: defaultStyles.lineHeight,
        theme: defaultStyles.theme,
      })
    );
  if (!localStorage.getItem("theme"))
    localStorage.setItem(
      "theme",
      JSON.stringify({
        mode: defaultStyles.mode,
        current: defaultStyles.current,
        lineHeight: defaultStyles.lineHeight,
        theme: defaultStyles.theme,
      })
    );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
