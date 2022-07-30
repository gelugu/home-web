import { SxProps, Theme, Link as MaterialLink } from "@mui/material";
import NextLink from "next/link";

import { LinkProps } from "./Link.props";

export const Link = (props: LinkProps): JSX.Element => {
  const { children, ...restProps } = props;

  const linkStyle: SxProps<Theme> = {
    ":hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  };

  return (
    <MaterialLink
      {...restProps}
      sx={linkStyle}
      underline="hover"
      color="primary.light"
    >
      {children}
    </MaterialLink>
  );
};
