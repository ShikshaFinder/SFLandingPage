import React, { useEffect } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";

function Shikshacoin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onOpen();
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Shiksha coin update</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody> Your Shiksha coin balance :</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Later
            </Button>
            <Button colorScheme="yellow" ml={3}>
              Know more about shiksha coin
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default Shikshacoin;
