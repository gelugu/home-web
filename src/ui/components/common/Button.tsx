import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  AlertDialog,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  ButtonGroup,
} from "@chakra-ui/react";
import { useRef } from "react";

export const Button = (props: ButtonProps) => {
  const { children, warningMessage, onClick } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      <ChakraButton {...props} onClick={warningMessage ? onOpen : onClick}>
        {children}
      </ChakraButton>

      {warningMessage && (
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>{warningMessage}</AlertDialogHeader>

              <AlertDialogFooter>
                <ButtonGroup>
                <ChakraButton ref={cancelRef} onClick={onClose}>
                  Cancel
                </ChakraButton>
                <ChakraButton
                  colorScheme="red"
                  onClick={(e) => {
                    onClick(e);
                    onClose();
                  }}
                >
                  OK
                </ChakraButton>
                </ButtonGroup>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </>
  );
};

interface ButtonProps extends ChakraButtonProps {
  warningMessage?: string;
}
