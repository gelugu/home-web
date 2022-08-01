import { PropsWithChildren } from "react";

import { Box } from "@mui/material";

export const Center = (props: PropsWithChildren<{}>): JSX.Element => {
  const { children } = props;
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      {children}
    </Box>
  );
};
