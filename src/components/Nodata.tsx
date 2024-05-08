
import React, { useState, useEffect } from "react";
import { Button, Stack, Spinner, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Alert, AlertIcon, Text } from "@chakra-ui/react";

function Nouser() {
  const [isLoading, setIsLoading] = useState(true);
  const Router = useRouter();

 
 

  return (
    <>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <iframe src="https://lottie.host/embed/a75b9516-581b-439a-89b5-aab82118aa06/FCreFd8jZ9.json"></iframe>
        <Text>Searching for details in our database</Text>
        if it takes too long, please try again later/connect us
      </Stack>
    </>
  );
}

export default Nouser;
