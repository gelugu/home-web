import { useState } from "react";
import {
  Button,
  Box,
  Checkbox,
  Editable,
  EditablePreview,
  EditableInput,
  Collapse,
  EditableTextarea,
  HStack,
  useEditableControls,
  ButtonGroup,
  Icon,
} from "@chakra-ui/react";
import { ArrowDownIcon, CloseIcon, EditIcon } from "../../src/icons";

import { Task } from "../../interfaces";
import { TaskProps } from "./Task.props";

export function Task({ task: propTask }: TaskProps): JSX.Element {
  const [open, setOpen] = useState(false);

  const [task, setTask] = useState<Task>(propTask);

  function EditableControls() {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
      useEditableControls();

    return (
      isEditing && (
        <ButtonGroup justifyContent="center" size="sm">
          <Button size="sm" {...getSubmitButtonProps()}>
            <Icon as={EditIcon}/>
          </Button>
          <Button size="sm" {...getCancelButtonProps()}>
            <Icon as={CloseIcon}/>
          </Button>
        </ButtonGroup>
      )
    );
  }

  return (
    <Box margin="1">
      <HStack justifyContent="space-between">
        <HStack>
          <Checkbox
            size="lg"
            isChecked={!task.open}
            onChange={(e) => setTask({ ...task, open: !e.target.checked })}
          />
          <Editable
            value={task.name}
            onChange={(name) => setTask({ ...task, name })}
          >
            <EditablePreview />
            <HStack>
              <EditableInput />
              <EditableControls />
            </HStack>
          </Editable>
        </HStack>
        <Button size="sm" onClick={() => setOpen(!open)}>
          <Icon
            as={ArrowDownIcon}
            sx={{
              transform: open ? "rotate(0.5turn)" : "",
              transition: "transform 200ms",
            }}
          />
        </Button>
      </HStack>
      <Collapse in={open}>
        <Editable
          padding="1"
          value={task.description}
          onChange={(description) => setTask({ ...task, description })}
        >
          <EditablePreview />
          <HStack>
            <EditableTextarea />
            <EditableControls />
          </HStack>
        </Editable>
      </Collapse>
    </Box>
  );
}
