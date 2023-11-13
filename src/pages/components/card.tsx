import {
  chakra,
  Box,
  Image,
  Container,
  Button,
  Stack,
  ButtonProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Badge } from "@chakra-ui/react";

const Index = () => {
  return (
    <Container p={{ base: 5, md: 10 }}>
      <Box
        borderWidth="1px"
        _hover={{ shadow: "lg" }}
        rounded="md"
        overflow="hidden"
        bg={useColorModeValue("white", "gray.800")}
      >
        <Image
          src="https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          objectFit="cover"
          w="100%"
        />
        <Box p={{ base: 3, sm: 5 }}>
          <Box mb={6}>
            <chakra.h3
              fontSize={{ base: "lg", sm: "2xl" }}
              fontWeight="bold"
              lineHeight="1.2"
              mb={2}
            >
              School Name
            </chakra.h3>
            {/* <Text fontSize={{ base: "md", sm: "lg" }} noOfLines={2}>
              How to customize your Github Profile Neque porro quisquam est qui
              dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
            </Text> */}
          </Box>
          {/* <Stack
            justify="space-between"
            direction={{ base: "column", sm: "row" }}
            spacing={{ base: 2, sm: 0 }}
          >
            <CustomButton variant="outline">Not a member?</CustomButton>
            <CustomButton colorScheme="teal" variant="solid">
              Access Now
            </CustomButton>
          </Stack> */}

          <Stack direction="row">
            <Badge colorScheme="green">Rating</Badge>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

const CustomButton = ({
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <Button
      textTransform="uppercase"
      lineHeight="inherit"
      rounded="md"
      {...props}
    >
      {children}
    </Button>
  );
};

export default Index;
