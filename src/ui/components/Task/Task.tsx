import { useState, useCallback } from "react";
import moment from "moment";
import {
  Button,
  Box,
  Collapse,
  HStack,
  ButtonGroup,
  Icon,
  Input,
  Stack,
  Textarea,
  InputGroup,
  InputLeftAddon,
  Text,
  Tooltip,
} from "@chakra-ui/react";

import { ArrowDownIcon, CloseIcon, DoneIcon } from "../../../ui/icons";
import { Task } from "../../../app/interfaces";
import { TaskProps } from "./Task.props";
import { useApi } from "../../../app/hooks";

export function Task({
  task: propTask,
  updateTaskList,
}: TaskProps): JSX.Element {
  const { updateTask, deleteTask } = useApi();

  const [task, setTask] = useState<Task>(propTask);

  const [open, setOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleUpdate = useCallback(() => {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }

    setTimeoutId(
      setTimeout(() => {
        updateTask(task.id, task);
      }, 1000)
    );
  }, [task]);

  const dateToJsFormat = useCallback(
    (date: number) => {
      // 2022-08-04T10:31:58.612Z
      return new Date(date).toISOString().slice(0, 16);
    },
    [task]
  );

  return (
    <Box margin="1">
      <Stack>
        <Tooltip label={task.description}>
          <HStack justifyContent="space-between">
            <Input
              flex="1"
              variant="filled"
              value={task.name}
              onChange={(e) => {
                setTask({ ...task, name: e.target.value });
                handleUpdate();
              }}
              isDisabled={!task.open}
            />
            {task.open && <Text>{moment(task.create_date).fromNow(true)}</Text>}
            <Button
              onClick={() => {
                const newTask = { ...task, open: !task.open };
                setTask(newTask);
                updateTask(task.id, newTask);
              }}
            >
              {task.open ? <Icon as={DoneIcon} /> : "Open"}
            </Button>
            {task.open && (
              <Button onClick={() => setOpen(!open)}>
                <Icon
                  as={ArrowDownIcon}
                  sx={{
                    transform: open ? "rotate(0.5turn)" : "",
                    transition: "transform 200ms",
                  }}
                />
              </Button>
            )}
          </HStack>
        </Tooltip>
        <Collapse in={open}>
          <Stack>
            <Textarea
              padding="2"
              variant="filled"
              value={task.description}
              onChange={(e) => {
                setTask({ ...task, description: e.target.value });
                handleUpdate();
              }}
            />
            <Collapse in={task.due_date !== null}>
              <HStack>
                <InputGroup>
                  <InputLeftAddon>Due</InputLeftAddon>
                  <Input
                    type="datetime-local"
                    defaultValue={dateToJsFormat(task.due_date)}
                    onClick={(e) => {
                      setTask({
                        ...task,
                        due_date: e.currentTarget.valueAsNumber,
                      });
                      handleUpdate();
                    }}
                  />
                </InputGroup>
                <Button
                  onClick={() => {
                    setTask({ ...task, due_date: null });
                    handleUpdate();
                  }}
                >
                  <Icon as={CloseIcon} />
                </Button>
              </HStack>
            </Collapse>
            <Collapse in={task.schedule_date !== null}>
              <HStack>
                <InputGroup>
                  <InputLeftAddon>Scheduled at</InputLeftAddon>
                  <Input
                    type="datetime-local"
                    defaultValue={dateToJsFormat(task.schedule_date)}
                    onClick={(e) => {
                      setTask({
                        ...task,
                        schedule_date: e.currentTarget.valueAsNumber,
                      });
                      handleUpdate();
                    }}
                  />
                </InputGroup>
                <Button
                  onClick={() => {
                    setTask({ ...task, schedule_date: null });
                    handleUpdate();
                  }}
                >
                  <Icon as={CloseIcon} />
                </Button>
              </HStack>
            </Collapse>
            <ButtonGroup justifyContent="space-between">
              <Collapse in={task.schedule_date === null}>
                <Button
                  onClick={() => {
                    setTask({ ...task, schedule_date: Date.now() });
                    handleUpdate();
                  }}
                >
                  Schedule
                </Button>
              </Collapse>
              <Collapse in={task.due_date === null}>
                <Button
                  onClick={() => {
                    setTask({ ...task, due_date: Date.now() });
                    handleUpdate();
                  }}
                >
                  Due date
                </Button>
              </Collapse>
              <Button onClick={() => deleteTask(task.id).then(updateTaskList)}>
                Hang up
              </Button>
            </ButtonGroup>
          </Stack>
        </Collapse>
      </Stack>
    </Box>
  );
}
