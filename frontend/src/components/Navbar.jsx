import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const navLinks = [
  { label: "Add Product", path: "/add-product", type: "seller" },
  { label: "Browse Products", path: "/products", type: "buyer" },
];

const Navbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {auth && (
          <ListItem>
            <ListItemText primary={`${auth.username} (${auth.type})`} />
          </ListItem>
        )}
        {auth &&
          navLinks
            .filter((link) => link.type === auth.type)
            .map((link) => (
              <ListItem
                button
                key={link.label}
                selected={location.pathname === link.path}
                onClick={() => navigate(link.path)}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
        {auth ? (
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <>
            <ListItem button onClick={() => navigate("/login")}>
              {" "}
              <ListItemText primary="Login" />{" "}
            </ListItem>
            <ListItem button onClick={() => navigate("/register")}>
              {" "}
              <ListItemText primary="Register" />{" "}
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" color="default" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            fontWeight: 700,
            letterSpacing: 1,
          }}
          onClick={() => navigate("/dashboard")}
        >
          Auction App
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          {auth && (
            <Typography variant="body1" sx={{ mr: 2 }}>
              {auth.username} ({auth.type})
            </Typography>
          )}
          {auth &&
            navLinks
              .filter((link) => link.type === auth.type)
              .map((link) => (
                <Button
                  key={link.label}
                  color={
                    location.pathname === link.path ? "secondary" : "inherit"
                  }
                  onClick={() => navigate(link.path)}
                  sx={{
                    mx: 1,
                    fontWeight: location.pathname === link.path ? 700 : 400,
                  }}
                >
                  {link.label}
                </Button>
              ))}
          {auth ? (
            <Button color="inherit" onClick={handleLogout} sx={{ ml: 1 }}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}
        </Box>
        {/* Mobile menu */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
