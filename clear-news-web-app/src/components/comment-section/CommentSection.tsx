import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ImageHolder from "../image-holder/ImageHolder";
import comments from "../../mockdata/comments.json";
import Comment, { CommentModel } from "./Comment";
import {
  CreateComment,
  GetAllCommentsOfArticle,
} from "../../firebase/apiFunctions";
import { GetUidAndEmail } from "../../firebase/auth";
interface Comment {
  id: string;
  data: {
    articleId: string;
    content: string;
    userId: string;
    userEmail: string;
    createAt: Date;
  };
}

export default function CommentSection({ articleId }) {
  const [sortType, changeSortType] = useState("most recent");
  const [uidAndEmail, setUidAndEmail] = useState({});
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    // const fetchComments = async () => {
    //   try {
    //     const comments = await GetAllCommentsOfArticle(articleId);
    //     setCommentsList(comments);
    //   } catch (error) {
    //     console.error("Error fetching comments:", error);
    //   }
    // };
    // const fetchUidAndEmail = async () => {
    //   try {
    //     const uae = await GetUidAndEmail();
    //     setUidAndEmail(uae);
    //   } catch (error) {
    //     console.error("Error fetching uid:", error);
    //   }
    // };
    // fetchComments();
    // fetchUidAndEmail();
  }, []);

  useEffect(() => {
    console.log(commentContent);
  }, [commentContent]);

  const handleSubmitComment = async () => {
    const { uid, email } = JSON.parse(localStorage.getItem("user")!);
    console.log({ uid, email });
    console.log("submit");

    try {
      await CreateComment(uid, email, articleId, commentContent);
      const updatedComments = await GetAllCommentsOfArticle(articleId);
      setCommentsList(updatedComments);
      setCommentContent("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <Paper
      sx={{
        marginTop: "32px",
        paddingTop: "16px",
        paddingInline: "32px",
        paddingBottom: "16px",
      }}
    >
      {/* <Button onClick={handleSubmitComment}>DELoo</Button> */}
      <Typography variant="h4">Responses</Typography>

      <FormControl
        sx={{ width: "100%", marginBottom: "16px", marginTop: "16px" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "40px",
              height: "40px",
              display: "flex",
              marginRight: "8px",
            }}
          >
            <ImageHolder
              src=""
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: "50%",
              }}
            />
          </Box>

          <Typography>KhoiDz</Typography>
        </Box>

        <TextField
          placeholder="What are your thoughts?"
          multiline
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          minRows={4}
          sx={{
            marginTop: "8px",
            marginBottom: "8px",
            boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
          }}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button sx={{}} onClick={() => setCommentContent("")}>
            cancel
          </Button>
          <Button
            variant="contained"
            sx={{ marginLeft: "8px" }}
            onClick={handleSubmitComment}
          >
            respond
          </Button>
        </Box>
      </FormControl>

      <Box>
        <Select
          value={sortType}
          onChange={(e) => changeSortType(e.target.value as string)}
        >
          <MenuItem value="most recent">Most recent</MenuItem>
          <MenuItem value="most relevant">Most relevant</MenuItem>
        </Select>
      </Box>
      {commentsList &&
        commentsList.map((comment) => {
          return (
            <Comment
              key={comment.id}
              id={comment.id}
              author={comment.data.userId}
              email={comment.data.userEmail}
              body={comment.data.content}
              // timestamp={comment.data.createAt}
              // avatar={comment.avatar}
              // replies={comment.replies as CommentModel[]}
            />
          );
        })}
    </Paper>
  );
}
