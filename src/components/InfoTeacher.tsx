import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Box,
  Stack,
  Heading,
  StackDivider,
} from "@chakra-ui/react";
import Link from "next/link";
import { Icon } from "@chakra-ui/react";
import { BiLocationPlus } from "react-icons/bi";
function InfoTeacher({
  TeacherName,
  location,
  discription,
  locationlink,
}: {
  TeacherName: string;
  location?: string;
  discription: string;
  locationlink?: string;
}) {
  return (
    <>
      <Card boxShadow={"2xl"} rounded={"md"}>
        <CardHeader>
          name
          <Heading size="sm">{TeacherName}</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="1">
            {/* <Box> */}
            <Heading size="lg">Description</Heading>
            <Text pt="2" fontSize="sm">
              {discription}
            </Text>
            {/* </Box> */}
            <Box>
              <Link href={locationlink ?? ""}>
                <BiLocationPlus /> {location}
              </Link>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}

export default InfoTeacher;
