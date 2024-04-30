import * as React from "react";
import {
  chakra,
  Container,
  Stack,
  HStack,
  Text,
  useColorModeValue,
  Image,
  Skeleton,
  Box,
  Link,
  Icon,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { GoChevronRight } from "react-icons/go";
import { MdBolt } from "react-icons/md";
import Layout from "../Layout";
import Head from "next/head";

const HeroSection = () => {
  return (
    <Layout>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2754274313849445"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <Container maxW="6xl" px={{ base: 6, md: 3 }} py={24}>
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="center"
        >
          <Stack
            direction="column"
            spacing={6}
            justifyContent="center"
            maxW="480px"
          >
            <HStack
              as={Link}
              p={1}
              rounded="full"
              fontSize="sm"
              w="max-content"
              bg={useColorModeValue("gray.300", "gray.700")}
            >
              <Box
                py={1}
                px={2}
                lineHeight={1}
                rounded="full"
                color="white"
                bgGradient="linear(to-l, #0ea5e9,#2563eb)"
              >
                What's new
              </Box>
              <HStack spacing={1} alignItems="center" justifyContent="center">
                <Link href="/aboutus/new">
                  {" "}
                  <Text lineHeight={1}>See our recent updates</Text>
                </Link>
                <Icon as={GoChevronRight} w={4} h={4} />
              </HStack>
            </HStack>
            <chakra.h1
              fontSize="5xl"
              lineHeight={1}
              fontWeight="bold"
              textAlign="left"
            >
              Unlocking The Choices Of Education 📈
              <br />
              <chakra.span color="teal"> Is Our Mission</chakra.span>
            </chakra.h1>
            <Text
              fontSize="1.2rem"
              textAlign="left"
              lineHeight="1.375"
              fontWeight="400"
              color="gray.500"
            >
              Shiksha Finder: Your Dream School Finder, Not Just Another
              Directory! Hey there, future star student! Are you tired of wading
              through endless lists of schools that all start to blend together?
              Imagine this: a magical portal that throws open the doors to
              amazing educational opportunities across India, just for you! ✨
              That's Shiksha Finder, your one-stop shop for unlocking the
              perfect educational journey. No more mind-numbing searches or
              settling for "good enough." Shiksha Finder lets you **explore,
              compare, and even experience schools, coaching centers, and skill
              development courses like never before! Think of it as your
              personalized education genie, granting wishes read: finding the
              perfect learning fit!. Our mission? Simple: to make your
              educational journey epic. We have a massive database of schools
              across India, and we don't just list them we give you the inside
              scoop. Think **detailed profiles, sneak peeks at actual classes
              through demo lectures, and all the info you need to make the right
              choice with confidence. What makes us different? Unlike other
              directories, we're all about transparency and convenience. We
              don't just throw names at you and hope you stick. We give you real
              glimpses into what each school offers, so you can feel if it's the
              right fit before you even step foot inside. Here's the best part:
              Shiksha Finder is a win-win for everyone! Students get an awesome
              platform to explore options, see teaching styles, and make
              informed decisions. Schools get a powerful marketing tool to
              showcase their awesomeness and connect with future stars like you!
              Shiksha Finder is designed by educators, for educators and
              students, with features like demo lectures that you won't find
              anywhere else. Join us! Be a part of the education revolution and
              unlock your full potential. Together, let's make finding the
              perfect school an exciting adventure, not a stressful chore.
              Click, explore, and get ready to embrace your educational destiny!
              P.S. We're constantly adding new schools and features, so stay
              tuned for even more awesomeness!
            </Text>
            <HStack
              spacing={{ base: 0, sm: 2 }}
              mb={{ base: "3rem !important", sm: 0 }}
              flexWrap="wrap"
            >
              <chakra.button
                w={{ base: "100%", sm: "auto" }}
                h={12}
                px={6}
                color="white"
                rounded="md"
                mb={{ base: 2, sm: 0 }}
                zIndex={5}
                lineHeight={1}
                bgGradient="linear(to-l, #0ea5e9,#2563eb)"
                _hover={{
                  bgGradient: "linear(to-l, #0ea5e9,#2563eb)",
                  opacity: 0.9,
                }}
              >
                <Link href="/skillclass">
                  {" "}
                  <chakra.span> Visit skill classes</chakra.span>
                </Link>
                <Icon as={MdBolt} h={4} w={4} ml={1} />
              </chakra.button>
              <Box
                justifyContent="center"
                bg={useColorModeValue("white", "gray.800")}
                w={{ base: "100%", sm: "auto" }}
                border="1px solid"
                borderColor="gray.300"
                p={3}
                lineHeight={1.18}
                rounded="md"
                boxShadow="md"
                as={Link}
                zIndex={55555555}
                href="/"
              >
                Watch Video
              </Box>
            </HStack>
          </Stack>
          <Box ml={{ base: 0, md: 5 }} pos="relative">
            <DottedBox />
            <Image
              w="100%"
              h="100%"
              minW={{ base: "auto", md: "30rem" }}
              objectFit="cover"
              src={`https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
              rounded="md"
              fallback={<Skeleton />}
            />
          </Box>
        </Stack>
      </Container>
    </Layout>
  );
};

function DottedBox() {
  return (
    <Box
      position="absolute"
      left="-45px"
      top="-30px"
      height="full"
      maxW="700px"
      zIndex={-1}
    >
      <svg
        color={useColorModeValue("rgba(55,65,81, 0.1)", "rgba(55,65,81, 0.7)")}
        width="350"
        height="420"
        fill="none"
      >
        <defs>
          <pattern
            id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
          </pattern>
        </defs>
        <rect
          width="404"
          height="404"
          fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
        ></rect>
      </svg>
    </Box>
  );
}

export default HeroSection;
