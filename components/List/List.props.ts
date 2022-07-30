import { Key, ReactNode } from "react";
import { ListProps as MaterialListProps } from "@mui/material";

export interface ListProps extends MaterialListProps {
  children?: ReactNode;
  elements?: ReactNode[];

  max?: number;
  sharedKey?: Key;
}
