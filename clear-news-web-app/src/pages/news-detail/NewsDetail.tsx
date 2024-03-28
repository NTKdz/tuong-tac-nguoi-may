import { Box, Container, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import Hls from "hls.js"; // Import hls.js library
import mockData from "../../mockdata/data1.json";
import ImageHolder from "../../components/image-holder/ImageHolder";

export default function NewsDetail() {
  const data = mockData;
  const bodyLines = data[8032858371].info.body.split("\n");
  const videoRef = useRef(null);

  useEffect(() => {
    const initializeHls = () => {
      if (Hls.isSupported()) {
        const hls = new Hls();
        const video = videoRef.current;

        hls.loadSource(
          "https://lineup.cbsivideo.com/playout/c1ed69db-6b71-4581-a937-a70ab4089f8a/0/chunklist.m3u8"
        );
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
      }
    };

    initializeHls();
  }, []);

  function loadVideo(videoSrc:string){
    if (Hls.isSupported()) {
      let hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(this.myRef.current);
    }
  }
  return (
    <Container maxWidth="md" sx={{ marginTop: "32px", marginBottom: "32px" }}>
      <Paper sx={{ padding: "32px" }}>
        <Box sx={{ marginBottom: "16px" }}>
          <Typography variant="h4" sx={{ marginBottom: "16px" }}>
            {data[8032858371].info.title}
          </Typography>
          <ImageHolder src={data[8032858371].info.image} />
        </Box>

        {bodyLines.map((line, index) => {
          if (line.includes("ADVERTISEMENT")) return null;
          if (index === 1) {
            return (
              <Box key={index}>
                <video
                  ref={videoRef}
                  width="640"
                  height="360"
                  controls
                  playsInline // Important for mobile devices
                >
                  <source
                    src="https://lineup.cbsivideo.com/playout/c1ed69db-6b71-4581-a937-a70ab4089f8a/0/chunklist.m3u8"
                    type="application/x-mpegURL"
                  />
                  Your browser does not support the video tag.
                </video>
                <Typography variant="body1" paragraph>
                  {line}
                </Typography>
              </Box>
            );
          }
          return (
            <Typography key={index} variant="body1" paragraph>
              {line}
            </Typography>
          );
        })}
      </Paper>
    </Container>
  );
}
