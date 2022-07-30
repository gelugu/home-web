import { useSnackbar } from "notistack";

import { Grid, LinearProgress, Typography } from "@mui/material";

import { withLayout } from "../../layouts";

const Profile = (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();

  if (false) return <LinearProgress />;

  return (
    <>
      <Typography variant="h4">In progress...</Typography>
      <Grid container spacing={3} sx={{ mt: 3 }}></Grid>
    </>
  );
};

export default withLayout(Profile);
