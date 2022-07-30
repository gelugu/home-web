import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { LinearProgress, Typography } from "@mui/material";

import { AddFab, Input, Table, Link, List } from "../../components";

import { routes } from "../../config";
import { AppContext } from "../../context/app";
import { useHttp } from "../../hooks/http";
import { Task } from "../../interfaces";
import { withLayout } from "../../layouts";
import { tasks as text } from "../../text";

function Tasks(): JSX.Element {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useContext(AppContext);
  const { getTasks } = useHttp(token);

  const [loading, setLoading] = useState<boolean>(true);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    getTasks()
      .then(({ data }) => {
        setTasks(data);
      })
      .catch(({ message }) => {
        enqueueSnackbar(`Can't load tasks\n${message}`, {
          variant: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getGroupsRows = useCallback(() => {
    return tasks
      .filter((task) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((task) => {
        const taskName = (
          <Link href={`${routes.tasks}/${task._id}`}>{task.name}</Link>
        );

        const taskDescription = (
          <Typography>{task.description}</Typography>
        );

        const taskStatus = (
          <Typography>{task.open}</Typography>
        );

        return {
          values: [taskName, taskDescription, taskStatus],
          key: task._id || "",
          onClick: () => push(`${routes.tasks}/${task._id}`),
        };
      });
  }, [tasks, searchQuery]);

  if (loading) return <LinearProgress />;

  return (
    <>
      <AddFab href={routes.tasksCreate} />

      <Input
        label="Search"
        color="primary"
        variant="outlined"
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
      />

      <Table
        name="Tasks"
        columns={[
          { value: "Status", key: "task-status", size: 4 },
          { value: "Name", key: "task-name", size: 4 },
          { value: "Description", key: "task-description", size: 4 },
        ]}
        rows={getGroupsRows()}
      />
    </>
  );
}

export default withLayout(Tasks);
