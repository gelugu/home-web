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
  InputGroup,
  InputLeftAddon,
  Icon,
} from "@chakra-ui/react";

import { Task as TaskComponent } from "../../components";

import { useApi } from "../../../app/hooks";
import { Task } from "../../../app/interfaces";
import { NewTask } from "../NewTask/NewTask";
import { SearchIcon } from "../../icons";

export function Tasks({ trackId }: TasksProps): JSX.Element {
  const { getTasks } = useApi();

  const [loading, setLoading] = useState(true);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const fetchTasks = useCallback(async () => {
    setTasks(await getTasks(trackId));
  }, [trackId]);

  useEffect(() => {
    setLoading(true);
    fetchTasks().finally(() => setLoading(false));
  }, [trackId]);

  const getTasksComponents = useCallback(() => {
    return tasks
      .filter((task) =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((task) => task.open === !showCompleted)
      .map((task) => (
        <TaskComponent key={task.id} task={task} updateTaskList={fetchTasks} />
      ));
  }, [tasks, searchQuery, showCompleted]);

  return (
    <Stack p="1">
      <Collapse in={tasks.filter((t) => t.open === !showCompleted).length > 5}>
        <Box>
          <InputGroup>
            <InputLeftAddon>
              <Icon as={SearchIcon} />
            </InputLeftAddon>
            <Input
              placeholder="Search for tasks"
              type="search"
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
            />
          </InputGroup>
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
            <Button onClick={() => setShowCompleted(!showCompleted)}>
              {showCompleted ? "Hide completed" : "Show completed"}
            </Button>
            <NewTask updateTaskList={fetchTasks} trackId={trackId} />
          </HStack>
        </>
      )}
    </Stack>
  );
}

interface TasksProps {
  trackId: string;
}
