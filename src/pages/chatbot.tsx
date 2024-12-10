import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { List, ListItem } from "@chakra-ui/react";
import remarkGfm from "remark-gfm";

import {
  Box,
  Button,
  Center,
  CircularProgress,
  Container,
  Flex,
  Heading,
  Icon,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AlertCircle, Send, Sparkles } from "lucide-react";
import supabase from "../../supabase";


const markdownComponents = {
  h1: (props: any) => (
    <Heading as="h1" size="xl" mt={4} mb={2} color="blue.600" {...props} />
  ),
  h2: (props: any) => (
    <Heading as="h2" size="lg" mt={3} mb={2} color="blue.500" {...props} />
  ),
  p: (props: any) => <Text mt={2} color="black" {...props} />,
  strong: (props: any) => (
    <Text as="strong" fontWeight="bold" color="black" {...props} />
  ),
  ul: (props: any) => (
    <List styleType="disc" pl={6} color="black" {...props} />
  ),
  li: (props: any) => <ListItem mb={1} {...props} />,
};

const Chatbot = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function saveResponse() {
   
const { data, error } = await supabase
  .from("chatbot")
  .insert([{ message: inputText, response: summary , user_id: "1" }]);
          
    if (error) {
      console.error("Error saving response:", error);
    } else {
      console.log("Response saved:", data);
    }
  }

async function getHistory() {
  
let { data: chatbot, error } = await supabase
  .from("chatbot")
  .select("message");
  
  console.log(chatbot);
}

  interface ApiResponse {
    messages: { content: string }[];
    error?: string;
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    setSummary("");

    try {
      const response = await fetch("/api/getanswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          msg: inputText,
        }),
      });

      const data: ApiResponse = await response.json();
        await saveResponse();
      if (response.ok) {
        setSummary(data.messages[0]?.content || "No summary found.");
        saveResponse();
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

  return (
    <Center minH="100vh" bgGradient="linear(to-br, blue.50, purple.100)" p={4}>
      <Container maxW="lg" bg="white" rounded="2xl" shadow="xl" p={6}>
        {/* Header */}
        <VStack spacing={2} textAlign="center">
          <Flex alignItems="center" justifyContent="center" gap={2}>
            <Icon as={Sparkles} boxSize={8} color="blue.600" />
            <Heading
              as="h2"
              size="lg"
              bgGradient="linear(to-r, blue.600, purple.600)"
              bgClip="text"
              color="black"
            >
              Science & Math Explorer
            </Heading>
          </Flex>
          <Text color="gray.500">
            Discover the wonders of science and mathematics with ShikshaFinder
          </Text>
        </VStack>

        {/* Input Form */}
        <Box position="relative">
          <Flex>
            <Box as="form" onSubmit={handleSubmit}>
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask anything about science or math..."
                pr="3rem"
                borderColor="gray.200"
                focusBorderColor="blue.500"
                rounded="lg"
                color="gray.800"
                bg="white"
              />
            </Box>
            <Button
              type="submit"
              isDisabled={loading || !inputText.trim()}
              position="absolute"
              right={2}
              top="50%"
              transform="translateY(-50%)"
              colorScheme="blue"
              rounded="full"
              px={4}
              onClick={() =>
                document
                  .querySelector("form")
                  ?.dispatchEvent(
                    new Event("submit", { cancelable: true, bubbles: true })
                  )
              }
            >
              {loading ? (
                <CircularProgress isIndeterminate size="24px" color="white" />
              ) : (
                <Icon as={Send} boxSize={5} />
              )}
            </Button>
          </Flex>
        </Box>
        {/* Response Box */}
        {summary && (
          <Box>
            <Flex align="start" gap={4}>
              <Center boxSize={8} bg="blue.600" rounded="full" color="white">
                <Icon as={Sparkles} boxSize={5} />
              </Center>
              <List>
                <MarkdownBox content={summary} />
              </List>
            </Flex>
          </Box>
        )}

        {/* Error State */}
        {summary && summary.includes("error") && (
          <Flex align="center" gap={2} color="red.600">
            <Icon as={AlertCircle} boxSize={5} />
            <Text>Something went wrong. Please try again.</Text>
          </Flex>
        )}
      </Container>
    </Center>
  );
};
export default Chatbot;

const MarkdownBox = ({ content }: { content: string }) => {
  return (
    <Box
      bgGradient="linear(to-r, blue.50, purple.50)"
      p={6}
      rounded="xl"
      shadow="inner"
    >
      <ReactMarkdown
        components={markdownComponents}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
};
