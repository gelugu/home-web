import { Grid } from "@mui/material";
import { SpacerProps } from "./Spacer.props";

export const Spacer = (props: SpacerProps): JSX.Element => {
  const { width = 12 } = props;
  return <Grid xs={width} />;
};
