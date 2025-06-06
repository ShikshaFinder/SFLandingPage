import React from "react";
import {
  Box,
  chakra,
  Container,
  Link,
  Text,
  HStack,
  VStack,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

const articles = [
  {
    id: 1,
    title: "Is it true that Shiksha Finder is and will be free forever?",
    content: `Yes! Shiksha Finder is and will always be free to use for finding the best educational platform as well as for registering your educational institutions. We believe that quality education should be accessible to all.`,
  },
  {
    id: 2,
    title: "What can I find on Shiksha Finder?",
    content: `You can find schools, coaching centers, home tutors, skill classes, educational platforms, online tutors, and many more on Shiksha Finder.`,
  },
  {
    id: 3,
    title: "If I encounter any problems using Shiksha Finder, how can I contact you?",
    content: `We are open to solving your queries and problems. You can contact us on the contact us page or you can mail us at founder@shikshafinder.in.`,
  },
];

const Newsletters = () => {
  return (
    <Container maxWidth="4xl" p={{ base: 2, sm: 10 }}>
      <Text fontSize={"4xl"}>FAQs</Text>
      <hr />
      {articles.map((article, index) => (
        <Flex key={index} mb="10px">
          <LineWithDot />
          <Card {...article} />
        </Flex>
      ))}
    </Container>
  );
};

interface CardProps {
  title: string;

  content: string;
}

const Card = ({ title, content }: CardProps) => {
  return (
    <HStack
      p={{ base: 3, sm: 6 }}
      bg={useColorModeValue("gray.100", "gray.800")}
      spacing={5}
      rounded="lg"
      alignItems="center"
      pos="relative"
      _before={{
        content: `""`,
        w: "0",
        h: "0",
        borderColor: `transparent ${useColorModeValue(
          "#edf2f6",
          "#1a202c"
        )} transparent`,
        borderStyle: "solid",
        borderWidth: "15px 15px 15px 0",
        position: "absolute",
        left: "-15px",
        display: "block",
      }}
    >
        
      <Box>
        <VStack spacing={0} mb={3} textAlign="left">
          <chakra.h1
            as={Link}
            _hover={{ color: "teal.400" }}
            fontSize="2xl"
            lineHeight={1.2}
            fontWeight="bold"
            w="100%"
          >
            {title}
          </chakra.h1>
          <Text fontSize="md" noOfLines={10}>
            {content}
          </Text>
        </VStack>
      </Box>
    </HStack>
  );
};

const LineWithDot = () => {
  return (
    <Flex pos="relative" alignItems="center" mr="40px">
      <chakra.span
        position="absolute"
        left="50%"
        height="calc(100% + 10px)"
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        top="0px"
      ></chakra.span>
      <Box pos="relative" p="10px">
        <Box
          pos="absolute"
          width="100%"
          height="100%"
          bottom="0"
          right="0"
          top="0"
          left="0"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="center center"
          backgroundColor="rgb(255, 255, 255)"
          borderRadius="100px"
          border="3px solid rgb(4, 180, 180)"
          backgroundImage="none"
          opacity={1}
        ></Box>
      </Box>
    </Flex>
  );
};

export default Newsletters;
