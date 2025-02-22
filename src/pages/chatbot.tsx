import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuthContext } from "@/context";
import { useRouter } from "next/router";
// import { useAuthContext } from "@/context";
import Nouser from "@/components/Nouser";
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
  Image,
} from "@chakra-ui/react";
import {
  AlertCircle,
  Menu,
  Send,
  Sparkles,
  Plus,
  Router,
  Image as ImageIcon,
  X,
  Clock,
} from "lucide-react";
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

interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const Chatbot = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [currentConversation, setCurrentConversation] = useState<
    ConversationMessage[]
  >([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuthContext();
  const [streamingMessage, setStreamingMessage] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  if (!user) {
    return <Nouser />;
  }

  // Add state for client-side rendering
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const Router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [uploadingImage, setUploadingImage] = useState(false);

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

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setImagePreviewUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !selectedImage) return;

    setLoading(true);
    setIsStreaming(true);
    setStreamingMessage("");

    try {
      let imageUrl = "";

      if (selectedImage) {
        setUploadingImage(true);
        const reader = new FileReader();
        imageUrl = await new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(selectedImage);
        });
        setUploadingImage(false);
      }

      // Add user message to conversation
      const userMessage: ConversationMessage = {
        role: "user",
        content: inputText,
        timestamp: new Date().toISOString(),
      };
      setCurrentConversation((prev) => [...prev, userMessage]);

      const response = await fetch("/api/getanswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          msg: inputText,
          imageUrl: imageUrl,
          conversationHistory: currentConversation,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No reader available");
      }

      let accumulatedResponse = "";
      let isComplete = false;

      // Create a promise that resolves when streaming is complete
      const streamPromise = new Promise<string>(async (resolve, reject) => {
        try {
          while (!isComplete) {
            const { done, value } = await reader.read();

            if (done) {
              isComplete = true;
              break;
            }

            // Decode the stream chunk and process it
            const chunk = new TextDecoder().decode(value);
            const lines = chunk
              .split("\n")
              .filter((line) => line.trim() !== "");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                try {
                  const data = JSON.parse(line.slice(6));
                  if (data.content) {
                    accumulatedResponse += data.content;
                    setStreamingMessage(accumulatedResponse);
                  }
                } catch (e) {
                  console.error("Error parsing chunk:", e);
                }
              }
            }
          }
          resolve(accumulatedResponse);
        } catch (error) {
          reject(error);
        }
      });

      // Wait for the complete response
      const finalResponse = await streamPromise;

      // After streaming is complete and we have the full response, update conversation and save
      const assistantMessage: ConversationMessage = {
        role: "assistant",
        content: finalResponse as string,
        timestamp: new Date().toISOString(),
      };

      setCurrentConversation((prev) => [...prev, assistantMessage]);
      await saveResponse(inputText, finalResponse);

      removeSelectedImage();
      setInputText("");
    } catch (error) {
      console.error("Error during request:", error);
      setStreamingMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
      setIsStreaming(false);
      setUploadingImage(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleNewChat = () => {
    setInputText("");
    setSummary("");
    setCurrentConversation([]);
    onClose();
  };

  // Move ChatSidebar outside of main component to prevent re-renders
  const ChatSidebarContent = () => (
    <VStack align="stretch" h="100%" spacing={0} bg="white">
      {/* Header Section */}
      <Box p={4} borderBottom="1px" borderColor="gray.200">
        <Heading size="md" color="gray.700">
          Chat History
        </Heading>
      </Box>

      {/* Content Section */}
      <VStack
        align="stretch"
        spacing={3}
        overflowY="auto"
        maxH="calc(100vh - 100px)"
        p={4}
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "gray.200",
            borderRadius: "24px",
          },
        }}
      >
        {!isClient ? null : isLoading ? (
          <Center py={8}>
            <VStack spacing={4}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="lg"
              />
              <Text color="gray.500" fontSize="sm" fontWeight="medium">
                Loading your conversations...
              </Text>
            </VStack>
          </Center>
        ) : chatHistory.length === 0 ? (
          <Center py={12}>
            <VStack spacing={3}>
              <Icon as={AlertCircle} boxSize={8} color="gray.400" />
              <Text color="gray.500" fontSize="md" textAlign="center">
                No chat history yet
              </Text>
              <Text color="gray.400" fontSize="sm" textAlign="center">
                Start a new conversation to see it here
              </Text>
            </VStack>
          </Center>
        ) : (
          chatHistory.map((chat) => (
            <Box
              key={chat.id}
              p={4}
              bg="white"
              rounded="lg"
              cursor="pointer"
              borderWidth="1px"
              borderColor="gray.200"
              transition="all 0.2s"
              _hover={{
                bg: "blue.50",
                borderColor: "blue.200",
                transform: "translateY(-1px)",
                shadow: "md",
              }}
              onClick={() => {
                setCurrentConversation([
                  {
                    role: "user",
                    content: chat.message,
                    timestamp: chat.created_at,
                  },
                  {
                    role: "assistant",
                    content: chat.response,
                    timestamp: chat.created_at,
                  },
                ]);
                onClose();
              }}
            >
              <VStack align="stretch" spacing={3}>
                {/* Question Section */}
                <Box>
                  <Flex align="center" gap={2} mb={2}>
                    <Icon as={Send} boxSize={3} color="green.500" />
                    <Text fontSize="xs" fontWeight="medium" color="gray.600">
                      Question
                    </Text>
                  </Flex>
                  <Text fontSize="sm" color="gray.700" noOfLines={2}>
                    {chat.message}
                  </Text>
                </Box>

                {/* Response Preview */}
                <Box borderTopWidth="1px" borderColor="gray.100" pt={2}>
                  <Flex align="center" gap={2} mb={2}>
                    <Icon as={Sparkles} boxSize={3} color="blue.500" />
                    <Text fontSize="xs" fontWeight="medium" color="gray.600">
                      Response
                    </Text>
                  </Flex>
                  <Text fontSize="sm" color="gray.600" noOfLines={2}>
                    {chat.response}
                  </Text>
                </Box>

                {/* Timestamp */}
                <Flex align="center" gap={2} mt={1}>
                  <Icon as={Clock} boxSize={3} color="gray.400" />
                  <Text fontSize="xs" color="gray.500">
                    {isClient
                      ? new Date(chat.created_at).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : ""}
                  </Text>
                </Flex>
              </VStack>
            </Box>
          ))
        )}
      </VStack>
    </VStack>
  );

  if (isLoading) {
    return (
      <Center minH="100vh">
        <VStack spacing={4}>
          <Nouser />
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text color="gray.600" fontSize="lg">
            Loading your chats,
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
      {/* <a href="/scholarship">Scholarship</a> */}
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
          <Button
            onClick={() => {
              Router.push("/schoolfilter");
            }}
            colorScheme="blue"
            size="md"
            leftIcon={<Icon as={Plus} />}
          >
            Find The Best Institutions
          </Button>
          <br />
          <br />
          {/* Desktop Header with New Chat Button */}
          <VStack spacing={4} mb={8}>
            <Flex align="center" gap={2} w="full" justify="space-between">
              <Flex align="center" gap={2}>
                <Icon as={Sparkles} boxSize={6} color="blue.500" />
                <Heading size="lg" color="black">
                  Science & Math Explorer
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
              Discover the wonders of science and mathematics with ShikshaFinder
            </Text>
          </VStack>

          {/* Chat Input */}
          <Box position="relative" mb={8}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                {imagePreviewUrl && (
                  <Box position="relative" width="fit-content">
                    <Image
                      src={imagePreviewUrl}
                      alt="Selected image"
                      maxH="200px"
                      rounded="md"
                    />
                    <IconButton
                      icon={<Icon as={X} />}
                      aria-label="Remove image"
                      position="absolute"
                      top={2}
                      right={2}
                      size="sm"
                      colorScheme="red"
                      onClick={removeSelectedImage}
                    />
                  </Box>
                )}
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
                  <label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      style={{ display: "none" }}
                    />
                    <IconButton
                      as="span"
                      aria-label="Upload image"
                      icon={<Icon as={ImageIcon} />}
                      colorScheme="gray"
                      cursor="pointer"
                    />
                  </label>
                  <Button
                    type="submit"
                    variant="solid"
                    colorScheme="blue"
                    isDisabled={
                      loading ||
                      uploadingImage ||
                      (!inputText.trim() && !selectedImage)
                    }
                    size="md"
                  >
                    {loading || uploadingImage ? (
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
              </VStack>
            </form>
          </Box>

          {/* Response */}
          <Box flex={1} overflowY="auto" mb={4}>
            {currentConversation.map((message, index) => (
              <Box
                key={index}
                bg="white"
                rounded="md"
                shadow="sm"
                p={4}
                mb={4}
                ml={message.role === "assistant" ? 0 : "auto"}
                mr={message.role === "assistant" ? "auto" : 0}
                maxW="80%"
              >
                <Flex
                  gap={3}
                  direction={{ base: "column", md: "row" }}
                  align={{ base: "flex-start", md: "start" }}
                >
                  <Center
                    boxSize={8}
                    bg={message.role === "assistant" ? "blue.500" : "green.500"}
                    rounded="full"
                    flexShrink={0}
                    ml={{ base: 2, md: 0 }}
                  >
                    <Icon
                      as={message.role === "assistant" ? Sparkles : Send}
                      color="white"
                    />
                  </Center>
                  <Box flex={1} w="full">
                    <MarkdownBox content={message.content} />
                    <Text fontSize="xs" color="gray.500" mt={2}>
                      {new Date(message.timestamp).toLocaleString()}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ))}

            {/* Streaming message */}
            {isStreaming && streamingMessage && (
              <Box
                bg="white"
                rounded="md"
                shadow="sm"
                p={4}
                mb={4}
                ml={0}
                mr="auto"
                maxW="80%"
              >
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
                    <MarkdownBox content={streamingMessage} />
                    <Text fontSize="xs" color="gray.500" mt={2}>
                      Typing...
                    </Text>
                  </Box>
                </Flex>
              </Box>
            )}
          </Box>

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
