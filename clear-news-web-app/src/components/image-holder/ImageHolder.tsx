import { Box, CircularProgress, SxProps, Theme } from "@mui/material";
import { useState } from "react";

export default function ImageHolder({
  src,
  style = {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: "8px",
  },
}: {
  src: string;
  style?: SxProps<Theme>;
}) {
  const [image, setImage] = useState(src);
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setImage("https://via.placeholder.com/500x240.png?text=No+Image");
    setLoading(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 0, 0, 0.1)",
            ...style,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Box
        component="img"
        src={image}
        sx={style}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
      />
    </Box>
  );
}
