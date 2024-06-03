import React from "react";
import {
  VStack,
  HStack,
  Heading,
  Text,
  Link,
  useColorModeValue,
  Flex,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { MotionBox } from "./motion";

const BASE_URL = "https://shikshafinder.com/";

const posts = [
  {
    title:
      "Balancing Fees and Quality: A Guide to Choosing the Perfect Educational Institute",
    description: `Choosing the right educational institute for your child is one of the most significant decisions a parent...`,
    slug: "/blogs/choose-right-educational-institute",

    published_at: "21st may 2024",
  },
  {
    title: "Exploring the Best Career Options: A Guide by expert",
    description: `Choosing the right career is one of the most important decisions you will make in your life. It influences your future job satisfaction, financial...`,
    slug: "/blogs/exploring-best-career-options",

    published_at: "21st January 2021",
  },
  {
    title:
      "Choosing the Right Board for Your Child: A Guide for Indian Parents",
    description: `
Choosing the Right Board for Your Child: A Guide for Indian Parents
Selecting the right educational board for your child is one of the most crucial decisions you'll make as a parent. In India, the plethora of choices ...`,
    slug: "/blogs/choosing-right-board-for-your-child",

    published_at: "21st January 2021",
  },
];

const FeaturedArticles = () => {
  const linkColor = "blue.400";
  const textColor = useColorModeValue("gray.500", "gray.200");

  return (
    <Container maxW="4xl" p={{ base: 5, md: 12 }}>
      <VStack align="start" spacing={8} width="100%">
        <SimpleGrid columns={1} spacing={4} w="100%">
          {posts &&
            posts.map(({ description, title, slug, published_at }, i) => (
              <MotionBox whileHover={{ y: -5 }} key={i}>
                <VStack
                  spacing={1}
                  p={4}
                  _hover={{ shadow: "md", textDecoration: "none" }}
                  borderWidth="1px"
                  position="relative"
                  rounded="md"
                  bg={useColorModeValue("white", "gray.800")}
                  align="left"
                >
                  <HStack justifyContent="space-between" isInline>
                    <Heading fontSize="lg" mt={0}>
                      <NextLink href={`${BASE_URL}/${slug}`} passHref>
                        <Text as={Link} color={linkColor}>
                          {title}
                        </Text>
                      </NextLink>
                    </Heading>
                    <HStack spacing={2}></HStack>
                  </HStack>
                  <HStack spacing={2} isInline>
                    <Text fontSize="sm" fontWeight="600" color={textColor}>
                      {published_at}
                    </Text>
                  </HStack>
                  <Text
                    align="left"
                    fontSize="md"
                    noOfLines={1}
                    color={textColor}
                  >
                    {description}
                  </Text>
                </VStack>
              </MotionBox>
            ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default FeaturedArticles;
