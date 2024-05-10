import React, { useEffect, useRef, useState } from "react";

export default function AudioPlayer({ link }: { link: string }) {
  const [audioLink, setAudioLink] = useState(link);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setAudioLink(link);
  }, [link]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [audioLink]);

  return (
    <div>
      <audio ref={audioRef} controls style={{ width: "100%" }}>
        <source src={audioLink} />
      </audio>
    </div>
  );
}