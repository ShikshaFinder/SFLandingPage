import React, { use, useState } from "react";
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
  Wrap,
} from "@chakra-ui/react";
import supabase from "../../supabase";
import { useForm, Controller, set } from "react-hook-form";
import { useAuthContext } from "@/context";
import { useRouter } from "next/router";
import { state } from "@/components/state";
import { useUser } from "../store";
import Nouser from "@/components/Nouser";

interface State {
  districts: string[];
  state: string;
}

function Form() {
  const toast = useToast();
  const { user } = useAuthContext();

  const form = useForm();
  const router = useRouter();

  const { register, handleSubmit, control, watch } = form;
  const selectedState = watch("State");
  const useUse = useUser((state) => state.user);
  console.log(useUse);

  const handleSubmitt = () => {
    toast({
      title: "Details updated!",
      description: "Thank you for your Form",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setTimeout(() => {router.reload()}, 3000);
      
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

  if (!user.email) {
    return <Nouser />;
  }

  return (
    <>
      <Stack spacing="4">
        <Card variant="outline">
          <CardBody>
            <Heading size="md" fontSize="26px">
              Form for information updation{" "}
            </Heading>
            <small
              style={{
                display: "block",
                color: "gray",
                marginBottom: "10px",
              }}
            >
              By updating this information the information you will see will
              change like the coaching and classes you will see will be
              according to your location and standard.
            </small>
            <br />
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                {...register("name", {
                  required: true,
                })}
                name="name"
                placeholder="Your Name"
                defaultValue={useUse && useUse.name}
              />
            </FormControl>{" "}
            <br />
            <FormControl isRequired>
              <FormLabel>State</FormLabel>
              <Select
                {...register("State", { required: true })}
                name="State"
                placeholder="Select State"
                defaultValue={useUse && useUse.State}
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
                defaultValue={useUse && useUse.city}
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
                defaultValue={useUse && useUse.subDistrict}
              />
            </FormControl>
            <br />{" "}
            <FormControl isRequired>
              <FormLabel>Standard</FormLabel>
              <Select
                {...register("Standard", { required: true })}
                name="Standard"
                placeholder="Standard"
                defaultValue={useUse && useUse.Standard}
              >
                <option value="Nursery">Nursery</option>
                <option value="1">Standard 1</option>
                <option value="2">Standard 2</option>
                <option value="3">Standard 3</option>
                <option value="4">Standard 4</option>
                <option value="5">Standard 5</option>
                <option value="6">Standard 6</option>
                <option value="7">Standard 7</option>
                <option value="8">Standard 8</option>
                <option value="9">Standard 9</option>
                <option value="10">Standard 10</option>
                <option value="11s">Standard 11 -Science</option>{" "}
                <option value="12s">Standard 12 - Science</option>{" "}
                <option value="11c">Standard 11 - commerce</option>
                <option value="12c">Standard 12 - commerce</option>
                <option value="11a">Standard 11 - Arts</option>
                <option value="12a">Standard 12 - Arts</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel>Exam</FormLabel>
              <Input
                {...register("exam", { required: true })}
                name="exam"
                placeholder="if for more than 12 the than write name of exam for which you are preparing"
                defaultValue={useUse && useUse.exam}
              />
            </FormControl>
            <br />{" "}
            <FormControl as="fieldset">
              <FormLabel as="legend">Board</FormLabel>
              <Controller
                name="Board"
                control={control}
                defaultValue={useUse && useUse.Board}
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <HStack spacing="24px">
                      <Wrap spacing="24px">
                        <Radio value="State">State Board</Radio>
                        <Radio value="CBSE">CBSE</Radio>
                        <Radio value="IB">IB</Radio>
                        <Radio value="ICSE">ICSE</Radio>
                        <Radio value="AISSCE">AISSCE</Radio>
                        <Radio value="NIOS">NIOS</Radio>
                      </Wrap>
                    </HStack>
                  </RadioGroup>
                )}
              />
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel>Standard category </FormLabel>
              <Select
                {...register("standardcategory", { required: true })}
                name="standardcategory"
                placeholder="standardcategory"
                defaultValue={useUse && useUse.standardcategory}
              >
                <option value="Nursery">Kinder Garden</option>
                <option value="1">1-10</option>
                <option value="2">11-12 Science</option>
                <option value="3">11-12 Commerce</option>
                <option value="4">11-12 Arts</option>
              </Select>
            </FormControl>
            <br />
            <FormControl as="fieldset">
              <FormLabel as="legend">Medium</FormLabel>
              <Controller
                name="medium"
                control={control}
                defaultValue={useUse && useUse.medium}
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
