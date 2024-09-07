import { NextSeo } from "next-seo";
import Head from "next/head";
import Footer from "../components/footer";
import CompanyReview from "../components/companyreview";
import GetStarted from "../components/getstarted";
import { useAuthContext } from "@/context";
import Link from "next/link";
import Faq from "../components/Faq"
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Icon,
  IconProps,
} from "@chakra-ui/react";
import Layout from "./Layout";
import Image from "next/image";

export default function Home() {
  const { user } = useAuthContext();

  return (
    <>
      <Layout>
        <NextSeo
          title="Shiksha Finder"
          description="Find Best educational institute for your child, Watch Demo lectures, Fill online admission form, Promote your educational platform"
          openGraph={{
            url: "/icon-192x192.png",
            title: "Let's promote Quality of Education",
            description: "Choose right educational platform for your child",
            images: [
              {
                url: "/icon-192x192.png",
                alt: "Shiksha Finder == happy students",
              },
            ],
            site_name: "shikshafinder.com",
            type: "website",
          }}
        />
        <Head>
          <meta
            name="google-site-verification"
            content="x0ic1dcDO30kWVKAfCEqPcWGbjb6ZCvg75NpHKI_Ci0"
          />
          <meta
            name="ShikshaFinder"
            content="Shiksha Finder,Coaching classes in ,how to find best schools for your child?,what is the best way of marketing your educational platform?,schools near me ,skill classes near me"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />                  
        </Head>
        <Container maxW={"7xl"}>
          <Stack
            align={"center"}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 28 }}
            direction={{ base: "column", md: "row" }}
          >
            <Stack flex={1} spacing={{ base: 5, md: 10 }}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
              >
                <Text
                  as={"span"}
                  position={"relative"}
                  _after={{
                    content: "''",
                    width: "full",
                    height: "20%",
                    position: "absolute",
                    bottom: 1,
                    left: 0,
                    zIndex: -1,
                  }}
                >
                  Shiksha Finder
                </Text>
                <br />
                <Text as={"span"} color={"blue.400"}>
                  Explore the quality of education
                </Text>
              </Heading>
              <Text>
                Here at Shiksha Finder, you can watch <b>Demo lectures</b> and
                explore facilities of any school, coaching classes, or skill
                classes. You can easily fill the online admission form of any
                platform.
                <br />
                <b>Admission made simple!</b>
              </Text>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={{ base: "column", sm: "row" }}
              >
                {user && user.email ? (
                  <GetStarted />
                ) : (
                  <Link href="/signup">
                    <Button
                      rounded={"full"}
                      size={"lg"}
                      fontWeight={"normal"}
                      px={6}
                      colorScheme={"blue"}
                      _hover={{ bg: "blue.500" }}
                    >
                      Get started
                    </Button>
                  </Link>
                )}
                <a
                  href="https://platform.shikshafinder.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    rounded={"full"}
                    size={"lg"}
                    fontWeight={"normal"}
                    px={6}
                  >
                    For Educational Platform
                  </Button>
                </a>
              </Stack>
            </Stack>
            <Flex
              flex={1}
              justify={"center"}
              align={"center"}
              position={"relative"}
              w={"full"}
            >
              <Blob
                w={"100%"}
                h={"100%"}
                position={"absolute"}
                top={"-30%"}
                left={0}
                zIndex={-1}
                color={"blue.400"}
              />

              <Box
                position={"relative"}
                height={"auto"}
                rounded={"2xl"}
                boxShadow={"2xl"}
                width={"full"}
                overflow={"hidden"}
              >
                <Image
                  src="/sf.webp"
                  alt="Shiksha Finder image"
                  width={600}
                  height={300}
                />
              </Box>
            </Flex>
          </Stack>
        </Container>
        <CompanyReview />
        <Faq />
        <Footer />
      </Layout>
    </>
  );
}

const Blob = (props: IconProps) => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};
