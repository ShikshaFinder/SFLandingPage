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
import supabase from "../../supabase";
import { useForm, Controller } from "react-hook-form";
import { useAuthContext } from "@/context";
import { useRouter } from "next/router";

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

function Form() {
  const toast = useToast();
  const { user } = useAuthContext() as { user: UserType };

  const form = useForm();
  const router = useRouter();

  const { register, handleSubmit, control } = form;

  const handleSubmitt = () => {
    toast({
      title: "Form submitted!",
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
                {...register("city", { required: true })}
                name="city"
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
              <FormLabel as="legend">Mediumy</FormLabel>
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
              Submit
            </Button>
          </CardBody>
        </Card>
      </Stack>
    </>
  );
}

export default Form;
