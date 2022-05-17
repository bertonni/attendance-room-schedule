import Logout from "@mui/icons-material/Logout";
import {
  Avatar,
  Box,
  IconButton,
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { user, logout } = useAuth();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    handleClose();
    logout();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "space-between",
          gap: 3,
          height: 40,
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link
            underline="none"
            variant="button"
            href="https://reserva-labf1.vercel.app/"
            target={"_blank"}
            sx={{
              fontWeight: 600,
              fontSize: { xs: 14, sm: 16 },
              color: "white",
              "&:hover": {
                opacity: 0.8,
              },
              bgcolor: "#349A46",
              borderRadius: 1,
              px: 1,
            }}
          >
            Reservar Lab F1
          </Link>
        </Box>
        {user && (
          <Tooltip title="Menu">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }} src={user.photoURL} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      {user && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          id="account-menu"
          onClose={handleClose}
        >
          <MenuItem disabled>
            <ListItemText>{user.displayName}</ListItemText>
          </MenuItem>
          <MenuItem onClick={signOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Sair
          </MenuItem>
        </Menu>
      )}
    </>
  );
}
