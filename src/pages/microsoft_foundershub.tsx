import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Image,
  Divider,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import { EmailIcon, PhoneIcon, LinkIcon } from "@chakra-ui/icons";

function MicrosoftFoundersHub() {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={4}>
            Microsoft Founders Hub Proof of Domain
          </Heading>
          <Image
            src="/domain_verification.png"
            alt="Microsoft Founders Hub"
            mx="auto"
            maxW="300px"
            borderRadius="lg"
            boxShadow="lg"
          />
        </Box>

        <Box
          p={6}
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Text fontSize="lg" mb={6}>
            Hey Team Microsoft Founders Hub, this page serves as proof of domain
            for the Microsoft Founders Hub.
          </Text>

          <List spacing={4}>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={EmailIcon} color="blue.500" />
              <Text>Email: janiharsh794@gmail.com</Text>
            </ListItem>

            <ListItem display="flex" alignItems="center">
              <ListIcon as={LinkIcon} color="blue.500" />
              <Text>Domain: shikshafinder.com</Text>
            </ListItem>

            <ListItem display="flex" alignItems="center">
              <Text>
                Address: M6/7518,Satyanarayn Society, Gayatrinagar, Bhavanagar,
                Gujarat(Student at LD Collge of engineering)
              </Text>
            </ListItem>

            <ListItem display="flex" alignItems="center">
              <ListIcon as={PhoneIcon} color="blue.500" />
              <Text>Mobile: 7984140706</Text>
            </ListItem>
          </List>

          <Divider my={6} />

          <Box>
            <Text fontWeight="bold">Name:</Text>
            <Text>Harsh Jani</Text>
            <Text fontWeight="bold" mt={2}>
              Position:
            </Text>
            <Text>Founder, Shiksha Finder</Text>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
}

export default MicrosoftFoundersHub;
