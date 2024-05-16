import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

export default function VideoPlayer({ videoLink }: { videoLink: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [isYouTube, setIsYouTube] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([\w-]{11})(?:\S+)?$/;
    const match = videoLink.match(youtubeRegex);

    if (match) {
      setIsYouTube(true);
    } else if (Hls.isSupported() && video) {
      const hls = new Hls();
      hls.loadSource(videoLink);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => setIsLoading(false));
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          setError(data);
          hls.destroy();
        }
      });
    } else if (video) {
      video.src = videoLink;
    }
  }, [videoLink]);

  return (
    <div>
      {isYouTube ? (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${match[1]}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <video ref={videoRef} controls width="100%" playsInline />
      )}
    </div>
  );
}
