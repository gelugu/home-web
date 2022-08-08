import { useCallback, useEffect, useState } from "react";
import {
  Progress,
  Input,
  Box,
  Stack,
  Collapse,
  StackDivider,
  HStack,
  Button,
} from "@chakra-ui/react";

import { Task as TaskComponent } from "../../components";

import { useApi } from "../../../app/hooks";
import { Task } from "../../../app/interfaces";
import { NewTask } from "../NewTask/NewTask";

export function Tasks(): JSX.Element {
  const { getTasks } = useApi();

  const [loading, setLoading] = useState(true);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [showHidden, setShowHidden] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const fetchTasks = useCallback(async () => {
    const sortByOpen = (a: Task, b: Task) => {
      if (a.open === false && b.open === true) return 1;
      if (a.open === true && b.open === false) return -1;
      return 0;
    };
    const sortByDate = (a: Task, b: Task) => {
      if (a.create_date > b.create_date) return -1;
      if (a.create_date < b.create_date) return 1;
      return 0;
    };
    setTasks((await getTasks(showHidden)).sort(sortByOpen).sort(sortByDate));
  }, [showHidden]);

  useEffect(() => {
    setLoading(true);
    fetchTasks().finally(() => setLoading(false));
  }, [showHidden]);

  const getTasksComponents = useCallback(() => {
    return tasks
      .filter((task) =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((task) => (
        <TaskComponent key={task.id} task={task} updateTaskList={fetchTasks} />
      ));
  }, [tasks, searchQuery]);

  return (
    <Box p="1">
      <Stack>
        <Collapse in={tasks.length > 5}>
          <Box>
            <Input
              placeholder="Search for tasks"
              type="search"
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
            />
          </Box>
        </Collapse>

        {loading ? (
          <Progress isIndeterminate />
        ) : (
          <>
            <Stack divider={<StackDivider />} overflowY="scroll">
              {getTasksComponents()}
            </Stack>
            <HStack justifyContent="space-between">
              <Button onClick={() => setShowHidden(!showHidden)}>
                {showHidden ? "Hide completed" : "Show completed"}
              </Button>
              <NewTask updateTaskList={fetchTasks} />
            </HStack>
          </>
        )}
      </Stack>
    </Box>
  );
}
