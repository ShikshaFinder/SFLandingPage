import React, { useState } from "react";
import Nouser from "@/components/Nouser";
import supabase from "../../supabase";
import { useAuthContext } from "@/context";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";

function Chatbot() {
  const { user } = useAuthContext();
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  async function storeResponce() {}

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setSummary(""); // Clear any previous summary

    try {
      // Send the user's input text to the API route
      const response = await fetch("/api/getanswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          msg: inputText,
        }), // Send input text as JSON
      });

      const data = await response.json();

      if (response.ok) {
        setSummary(data.messages[0]?.content || "No summary found.");
      } else {
        console.error("Failed to get summary:", data.error);
        setSummary("Error fetching summary.");
      }
    } catch (error) {
      console.error("Error during request:", error);
      setSummary("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!user.email) {
    return <Nouser />;
  }
  return (
    <Center
      minH="100vh"
      bgGradient="linear(to-br, blue.100, purple.200)"
      px={4}
    >
      <Container maxW="lg" bg="white" boxShadow="lg" borderRadius="xl" p={6}>
        <VStack spacing={6} textAlign="center">
          <Heading as="h2" size="lg" color="blue.600" mb={4}>
            Know About Science & Maths
          </Heading>
          <Text color="gray.500" fontSize={{ base: "sm", sm: "md" }}>
            Get to know the world around you with shikshafinder !
          </Text>
        </VStack>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} mt={4}>
            <FormControl id="inputText">
              <Input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type here..."
                borderColor="gray.100"
                focusBorderColor="blue.400"
              />
            </FormControl>
            <Button
              type="submit"
              isLoading={loading}
              loadingText="Loading..."
              colorScheme="blue"
              width="full"
              spinner={<Spinner size="sm" />}
            >
              Submit
            </Button>
          </VStack>
        </form>
        {summary && (
          <Box mt={4} p={4} bg="gray.100" borderRadius="lg" shadow="inner">
            <Text color="gray.800">{summary}</Text>
          </Box>
        )}
      </Container>
    </Center>
  );
}

export default Chatbot;
