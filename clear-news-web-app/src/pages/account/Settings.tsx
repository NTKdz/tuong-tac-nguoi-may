import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomDialog from "../../components/dialog/Dialog";
import { ChangePassword, ChangeUsername } from "../../firebase/apiFunctions";

export default function Settings() {

  const [showPassword, setShowPassword] = React.useState(false);
  const [content, setContent] = useState(
    JSON.parse(localStorage.getItem("user")!).username
  );
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  useEffect(() => {}, []);
  const settings = [
    {
      title: "Username",
      caption: " You can sign into ClearNews with this email address.",
      element: (
        <TextField
          variant="standard"
          sx={{ width: "100%" }}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      ),
      displayName: JSON.parse(localStorage.getItem("user")!).username,
    },
    {
      title: "Password",
      caption: " You can sign into ClearNews with this email address.",
      element: (
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={content}
          sx={{ width: "100%" }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      ),
      displayName: ".............",
    },
  ];

  return (
    <Box sx={{ marginBottom: "32px" }}>
      {settings.slice(0).map((item) => {
        return (
          <Box
            key={item.title}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "64px",
            }}
          >
            <Typography sx={{ flex: "2" }} variant="body1">
              {item.title}
            </Typography>
            {item.title === "Profile information:" ? (
              ""
            ) : (
              <React.Fragment>
                <CustomDialog
                  title={
                    <>
                      <Typography sx={{ fontSize: "24px!important" }}>
                        {item.displayName}
                      </Typography>
                    </>
                  }
                  content={
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "30vw",
                      }}
                    >
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        {item.title}
                      </Typography>
                      <Box sx={{ width: "100%", marginTop: "32px" }}>
                        {item.element}
                        <Typography variant="caption">
                          {item.caption}
                        </Typography>
                      </Box>
                    </Box>
                  }
                  onClose={(type: string) => {
                    console.log(content);
                    if (type === "save") {
                      if (item.title === "Username")
                        ChangeUsername(
                          JSON.parse(localStorage.getItem("user")!).uid,
                          content
                        );
                      if (item.title === "Password") {
                        ChangePassword(content);
                      }
                    }
                    setContent("");
                  }}
                  onOpen={() => {
                    if (item.title === "Password") setContent("");
                    else setContent(item.displayName);
                  }}
                />
              </React.Fragment>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
