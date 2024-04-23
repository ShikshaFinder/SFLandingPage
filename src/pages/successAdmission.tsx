
import { Box, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Shikshacoin from "@/components/shikshacoinpopup";




export default function Success() {

    const router = useRouter();
    setTimeout(() => {
        router.push("/profile");
        }, 10000);   

return (
  <>
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Congratulations! You have successfully filled out the online admission
        form for the institute.
      </Heading>
      <Text color={"gray.500"}>
        In most of the cases school will contact with you for further
        inofrmation & if you have any queries you can{" "}
        <a href="/contactus">contact us.</a>
      </Text>
    </Box>
    <Shikshacoin title="shiksha coin update" message="Your shiksha coin balance is " link="/"/>
  </>
);};