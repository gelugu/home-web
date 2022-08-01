import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LinearProgress, Typography, Checkbox } from "@mui/material";

import { AddFab, Input, Table, Link, List } from "../../components";

import { routes } from "../../config";
import { AppContext } from "../../context/app";
import { useHttp } from "../../hooks/http";
import { Task } from "../../interfaces";
import { withLayout } from "../../layouts";

function Tasks(): JSX.Element {
  const { push } = useRouter();
  const { token, error } = useContext(AppContext);
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
        error(`Can't load tasks\n${message}`);
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
          <Link href={`${routes.tasks}/${task.id}`}>{task.name}</Link>
        );

        const taskDescription = (
          <Typography>{task.description}</Typography>
        );

        const taskStatus = (
          <Checkbox checked={!task.open} />
        );

        return {
          values: [taskStatus, taskName, taskDescription],
          key: task.id || "",
          onClick: () => push(`${routes.tasks}/${task.id}`),
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
          { value: "Status", key: "task-status", size: 1 },
          { value: "Name", key: "task-name", size: 3 },
          { value: "Description", key: "task-description", size: 8 },
        ]}
        rows={getGroupsRows()}
      />
    </>
  );
}

export default withLayout(Tasks);
