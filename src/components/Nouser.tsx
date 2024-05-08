import React, { useState, useEffect } from "react";
import { Button, Stack, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Alert, AlertIcon } from "@chakra-ui/react";

function Nouser() {
  const [isLoading, setIsLoading] = useState(true);
  const Router = useRouter();

  useEffect(() => {
    // Simulate loading for 1 second
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    // Render loader while loading
    return (
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} align="center" justify="center" minHeight="100vh">
        <Spinner size="xl" />
      </Stack>
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
