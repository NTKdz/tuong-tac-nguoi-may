import { Box, Typography, useTheme } from "@mui/material";

export default function HeadLine({
  content,
  background,
}: {
  content: string;
  background?: string;
}) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        marginBottom: "4px",
        background: background
          ? background
          : `linear-gradient(90deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 50%)`,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginTop: "4px",
          marginBottom: "4px",
          marginLeft: "4px",
        }}
      >
        {content}
      </Typography>
    </Box>
  );
}
