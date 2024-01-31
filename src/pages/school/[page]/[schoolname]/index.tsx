import {
  AspectRatio,
  Card,
  CardHeader,
  CardBody,
  Text,
  Box,
  Stack,
  Heading,
  StackDivider,
  Button,
  Icon,
} from "@chakra-ui/react";
import Chart from "../../../../components/Chart";
import { useRouter } from "next/router";
import Admissionform from "../../../../components/admissionformlink";
import Cardd from "../../../../components/card";
import { MdOpenInBrowser } from "react-icons/md";

import Link from "next/link";
import React from "react";

function IntroSchool() {
  const router = useRouter();
  const pathSegments = router.asPath.split("/");

  const lastSegment = pathSegments[pathSegments.length -2];

  return (
    <>
      <AspectRatio maxW="560px" ratio={1.75}>
        <iframe
          title="hihello"
          src="https://www.youtube.com/embed/pGeHsxjQJXw?si=FLPTuZo-YCnKVMOz"
          allowFullScreen
        />
      </AspectRatio>
      <br />{" "}
      <Link href={`../${lastSegment}/schoolname/subject`}>
        <Stack spacing={4} direction="row" align="center">
          {" "}
          <Button colorScheme="teal" size="xs">
            Std 6
          </Button>
          <Button colorScheme="teal" size="xs">
            Std 7
          </Button>
          <Button colorScheme="teal" size="xs">
            Std 8
          </Button>
          <Button colorScheme="teal" size="xs">
            Std 9
          </Button>
          <Button colorScheme="teal" size="xs">
            Std 10
          </Button>
          <Button colorScheme="teal" size="xs">
            Std 11
          </Button>{" "}
          <Button colorScheme="teal" size="xs">
            Std 12
          </Button>
        </Stack>{" "}
      </Link>
      <Card>
        <Stack spacing={4} direction="row" align="center">
          <CardHeader>
            <Heading size="md">School Name</Heading>
          </CardHeader>
          <Link href={"/"}>
            <Icon as={MdOpenInBrowser} color={"blue"} />
          </Link>
        </Stack>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="3">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Location
              </Heading>
              <Text pt="2" fontSize="sm">
                Check out the overview of your clients.
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Information of school
              </Heading>
              <Text pt="2" fontSize="sm">
                ye school bhot badhiya hain mujhe ye school bhot pasand hain
                sdvfabbjf amnd fadnmd jdbfiaefihfbjd d sfvskbibhdiwbrfhbdb
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
      <br />
      <Chart extra={9} quality={8} management={7} facilities={8} />
      <Stack direction="row">
        <Link href={`../school/2/schoolname`}>
          <Cardd
            name="Shree Swami"
            imgsrc={
              "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            rating={"3.4"}
          />{" "}
        </Link>

        <Link href={`../school/2/schoolname`}>
          {" "}
          <Cardd
            name="Shree Swami"
            imgsrc={
              "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            rating={"3.4"}
          />
        </Link>
      </Stack>
      <Admissionform name="Shree Swami" phoneNumber={1234567890} />
    </>
  );
}

export default IntroSchool;
