import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { CssBaseline, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getContrastColor } from "../../utils/colorContrast";
import { LogOut } from "../../firebase/auth";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SearchIcon from "@mui/icons-material/Search";

const settings = ["Setting", "Bookmarks", "Logout"];

const pageRoutes = [
  { name: "art", route: "Art" },
  { name: "Business", route: "Business" },
  { name: "Computers", route: "Computers" },
  { name: "Health", route: "Health" },
  { name: "Home", route: "Home" },
  { name: "Science", route: "Science" },
  { name: "Sports", route: "Sports" },
  { name: "Games", route: "Games" },
];

export default function NavBar() {
  const navigate = useNavigate();
  const theme = useTheme();
  // const {loading} = useSelector((state:RootState)=>state.loading)
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (
    event: React.MouseEvent<HTMLElement>,
    route: string
  ) => {
    setAnchorElNav(null);
    navigate("/category/" + route);
  };

  const handleCloseUserMenu = (
    // event: React.MouseEvent<HTMLElement>,
    setting?: string
  ) => {
    setAnchorElUser(null);

    if (setting?.includes("logout")) {
      LogOut();
      navigate("/logout");
    } else {
      setting && navigate(setting);
    }
  };
  const [isScrollTopVisible, setScrollTopVisibility] = useState(false);
  const [isNavVisible, setNavVisibility] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [value, setValue] = useState("");
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrollingUp = prevScrollPos > currentScrollPos;

      setScrollTopVisibility(scrollingUp);
      if (currentScrollPos > 64) {
        setNavVisibility(scrollingUp);
      } else {
        setNavVisibility(true);
      }

      setPrevScrollPos(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const colorSchemeMode = React.useMemo(() => {
    if (theme.palette.mode === "dark") return "light";
    return getContrastColor(theme.palette.primary.main);
  }, [theme.palette.mode, theme.palette.primary.main]);

  return (
    <AppBar
      position={"fixed"}
      sx={{
        top: isNavVisible ? 0 : -100,
        transition: "all 0.5s",
      }}
    >
      <CssBaseline />
      <IconButton
        sx={{
          display: isScrollTopVisible ? "block" : "none",
          position: "fixed",
          bottom: 100,
          right: 100,
          width: "64px",
          height: "64px",
          transition: "all 0.5s",
          zIndex: 0,
        }}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <ArrowUpwardIcon sx={{ width: "40px", height: "40px" }} />
      </IconButton>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            src={
              colorSchemeMode === "light"
                ? "/src/assets/logos/logo-icon-white.svg"
                : "/src/assets/logos/logo-icon-black.svg"
            }
            sx={{
              height: "64px",
              display: { xs: "none", md: "flex" },
              ":hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => navigate("/")}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              ":hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => navigate("/")}
          >
            ClearNews
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => {
                setAnchorElNav(null);
              }}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pageRoutes.map((page) => (
                <MenuItem
                  key={page.route}
                  onClick={(event) => handleCloseNavMenu(event, page.route)}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => navigate("/")}
          >
            ClearNews
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pageRoutes.map((page) => (
              <Button
                className="nav-button"
                key={page.route}
                onClick={(event) => handleCloseNavMenu(event, page.route)}
                color="primary"
                sx={{
                  color: theme.palette.primary.contrastText,
                  fontSize: "14px",
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box position="relative">
            <TextField
              id="standard-basic"
              label="Search"
              variant="outlined"
              value={value}
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                marginRight: "24px",
                maxWidth: "320px",
                "& .MuiOutlinedInput-root": {
                  height: "50px",
                  borderRadius: "8px",
                  color: theme.palette.primary.contrastText,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.contrastText,
                  },
                  "&.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.contrastText,
                      borderWidth: "2px",
                    },
                  },
                  "&:hover:not(.Mui-focused)": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.contrastText,
                      borderWidth: "2px",
                    },
                  },
                },
                "& .MuiInputLabel-outlined": {
                  color: theme.palette.primary.contrastText,
                  top: "-3px",
                  "&.Mui-focused": {
                    top: "0px",
                    color: theme.palette.primary.contrastText,
                    fontWeight: "bold",
                  },
                },
              }}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  value && navigate("/search/param?topic=" + value);
                }
              }}
            ></TextField>

            <SearchIcon
              sx={{
                display: { xs: "none", md: "flex" },
                position: "absolute",
                top: 12,
                right: 28,
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => {
                value && navigate("/search/param?topic=" + value);
              }}
            />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => handleCloseUserMenu()}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    handleCloseUserMenu(
                      // event,
                      "account/" + setting.toLowerCase()
                    );
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* {setting !== "logout" ? (
                    <Typography textAlign="center">{setting}</Typography>
                  ) : (
                    <Typography
                      component="div"
                      textAlign="center"
                      onClick={() => {
                        LogOut();
                      }}
                    >
                      {setting}
                    </Typography>
                  )} */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
