import { TextField, TextFieldProps } from "@mui/material";

export const Input = (props: TextFieldProps): JSX.Element => {
  return <TextField variant="standard" fullWidth {...props} />;
};
