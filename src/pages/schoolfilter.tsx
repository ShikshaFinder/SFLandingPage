import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuthContext } from "@/context";
import {
  Box,
  Button,
  Center,
  CircularProgress,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Input,
  List,
  ListItem,
  Text,
  useDisclosure,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { AlertCircle, Menu, Send, Sparkles, Plus } from "lucide-react";
import supabase from "../../supabase";

const markdownComponents = {
  h1: (props: any) => (
    <Heading as="h1" size="xl" mt={4} mb={2} color="black" {...props} />
  ),
  h2: (props: any) => (
    <Heading as="h2" size="lg" mt={3} mb={2} color="black" {...props} />
  ),
  p: (props: any) => <Text mt={2} color="black" {...props} />,
  strong: (props: any) => (
    <Text as="strong" fontWeight="bold" color="black" {...props} />
  ),
  ul: ({ children }: any) => (
    <List styleType="disc" pl={6} mt={2} spacing={2} color="black">
      {children}
    </List>
  ),
  ol: ({ children }: any) => (
    <List as="ol" styleType="decimal" pl={6} mt={2} spacing={2} color="black">
      {children}
    </List>
  ),
  li: (props: any) => <ListItem color="black" {...props} />,
};

interface ChatMessage {
  id: string;
  message: string;
  response: string;
  created_at: string;
  title: string;
  user_id: string;
}

const Chatbot = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuthContext();

  // Add state for client-side rendering
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function saveResponse(messageText: string, responseText: string) {
    try {
      if (!user?.id) {
        console.log("No user ID found when saving");
        return;
      }

      const { data, error } = await supabase
        .from("chat_history")
        .insert([
          {
            message: messageText,
            response: responseText,
            user_id: user.id,
          },
        ])
        .select();

      if (error) {
        console.error("Error saving to Supabase:", error);
        throw error;
      }

      // Fetch updated history after successful save
      await getHistory();
    } catch (error) {
      console.error("Error saving response:", error);
    }
  }

  async function getHistory() {
    setIsLoading(true);
    try {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from("chat_history")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setChatHistory(data || []);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Update useEffect to handle client-side mounting
  useEffect(() => {
    setIsClient(true);
    if (user?.id) {
      getHistory();
    }
  }, [user?.id]);

  interface ApiResponse {
    messages: { content: string }[];
    error?: string;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setLoading(true);
    setSummary("");

    try {
      const response = await fetch("/api/keydiffrence", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          msg: inputText,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const responseContent =
          data.messages[0]?.content || "No summary found.";
        setSummary(responseContent);
        await saveResponse(inputText, responseContent);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleNewChat = () => {
    setInputText("");
    setSummary("");
    onClose(); // Close drawer if open
  };

  // Move ChatSidebar outside of main component to prevent re-renders
  const ChatSidebarContent = () => (
    <VStack align="stretch" h="100%" p={4} bg="white" shadow="md">
      <VStack
        align="stretch"
        spacing={4}
        overflowY="auto"
        maxH="calc(100vh - 100px)"
      >
        {!isClient ? null : isLoading ? (
          <VStack py={8}>
            <Spinner
              thickness="3px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="md"
            />
            <Text color="gray.500" fontSize="sm">
              Loading chats...
            </Text>
          </VStack>
        ) : chatHistory.length === 0 ? (
          <Text color="gray.500" textAlign="center">
            No chat history yet
          </Text>
        ) : (
          chatHistory.map((chat) => (
            <Box
              key={chat.id}
              p={4}
              bg="gray.50"
              rounded="md"
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              onClick={() => {
                setSummary(chat.response);
                setInputText(chat.message);
                onClose(); // Close drawer after selection on mobile
              }}
            >
              <Text fontWeight="bold" fontSize="sm" color="gray.700">
                {chat.title || chat.message.substring(0, 50)}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {isClient ? new Date(chat.created_at).toLocaleString() : ""}
              </Text>
            </Box>
          ))
        )}
      </VStack>
    </VStack>
  );

  if (isLoading) {
    return (
      <Center minH="100vh" bg="gray.50">
        <VStack spacing={4}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text color="gray.600" fontSize="lg">
            Loading your chats...
          </Text>
        </VStack>
      </Center>
    );
  }

  if (!isClient) {
    return null; // Prevent initial flash during hydration
  }

  return (
    <Grid
      minH="100vh"
      templateColumns={{ base: "1fr", md: "300px 1fr" }}
      bg="gray.50"
    >
      {/* Sidebar - Hidden on mobile */}
      <GridItem display={{ base: "none", md: "block" }}>
        <ChatSidebarContent />
      </GridItem>

      {/* Mobile Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size="full" // Make drawer full screen on mobile
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton size="lg" /> {/* Make close button bigger */}
          <DrawerHeader borderBottomWidth="1px">Chat History</DrawerHeader>
          <DrawerBody p={0}>
            <ChatSidebarContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <GridItem>
        <Container
          maxW={{ base: "100%", md: "4xl" }}
          py={{ base: 4, md: 8 }}
          px={{ base: 4, md: 6 }}
        >
          {/* Mobile Header with Menu and New Chat Buttons */}
          <Flex
            justify="space-between"
            align="center"
            mb={6}
            display={{ base: "flex", md: "none" }}
            gap={2}
          >
            <Button onClick={onOpen} colorScheme="blue" size="md">
              <Icon as={Menu} />
            </Button>
            <Button
              onClick={handleNewChat}
              colorScheme="blue"
              size="md"
              leftIcon={<Icon as={Plus} />}
            >
              New Chat
            </Button>
          </Flex>

          {/* Desktop Header with New Chat Button */}
          <VStack spacing={4} mb={8}>
            <Flex align="center" gap={2} w="full" justify="space-between">
              <Flex align="center" gap={2}>
                <Icon as={Sparkles} boxSize={6} color="blue.500" />
                <Heading size="lg" color="black">
                  Best Educational Institution Finder
                </Heading>
              </Flex>
              <Button
                onClick={handleNewChat}
                colorScheme="blue"
                size="md"
                display={{ base: "none", md: "flex" }}
                leftIcon={<Icon as={Plus} />}
              >
                New Chat
              </Button>
            </Flex>
            <Text color="gray.600" textAlign="center">
              Discover the best Educational Institutions around you. Ask any questions related to schools , filter the best Institutions based on your requirements.
            </Text>
          </VStack>

          {/* Chat Input */}
          <Box position="relative" mb={8}>
            <form onSubmit={handleSubmit}>
              <Flex gap={2}>
                <Input
                  value={inputText}
                  onChange={handleInputChange}
                  placeholder="Ask anything about science or math..."
                  size="md"
                  bg="white"
                  color="black"
                  borderColor="gray.200"
                  _focus={{ borderColor: "blue.500" }}
                />
                <Button
                  type="submit"
                  variant="solid"
                  colorScheme="blue"
                  isDisabled={loading || !inputText.trim()}
                  size="md"
                >
                  {loading ? (
                    <CircularProgress
                      size="24px"
                      color="black"
                      isIndeterminate
                    />
                  ) : (
                    <Icon as={Send} stroke="black" />
                  )}
                </Button>
              </Flex>
            </form>
          </Box>

          {/* Response */}
          {summary && (
            <Box bg="white" rounded="md" shadow="sm" p={4}>
              <Flex
                gap={3}
                direction={{ base: "column", md: "row" }}
                align={{ base: "flex-start", md: "start" }}
              >
                <Center
                  boxSize={8}
                  bg="blue.500"
                  rounded="full"
                  flexShrink={0}
                  ml={{ base: 2, md: 0 }}
                >
                  <Icon as={Sparkles} color="white" />
                </Center>
                <Box flex={1} w="full">
                  <MarkdownBox content={summary} />
                </Box>
              </Flex>
            </Box>
          )}

          {/* Error State */}
          {summary && summary.includes("error") && (
            <Flex
              align="center"
              gap={2}
              color="red.600"
              mt={4}
              fontSize={{ base: "sm", md: "md" }}
            >
              <Icon as={AlertCircle} />
              <Text>Something went wrong. Please try again.</Text>
            </Flex>
          )}
        </Container>
      </GridItem>
    </Grid>
  );
};

const MarkdownBox = ({ content }: { content: string }) => {
  return (
    <Box
      bg="white"
      paddingInline={2}
      rounded="md"
      fontSize={{ base: "sm", md: "md" }}
      color="black"
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

export default Chatbot;
