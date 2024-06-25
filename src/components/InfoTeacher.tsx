import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Box,
  Button,
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
  medium,
}: {
  TeacherName: string;
  location?: string;
  discription: string;
  locationlink?: string;
  exam?: string;
  medium?: string;
}) {
  const [lines, setLines] = React.useState(6);
  const readMore = () => {
    setLines(100);
  };
 
  return (
    <>
      <Card boxShadow={"2xl"} rounded={"md"}>
        <CardHeader>
          <Heading size="lg">{TeacherName}</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="1">
            <Heading size="md">Description</Heading>
            <Text pt="2" fontSize="sm" noOfLines={lines}>
              {discription}
            </Text>
            <b onClick={readMore}>Read more</b>
            {/* </Box> */}
            <br />
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
            <br />
            <Heading size="md">Exams</Heading>
            <Text pt="2" fontSize="sm">
              {exam}
            </Text>
            <br />
            <Heading size="md">Medium</Heading>
            <Text pt="2" fontSize="sm">
              {medium}
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}

export default InfoTeacher;
