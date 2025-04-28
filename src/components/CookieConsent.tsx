import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  useColorModeValue,
  Flex,
  Link,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "false");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <Box
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        bg={bgColor}
        borderTop="1px"
        borderColor={borderColor}
        p={4}
        zIndex={1000}
        role="alert"
        aria-live="polite"
      >
        <Flex
          maxW="7xl"
          mx="auto"
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap={4}
        >
          <Text fontSize="sm" flex="1">
            We use cookies to enhance your browsing experience, serve
            personalized content, and analyze our traffic. By continuing to use
            our site, you agree to our{" "}
            <Link color="blue.500" onClick={onOpen} cursor="pointer">
              Cookie Policy
            </Link>
            .
          </Text>
          <Flex gap={2}>
            <Button
              size="sm"
              variant="outline"
              onClick={handleReject}
              aria-label="Reject cookies"
            >
              Reject
            </Button>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={handleAccept}
              aria-label="Accept cookies"
            >
              Accept
            </Button>
          </Flex>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cookie Policy</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text mb={4}>
              Our website uses cookies to improve your experience while you
              navigate through the website. Out of these, the cookies that are
              categorized as necessary are stored on your browser as they are
              essential for the working of basic functionalities of the website.
            </Text>
            <Text mb={4}>
              We also use third-party cookies that help us analyze and
              understand how you use this website. These cookies will be stored
              in your browser only with your consent.
            </Text>
            <Text>
              You have the right to accept or reject cookies. However, rejecting
              some cookies may impact your experience of the site and the
              services we are able to offer.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CookieConsent;
