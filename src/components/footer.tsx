import Link from "next/link";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
import { ReactNode } from "react";

import Image from "next/image";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallCentered() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        {" "}
        <img
          src="https://wsrv.nl/?url=https://blobimageshikshafinder.blob.core.windows.net/shikshafinder/1713029348785_sfv1.png&h=300"
          alt="Shiksha Finder Logo"
          className="Container"
          width={150}
          height={250}
          style={{ borderRadius: "5%" }}
          loading="lazy"
        ></img>
        <Stack direction={"row"} spacing={6}>
          <Box as={Link} href={"/schoolleaderbord"}>
            platform Leaderbord
          </Box>
          <Box as={Link} href={"/aboutus"}>
            AboutUs
          </Box>
          <Box as={Link} href={"/blog"}>
            Blog
          </Box>
          <Box as={Link} href={"/contactus"}>
            Contact
          </Box>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <a href="https://platform.shikshafinder.com/gwsf">
            {" "}
            <Stack direction={"column"} mx={"auto"} align={"center"}>
              <Text>© GWSF Ventures Pvt Ltd</Text>
              <Text> Recognised by </Text>
            </Stack>
            <img
              src="https://wsrv.nl/?url=https://blobimageshikshafinder.blob.core.windows.net/shikshafinder/images.png&h=76"
              alt="startup india image shiksha finder"
              style={{ borderRadius: "5%" }}
              loading="lazy"
            />
          </a>
          <Stack direction={"row"} spacing={6}>
            <SocialButton
              label={"Twitter"}
              href={"https://twitter.com/shiksha_finder"}
            >
              <FaTwitter />
            </SocialButton>
            <SocialButton
              label={"YouTube"}
              href={"https://youtu.be/SSIeK18tkjM?si=iZRLrFrp4YDvAjIO"}
            >
              <FaYoutube />
            </SocialButton>
            <SocialButton
              label={"Instagram"}
              href={"https://www.instagram.com/shikshafinder/"}
            >
              <FaInstagram />
            </SocialButton>
            <SocialButton
              label={"linkedin"}
              href={"https://www.linkedin.com/company/shikshafinder"}
            >
              <FaLinkedin />
            </SocialButton>
            <div>
              <a href="https://platform.shikshafinder.com/termsofservice">
                {" "}
                <Text fontSize="xs" as="u">
                  {" "}
                  Terms Of Service
                </Text>
              </a>
              &nbsp; <Text fontSize="xs">&</Text>
              <a href="https://platform.shikshafinder.com/privacypolicy">
                {" "}
                <Text fontSize="xs" as="u">
                  {" "}
                  Privacy Policy
                </Text>
              </a>
            </div>
          </Stack>
          <Box height={"19"}></Box>
        </Container>
      </Box>
    </Box>
  );
}
