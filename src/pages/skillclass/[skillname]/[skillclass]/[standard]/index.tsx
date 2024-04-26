import React from 'react'
import { Button,Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router';
function Standard() {
  const router = useRouter();
  return (
    <>
      <div>Aoo you are in wrong URL</div>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        {" "}
        <Button
          onClick={() => {
            router.push("/skillclass");
          }}
        >
          Go back to skillclass
        </Button>
        <Button
          onClick={() => {
            router.push("/");
          }}
        >
          Go back to Home
        </Button>
      </Stack>
    </>
  );
}

export default Standard