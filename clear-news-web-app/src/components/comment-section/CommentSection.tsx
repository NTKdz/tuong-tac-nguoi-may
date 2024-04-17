import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Comment from "./Comment";

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
      <FormControl sx={{ width: "100%", marginBottom: "16px" }}>
        <TextField
          placeholder="What are your thoughts?"
          multiline
          minRows={4}
          sx={{ marginBottom: "8px" }}
        />
        <Box>
          <Button variant="contained" sx={{ float: "right" }}>
            respond
          </Button>
          <Button sx={{ float: "right" }}>cancel</Button>
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
