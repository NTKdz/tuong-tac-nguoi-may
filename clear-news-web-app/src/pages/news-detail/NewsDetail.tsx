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
import { BookmarkArticle, IsBookmarked } from "../../firebase/apiFunctions";
import { useParams } from "react-router-dom";
import NewsHooks from "../../redux/hooks/NewsHooks";
import PrintIcon from "@mui/icons-material/Print";
import AudioPlayer from "../../components/audio-player/AudioPlayer";
import LoadingHooks from "../../redux/hooks/LoadingHooks";

export default function NewsDetail() {
  const newsDetail = mockData[8032858371].info;
  const videoRef = useRef(null);
  const commentSectionRef = useRef<null | HTMLDivElement>(null);
  const { id } = useParams();
  const { lineHeight } = useSelector((state: RootState) => state.theme);
  const { audioLink } = useSelector((state: RootState) => state.loading);
  const { newsDetail } = useSelector((state: RootState) => state.news);
  // const { getNewsDetail } = NewsHooks();
  // const { getAudioLink } = LoadingHooks();

  useEffect(() => {
    console.log(id);
    IsBookmarked(newsDetail.uri);
    // getAudioLink(newsDetail.body);
    // id && getNewsDetail(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const initializeHls = () => {
      if (Hls.isSupported()) {
        const hls = new Hls();
        const video = videoRef.current;

        hls.loadSource(
          "https://lineup.cbsivideo.com/playout/c1ed69db-6b71-4581-a937-a70ab4089f8a/0/chunklist.m3u8"
        );
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {});
      }
    };

    initializeHls();
  }, [newsDetail]);

  const scrollToCommentSection = () => {
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  function loadVideo(videoSrc: string) {
    if (Hls.isSupported()) {
      let hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(this.myRef.current);
    }
  }

  function onBookMarkClick() {
    BookmarkArticle(
      newsDetail.uri,
      newsDetail.title,
      newsDetail.image,
      formatDateTime(newsDetail.dateTime).date
    );
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: "32px", marginBottom: "32px" }}>
      <Paper sx={{ padding: "32px" }}>
        <Box sx={{ marginBottom: "16px" }}>
          <Typography variant="h3" sx={{ marginBottom: "32px" }}>
            {newsDetail.title}
          </Typography>
          <Box sx={{ marginBottom: "32px" }}>
            {newsDetail.authors && newsDetail.authors.length > 0 ? "" : ""}
            <Typography
              variant="body1"
              fontWeight={"bold"}
              sx={{ textTransform: "capitalize" }}
            >
              author
            </Typography>
            <Typography variant="body1">
              {`${formatDateTime(newsDetail.dateTime).date} - ${
                formatDateTime(newsDetail.dateTime).time
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
                onClick={() => {
                  window.print();
                }}
              >
                <PrintIcon />
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
                sx={{
                  width: "32px",
                  height: "32px",
                  marginRight: "8px",
                  ":hover": { cursor: "pointer" },
                }}
                onClick={() => {
                  console.log("click");
                  onBookMarkClick();
                }}
              >
                <BookmarkBorderIcon />
              </IconButton>
              <IconButton sx={{ width: "32px", height: "32px" }}>
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
          {/* <button onClick={() => speak()}>Speak</button> */}
          <ImageHolder src={newsDetail.image} />
        </Box>
        <AudioPlayer link={audioLink} />
        <Box>
          {newsDetail &&
            newsDetail.body &&
            newsDetail.body.split("\n").map((line, index) => {
              if (
                line.includes("ADVERTISEMENT") ||
                line.includes("SPONSORED CONTENT")
              )
                return null;

              return (
                <Box key={index}>
                  {newsDetail.videos.length > 0 &&
                    index ===
                      Math.floor(newsDetail.body.split("\n").length / 2) && (
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
        <CommentSection articleId={newsDetail.uri} />
      </div>
    </Container>
  );
}
