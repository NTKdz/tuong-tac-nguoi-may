import "./styles.css";
import { Box, IconButton, SxProps, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";

export default function SearchBar({
  label,
  onSearch,
  style,
  searchValue,
  onChangeValue,
}: {
  label?: string;
  onSearch: (keyWord: string) => void;
  style?: SxProps;
  searchValue: string;
  onChangeValue: (keyWord: string) => void;
}) {
  const [value, setValue] = useState(searchValue);
  useEffect(() => {
    setValue(searchValue);
  }, [searchValue]);
  return (
    <Box
      sx={{ width: "100%", display: "flex", alignItems: "center", ...style }}
    >
      <TextField
        id="outlined-basic"
        label={label ? label : "Search"}
        variant="standard"
        sx={{ width: "100%" }}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChangeValue(e.target.value);
        }}
      />

      <IconButton
        sx={{
          borderRadius: "0px",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => {
          onSearch(value);
        }}
      >
        <SearchIcon sx={{ height: "100%" }}></SearchIcon>
      </IconButton>
    </Box>
  );
}
