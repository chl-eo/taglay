import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import Button from "@mui/material/Button";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ArticleIcon from "@mui/icons-material/Article";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { Stack, Avatar } from "@mui/material";

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#6d2e2e",
  borderRight: "none",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
  backgroundColor: "#6d2e2e",
  borderRight: "none",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#ffffff",
  color: "#6d2e2e",
  boxShadow: "0 2px 10px rgba(109, 46, 46, 0.1)",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#b26e6e",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 30,
  backgroundColor: "#f1cfcf",
  "&:hover": {
    backgroundColor: "#e4b1b1",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#6d2e2e",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    "&::placeholder": {
      color: "#b26e6e",
      opacity: 1,
    },
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ selected }) => ({
  margin: "4px 12px",
  borderRadius: 12,
  backgroundColor: selected ? "#f1cfcf" : "transparent",
  "&:hover": {
    backgroundColor: selected ? "#e4b1b1" : "rgba(255, 255, 255, 0.1)",
  },
  "& .MuiListItemIcon-root": {
    color: selected ? "#ffffff" : "#ffffff",
    minWidth: 40,
  },
  "& .MuiListItemText-primary": {
    fontWeight: selected ? 600 : 400,
    color: selected ? "#ffffff" : "#ffffff",
  },
}));

const getPageTitle = (pathname) => {
  switch (pathname) {
    case "/dashboard/dash-articles":
      return "Articles";
    case "/dashboard/users":
      return "Users";
    default:
      return "Dashboard";
  }
};

const DashLayout = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const name =
    location.state?.firstName || localStorage.getItem("firstName") || "User";
  const userType = location.state?.type || localStorage.getItem("type");
  const pageTitle = getPageTitle(location.pathname);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("type");
    navigate("/");
  };

  const menuItems = [
    {
      text: "Articles",
      icon: <ArticleIcon />,
      path: "/dashboard/dash-articles",
      show: true,
    },
    {
      text: "Users",
      icon: <PeopleIcon />,
      path: "/dashboard/users",
      show: userType === "admin",
    },
  ];

  return (
    <Box sx={{ display: "flex", bgcolor: "#fffafa", minHeight: "100vh" }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            aria-label="toggle drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 3,
              color: "#6d2e2e",
              "&:hover": {
                bgcolor: "#f1cfcf",
              },
            }}
          >
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              color: "#6d2e2e",
            }}
          >
            {pageTitle}
          </Typography>

          {/* Search */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {/* User Info */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar
                sx={{
                  bgcolor: "#f1cfcf",
                  color: "#6d2e2e",
                  width: 36,
                  height: 36,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                {name.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Typography
                  variant="body2"
                  sx={{ color: "#6d2e2e", fontWeight: 600, lineHeight: 1.2 }}
                >
                  {name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#b26e6e", textTransform: "capitalize" }}
                >
                  {userType || "User"}
                </Typography>
              </Box>
            </Stack>

            <Button
              variant="outlined"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{
                borderColor: "#d79191",
                color: "#6d2e2e",
                borderRadius: 30,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#6d2e2e",
                  bgcolor: "#f1cfcf",
                },
              }}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {open && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <AutoAwesomeIcon sx={{ color: "#f1cfcf", fontSize: 28 }} />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  color: "#fff",
                  fontSize: "1.1rem",
                }}
              >
                Beyond Beauty
              </Typography>
            </Stack>
          )}
          {!open && (
            <AutoAwesomeIcon
              sx={{ color: "#f1cfcf", fontSize: 28, mx: "auto" }}
            />
          )}
        </DrawerHeader>

        <Divider sx={{ borderColor: "rgba(241, 207, 207, 0.2)", mx: 2 }} />

        {/* Navigation Links */}
        <List sx={{ mt: 2 }}>
          {menuItems
            .filter((item) => item.show)
            .map((item) => (
              <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
                <StyledListItemButton
                  component={Link}
                  to={item.path}
                  selected={location.pathname === item.path}
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </StyledListItemButton>
              </ListItem>
            ))}
        </List>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Bottom Section */}
        <Divider sx={{ borderColor: "rgba(241, 207, 207, 0.2)", mx: 2 }} />

        <List sx={{ mb: 2 }}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <StyledListItemButton
              component={Link}
              to="/"
              sx={{
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  justifyContent: "center",
                }}
              >
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Back to Site" sx={{ opacity: open ? 1 : 0 }} />
            </StyledListItemButton>
          </ListItem>
        </List>

        {/* User Card (when drawer is open) */}
        {open && (
          <Box
            sx={{
              m: 2,
              p: 2,
              borderRadius: 3,
              bgcolor: "rgba(241, 207, 207, 0.15)",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  bgcolor: "#f1cfcf",
                  color: "#6d2e2e",
                  width: 44,
                  height: 44,
                  fontWeight: 600,
                }}
              >
                {name.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#fff", fontWeight: 600, lineHeight: 1.2 }}
                >
                  {name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#e4b1b1", textTransform: "capitalize" }}
                >
                  {userType || "User"}
                </Typography>
              </Box>
            </Stack>
          </Box>
        )}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "#fffafa",
          minHeight: "100vh",
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashLayout;