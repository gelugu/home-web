import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Input,
  Textarea,
  Collapse,
  Stack,
} from "@chakra-ui/react";

import { CreateTaskDto } from "../../../app/interfaces";
import { useApi } from "../../../app/hooks";
import { NewTaskProps } from "./NewTask.props";

export function NewTask({
  updateTaskList,
  trackId,
}: NewTaskProps): JSX.Element {
  const { createTask } = useApi();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [task, setTask] = useState<CreateTaskDto>({
    name: "",
    description: "",
    track_id: trackId,
  });

  return (
    <Stack>
      <Collapse in={open}>
        <Stack>
          <Input
            value={task.name}
            placeholder="Task name"
            onChange={(e) => setTask({ ...task, name: e.target.value })}
          />
          <Textarea
            value={task.description}
            placeholder="Task description"
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
          <ButtonGroup>
            <Button
              isLoading={loading}
              onClick={() => {
                setLoading(true);
                createTask(task)
                  .then(() => {
                    setTask({ name: "", description: "", track_id: trackId });
                    updateTaskList();
                    setOpen(false);
                  })
                  .finally(() => setLoading(false));
              }}
            >
              Create
            </Button>
            <Button
              onClick={() => {
                setTask({ name: "", description: "", track_id: trackId });
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </Stack>
      </Collapse>
      <Collapse in={!open}>
        <Button onClick={() => setOpen(!open)}>Add new task</Button>
      </Collapse>
    </Stack>
  );
}
