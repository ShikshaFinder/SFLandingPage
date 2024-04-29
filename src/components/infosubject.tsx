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

function InfoTeacher({
  TeacherName,
  discription,
}: {
  TeacherName: string;
  discription: string;
}) {
  return (
    <>
      <Card
        m={{
          base: "1rem",
          md: "1rem",
          lg: "1rem",
          xl: "1rem",
        }}
      >
        <CardHeader>
          name
          <Heading size="sm">{TeacherName}</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="1">
            {/* <Box> */}
            <Heading size="lg">Discription</Heading>
            <Text pt="2" fontSize="sm">
              {discription}
            </Text>
            {/* </Box> */}
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}

export default InfoTeacher;
