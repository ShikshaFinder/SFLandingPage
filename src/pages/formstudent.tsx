"use client";
import {
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  HStack,
  Radio,
  Heading,
  Button,
  useToast,
  CardBody,
  Card,
  Stack,
} from "@chakra-ui/react";

function vote() {
  const toast = useToast();

  return (
    <>
      <Stack spacing="4">
        <Card variant="outline">
          <CardBody>
            <Heading size="md" fontSize="26px">
              We welcome you with full hearts 💓{" "}
            </Heading>
            <br />
            <FormControl isRequired>
              <FormLabel>City</FormLabel>
              <Input placeholder="City" />
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel> Sub-District</FormLabel>
              <Input placeholder="If its main district than just put City name here also" />
            </FormControl>
            <br />{" "}
            <FormControl isRequired>
              <FormLabel>Standard </FormLabel>
              <Input placeholder="Standard/if more than 10 than write stream" />
            </FormControl>
            <br />{" "}
            <FormControl isRequired>
              <FormLabel>Board</FormLabel>
              <Input placeholder="Board" />
            </FormControl>
            <br />
            <FormControl as="fieldset">
              <FormLabel as="legend">Medium</FormLabel>
              <RadioGroup defaultValue="Itachi">
                <HStack spacing="24px">
                  <Radio value="Sasuke">Hindi Medium</Radio>
                  <Radio value="Nagato">English Medium</Radio>
                  <Radio value="Itachi">Native</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <br />
            <Button
              colorScheme="teal"
              size="md"
              onClick={() => {
                // Create an example promise that resolves in 5s
                const examplePromise = new Promise((resolve, reject) => {
                  setTimeout(() => resolve(200), 5000);
                });

                // Will display the loading toast until the promise is either resolved
                // or rejected.
                toast.promise(examplePromise, {
                  success: {
                    title: "Detail Submitted",
                    description: "Enjoy Learning🥳",
                  },
                  error: {
                    title: "Promise rejected",
                    description: "Something wrong",
                  },
                  loading: {
                    title: "Promise pending",
                    description: "Please wait",
                  },
                });
              }}
            >
              Submit
            </Button>
          </CardBody>
        </Card>
      </Stack>
    </>
  );
}
import React from "react";

export default vote;
