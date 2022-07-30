import { Grid } from "@mui/material";
import { SpacerProps } from "./Spacer.props";

export const Spacer = (props: SpacerProps): JSX.Element => {
  return <Grid item {...props} />;
};
