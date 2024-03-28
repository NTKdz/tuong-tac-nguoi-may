import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React from "react";
import CustomDialog from "../../components/dialog/Dialog";
import ImageHolder from "../../components/image-holder/ImageHolder";
import Avatar from "../../components/avatar/Avatar";

export default function Settings() {
  const theme = useTheme();
  const settings = [
    {
      title: "Email address",
      caption: " You can sign into ClearNews with this email address.",
      element: (
        <TextField variant="standard" sx={{ width: "100%" }} value={"he"} />
      ),
      normalElement: <></>,
    },
    {
      title: "Username",
      caption: " You can sign into ClearNews with this email address.",
      element: (
        <TextField variant="standard" sx={{ width: "100%" }} value={"he"} />
      ),
      normalElement: <></>,
    },
    {
      title: "Profile information:",
      caption: " You can sign into ClearNews with this email address.",
      element: <></>,
      normalElement: <></>,
    },
  ];
  //TODO: add condition to check dark or light mode for delete avatar
  const profile = [
    {
      title: "Avatar",
      caption: "",
      element: (
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box sx={{ width: "100px", height: "100px", marginRight: "32px" }}>
            <Avatar src="src/assets/logos/logo-black.svg" />
          </Box>
          <Box
            sx={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography variant="body1" sx={{ marginRight: "8px" }}>
                Update
              </Typography>

              <Typography variant="body1" color={theme.palette.error.light}>
                Delete
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1">
                Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per
                side.
              </Typography>
            </Box>
          </Box>
        </Box>
      ),
      normalElement: <></>,
    },
    {
      title: "Name",
      caption: " You can sign into ClearNews with this email address.",
      element: (
        <TextField variant="standard" sx={{ width: "100%" }} value={"he"} />
      ),
      normalElement: <></>,
    },
  ];
  return (
    <Box sx={{ marginBottom: "32px" }}>
      {settings.slice(0).map((item) => {
        return (
          <Box
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
                      <Typography>ngsuyenthekhoi2003@gmail.com</Typography>
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

                      <Box
                        sx={{
                          display: "flex",
                          width: "100%",
                          marginTop: "32px",
                          justifyContent: "right",
                        }}
                      >
                        <Button variant="contained" sx={{ marginRight: "8px" }}>
                          cancel
                        </Button>
                        <Button variant="contained">save</Button>
                      </Box>
                    </Box>
                  }
                />
              </React.Fragment>
            )}
          </Box>
        );
      })}
      {profile.map((item) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "48px",
              marginLeft: "32px",
            }}
          >
            <Typography
              sx={{
                flex: "1",
                display: "flex",
                alignItems: "center",
              }}
              variant="body1"
            >
              {item.title}
            </Typography>

            <React.Fragment>
              <CustomDialog
                title={
                  <>
                    <Typography>ngsuyenthekhoi2003@gmail.com</Typography>
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
                      <Typography variant="caption">{item.caption}</Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        marginTop: "32px",
                        justifyContent: "right",
                      }}
                    >
                      <Button variant="contained" sx={{ marginRight: "8px" }}>
                        cancel
                      </Button>
                      <Button variant="contained">save</Button>
                    </Box>
                  </Box>
                }
              />
            </React.Fragment>
          </Box>
        );
      })}
    </Box>
  );
}
