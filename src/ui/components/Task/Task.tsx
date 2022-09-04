import { useState, useCallback, useContext } from "react";
import moment from "moment";
import {
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
} from "@chakra-ui/react";

import {
  AlarmIcon,
  ArrowDownIcon,
  CloseIcon,
  DoneIcon,
  FinishIcon,
} from "../../../ui/icons";
import { Task } from "../../../app/interfaces";
import { TaskProps } from "./Task.props";
import { useApi } from "../../../app/hooks";
import { AppContext } from "../../../app/context";
import { Button } from "../common/Button";
import { taskDueIncrement, taskScheduleIncrement } from "../../../app/config";

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
    updateTask(task.id, { ...task, open: false })
      .then((updatedTask) => {
        setTask(updatedTask);
        updateTaskList();
      })
      .catch(({ response }) => error("Can't close task", response.data));
  }, [task]);

  const handleOpen = useCallback(() => {
    setTaskStatusLoading(true);

    updateTask(task.id, { ...task, open: true })
      .then((updatedTask) => {
        setTask(updatedTask);
        updateTaskList();
      })
      .catch(({ response }) => error("Can't open task", response.data))
      .finally(() => setTaskStatusLoading(false));
  }, [task]);

  const dateToJsFormat = useCallback(
    (date: number) => {
      return moment(date).format(moment.HTML5_FMT.DATETIME_LOCAL);
    },
    [task]
  );

  return (
    <Box margin="1">
      <Stack>
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
                  <InputLeftAddon>
                    <Icon as={FinishIcon} />
                  </InputLeftAddon>
                  <Input
                    type="datetime-local"
                    value={dateToJsFormat(task.due_date)}
                    min={dateToJsFormat(Date.now())}
                    onChange={(e) =>
                      handleUpdate(
                        "due_date",
                        moment(e.currentTarget.value, moment.ISO_8601)
                          .toDate()
                          .getTime()
                      )
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
                  <InputLeftAddon>
                    <Icon as={AlarmIcon} />
                  </InputLeftAddon>
                  <Input
                    type="datetime-local"
                    value={dateToJsFormat(task.schedule_date)}
                    onChange={(e) =>
                      handleUpdate(
                        "schedule_date",
                        moment(e.currentTarget.value, moment.ISO_8601)
                          .toDate()
                          .getTime()
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
                  warningMessage="This feature is'n release now"
                  onClick={() =>
                    handleUpdate(
                      "schedule_date",
                      Date.now() + taskScheduleIncrement
                    )
                  }
                >
                  Schedule
                </Button>
              </Collapse>
              <Collapse in={!task.due_date}>
                <Button
                  warningMessage="This feature is'n release now"
                  onClick={() =>
                    handleUpdate("due_date", Date.now() + taskDueIncrement)
                  }
                >
                  Due date
                </Button>
              </Collapse>
              <Button
                warningMessage="It's better to do something than to do nothing"
                onClick={() => deleteTask(task.id).then(updateTaskList)}
              >
                Hang up
              </Button>
            </ButtonGroup>
          </Stack>
        </Collapse>
      </Stack>
    </Box>
  );
}
