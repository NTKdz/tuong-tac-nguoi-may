import React, {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";

interface IVoiceController {
  onSpeechRecognized: (text: string) => void;
}

const VoiceController: React.FC<IVoiceController> = ({
  onSpeechRecognized,
}) => {
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    const SpeechRecognitionInstance =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    const newRecognition = new SpeechRecognitionInstance();
    newRecognition.continuous = true;
    newRecognition.interimResults = true;
    newRecognition.lang = "vi-VN";

    newRecognition.onresult = (event) => {
      const newTranscript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");

      setTranscript(newTranscript);
      // onSpeechRecognized(newTranscript);
    };

    newRecognition.onspeechend = () => {
      setIsListening(false);
    };

    setRecognition(newRecognition);
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

  return (
    <div>
      <p>Listening: {isListening ? "Yes" : "No"}</p>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default VoiceController;
