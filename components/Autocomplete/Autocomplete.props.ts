import { AutocompleteProps as MaterialAutocompleteProps, Chip } from "@mui/material";

export interface AutocompleteProps extends MaterialAutocompleteProps<IOption, true, false, true, typeof Chip> {
  options: IOption[];
  label: string;
  placeholder: string;
}

export interface IOption {
  value: string;
  label: string;
  fixed?: boolean;
}
