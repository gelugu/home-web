import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import {
  Grid,
  LinearProgress,
  ButtonGroup,
  Typography,
  Paper,
  Autocomplete,
  Chip,
  TextField,
} from "@mui/material";

import { Input, Button, List, Link } from "../../components";

import { withLayout } from "../../layouts";
import { AppContext } from "../../context/app";
import { useHttp } from "../../hooks/http";
import { routes } from "../../config";

function GroupPage(): JSX.Element {
  const { push, query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (isLoading) return <LinearProgress />;

  return (
    <>
      <Grid container spacing={3}></Grid>
    </>
  );
}

export default withLayout(GroupPage);
