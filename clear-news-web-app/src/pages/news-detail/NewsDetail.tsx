import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import { Box, Container, IconButton, Paper, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AudioPlayer from "../../components/audio-player/AudioPlayer";
import CommentSection from "../../components/comment-section/CommentSection";
import ImageHolder from "../../components/image-holder/ImageHolder";
import {
  BookmarkArticle,
  DeleteBookmark,
  IsBookmarked,
} from "../../firebase/apiFunctions";
import mockData from "../../mockdata/data1.json";
import { RootState } from "../../redux/store";
import { formatDateTime } from "../../utils/dateFormater";
import NewsHooks from "../../redux/hooks/NewsHooks";
import VideoPlayer from "../../components/video-player/VideoPlayer";

export default function NewsDetail() {
  const newsDetail = mockData[8032858371].info;

  const commentSectionRef = useRef<null | HTMLDivElement>(null);
  const { id } = useParams();
  const { lineHeight } = useSelector((state: RootState) => state.theme);
  const { audioLink } = useSelector((state: RootState) => state.loading);
  // const { newsDetail } = useSelector((state: RootState) => state.news);
  const { getNewsDetail } = NewsHooks();
  // const { getAudioLink } = LoadingHooks();
  const [bookmarkedStatus, setBookMark] = useState(false);
  useEffect(() => {
    const getBookmarkStatus = async () => {
      const status = await IsBookmarked(
        newsDetail.uri,
        JSON.parse(localStorage.getItem("user")!).uid
      );
      console.log(status);
      setBookMark(status);
    };

    getBookmarkStatus();
    // getAudioLink(newsDetail.body);
    // id && getNewsDetail(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const scrollToCommentSection = () => {
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  function onBookMarkClick() {
    if (localStorage.getItem("user")) {
      if (bookmarkedStatus) {
        console.log(JSON.parse(localStorage.getItem("user")!).uid);
        DeleteBookmark(
          JSON.parse(localStorage.getItem("user")!).uid,
          newsDetail.uri
        );
        setBookMark(false);
      } else {
        BookmarkArticle(
          newsDetail.uri,
          newsDetail.title,
          newsDetail.image,
          formatDateTime(newsDetail.dateTime).date
        );
        setBookMark(true);
      }
    } else {
      alert("Please login to comment");
    }
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: "32px", marginBottom: "32px" }}>
      <Paper sx={{ padding: "32px", borderRadius: "8px" }}>
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
                  onBookMarkClick();
                }}
              >
                {bookmarkedStatus ? <BookmarkIcon /> : <BookmarkBorderIcon />}
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
                        <VideoPlayer videoLink={newsDetail.videos[0].uri} />
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

      <Box ref={commentSectionRef}>
        <CommentSection articleId={newsDetail.uri} />
      </Box>
    </Container>
  );
}
