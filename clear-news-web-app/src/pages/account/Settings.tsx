import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import CustomDialog from "../../components/dialog/Dialog";

export default function Settings() {
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
    </Box>
  );
}
