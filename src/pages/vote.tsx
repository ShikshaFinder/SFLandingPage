"use client";
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Button,
  chakra,
  CardBody,
  Stack,
  Card,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";


function vote() {
   const toast = useToast();
  return (
    <>
      <Stack spacing="4">
        <Card variant="outline">
          <CardBody>
            <chakra.h3
              fontSize="3xl"
              lineHeight={1}
              fontWeight="medium"
              textAlign="left"
            >
              Help other students by providing
              <br />
              <chakra.span color="teal">
                {" "}
                Honest vote to your learning platform 🫡
              </chakra.span>
            </chakra.h3>{" "}
            <FormControl>
              <FormLabel>Qulity of Education</FormLabel>
              <NumberInput max={10} min={0}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <br />{" "}
            <FormControl>
              <FormLabel>Facilty Provided</FormLabel>
              <NumberInput max={10} min={0}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>{" "}
            <br />
            <FormControl>
              <FormLabel>Managment</FormLabel>
              <NumberInput max={10} min={0}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <br />{" "}
            <FormControl>
              <FormLabel>Extra curricular activity</FormLabel>
              <NumberInput max={10} min={0}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <br />
            <Button
              w="7rem"
              colorScheme="green"
              variant="solid"
              onClick={() => {
                toast({
                  title: "Vote submitted!",
                  description: "Thank you for your vote",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
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
