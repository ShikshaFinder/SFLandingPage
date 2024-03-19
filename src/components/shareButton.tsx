import React from "react";
import { Button, ButtonGroup, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";

function shareButton({ link }: { link: string }) {
  const router = useRouter();

  return (
    <>
      <Stack spacing={14} direction="row" align="center">
        <a href={link}>
          <Button colorScheme="whatsapp">Visit Website</Button>
        </a>
        <Button colorScheme="teal">Share</Button>
      </Stack>
    </>
  );
}

export default shareButton;
