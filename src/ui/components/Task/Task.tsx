import { useState, useCallback, useContext } from "react";
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
  Progress,
} from "@chakra-ui/react";

import { ArrowDownIcon, CloseIcon, DoneIcon } from "../../../ui/icons";
import { Task } from "../../../app/interfaces";
import { TaskProps } from "./Task.props";
import { useApi } from "../../../app/hooks";
import { AppContext } from "../../../app/context";

export function Task({
  task: propTask,
  updateTaskList,
}: TaskProps): JSX.Element {
  const { updateTask, deleteTask } = useApi();
  const { error } = useContext(AppContext);

  const [task, setTask] = useState<Task>(propTask);

  const [taskStatusLoading, setTaskStatusLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [updateTimeoutId, setUpdateTimeoutId] = useState(null);
  const [hideTimeoutId, setHideTimeoutId] = useState(null);
  const [hideTimeout, setHideTimeout] = useState(0);

  const handleUpdate = useCallback(
    (key: string, value: any) => {
      const updateFreq = 500;

      const newTask = task;
      newTask[key] = value;
      setTask(newTask);

      if (updateTimeoutId != null) {
        clearTimeout(updateTimeoutId);
      }

      setUpdateTimeoutId(
        setTimeout(() => {
          updateTask(task.id, newTask).then((t) => setTask(t));
        }, updateFreq)
      );
    },
    [task, updateTimeoutId]
  );

  const handleClose = useCallback(() => {
    cancelHide();
    setTaskStatusLoading(true);

    updateTask(task.id, { ...task, open: false })
      .then((updatedTask) => {
        setTask(updatedTask);
        handleHide();
      })
      .catch(({ response }) => error("Can't close task", response.data))
      .finally(() => setTaskStatusLoading(false));
  }, [task]);
  const handleCancelClose = useCallback(() => {
    cancelHide();
    handleOpen();
  }, [task]);

  const handleOpen = useCallback(() => {
    setTaskStatusLoading(true);

    updateTask(task.id, { ...task, open: true, hidden: false })
      .then((updatedTask) => setTask(updatedTask))
      .catch(({ response }) => error("Can't open task", response.data))
      .finally(() => setTaskStatusLoading(false));
  }, [task]);

  const handleHide = useCallback(() => {
    const hideDelay = 3000;
    const progressFreq = 10;

    setHideTimeoutId(
      setTimeout(() => {
        updateTask(task.id, { ...task, hidden: true });
        updateTaskList();
        setHideTimeoutId(null);
      }, hideDelay)
    );
    const hideStartDate = Date.now();
    const hideIntervalId = setInterval(() => {
      const diff = moment(Date.now()).diff(hideStartDate, "milliseconds");
      const progressValue = Math.floor((diff / hideDelay) * 100);
      setHideTimeout(progressValue);

      if (diff > hideDelay) {
        clearInterval(hideIntervalId);
        setHideTimeout(0);
      }
    }, progressFreq);
  }, [task]);
  const completeHide = useCallback(() => {
    if (hideTimeoutId !== null) clearTimeout(hideTimeoutId);
    setHideTimeoutId(null);
    setHideTimeout(0);

    updateTask(task.id, { ...task, hidden: true });
    updateTaskList();
  }, [task]);
  const cancelHide = useCallback(() => {
    if (hideTimeoutId !== null) clearTimeout(hideTimeoutId);
    setHideTimeoutId(null);

    setHideTimeout(0);
  }, [hideTimeoutId]);

  const dateToJsFormat = useCallback(
    (date: number) => {
      return moment(date).format(moment.HTML5_FMT.DATETIME_LOCAL);
    },
    [task]
  );

  return (
    <Box margin="1">
      <Stack>
        <Collapse in={hideTimeoutId === null}>
          <HStack justifyContent="space-between">
            <Input
              flex="1"
              variant="filled"
              value={task.name}
              onChange={(e) => handleUpdate("name", e.target.value)}
              isDisabled={!task.open}
            />
            <Button
              isLoading={taskStatusLoading}
              onClick={task.open ? handleClose : handleOpen}
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
        </Collapse>
        <Collapse in={hideTimeoutId !== null}>
          <Stack>
            <Text>Task will be hidden</Text>
            <Progress value={hideTimeout} size="xs" isAnimated />
            <ButtonGroup flex="1" justifyContent="space-between">
              <Button onClick={handleCancelClose}>Cancel</Button>
              <Button onClick={cancelHide}>Keep</Button>
              <Button onClick={completeHide}>Hide now</Button>
            </ButtonGroup>
          </Stack>
        </Collapse>
        <Collapse in={open}>
          <Stack>
            <Textarea
              padding="2"
              variant="filled"
              value={task.description}
              onChange={(e) => handleUpdate("description", e.target.value)}
            />
            <HStack flex="1" justifyContent="flex-end">
              {task.open && <Text>{moment(task.create_date).fromNow()}</Text>}
            </HStack>
            <Collapse in={Boolean(task.due_date)}>
              <HStack>
                <InputGroup>
                  <InputLeftAddon>Due</InputLeftAddon>
                  <Input
                    type="datetime-local"
                    value={dateToJsFormat(task.due_date)}
                    onChange={(e) =>
                      handleUpdate("due_date", e.currentTarget.valueAsNumber)
                    }
                  />
                </InputGroup>
                <Button onClick={() => handleUpdate("due_date", 0)}>
                  <Icon as={CloseIcon} />
                </Button>
              </HStack>
            </Collapse>
            <Collapse in={Boolean(task.schedule_date)}>
              <HStack>
                <InputGroup>
                  <InputLeftAddon>Scheduled at</InputLeftAddon>
                  <Input
                    type="datetime-local"
                    value={dateToJsFormat(task.schedule_date)}
                    onChange={(e) =>
                      handleUpdate(
                        "schedule_date",
                        e.currentTarget.valueAsNumber
                      )
                    }
                  />
                </InputGroup>
                <Button onClick={() => handleUpdate("schedule_date", 0)}>
                  <Icon as={CloseIcon} />
                </Button>
              </HStack>
            </Collapse>
            <ButtonGroup justifyContent="space-between">
              <Collapse in={!task.schedule_date}>
                <Button
                  onClick={() => handleUpdate("schedule_date", Date.now())}
                >
                  Schedule
                </Button>
              </Collapse>
              <Collapse in={!task.due_date}>
                <Button onClick={() => handleUpdate("due_date", Date.now())}>
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
