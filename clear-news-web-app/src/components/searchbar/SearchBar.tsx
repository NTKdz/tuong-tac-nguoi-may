import "./styles.css";
import { Box, IconButton, SxProps, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({
  label,
  onClick,
  style,
}: {
  label?: string;
  onClick?: (keyWord: string) => void;
  style?: SxProps;
}) {
  return (
    <Box
      sx={{ width: "100%", display: "flex", alignItems: "center", ...style }}
    >
      <TextField
        id="outlined-basic"
        label={label ? label : "Search"}
        variant="standard"
        sx={{ width: "100%" }}
      />
      <IconButton
        sx={{
          borderRadius: "0px",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SearchIcon sx={{ height: "100%" }}></SearchIcon>
      </IconButton>
    </Box>
  );
}
