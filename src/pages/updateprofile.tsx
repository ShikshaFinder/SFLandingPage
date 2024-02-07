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
  Select,
} from "@chakra-ui/react";
import supabase from "../../supabase";
import { useForm, Controller } from "react-hook-form";
import { useAuthContext } from "@/context";
import { useRouter } from "next/router";
import { state } from "@/components/state";

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
interface State {
  districts: string[];
  state: string;
}

function Form() {
  const toast = useToast();
  const { user } = useAuthContext() as { user: UserType };

  const form = useForm();
  const router = useRouter();

  const { register, handleSubmit, control, watch } = form;
  const selectedState = watch("State");

  const handleSubmitt = () => {
    toast({
      title: "Details updates!",
      description: "Thank you for your Form",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    router.push("/profile");
  };

  const onSubmit = async (data: any) => {
    const { error } = await supabase
      .from("Student")
      .update({ ...data })
      .eq("user_id", user.id);

    if (error) {
      console.error("Error submitting Form:", error);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });

    } else {
      handleSubmitt();
    }
  };

  const [states, setStates] = useState<State[]>(state.states);
  const districts =
    states.find((state) => state.state === selectedState)?.districts || [];

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
              <FormLabel>Name</FormLabel>
              <Input
                {...register("name", {
                  required: true,
                })}
                name="name"
                placeholder="Your Name"
              />
            </FormControl>{" "}
            <br />
            <FormControl isRequired>
              <FormLabel>State</FormLabel>
              <Select
                {...register("State", { required: true })}
                name="State"
                placeholder="Select State"
              >
                {states.map((stateObj) => (
                  <option key={stateObj.state} value={stateObj.state}>
                    {stateObj.state}
                  </option>
                ))}
              </Select>
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel>District/city</FormLabel>
              <Select
                {...register("city", { required: true })}
                name="city"
                placeholder="Select District"
              >
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </Select>
            </FormControl>{" "}
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
              <FormLabel>Standard/Exam </FormLabel>
              <Input
                {...register("Standard", { required: true })}
                name="Standard"
                placeholder="Standard/if for more than 12 the than write name of exam for which you are preparing"
              />
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>Board</FormLabel>
              <Input
                {...register("Board", { required: false })}
                name="Board"
                placeholder="Board"
              />
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>Stream </FormLabel>
              <Input
                {...register("stream", { required: false })}
                name="stream"
                placeholder="write science/commerce/arts if you are in 11th or 12th"
              />
            </FormControl>
            <br />
            <FormControl as="fieldset">
              <FormLabel as="legend">Medium</FormLabel>
              <Controller
                name="medium"
                control={control}
                defaultValue="Native"
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <HStack spacing="24px">
                      <Radio value="Hindi">Hindi Medium</Radio>
                      <Radio value="English">English Medium</Radio>
                      <Radio value="Native">Native</Radio>
                    </HStack>
                  </RadioGroup>
                )}
              />
            </FormControl>
            <br />
            <Button
              colorScheme="teal"
              size="md"
              onClick={handleSubmit(onSubmit)}
            >
              Update Details
            </Button>
          </CardBody>
        </Card>
      </Stack>
    </>
  );
}

export default Form;
