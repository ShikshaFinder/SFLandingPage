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
import Link from "next/link";
import { useUser } from "../store";

function Shikshacoin({ link, message, title }: { link: string; message: string; title: string}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement | null>(null);
  const useUse = useUser((state) => state.user);

  useEffect(() => {
    const timer = setTimeout(() => {
      onOpen();
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  console.log(useUse);

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
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody> {message} :{ useUse && useUse.Coins}</AlertDialogBody>
          <AlertDialogFooter>
            <Link href={link}>
              {" "}
              <Button ref={cancelRef} onClick={onClose}>
                Later
              </Button>
            </Link>
            <Link href={"/shikshacoinInfo"}>
              {" "}
              <Button colorScheme="yellow" ml={3}>
                Know more about shiksha coin
              </Button>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default Shikshacoin;
