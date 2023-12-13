"use client";
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  HStack,
  Radio,
  Heading,
  Button,
} from "@chakra-ui/react";

function vote() {
  return (
    <>
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
      <Button colorScheme="teal" size="md">
        Button
      </Button>
    </>
  );
}
import React from "react";

export default vote;
