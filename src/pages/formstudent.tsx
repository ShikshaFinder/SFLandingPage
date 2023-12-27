import React, { useState, useEffect } from "react";
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
import { useAuthContext } from "@/context";
import supabase from "../../supabase";
import { useForm } from "react-hook-form";


type ChildDataType = {
  State: string;
  District: string;
  subDistrict: string;
  Standard: string;
  Board: string;
};

type UserType = {
  app_metadata: {
    provider: string;
    providers: string[];
  };
  aud: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  email_confirmed_at: string;
  id: string;
  identities: Array<any>; // You might want to define a type for this array
  last_sign_in_at: string;
  phone: any;
  role: string;
  updated_at: string;
};

function Vote() {
  const toast = useToast();
  const { user } = useAuthContext() as { user: UserType };
  const form = useForm();
  async function User() {
    const { data } = await supabase.auth.getUser();
    console.log(data);
  }
  const { register, handleSubmit } = form;

  const handleSubmitt = () => {
  
    toast({
      title: "Vote submitted!",
      description: "Thank you for your vote",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
 
const onSubmit = async (data: any) => {
  const { error } = await supabase
    .from("Student") 
    .insert([{ ...data }]);
  if (error) {
    console.error("Error submitting vote:", error);
  } else {
    handleSubmitt();
  }
};

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
              <FormLabel>State</FormLabel>
              <Input
                {...register("State", {
                  required: true,
                })}
                name="State"
                placeholder="State"
              />
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel>District/city</FormLabel>
              <Input
                {...register("District", { required: true })}
                name="District"
                placeholder="District/city"
              />
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel> Sub-District</FormLabel>
              <Input
                {...register("subDistrict", { required: true })}
                name="subDistrict"
                placeholder="If its main district than just put City name here also"
              />
            </FormControl>
            <br />{" "}
            <FormControl isRequired>
              <FormLabel>Standard </FormLabel>
              <Input
                {...register("Standard", { required: true })}
                name="Standard"
                placeholder="Standard/if more than 10 than write stream"
              />
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel>Board</FormLabel>
              <Input
                {...register("Board", { required: true })}
                name="Board"
                placeholder="Board"
              />
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
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </CardBody>
        </Card>
      </Stack>
    </>
  );
}

export default Vote;
