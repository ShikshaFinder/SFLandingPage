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
function InfoTeacher({
  TeacherName,
  location,
  discription,
  locationlink,
  exam,
}: {
  TeacherName: string;
  location?: string;
  discription: string;
  locationlink?: string;
  exam?: string;
}) {
  return (
    <>
      <Card boxShadow={"2xl"} rounded={"md"}>
        <CardHeader>
          <Heading size="lg">{TeacherName}</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="1">
            <Heading size="md">Description</Heading>
            <Text pt="2" fontSize="sm">
              {discription}
            </Text>
            {/* </Box> */}
            <Box>
              <Link href={locationlink ?? ""}>
                <Box height={"10px"}>
                  <img
                    src="/location.svg"
                    alt="location"
                    style={{ height: "50px" }}
                  />
                </Box>{" "}
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {location}
              </Link>
            </Box>
            <Heading size="md">Exams</Heading>
            <Text pt="2" fontSize="sm">
              {exam}
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}

export default InfoTeacher;
