"use client"
import {
  chakra,
  Box,
  Image,
  Container,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";

const Index = ({
  name,
  rating,
  imgsrc,
}: {
  name?: string;
  rating?: any;
  imgsrc: any;
}) => {
  return (
    <Container p={{ base: 5, md: 10 }}>
      <Box
        borderWidth="1px"
        _hover={{ shadow: "lg" }}
        rounded="md"
        overflow="hidden"
        bg={useColorModeValue("white", "gray.800")}
      >
        <Image src={imgsrc} objectFit="cover" w="100%" />
        <Box p={{ base: 3, sm: 5 }}>
          <Box mb={6}>
            <chakra.h3
              fontSize={{ base: "lg", sm: "2xl" }}
              fontWeight="bold"
              lineHeight="1.2"
              mb={2}
            >
              {name}
            </chakra.h3>
    
          </Box>
         

          <Stack direction="row">
            <Badge colorScheme="green">{rating}</Badge>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};



export default Index;
