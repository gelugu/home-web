import { useContext, useState } from "react";
import {
  Button,
  ButtonGroup,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  Input,
  Textarea,
  PopoverFooter,
} from "@chakra-ui/react";

import { CreateTaskDto } from "../../interfaces/dto";
import { AppContext } from "../../context/app";
import { useHttp } from "../../hooks/http";
import { useCallback } from "react";
import { useRef } from "react";

export function NewTask(): JSX.Element {
  const { token, error, success } = useContext(AppContext);
  const { createTask } = useHttp(token);

  const popoverRef = useRef()

  const [loading, setLoading] = useState(false);

  const [task, setTask] = useState<CreateTaskDto>({
    name: "",
    description: "",
  });

  const handleCreateTask = useCallback(() => {
    setLoading(true);

    createTask(task)
      .then(({ data }) => {
        success(`Task ${data.name} created`);
        // popoverRef.current.onClose()
      })
      .catch(({ response }) => {
        error("Can't create task", response.data);
      })
      .finally(() => setLoading(false));
  }, [task]);

  return (
    <Popover placement="top" initialFocusRef={popoverRef}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button>Add new task</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>
              <Input
                value={task.name}
                placeholder="Task name"
                onChange={(e) => setTask({ ...task, name: e.target.value })}
              />
            </PopoverHeader>
            <PopoverBody>
              <Textarea
                value={task.description}
                placeholder="Task description"
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
              />
            </PopoverBody>
            <PopoverFooter>
              <ButtonGroup>
                <Button isLoading={loading} onClick={() => handleCreateTask}>
                  Create
                </Button>
                <Button
                  onClick={() => {
                    setTask({ name: "", description: "" });
                    onClose();
                  }}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}
