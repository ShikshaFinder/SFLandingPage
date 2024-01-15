import React from "react";
import { useForm } from "react-hook-form";
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
  useToast,
} from "@chakra-ui/react";

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

import { useAuthContext } from '../context'; 
import { useState,useEffect } from "react";
import supabase from "../../supabase";
import Layout from "./Layout";

function Vote() {
  const toast = useToast();
  const form = useForm();
  const [hasVoted, setHasVoted] = useState(false);

  const { register, handleSubmit } = form;

  const onSubmit = async (data: any) => {
    const { error } = await supabase
      .from("votes") // replace 'votes' with the name of your table
      .insert([{ ...data, email: user.email, user_id: user.id }]);

    if (error) {
      console.error("Error submitting vote:", error);
    } else {
      handleSubmitt();
    }
  };
  useEffect(() => {
    const voteStatus = localStorage.getItem("hasVoted");
    if (voteStatus) {
      setHasVoted(true);
    }
  }, []);

  const handleSubmitt = () => {
    localStorage.setItem("hasVoted", "true");
    setHasVoted(true);

    toast({
      title: "Vote submitted!",
      description: "Thank you for your vote",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  if (hasVoted) {
    return <p>Thank you for your vote!</p>;
  }
  const { user } = useAuthContext() as { user: UserType };

  return (
    <>
      <Layout>
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
                  Honest vote to your learning platform 🫡
                </chakra.span>
              </chakra.h3>
              <FormControl>
                <FormLabel>Quality of Education</FormLabel>
                <NumberInput max={10} min={0}>
                  <NumberInputField
                    {...register("qualityofeducation", {
                      required: true,
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <br />
              <FormControl>
                <FormLabel>Facility Provided</FormLabel>
                <NumberInput max={10} min={0}>
                  <NumberInputField
                    {...register("facilityprovided", {
                      required: true,
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <br />
              <FormControl>
                <FormLabel>Management</FormLabel>
                <NumberInput max={10} min={0}>
                  <NumberInputField
                    {...register("management", {
                      required: true,
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <br />
              <FormControl>
                <FormLabel>Extra Curricular Activity</FormLabel>
                <NumberInput max={10} min={0}>
                  <NumberInputField
                    {...register("extracurricular", {
                      required: true,
                    })}
                  />
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
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </Button>
            </CardBody>
          </Card>
        </Stack>
      </Layout>
    </>
  );
}

export default Vote;