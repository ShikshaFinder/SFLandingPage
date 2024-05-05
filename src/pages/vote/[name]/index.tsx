import React, { useState, useEffect } from "react";
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
import supabase from "../../../../supabase";
import Layout from "../../Layout";
import Nouser from "@/components/Nouser";

function Vote() {
  const { user } = useAuthContext();
  const toast = useToast();
  const form = useForm();
  const [hasVoted, setHasVoted] = useState(false);
  const router = useRouter();
  const { name } = router.query;
  const { register, handleSubmit } = form;

  const [userData, setUserData] = useState<any[] | null>(null);

  const onSubmit = async () => {
    const {
      qualityofeducation,
      facilityprovided,
      management,
      extracurricular,
    } = form.getValues();

    const voteData = {
      qualityofeducation,
      facilityprovided,
      management,
      extracurricular,
      user_id: name,
    };
    console.log("voteData", voteData);

    if (typeof name == "string") {
      const { data, error } = await supabase
        .from("votes")
        .select(
          "qualityofeducation,facilityprovided,management,extracurricular,view"
        )
        .eq("user_id", name);
      setUserData(data);
      if (error) throw error;

      if (
        data &&
        data[0].qualityofeducation &&
        data[0].qualityofeducation !== 0 &&
        data[0].facilityprovided &&
        data[0].facilityprovided !== 0 &&
        data[0].management &&
        data[0].management !== 0 &&
        data[0].extracurricular &&
        data[0].extracurricular !== 0 &&
        data[0].view &&
        data[0].view !== 0
      ) {
        const newQualityofeducation =
          (data[0].qualityofeducation + parseInt(voteData.qualityofeducation)) /
          2;

        const newFacilityprovided =
          (data[0].facilityprovided + parseInt(voteData.facilityprovided)) / 2;

        const newManagement =
          (data[0].management + parseInt(voteData.management)) / 2;

        const newExtracurricular =
          (data[0].extracurricular + parseInt(voteData.extracurricular)) / 2;

          const newView = data[0].view + 1;


        const totalrating =
          (newExtracurricular +
            newFacilityprovided +
            newManagement +
            newQualityofeducation) /
          4;

        const { error: updateError } = await supabase
          .from("votes")
          .update({
            qualityofeducation: newQualityofeducation,
            facilityprovided: newFacilityprovided,
            management: newManagement,
            extracurricular: newExtracurricular,
            totalrating: totalrating,
            view: newView,
          })
          .eq("user_id", name);

        if (updateError) {
          toast({
            title: "Error",
            description: "Votes must be in between 0 to 10",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return;
        }
      } else {
        const { error: insertError } = await supabase
          .from("votes")
          .update({
            qualityofeducation,
            facilityprovided,
            management,
            extracurricular,
          })
          .eq("user_id", name);

        if (insertError) {
          toast({
            title: "Error",
            description: "Votes must be in between 0 to 10",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return;
        }
      }
    }
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

   useEffect(() => {
     const voteStatus = localStorage.getItem("hasVoted");
     if (voteStatus) {
       setHasVoted(true);
     }
   }, []);

   if (hasVoted) {
     return (
       <>
         <p>Thank you for your vote!</p>
         <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
           <Button
             onClick={() => {
               router.push("/");
             }}
           >
             Visit Home Page
           </Button>
           <Button
             onClick={() => {
               router.push("/onbording");
             }}
           >
             Know More about shiksha finder
           </Button>
         </Stack>
       </>
     );
   }

   if (!user.email) {
     return <Nouser />;
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
