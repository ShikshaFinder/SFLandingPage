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
import { useRouter } from "next/router";

import { useAuthContext } from "../../../context";
import { useState, useEffect } from "react";
import supabase from "../../../../supabase";
import Layout from "../../Layout";
import { useUser } from "@/store";
import Nouser from "@/components/Nouser";

function Vote() {
  const { user } = useAuthContext();
  const toast = useToast();
  const form = useForm();
  const [hasVoted, setHasVoted] = useState(false);
  const userStore = useUser((state) => state.user);
  console.log("userstore", userStore);
    const router = useRouter();
    const { name } = router.query;
  const { register, handleSubmit } = form;

  const onSubmit = async (data: any) => {
    const { error } = await supabase
      .from("votes") // replace 'votes' with the name of your table
      .insert([{ ...data, email: user.email, school_id: name}]);

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
    return (
      <>
        <p>Thank you for your vote!</p>
        <a href="/">Visit Home Page</a>
      </>
    );
  }

  if (!user.email) {
    return <Nouser/>
  }

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
