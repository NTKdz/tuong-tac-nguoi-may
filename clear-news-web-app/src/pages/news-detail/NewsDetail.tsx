import { Box, Container, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js"; // Import hls.js library
import mockData from "../../mockdata/data1.json";
import ImageHolder from "../../components/image-holder/ImageHolder";
import CommentSection from "../../components/comment-section/CommentSection";
import { formatDateTime } from "../../utils/dateFormater";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function NewsDetail() {
  const data = mockData;
  const author = data[8032858371].info.authors;
  const bodyLines = data[8032858371].info.body.split("\n");
  const videoRef = useRef(null);
  const commentSectionRef = useRef<null | HTMLDivElement>(null);
  const [speechSynthesis, setSpeechSynthesis] =
    useState<SpeechSynthesis | null>(null);
  const { lineHeight } = useSelector((state: RootState) => state.theme);

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
          
        });
      }
    };

    initializeHls();
  }, []);

  useEffect(() => {
    const synthesis = window.speechSynthesis;
    setSpeechSynthesis(synthesis);
  }, []);

  const scrollToCommentSection = () => {
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const speak = () => {
    if (speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(
        data[8032858371].info.body
      );
      speechSynthesis.speak(utterance);
    }
  };
  function loadVideo(videoSrc: string) {
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
          <Typography variant="h3" sx={{ marginBottom: "32px" }}>
            {data[8032858371].info.title}
          </Typography>
          <Box sx={{ marginBottom: "32px" }}>
            {author && author.length > 0 ? "" : ""}
            <Typography
              variant="body1"
              fontWeight={"bold"}
              sx={{ textTransform: "capitalize" }}
            >
              author dds
            </Typography>
            <Typography variant="body1">
              {`${formatDateTime(data[8032858371].info.dateTime).date} - ${
                formatDateTime(data[8032858371].info.dateTime).time
              }`}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              // backgroundColor: "red",
              marginBottom: "40px",
              padding: "8px",
              borderTop: "1px solid rgb(242, 242, 242)",
              borderBottom: "1px solid rgb(242, 242, 242)",
            }}
          >
            <Box>
              <IconButton
                sx={{ width: "32px", height: "32px", marginRight: "8px" }}
              >
                <ThumbUpAltOutlinedIcon />
              </IconButton>
              <IconButton
                sx={{ width: "32px", height: "32px", marginRight: "8px" }}
                onClick={() => {
                  scrollToCommentSection();
                }}
              >
                <CommentOutlinedIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton
                sx={{ width: "32px", height: "32px", marginRight: "8px" }}
              >
                <BookmarkBorderIcon />
              </IconButton>
              <IconButton sx={{ width: "32px", height: "32px" }}>
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
          {/* <button onClick={() => speak()}>Speak</button> */}
          <ImageHolder src={data[8032858371].info.image} />
        </Box>
        <audio controls style={{ width: "100%" }}>
          <source src="https://s3.us-east-1.amazonaws.com/invideo-uploads-us-east-1/speechen-US-Neural2-A17141979201700.mp3"></source>
        </audio>
        <Box>
          {bodyLines.map((line, index) => {
            if (
              line.includes("ADVERTISEMENT") ||
              line.includes("SPONSORED CONTENT")
            )
              return null;

            return (
              <Box key={index}>
                {index === Math.floor(bodyLines.length / 2) && (
                  <Box>
                    <video
                      ref={videoRef}
                      width="100%"
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
                )}
                <Typography
                  key={index}
                  variant="body1"
                  paragraph
                  lineHeight={lineHeight + "%"}
                >
                  {line}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Paper>

      <div ref={commentSectionRef}>
        <CommentSection />
      </div>
    </Container>
  );
}
