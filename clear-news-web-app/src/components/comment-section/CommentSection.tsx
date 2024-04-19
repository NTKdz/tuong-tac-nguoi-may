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
import React, { useState } from "react";
import Comment from "./Comment";
import ImageHolder from "../image-holder/ImageHolder";

export default function CommentSection() {
  const [sortType, changeSortType] = useState("most recent");
  return (
    <Paper
      sx={{
        marginTop: "32px",
        paddingTop: "16px",
        paddingInline: "32px",
        paddingBottom: "16px",
      }}
    >
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
          <Button sx={{}}>cancel</Button>
          <Button variant="contained" sx={{ marginLeft: "8px" }}>
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
      <Comment />
    </Paper>
  );
}
