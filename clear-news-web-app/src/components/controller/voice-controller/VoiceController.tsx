import { useEffect, useState } from "react";
import { colorToHex, executeCommand } from "./commands";
import { recognition, textToSpeech } from "./commands";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeHooks } from "../../../redux/hooks/ThemeHooks";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

console.log("init");
const VoiceController = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const muiTheme = useTheme();
  const { theme } = useSelector((state: RootState) => state);
  const {
    changeDefaultBackgroundColor,
    changePaperBackgroundColor,
    changePrimary,
    changeFontFamily,
    changeFontSize,
    changeLineHeight,
    changeMode,
    changeTextColor,
  } = ThemeHooks();

  const [stopReco, setStopReco] = useState(true);
  const [transcript, setTranscript] = useState("");

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

  function handleChange(command: string) {
    let [prefix, colorName] = ["", ""],
      hexColor: string | null = "";
    if (command.startsWith("chủ đạo")) {
      [prefix, colorName] = command.split("chủ đạo");
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
        break;
      case "chủ đạo":
        console.log("chudd");
        break;
    }
  }
  recognition.onresult = async (event) => {
    let command = event.results[0][0].transcript.toLowerCase();
    command = command.replace(".", "");
    console.log(command);
    if (command.startsWith("đọc")) {
      console.log(transcript);
      const utterThis = new SpeechSynthesisUtterance(transcript);
      if (textToSpeech.speaking) {
        textToSpeech.cancel();
      }
      textToSpeech.speak(utterThis);
    }
    if (command.includes("tăng")) {
      handleIncrease(command.split("tăng")[1].trim());
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
    if (command.includes("mở")) {
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
    if (command.includes("tắt")) {
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
    <>
      {/* sadfasdfsdfasdfas
      <p>pfdasf</p>
      <p>fadfads</p>
      {transcript} */}
    </>
  );
};

export default VoiceController;
