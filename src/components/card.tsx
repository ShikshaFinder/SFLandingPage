import {
  chakra,
  Box,
  Container,
  Stack,
  useColorModeValue,
  Img,
  Text,
  Badge,
} from "@chakra-ui/react";
import Link from "next/link";

const Index = ({
  name,
  rating,
  imgsrc,
  link,
}: {
  name?: string;
  rating?: any;
  imgsrc?: any;
  link?: string;
}) => {
  return (
    <Link href={link || "#"}>
      <Container p={{ base: 5, md: 6 }}>
        <Box
          borderWidth="1px"
          _hover={{ shadow: "xl", transform: "scale(1.05)" }}
          transition="all 0.3s ease-in-out"
          rounded="md"
          overflow="hidden"
          bg={useColorModeValue("white", "gray.800")}
        >
          <Img
            src={imgsrc}
            objectFit="cover"
            w="100%"
            h="200px"
            loading="lazy"
          />
          <Box p={{ base: 4, sm: 6 }}>
            <chakra.h3
              fontSize={{ base: "lg", sm: "xl" }}
              fontWeight="bold"
              lineHeight="1.2"
              mb={4}
            >
              {name}
            </chakra.h3>

            {rating && rating !== "not set" && (
              <Stack direction="row" alignItems="center" mt={3}>
                <Text fontSize="sm" color="gray.500">
                  Subdistrict:
                </Text>
                <Badge colorScheme="teal">{rating}</Badge>
              </Stack>
            )}
          </Box>
        </Box>
      </Container>
    </Link>
  );
};

export default Index;
