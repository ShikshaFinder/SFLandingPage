import {
  Box,
  VStack,
  Button,
  Flex,
  Divider,
  chakra,
  Grid,
  GridItem,
  Container,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
interface FeatureProps {
  heading: string;
  text: string;
}

const Feature = ({ heading, text }: FeatureProps) => {
  return (
    <GridItem>
      <chakra.h3 fontSize="xl" fontWeight="600">
        {heading}
      </chakra.h3>
      <chakra.p>{text}</chakra.p>
    </GridItem>
  );
};

export default function GridListWithCTA() {
  const router = useRouter();
  return (
    <Box as={Container} maxW="7xl" mt={14} p={4}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
        }}
        gap={4}
      >
        <GridItem colSpan={1}>
          <VStack alignItems="flex-start" spacing="20px">
            <chakra.h2 fontSize="3xl" fontWeight="700">
              Dive in to the world of knowledge
            </chakra.h2>
            <Button colorScheme="green" size="md" onClick={() => router.push('/chatbot')}>
              Get Started with Chatbot
            </Button>
          </VStack>
        </GridItem>
        <GridItem>
          <Flex>
            <chakra.p>
              Our educational chatbot is designed to help you learn new topics
              efficiently and interactively. Whether you are a student looking
              to understand complex subjects or a lifelong learner exploring new
              areas, our chatbot provides personalized assistance and resources
              to guide you through your educational journey.
            </chakra.p>
          </Flex>
        </GridItem>
      </Grid>
      <Divider mt={12} mb={12} />
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        gap={{ base: "8", sm: "12", md: "16" }}
      >
        <Feature heading={"Fine Tuned for NCERT"} text={"Shiksha finder chatbot is finetuned for providing you the best solution for your acedmic excellence"} />
        <Feature
          heading={"Answer any number of questions"}
          text={
            "No Limit for learning, Learn from the best of the model GPT 4o"
          }
        />
        <Feature
          heading={"upload your own question via photos"}
          text={"Upload your own question and get the answer in seconds"}
        />
      </Grid>
    </Box>
  );
}
