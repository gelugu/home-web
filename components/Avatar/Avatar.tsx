import { useContext, useState, MouseEvent } from "react";
import { useRouter } from "next/router";

import {
  Button,
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { AppContext } from "../../context/app";

import { localStorageConfig, routes } from "../../config";

export const Avatar = (): JSX.Element => {
  const { push } = useRouter();
  const { token, setToken } = useContext(AppContext);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signOut = () => {
    localStorage.removeItem(localStorageConfig.token);
    setToken && setToken(undefined);
  };
  const signIn = () => {
    push(routes.login);
  };

  const settings = [
    { label: "Profile", action: () => push(routes.profile) },
    { label: "Logout", action: signOut },
  ];

  return (
    <Box sx={{ flexGrow: 0 }}>
      {token ? (
        <>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <AccountCircleIcon />
          </IconButton>
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
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting.label} onClick={setting.action}>
                <Typography textAlign="center">{setting.label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : (
        <Button color="inherit" onClick={() => signIn()}>
          Войти
        </Button>
      )}
    </Box>
  );
};
