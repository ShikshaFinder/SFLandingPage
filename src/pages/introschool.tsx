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
  Button
} from "@chakra-ui/react";
import { MdOutlineDynamicForm, MdCall } from "react-icons/md";
import Cardd from "../components/card"


import React from 'react'

function IntroSchool() {
  return (
    <>
      <AspectRatio maxW="560px" ratio={1.75}>
        <iframe
          title="naruto"
          src="https://www.youtube.com/embed/QhBnZ6NPOY0"
          allowFullScreen
        />
      </AspectRatio>
      <Card>
        <CardHeader>
          <Heading size="md">School Name</Heading>
        </CardHeader>
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
      <Stack direction="row" >
        <Cardd />
        <Cardd />
       
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

export default IntroSchool
