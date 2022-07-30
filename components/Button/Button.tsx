import {
  Button as MaterialButton,
  ButtonProps,
  Modal,
  Typography,
  ButtonGroup,
  Card,
  CardContent,
} from "@mui/material";
import { useState } from "react";

export const Button = (
  props: ButtonProps & { warn?: boolean }
): JSX.Element => {
  const { children, onClick, warn, color, ...restProps } = props;

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <MaterialButton
        {...restProps}
        color={warn ? "warning" : color}
        onClick={warn ? handleOpen : onClick}
      >
        {children}
      </MaterialButton>
      {warn && (
        <Modal open={open} onClose={handleClose}>
          <Card sx={modalStyle}>
            <CardContent>
              <Typography variant="h6">Удалить?</Typography>
            </CardContent>
            <CardContent>
              <ButtonGroup>
                <MaterialButton
                  color="warning"
                  onClick={(e) => {
                    onClick && onClick(e);
                    handleClose();
                  }}
                >
                  да
                </MaterialButton>
                <MaterialButton onClick={handleClose}>нет</MaterialButton>
              </ButtonGroup>
            </CardContent>
          </Card>
        </Modal>
      )}
    </>
  );
};
