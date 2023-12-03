import * as React from "react";
import {
  chakra,
  Stack,
  HStack,
  Text,
  Box,
  Flex,
  Link,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons

const HeroSection = () => {
  return (
    <Stack
      p={{ base: 5, md: 10 }}
      direction={{ base: "column", md: "row" }}
      bgImage={{
        base: "none",
        md: "url(https://mantine.dev/static/banner-3aed73d88ba2f8fca5f19f43eb8df554.webp)",
      }}
      backgroundSize="480px"
      backgroundPosition="center right"
      backgroundRepeat="no-repeat"
      minH={{ base: "unset", md: "450px" }}
    >
      <Box
        bgImage={{
          base: "none",
          md: "linear-gradient(45deg, #e9ecef 25%, rgba(0, 0, 0, 0) 95%)",
        }}
        position="absolute"
        top="0"
        bottom="0"
        left="0"
        right="0"
        zIndex="0"
        opacity="0.8"
      ></Box>
      <Stack
        pos="relative"
        zIndex={1}
        direction="column"
        justifyContent="center"
        spacing={6}
        maxW="550px"
      >
        <chakra.h1
          fontSize={{ base: "3xl", sm: "5xl" }}
          lineHeight={1}
          fontWeight="bold"
          textAlign="left"
        >
         Our Mission: Unlocking The Choices Of Education 📈
          <br />
        </chakra.h1>
        <Text
          fontSize="1.2rem"
          textAlign="left"
          lineHeight="1.375"
          fontWeight="400"
          color={useColorModeValue("gray.500", "gray.700")}
        >
          Education,which is one of the most importanat part of our life,
          should be accessible to every student's needs. Our mission is to 
          redefine the educational journey of every students,
          making the admission process as easy as possible along with the most informed and efficient methods. At the core of Shiksha Finder's mission is the belief
          that every student deserves the best education possible. We recognize
          that choosing the right school or learning platform isthe most important
          decision that shapes a student's academic and personal growth. Our
          mission is to empower students and parents with the tools and insights
          needed to make this decision wisely.
        </Text>
      </Stack>
    </Stack>
  );
};

export default HeroSection;
