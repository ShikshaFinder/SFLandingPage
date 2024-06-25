import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Button,
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

  const [lines, setLines] = React.useState(6);
  const readMore = () => {
    setLines(100);
  };
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
          <Heading size="lg">{TeacherName}</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="1">
            {/* <Box> */}
            <Heading size="md">Description</Heading>
            <Text pt="2" fontSize="sm" noOfLines={lines}>
              {discription}
            </Text>
            <b onClick={readMore}>Read more</b>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}

export default InfoTeacher;
