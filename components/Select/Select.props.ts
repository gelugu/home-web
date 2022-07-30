import { SelectProps as MaterialSelectProps } from "@mui/material";

export interface SelectProps extends MaterialSelectProps {
  options: IOption[];
}

export interface IOption {
  value: string;
  label: string;
  fixed?: boolean;
  hidden?: boolean;
}
