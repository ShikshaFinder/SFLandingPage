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
import { MdOutlineDynamicForm, MdCall } from "react-icons/md";
import Cardd from "../../../components/card";
import { MdOpenInBrowser } from "react-icons/md";

import Link from "next/link";
import React from "react";

function IntroSchool() {
  return (
    <>
      <AspectRatio maxW="560px" ratio={1.75}>
        <iframe
          title="hihello"
          src="https://www.youtube.com/embed/QhBnZ6NPOY0"
          allowFullScreen
        />
      </AspectRatio>
      <br />{" "}
      
      <Link href={"/sub"}>
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
          {/* link of school */}
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
      <Stack direction="row">
        <Link href={"/introschool"}>
          <Cardd
            name="Shree Swami"
            imgsrc={
              "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            rating={"3.4"}
          />{" "}
          <Cardd
            name="Shree Swami"
            imgsrc={
              "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            rating={"3.4"}
          />
        </Link>
      </Stack>
      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        p={4}
        bg="gray.100"
        borderTopWidth="1px"
        borderColor="gray.400"
      >
        <Stack direction="row" spacing={100}>
          <Button
            leftIcon={<MdOutlineDynamicForm />}
            colorScheme="pink"
            variant="solid"
          >
            Admissoin form
          </Button>
          <Button rightIcon={<MdCall />} colorScheme="blue" variant="outline">
            Call us
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default IntroSchool;
