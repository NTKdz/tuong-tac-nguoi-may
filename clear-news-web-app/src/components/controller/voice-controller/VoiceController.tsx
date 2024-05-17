import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeHooks, ThemeState } from "../../../redux/hooks/ThemeHooks";
import { RootState } from "../../../redux/store";
import { colorToHex, recognition, textToSpeech } from "./commands";
import { getTheme } from "../theme-controller/getTheme";
import { getContrastColor } from "../../../utils/colorContrast";

console.log("init");
const VoiceController = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const muiTheme = useTheme();
  const { lineHeight, theme, mode, current, themeName } = useSelector(
    (state: RootState) => state.theme
  );

  const {
    changeDefaultBackgroundColor,
    changePaperBackgroundColor,
    changePrimary,
    changeFontFamily,
    changeFontSize,
    changeLineHeight,
    changeMode,
    changeTextColor,
    changeTheme,
  } = ThemeHooks();

  const [stopReco, setStopReco] = useState(true);
  const [transcript, setTranscript] = useState("");
  const [speechScript, setSpeechScript] = useState("");
  useEffect(() => {
    const htmlElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6");

    Array.from(htmlElements).forEach((element) => {
      element.addEventListener("mouseover", (event) => {
        const textContent = (event.target as HTMLElement).textContent;
        if (textContent) {
          setTranscript(textContent);
        }

        if (event.target) {
          const target = event.target as HTMLElement;
          target.style.fontWeight = "bold";
          target.style.cursor = "pointer";
        }
      });

      element.addEventListener("mouseout", (event) => {
        if (event.target) {
          const target = event.target as HTMLElement;
          target.style.fontWeight = "";
        }
      });
    });
  }, [location.pathname]);

  useEffect(() => {
    // console.log(transcript);
    // const utterThis = new SpeechSynthesisUtterance(transcript);
    // if (textToSpeech.speaking) {
    //   textToSpeech.cancel();
    // }
    // textToSpeech.speak(utterThis);
  }, [transcript]);

  function handleIncrease(type: string) {
    switch (type) {
      case "cỡ chữ":
        changeFontSize(muiTheme.typography.fontSize + 2);
        break;
      case "dòng":
        changeLineHeight(String(Number(theme.lineHeight) + 100));
        break;
    }
  }

  function handleDecrease(type: string) {
    switch (type) {
      case "cỡ chữ":
        changeFontSize(muiTheme.typography.fontSize - 2);
        break;
      case "dòng":
        changeLineHeight(String(Number(theme.lineHeight) - 100));
        break;
    }
  }

  function handleChange(command: string) {
    let [prefix, colorName] = ["", ""],
      hexColor: string | null = "";
    if (command.startsWith("chủ đạo")) {
      prefix = "chủ đạo";
      colorName = command.split("chủ đạo")[1];
      hexColor = colorToHex(colorName.trim());
    } else {
      [prefix, colorName] = command.split(/\s+/);
      hexColor = colorToHex(colorName.trim());
    }

    if (!hexColor) return;
    switch (prefix) {
      case "nền":
        changeDefaultBackgroundColor(hexColor);
        break;
      case "giấy":
        changePaperBackgroundColor(hexColor);
        break;
      case "chữ":
        changeTextColor(hexColor);
        break;
      case "chủ đạo":
        console.log("change");
        changePrimary(
          hexColor,
          getContrastColor(hexColor) === "dark" ? "#3c3c3c" : "#ffffff"
        );
        break;
    }
  }
  recognition.onresult = async (event) => {
    let command = event.results[0][0].transcript.toLowerCase();
    command = command.replace(".", "");
    console.log(command);
    setSpeechScript(command);
    if (command.startsWith("reset")) {
      changeTheme(
        getTheme(
          JSON.parse(
            localStorage.getItem(
              current === "reading" ? "read-theme" : "theme"
            )!
          ).themeName
        ) as ThemeState
      );
    }
    if (command.startsWith("đọc")) {
      console.log(transcript);
      const utterThis = new SpeechSynthesisUtterance(transcript);
      if (textToSpeech.speaking) {
        textToSpeech.cancel();
      }
      textToSpeech.speak(utterThis);
    }
    if (command.startsWith("màu")) {
      command.split("màu")[1].trim() === "tối"
        ? changeMode("dark")
        : changeMode("light");
    }
    if (command.startsWith("xác nhận")) {
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
    }
    if (command.startsWith("tải lại")) {
      navigate(0);
    }
    if (command.startsWith("in bài")) {
      window.print();
    }
    if (command.startsWith("tăng")) {
      handleIncrease(command.split("tăng")[1].trim());
    }
    if (command.startsWith("giảm")) {
      handleDecrease(command.split("giảm")[1].trim());
    }
    if (command.startsWith("đổi màu")) {
      handleChange(command.split("đổi màu")[1].trim());
    }
    if (command.includes("lên")) {
      window.scrollBy({ top: -700, left: 0, behavior: "smooth" });
    }
    if (command.includes("xuống")) {
      window.scrollBy({ top: 700, left: 0, behavior: "smooth" });
    }
    if (command.includes("đầu trang")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (command.includes("cuối trang")) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
    if (command.startsWith("mở")) {
      switch (command.split("mở")[1].trim()) {
        case "đăng nhập":
          navigate("/login");
          break;
        case "đăng ký":
          navigate("/logout");
          break;
        case "trang chủ":
          navigate("/");
          break;
        case "tài khoản":
          navigate("/account/settings");
          break;
        case "bookmark":
          navigate("/account/bookmarks");
          break;
        default:
          navigate("/category/" + command.split("mở")[1].trim());
          break;
      }
    }
    if (command.includes("dừng")) {
      setStopReco(true);
    }
  };

  recognition.onend = () => {
    if (!stopReco) {
      console.log("restart baby");
      recognition.start();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.code === "Space") {
        setStopReco((prevStopReco) => !prevStopReco);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!stopReco) {
      recognition.start();
    } else {
      recognition.stop();
    }
  }, [stopReco]);
  return (
    <Box>
      {!stopReco && (
        <Box
          sx={{
            position: "fixed",
            top: 100,
            left: "45%",
            zIndex: 10000,
            backgroundColor: "white",
            padding: "8px",
            fontSize: "24px",
            borderRadius: "8px",
          }}
        >
          {speechScript}
        </Box>
      )}
    </Box>
  );
};

export default VoiceController;
