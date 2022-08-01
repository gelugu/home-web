import { Grid, Typography } from "@mui/material";

import { withLayout } from "../../layouts";

const Profile = (): JSX.Element => {
  return (
    <>
      <Typography variant="h4">In progress...</Typography>
      <Grid container spacing={3} sx={{ mt: 3 }}></Grid>
    </>
  );
};

export default withLayout(Profile);
