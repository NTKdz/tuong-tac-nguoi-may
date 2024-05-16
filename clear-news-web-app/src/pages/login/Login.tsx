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
import { GetUidAndEmail, SignIn, SignUp } from "../../firebase/auth";
import { getContrastColor } from "../../utils/colorContrast";
import { Paper, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Login() {
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();

  const [isRemember, changeRememberStatus] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [location.pathname]);
  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const repeatPassword = data.get("repeat password") as string;
    const username = data.get("username") as string;
    if (password === repeatPassword) {
      try {
        const userCredential = await SignUp(username, email, password);
        if (userCredential) {
          navigate("/");
        }
      } catch (error) {
        console.error("Signup failed:", error);
      }
    } else {
      console.error("Passwords do not match");
      setError(true);
    }
  };
  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    const userCredential = await SignIn(email, password);
    if (userCredential) {
      if (isRemember) {
        localStorage.setItem("user", JSON.stringify(await GetUidAndEmail()));
      }
      navigate("/");
    } else {
      console.error("Sign in failed");
      setError(true);
    }
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
        // backgroundColor: true ? "#f0f4f9" : "",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",

          // backgroundColor: true ? "white" : "",
        }}
      >
        <CssBaseline />
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
            padding: "36px !important",
            borderRadius: "16px",
          }}
        >
          <div id="login-logo-container">
            <img
              id="login-logo"
              src={
                theme.palette.mode === "dark"
                  ? "/src/assets/logos/logo-icon-white.svg"
                  : getContrastColor(theme.palette.primary.main) === "dark"
                  ? "/src/assets/logos/logo-icon-white.svg"
                  : "/src/assets/logos/logo-icon-black.svg"
              }
              alt=""
            />
          </div>
          <Typography variant="h3">
            {location.pathname.includes("login") ? "Sign in" : "Sign up"}
          </Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            onSubmit={
              location.pathname.includes("login") ? handleSignIn : handleSignUp
            }
            noValidate
            sx={{ mt: 1 }}
          >
            {!location.pathname.includes("login") && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="user-name"
                label="Username"
                name="username"
                autoFocus
                error={isError}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={isError}
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
              error={isError}
            />
            {location.pathname.includes("login") ? (
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    onChange={(event) => {
                      changeRememberStatus(event.target.checked);
                    }}
                  />
                }
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
                error={isError}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {/* Sign In */}
              {location.pathname.includes("login") ? "Sign In" : "Sign Up"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2"></Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {location.pathname.includes("login") ? (
                    <div onClick={() => navigate("/logout")}>
                      Don't have an account? Sign Up
                    </div>
                  ) : (
                    <div onClick={() => navigate("/login")}>
                      Got an account? Login
                    </div>
                  )}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
// import { useEffect } from 'react';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import app from './firebaseConfig';

// const auth = getAuth(app);

// // Inside your component
// useEffect(() => {
//   const unsubscribe = onAuthStateChanged(auth, user => {
//     if (user) {
//       // User is signed in.
//     } else {
//       // User is signed out.
//       // Redirect to login page or handle accordingly.
//     }
//   });

//   // Clean up subscription
//   return unsubscribe;
// }, []);
// const handleSignout = async () => {
//   await signout();
//   console.log('User signed out');
// };
