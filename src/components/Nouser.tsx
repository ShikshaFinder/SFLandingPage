import React, { useState, useEffect } from "react";
import { Button, Stack, Spinner, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Alert, AlertIcon ,Text} from "@chakra-ui/react";

function Nouser() {
  const [isLoading, setIsLoading] = useState(true);
  const Router = useRouter();

  useEffect(() => {
    // Simulate loading for 1 second
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    // Render loader while loading
    return (
      <>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <iframe src="https://lottie.host/embed/a75b9516-581b-439a-89b5-aab82118aa06/FCreFd8jZ9.json"></iframe>
          <Text>We are finding the Best Institute for you ,Please wait...</Text>
        </Stack>
      </>
    );
  }

  return (
    <>
      <Alert status="warning">
        <AlertIcon />
        If you have signed up please reload, or it will be done in a few
        seconds.
      </Alert>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Button
          colorScheme="teal"
          variant="outline"
          display={"flex"}
          onClick={() => {
            Router.push("/signup");
          }}
        >
          SignUp
        </Button>
        <Button
          colorScheme="teal"
          variant="outline"
          display={"flex"}
          onClick={() => {
            Router.push("/login");
          }}
        >
          SignIn
        </Button>
        <Button
          colorScheme="teal"
          display={"flex"}
          onClick={() => {
            Router.reload();
          }}
        >
          Reload Page
        </Button>
      </Stack>
    </>
  );
}

export default Nouser;
