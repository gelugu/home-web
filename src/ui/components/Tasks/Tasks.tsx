import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Progress,
  Input,
  Box,
  Stack,
  Collapse,
  StackDivider,
} from "@chakra-ui/react";

import { Task as TaskComponent } from "../../components";

import { AppContext } from "../../../app/context";
import { useHttp } from "../../../app/hooks";
import { Task } from "../../../app/interfaces";
import { NewTask } from "../NewTask/NewTask";

export function Tasks(): JSX.Element {
  const { token, error } = useContext(AppContext);
  const { getTasks } = useHttp(token);

  const [loading, setLoading] = useState<boolean>(true);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    console.log("effect on tasks");
    getTasks()
      .then(({ data }) => {
        setTasks(data);
      })
      .catch(({ message }) => {
        error("Can't load tasks", message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getTasksComponents = useCallback(() => {
    return tasks
      .filter((task) =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((task) => <TaskComponent task={task} />);
  }, [tasks, searchQuery]);

  if (loading) return <Progress />;

  return (
    <Stack>
      <Collapse in={tasks.length > 5}>
        <Box>
          <Input
            placeholder="Search for tasks"
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
          />
        </Box>
      </Collapse>

      <Box mt="2rem">
        <Stack divider={<StackDivider />}>{getTasksComponents()}</Stack>
      </Box>
      <NewTask />
    </Stack>
  );
}
