import { Box, SxProps, Theme } from "@mui/material";
import { useState } from "react";

export default function Avatar({
  src,
  style = {
    borderRadius: "100%",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}: {
  src: string;
  style?: SxProps<Theme>;
}) {
  const [image, setImage] = useState(src);

  const handleImageError = () => {
    setImage("https://via.placeholder.com/500x240.png?text=No+Image");
  };

  return (
    <Box
      component="img"
      src={image}
      sx={style}
      onError={handleImageError}
      loading="lazy"
    />
  );
}
