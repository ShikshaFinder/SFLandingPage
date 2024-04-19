import { Button, Stack } from "@chakra-ui/react";
import React from "react";

function Standard({ name}:{name:string}) {
  

  return (
    <>
      <Stack
        spacing={4}
        direction="row"
        align="center"
        overflowX="auto"
        whiteSpace="nowrap"
      >
        <Button colorScheme="teal" variant="solid">
          {name}
        </Button>
        
      </Stack>
    </>
  );
}

export default Standard;
