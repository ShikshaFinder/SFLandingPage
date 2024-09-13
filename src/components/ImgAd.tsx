import React from "react";
import { Image, Stack, Text, Box, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";

function VideoAd({ src, link }: { src: string; link: string }) {
  return (
    <Box
      maxW="lg"
      mx="auto"
      py={{ base: 6, md: 10 }}
      px={{ base: 4, md: 8 }}
      rounded="lg"
      borderWidth="1px"
      shadow="md"
      bg="white"
      borderRadius="md"
      overflow="hidden"
      _hover={{ shadow: "xl" }}
      transition="all 0.3s ease"
    >
      <Stack spacing={4} textAlign="center">
        <Text fontSize="lg" color="gray.600">
          Check out this amazing resource! <b>Sponsored</b>
        </Text>

        <Link href={link || "https://www.vigyasa.live/"} passHref>
         
            <Image
              src={src}
              alt="Promotion Image"
              objectFit="cover"
              borderRadius="lg"
              loading="lazy"
              w="100%"
              maxH="300px"
              _hover={{ transform: "scale(1.05)", transition: "0.3s ease" }}
              shadow="sm"
            />
         
        </Link>

        <Flex justify="center" mt={4}>
          <Link href={link || "https://www.vigyasa.live/"} passHref>
            <Button colorScheme="teal" size="lg">
              Learn More
            </Button>
          </Link>
        </Flex>
      </Stack>
    </Box>
  );
}

export default VideoAd;
