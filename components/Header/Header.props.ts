import { ReactNode } from "react";

export interface HeaderProps {
  logo: ReactNode;
  pages?: Page[];
}

export interface Page {
  name: string;
  route: string;
}
