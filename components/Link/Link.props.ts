import { ReactNode } from "react";
import { LinkProps as MaterialLonkProps } from "@mui/material";

export interface LinkProps extends MaterialLonkProps {
  children: ReactNode;
}
