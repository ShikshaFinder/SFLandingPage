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
} from "@chakra-ui/react";
import { MdOutlineDynamicForm, MdCall } from "react-icons/md";
import Cardd from "../../../../components/card";
import Link from "next/link";
import React from "react";

function IntroSchool() {
  return (
    <>
      <Stack spacing={4} direction="row" align="center">
        <Button colorScheme="teal" size="xs">
          maths
        </Button>
        <Button colorScheme="teal" size="xs">
          science
        </Button>
        <Button colorScheme="teal" size="xs">
          english
        </Button>
        <Button colorScheme="teal" size="xs">
          social science
        </Button>
      </Stack>{" "}
      <br />
      <AspectRatio maxW="560px" ratio={1.75}>
        <iframe
          title="hihello"
          src="https://www.youtube.com/embed/pGeHsxjQJXw?si=FLPTuZo-YCnKVMOz"
          allowFullScreen
        />
      </AspectRatio>
      <Card>
        <CardHeader>
          <Heading size="md">Teacher Name</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="3">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Experience & Expertice
              </Heading>
              <Text pt="2" fontSize="sm">
                12 to 13 years ....
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                more about teacher or extracurricular activities
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
        <Link href={"../school/schoolname"}>
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
    </>
  );
}

export default IntroSchool;
