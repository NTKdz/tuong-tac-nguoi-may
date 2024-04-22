import {
  Box,
  Button,
  Icon,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import ImageHolder from "../image-holder/ImageHolder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useMemo, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";

export interface CommentModel {
  id: number;
  author: string;
  email: string;
  body: string;
  timestamp: string;
  avatar: string;
  replies: CommentModel[];
  offset?: number;
}

export default function Comment({
  id,
  author,
  email,
  body,
  timestamp,
  avatar,
  replies,
  offset = 0,
}: CommentModel) {
  const [isReplying, setIsReplying] = useState(false);
  const [isRepliesShown, setRepliesShown] = useState(false);
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        marginTop: "16px",
        marginLeft: `${String(offset * 8)}px`,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          height: "100%",
          width: "4px",
          backgroundColor: theme.palette.primary.main,
          borderRadius: "8px",
        }}
      ></Box>
      <Box sx={{ width: "100%", marginLeft: "12px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: "40px",
                height: "40px",
                display: "flex",
                marginRight: "8px",
              }}
            >
              <ImageHolder
                src={avatar}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "50%",
                }}
              />
            </Box>

            <Typography>{author}</Typography>
          </Box>
          <IconButton sx={{ width: "40px", height: "40px" }}>
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Box sx={{ marginTop: "8px", marginBottom: "8px" }}>{body}</Box>
        <Box>
          <Box sx={{ display: "flex" }}>
            <Button
              sx={{
                height: "28px",
                marginRight: "8px",
                fontWeight: "bold",
                "&:hover": {
                  cursor: "pointer",
                },
                textAlign: "center",
                color: isReplying ? theme.palette.error.main : "",
              }}
              onClick={() => {
                setIsReplying(!isReplying);
              }}
            >
              {isReplying ? "Stop replying" : "Reply"}
            </Button>

            {replies && replies.length > 0 && (
              <Button
                sx={{
                  height: "28px",
                  fontWeight: "bold",
                  "&:hover": {
                    cursor: "pointer",
                  },
                  textAlign: "center",
                  color: isRepliesShown ? theme.palette.error.main : "",
                }}
                onClick={() => {
                  setRepliesShown(!isRepliesShown);
                }}
              >
                {isRepliesShown ? "Close Reply" : "View all replies"}
              </Button>
            )}
          </Box>

          <Box sx={{ width: "100%" }}>
            {isRepliesShown &&
              replies?.map((reply) => {
                return (
                  <Comment
                    id={reply.id}
                    author={reply.author}
                    email={reply.email}
                    body={reply.body}
                    timestamp={reply.timestamp}
                    avatar={reply.avatar}
                    replies={reply.replies as CommentModel[]}
                    offset={offset + 1}
                  ></Comment>
                );
              })}
            {isReplying && (
              <Box>
                <TextField
                  placeholder="What are your thoughts?"
                  multiline
                  minRows={0}
                  sx={{
                    width: "100%",
                    marginTop: "8px",
                    marginBottom: "4px",
                    boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton
                    sx={{
                      width: "40px",
                      height: "40px",
                      color: theme.palette.error.main,
                    }}
                  >
                    <CancelIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      width: "40px",
                      height: "40px",
                      marginLeft: "4px",
                      color: theme.palette.primary.main,
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
