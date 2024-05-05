import React, { useEffect, useState } from "react";

interface IVoiceController {
  onSpeechRecognized: (text: string) => void;
}

const VoiceController: React.FC<IVoiceController> = () => {
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    const SpeechRecognitionInstance =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const newRecognition = new SpeechRecognitionInstance();
    newRecognition.continuous = true;
    newRecognition.interimResults = true;
    newRecognition.lang = "vi-VN";

    newRecognition.onresult = (event) => {
      const newTranscript = Array.from(event.results).map(
        (result) => result[0].transcript
      );

      console.log(newTranscript[newTranscript.length - 1]);
      // if (newTranscript.includes("lướt xuống")) {
      //   window.scrollBy({ top: 100, left: 100, behavior: "smooth" });
      //   console.log("work");
      // }
    };

    newRecognition.onspeechend = () => {
      setIsListening(false);
      setTranscript("");
    };

    setRecognition(newRecognition);

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (isListening) {
          setIsListening(false);
          recognition.stop();
        } else {
          setIsListening(true);
          setTranscript("");
          recognition.start();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [recognition, isListening]);

  useEffect(() => {}, [transcript]);

  return (
    <div>
      <p>Listening: {isListening ? "Yes" : "No"}</p>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default VoiceController;
