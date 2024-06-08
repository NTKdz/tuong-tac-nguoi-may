import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import Avatar from "react-avatar";
import { DeleteComment } from "../../firebase/apiFunctions";

export interface CommentModel {
  id: string;
  author: string;
  email: string;
  body: string;
  timestamp?: string;
  avatar?: string;
  replies?: CommentModel[];
  offset?: number;
  onDelete: () => void;
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
  onDelete,
}: CommentModel) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  console.log(author, timestamp, avatar, replies, offset, onDelete);
  const [isRepliesShown, setRepliesShown] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async () => {
    setAnchorEl(null);
    DeleteComment(id);
    onDelete();
  };
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
              <Avatar name={email} round={true} size="40" />
              {/* <ImageHolder
                src={avatar}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "50%",
                }}
              /> */}
            </Box>

            <Typography>{email}</Typography>
          </Box>
          <Box>
            <IconButton
              sx={{ position: "relative", width: "40px", height: "40px" }}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Delete Comment</MenuItem>
            </Menu>
          </Box>
        </Box>
        <Box sx={{ marginTop: "8px", marginBottom: "8px" }}>
          <Typography>{body}</Typography>
        </Box>
        <Box>
          <Box sx={{ display: "flex" }}>
            {/* <Button
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
            </Button> */}

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

          {/* <Box sx={{ width: "100%" }}>
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
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
}
