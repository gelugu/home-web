import { useContext, useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Checkbox,
  Container,
  Grid,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { withLayout } from "../../layouts";
import { Task } from "../../interfaces";
import { useHttp } from "../../hooks/http";
import { AppContext } from "../../context/app";
import { useRouter } from "next/router";
import { Center, Input } from "../../components";

function GroupPage(): JSX.Element {
  const { query } = useRouter();
  const { token, error } = useContext(AppContext);
  const { getTask } = useHttp(token);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [task, setTask] = useState<Task>({
    id: "",
    name: "",
    description: "",
    open: true,
  });

  useEffect(() => {
    if (query.id === "create") {
      setIsLoading(false)
      return
    }

    getTask(query.id?.toString() || "")
      .then(({ data }) => {
        setTask(data);
      })
      .catch(({ response }) => {
        error(response.data)
      })
      .finally(() => setIsLoading(false));
  }, [query]);

  if (isLoading) return <LinearProgress />;

  return (
    <Container>
      <Card>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <Checkbox checked={!task.open} />
            <Input value={task.name} label="Task name"/>
          </Stack>
        </CardContent>
        <CardContent>
          <TextField fullWidth label="Task description" multiline>{task.description}</TextField>
        </CardContent>
      </Card>
    </Container>
  );
}

export default withLayout(GroupPage);
