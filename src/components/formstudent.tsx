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
import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context";
import supabase from "../../supabase";

function vote() {
  const toast = useToast();
  const { user } = useAuthContext() as { user: UserType };

  let [FullData, setFullData] = useState({
    State: "",
    District: "",
    subDistrict: "",
    Standard: "",
    Board: "",
  });

  useEffect(() => {
    console.log(FullData);
  }, [FullData]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value = event.target.value;
    let name = event.target.name;
    console.log(value);

    setFullData((prevvalue) => {
      return {
        ...prevvalue, // Spread Operator
        [name]: value,
      };
    });
  };

  const submitChildData = async () => {
    try {
      const { data, error } = await supabase
        .from("Student")
        .insert([
          {
            user_id: user.id,
            State: FullData?.State ?? "",
            District: FullData?.District ?? "",
            subDistrict: FullData?.subDistrict ?? "",
            Standard: FullData?.Standard ?? "",
            Board: FullData?.Board ?? "",
          },
        ])
        .select();

      console.log("data inserted successfully");
      console.log(data);
    } catch (error) {
      console.log("error : ", error);
    }
  };
  async function User() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
  }

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
                value={FullData.State}
                onChange={handleChange}
                name="State"
                placeholder="State"
              />
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel>District/city</FormLabel>
              <Input
                value={FullData.District}
                onChange={handleChange}
                name="District"
                placeholder="District/city"
              />
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel> Sub-District</FormLabel>
              <Input
                value={FullData.subDistrict}
                onChange={handleChange}
                name="subDistrict"
                placeholder="If its main district than just put City name here also"
              />
            </FormControl>
            <br />{" "}
            <FormControl isRequired>
              <FormLabel>Standard </FormLabel>
              <Input
                value={FullData.Standard}
                onChange={handleChange}
                name="Standard"
                placeholder="Standard/if more than 10 than write stream"
              />
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel>Board</FormLabel>
              <Input
                value={FullData.Board}
                onChange={handleChange}
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
export default vote;
