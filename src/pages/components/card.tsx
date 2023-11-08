import { Box, Heading, Image, Text } from "@chakra-ui/react";

export default function App() {
  return (
    <Box maxW="sm" borderWidth="5px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">
          Daily Mix
        </Text>
        <Text fontSize="sm" color="gray.500">
          12 Tracks
        </Text>
        <Heading fontSize="lg" fontWeight="bold">
          Frontend Radio
        </Heading>
      </Box>

      <Image
        src="https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Card background"
        objectFit="cover"
        w="full"
        h={64}
        roundedBottom="lg"
      />
    </Box>
  );
}
