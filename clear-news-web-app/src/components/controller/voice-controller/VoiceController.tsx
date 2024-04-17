import React, { useEffect, useState } from "react";
import "./commands";
export default function VoiceController() {
  const [recognizedText, setRecognizedText] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setRecognizedText(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    setRecognition(recognition);

    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        if (isListening) {
          recognition.stop();
        } else {
          recognition.start();
        }
        setIsListening(!isListening);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isListening]);

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  return (
    <div>
      <p>Press Enter to start/stop listening.</p>
      <p>Recognized Text: {recognizedText}</p>
      <button onClick={toggleListening}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
    </div>
  );
}
