import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "./styles.css";

export default function Login() {
  const currentLocation = "signUp";
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: true ? "#f0f4f9" : "",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          padding: "36px !important",
          borderRadius: "24px",
          backgroundColor: true ? "white" : "",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
          }}
        >
          <div id="login-logo-container">
            <img
              id="login-logo"
              src="src/assets/logos/logo-icon-black.svg"
              alt=""
            />
          </div>
          <Typography variant="h3">
            {currentLocation === "signIn" ? "Sign in" : "Sign up"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {currentLocation === "signIn" ? (
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                name="repeat password"
                label="repeat password"
                type="password"
                id="password"
                autoComplete="off"
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {currentLocation === "signIn"
                    ? "Forgot password?"
                    : "Got an account? Login"}
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {currentLocation === "signIn"
                    ? "Don't have an account? Sign Up"
                    : ""}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
