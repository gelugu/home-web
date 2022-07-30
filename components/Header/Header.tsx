import { useRouter } from "next/router";

import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  Typography,
  Link
} from "@mui/material";

import { HeaderProps } from "./Header.props";

import { routes } from "../../config";

import { Avatar } from "..";

export const Header = (props: HeaderProps): JSX.Element => {
  const { logo, pages } = props;

  const { asPath } = useRouter();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            color="MenuText"
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Link href={routes.root} sx={{textDecoration: "none"}}>{logo}</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages?.map((page) => (
              <Button
                href={page.route}
                key={page.name}
                color={asPath.includes(page.route) ? "primary" : "inherit"}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Avatar />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
